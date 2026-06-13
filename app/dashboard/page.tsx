'use client'

import { useState, useEffect } from 'react'
import Sidebar from '@/components/sidebar'
import SaveModal from '@/components/savemodal'
import ItemCard from '@/components/ItemCard'
import OrbitProgress from '@/components/OrbitProgress'

type Item = {
  id: string
  title: string
  url: string | null
  note: string | null
  category: string
  createdAt: string
}

// Resurfacing logic — picks 5 items intelligently
function getTodaysOrbit(items: Item[]): Item[] {
  const now = new Date()

  // Rule 1 — DO items older than 3 days first
  const doItems = items
    .filter(item => {
      const days = Math.floor(
        (now.getTime() - new Date(item.createdAt).getTime())
        / (1000 * 60 * 60 * 24)
      )
      return item.category === 'DO' && days >= 3
    })
    .sort((a, b) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    )

  // Rule 2 — Oldest READ and WATCH items
  const readWatch = items
    .filter(item => item.category === 'READ' || item.category === 'WATCH')
    .sort((a, b) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    )

  // Rule 3 — Recent DO items not yet 3 days old
  const recentDo = items
    .filter(item => {
      const days = Math.floor(
        (now.getTime() - new Date(item.createdAt).getTime())
        / (1000 * 60 * 60 * 24)
      )
      return item.category === 'DO' && days < 3
    })

  // Combine and deduplicate — max 5
  const combined = [...doItems, ...readWatch, ...recentDo]
  const unique = combined.filter(
    (item, index, self) =>
      index === self.findIndex(t => t.id === item.id)
  )
  return unique.slice(0, 5)
}

export default function DashboardPage() {
  const [showModal, setShowModal] = useState(false)
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [streak, setStreak] = useState(0)
  const [actedToday, setActedToday] = useState(false)
  const [totalCleared, setTotalCleared] = useState(0)
  const [clearedThisWeek, setClearedThisWeek] = useState(0)

async function fetchItems() {
  const res = await fetch('/api/items')
  const data = await res.json()
  if (data.items) setItems(data.items)
  if (data.totalCleared !== undefined) setTotalCleared(data.totalCleared)
  if (data.clearedThisWeek !== undefined) setClearedThisWeek(data.clearedThisWeek)
  setLoading(false)
}

  useEffect(() => {
    fetchItems()
    fetchStreak()
  }, [])

  async function fetchStreak() {
    const res = await fetch('/api/streak')
    const data = await res.json()
    if (data.streak) {
      setStreak(data.streak.currentStreak)
      // Check if already acted today
      const lastActive = new Date(data.streak.lastActiveAt)
      const today = new Date()
      lastActive.setHours(0, 0, 0, 0)
      today.setHours(0, 0, 0, 0)
      if (lastActive.getTime() === today.getTime()) {
        setActedToday(true)
      }
    }
  }

async function handleDone(id: string) {
  await fetch(`/api/items/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: 'COMPLETED' })
  })
  setItems(prev => prev.filter(item => item.id !== id))
  setTotalCleared(prev => prev + 1)
  setClearedThisWeek(prev => prev + 1)

  if (!actedToday) {
    const res = await fetch('/api/streak', { method: 'POST' })
    const data = await res.json()
    if (data.streak) {
      setStreak(data.streak.currentStreak)
      setActedToday(true)
    }
  }
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

  const todaysOrbit = getTodaysOrbit(items)

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: '#0F0F0F',
      fontFamily: 'DM Sans, sans-serif'
    }}>
      <Sidebar />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>

        {/* Top bar */}
        <div style={{
          padding: '16px 24px',
          borderBottom: '0.5px solid #1e1e1e',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#F4F4F4'
            }}>
              Today's Orbit
            </div>
            <div style={{
              fontSize: '13px',
              color: '#444',
              marginTop: '2px'
            }}>
              {items.length === 0
                ? 'Nothing saved yet.'
                : `${todaysOrbit.length} thing${todaysOrbit.length !== 1 ? 's' : ''} resurfaced for you today`
              }
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            style={{
              padding: '9px 16px',
              background: '#6366F1',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              fontFamily: 'DM Sans, sans-serif'
            }}
          >
            + Save something
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: '24px' }}>

          {/* Streak bar */}
          <OrbitProgress
            totalCleared={totalCleared}
            totalSaved={items.length}
            clearedThisWeek={clearedThisWeek}
          />
          
          {loading ? (
            <div style={{
              textAlign: 'center',
              color: '#444',
              marginTop: '60px',
              fontSize: '14px'
            }}>
              Loading your Orbit...
            </div>
          ) : items.length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: '80px' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>🪐</div>
              <div style={{
                fontSize: '15px',
                fontWeight: '500',
                color: '#F4F4F4',
                marginBottom: '6px'
              }}>
                Your Orbit is empty
              </div>
              <div style={{
                fontSize: '13px',
                color: '#444',
                maxWidth: '260px',
                margin: '0 auto',
                lineHeight: '1.6'
              }}>
                Save a link, article, or note and Orbit will bring it back to you at the right moment.
              </div>
            </div>
          ) : (
            <div style={{ maxWidth: '680px' }}>
              {todaysOrbit.map(item => (
                <ItemCard
                  key={item.id}
                  item={item}
                  onDone={handleDone}
                  onDismiss={handleDismiss}
                  onSnooze={handleSnooze}
                />
              ))}

              {items.length > 5 && (
                <div style={{
                  fontSize: '12px',
                  color: '#444',
                  textAlign: 'center',
                  marginTop: '16px',
                  padding: '12px',
                  border: '0.5px solid #1e1e1e',
                  borderRadius: '10px'
                }}>
                  {items.length - todaysOrbit.length} more items saved —
                  Orbit will surface them over the coming days.
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <SaveModal
          onClose={() => setShowModal(false)}
          onSaved={(newItem: Item) =>
            setItems(prev => [...prev, newItem])
          }
        />
      )}
    </div>
  )
}