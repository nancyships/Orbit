'use client'

import { useState, useEffect } from 'react'
import Sidebar from '@/components/sidebar'
import ItemCard from '@/components/ItemCard'

type Item = {
  id: string
  title: string
  url: string | null
  note: string | null
  category: string
  createdAt: string
}

export default function AllSavedPage() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchItems() {
      const res = await fetch('/api/items')
      const data = await res.json()
      if (data.items) setItems(data.items)
      setLoading(false)
    }
    fetchItems()
  }, [])

  async function handleDone(id: string) {
    await fetch(`/api/items/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'COMPLETED' })
    })
    setItems(prev => prev.filter(item => item.id !== id))
  }

  async function handleDismiss(id: string) {
    await fetch(`/api/items/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'DISMISSED' })
    })
    setItems(prev => prev.filter(item => item.id !== id))
  }

  async function handleSnooze(id: string, days: number) {
    const snoozeDate = new Date()
    snoozeDate.setDate(snoozeDate.getDate() + days)
    snoozeDate.setHours(9, 0, 0, 0)
    await fetch(`/api/items/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: 'SNOOZED',
        snoozedUntil: snoozeDate.toISOString()
      })
    })
    setItems(prev => prev.filter(item => item.id !== id))
  }

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: '#0F0F0F',
      fontFamily: 'DM Sans, sans-serif'
    }}>
      <Sidebar activePage="all-saved" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{
          padding: '16px 24px',
          borderBottom: '0.5px solid #1e1e1e'
        }}>
          <div style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#F4F4F4'
          }}>
            All Saved
          </div>
          <div style={{ fontSize: '13px', color: '#444', marginTop: '2px' }}>
            {items.length} active item{items.length !== 1 ? 's' : ''}
          </div>
        </div>
        <div style={{ flex: 1, padding: '24px' }}>
          {loading ? (
            <div style={{ color: '#444', fontSize: '14px' }}>Loading...</div>
          ) : items.length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: '80px' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>📭</div>
              <div style={{ fontSize: '14px', color: '#444' }}>
                Nothing saved yet.
              </div>
            </div>
          ) : (
            <div style={{ maxWidth: '680px' }}>
              {items.map(item => (
                <ItemCard
                  key={item.id}
                  item={item}
                  onDone={handleDone}
                  onDismiss={handleDismiss}
                  onSnooze={handleSnooze}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}