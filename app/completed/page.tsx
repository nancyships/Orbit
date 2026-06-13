'use client'

import { useState, useEffect } from 'react'
import Sidebar from '@/components/sidebar'

type Item = {
  id: string
  title: string
  url: string | null
  note: string | null
  category: string
  createdAt: string
  updatedAt: string
}

export default function CompletedPage() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCompleted() {
      const res = await fetch('/api/items/completed')
      const data = await res.json()
      if (data.items) setItems(data.items)
      setLoading(false)
    }
    fetchCompleted()
  }, [])

  function getDaysAgo(dateString: string) {
    const date = new Date(dateString)
    const now = new Date()
    const diff = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    )
    if (diff === 0) return 'today'
    if (diff === 1) return '1 day ago'
    return `${diff} days ago`
  }

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: '#0F0F0F',
      fontFamily: 'DM Sans, sans-serif'
    }}>
      <Sidebar activePage="completed" />
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
            Completed
          </div>
          <div style={{ fontSize: '13px', color: '#444', marginTop: '2px' }}>
            {items.length} item{items.length !== 1 ? 's' : ''} completed
          </div>
        </div>
        <div style={{ flex: 1, padding: '24px' }}>
          {loading ? (
            <div style={{ color: '#444', fontSize: '14px' }}>Loading...</div>
          ) : items.length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: '80px' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>✨</div>
              <div style={{ fontSize: '14px', color: '#444' }}>
                Nothing completed yet. Start acting on your saved items.
              </div>
            </div>
          ) : (
            <div style={{ maxWidth: '680px' }}>
              {items.map(item => (
                <div key={item.id} style={{
                  border: '0.5px solid #1e1e1e',
                  borderRadius: '12px',
                  padding: '13px 16px',
                  marginBottom: '8px',
                  background: '#111',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  opacity: 0.7
                }}>
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: '#1a2e1a',
                    border: '0.5px solid #22C55E44',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#22C55E',
                    fontSize: '13px',
                    flexShrink: 0
                  }}>
                    ✓
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: '13px',
                      fontWeight: '500',
                      color: '#666',
                      textDecoration: 'line-through',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {item.title}
                    </div>
                    <div style={{
                      fontSize: '11px',
                      color: '#333',
                      marginTop: '2px'
                    }}>
                      Completed {getDaysAgo(item.updatedAt)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}