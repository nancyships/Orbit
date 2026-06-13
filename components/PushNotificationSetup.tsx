'use client'

import { useEffect, useState } from 'react'

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export default function PushNotificationSetup() {
  const [status, setStatus] = useState<'checking' | 'needed' | 'subscribed' | 'unsupported' | 'denied'>('checking')

  useEffect(() => {
    checkStatus()
  }, [])

  async function checkStatus() {
    if (!('Notification' in window) || !('serviceWorker' in navigator) || !('PushManager' in window)) {
      setStatus('unsupported')
      return
    }

    if (Notification.permission === 'denied') {
      setStatus('denied')
      return
    }

    // Check if already subscribed
    const registration = await navigator.serviceWorker.getRegistration()
    if (registration) {
      const existingSub = await registration.pushManager.getSubscription()
      if (existingSub) {
        setStatus('subscribed')
        return
      }
    }

    setStatus('needed')
  }

  async function enableNotifications() {
    const permission = await Notification.requestPermission()

    if (permission !== 'granted') {
      setStatus('denied')
      return
    }

    const registration = await navigator.serviceWorker.register('/sw.js')
    await navigator.serviceWorker.ready

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
      )
    })

    await fetch('/api/push/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subscription)
    })

    setStatus('subscribed')
  }

  if (status === 'checking' || status === 'subscribed' || status === 'unsupported' || status === 'denied') {
    return null
  }

  return (
    <div style={{
      background: '#1a2035',
      border: '0.5px solid #6366F133',
      borderRadius: '12px',
      padding: '14px 16px',
      marginBottom: '20px',
      maxWidth: '680px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '16px'
    }}>
      <div>
        <div style={{
          fontSize: '13px',
          fontWeight: '600',
          color: '#F4F4F4',
          marginBottom: '3px'
        }}>
          Turn on notifications
        </div>
        <div style={{ fontSize: '12px', color: '#888' }}>
          Get a daily nudge when something needs your attention.
        </div>
      </div>
      <button
        onClick={enableNotifications}
        style={{
          padding: '8px 16px',
          background: '#6366F1',
          border: 'none',
          borderRadius: '8px',
          color: '#fff',
          fontSize: '12px',
          fontWeight: '600',
          cursor: 'pointer',
          fontFamily: 'DM Sans, sans-serif',
          flexShrink: 0
        }}
      >
        Enable
      </button>
    </div>
  )
}