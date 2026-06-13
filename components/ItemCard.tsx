'use client'

import { useState } from 'react'

type Item = {
  id: string
  title: string
  url: string | null
  note: string | null
  category: string
  createdAt: string
}

const SNOOZE_OPTIONS = [
  { label: 'Tomorrow', days: 1 },
  { label: 'In 3 days', days: 3 },
  { label: 'Next week', days: 7 },
  { label: 'In 2 weeks', days: 14 },
]

export default function ItemCard({
  item,
  onDone,
  onDismiss,
  onSnooze
}: {
  item: Item
  onDone: (id: string) => void
  onDismiss: (id: string) => void
  onSnooze: (id: string, days: number) => void
}) {
  const [showSnooze, setShowSnooze] = useState(false)

  function getCategoryColor(category: string) {
    if (category === 'READ') return { bg: '#1a2035', color: '#6366F1' }
    if (category === 'WATCH') return { bg: '#2d1a1a', color: '#f97316' }
    if (category === 'DO') return { bg: '#1a2e1a', color: '#22C55E' }
    return { bg: '#1a1a1a', color: '#666' }
  }

  function getCategoryEmoji(category: string) {
    if (category === 'READ') return '📖'
    if (category === 'WATCH') return '▶️'
    if (category === 'DO') return '✓'
    return '•'
  }

  function getDaysAgo(dateString: string) {
    const saved = new Date(dateString)
    const now = new Date()
    const diff = Math.floor(
      (now.getTime() - saved.getTime()) / (1000 * 60 * 60 * 24)
    )
    if (diff === 0) return 'saved today'
    if (diff === 1) return '1 day ago'
    return `${diff} days ago`
  }

  const colors = getCategoryColor(item.category)

  return (
    <div style={{ position: 'relative', marginBottom: '8px' }}>
      <div style={{
        border: '0.5px solid #1e1e1e',
        borderRadius: '12px',
        padding: '14px 16px',
        background: '#111',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        transition: 'border-color 0.15s'
      }}>

        {/* Category icon */}
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '9px',
          background: colors.bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px',
          flexShrink: 0
        }}>
          {getCategoryEmoji(item.category)}
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: '13px',
            fontWeight: '500',
            color: '#F4F4F4',
            marginBottom: '3px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {item.title}
          </div>
          <div style={{
            fontSize: '11px',
            color: '#444',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{
              background: colors.bg,
              color: colors.color,
              padding: '1px 7px',
              borderRadius: '20px',
              fontSize: '10px',
              fontWeight: '600'
            }}>
              {item.category}
            </span>
            <span>
              {item.url
                ? (() => {
                    try { return new URL(item.url).hostname }
                    catch { return item.url }
                  })()
                : 'Note'
              }
            </span>
            <span>·</span>
            <span>{getDaysAgo(item.createdAt)}</span>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>

          {/* Done */}
          <button
            onClick={() => onDone(item.id)}
            title="Mark done"
            style={{
              width: '30px',
              height: '30px',
              border: '0.5px solid #1e1e1e',
              borderRadius: '8px',
              background: 'transparent',
              color: '#555',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.15s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#1a2e1a'
              e.currentTarget.style.color = '#22C55E'
              e.currentTarget.style.borderColor = '#22C55E44'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#555'
              e.currentTarget.style.borderColor = '#1e1e1e'
            }}
          >
            ✓
          </button>

          {/* Snooze */}
          <button
            onClick={() => setShowSnooze(!showSnooze)}
            title="Snooze"
            style={{
              width: '30px',
              height: '30px',
              border: showSnooze
                ? '0.5px solid #f9731644'
                : '0.5px solid #1e1e1e',
              borderRadius: '8px',
              background: showSnooze ? '#2d2a1a' : 'transparent',
              color: showSnooze ? '#f97316' : '#555',
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.15s'
            }}
            onMouseEnter={e => {
              if (!showSnooze) {
                e.currentTarget.style.background = '#2d2a1a'
                e.currentTarget.style.color = '#f97316'
                e.currentTarget.style.borderColor = '#f9731644'
              }
            }}
            onMouseLeave={e => {
              if (!showSnooze) {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = '#555'
                e.currentTarget.style.borderColor = '#1e1e1e'
              }
            }}
          >
            ⏰
          </button>

          {/* Dismiss */}
          <button
            onClick={() => onDismiss(item.id)}
            title="Dismiss forever"
            style={{
              width: '30px',
              height: '30px',
              border: '0.5px solid #1e1e1e',
              borderRadius: '8px',
              background: 'transparent',
              color: '#555',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.15s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#2d1a1a'
              e.currentTarget.style.color = '#ef4444'
              e.currentTarget.style.borderColor = '#ef444444'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#555'
              e.currentTarget.style.borderColor = '#1e1e1e'
            }}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Snooze dropdown */}
      {showSnooze && (
        <div style={{
          position: 'absolute',
          right: 0,
          top: '52px',
          background: '#1A1A1A',
          border: '0.5px solid #2a2a2a',
          borderRadius: '10px',
          padding: '6px',
          zIndex: 20,
          minWidth: '160px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)'
        }}>
          <div style={{
            fontSize: '10px',
            color: '#444',
            textTransform: 'uppercase',
            letterSpacing: '0.6px',
            padding: '4px 10px 6px',
          }}>
            Snooze until
          </div>
          {SNOOZE_OPTIONS.map(option => (
            <button
              key={option.days}
              onClick={() => {
                onSnooze(item.id, option.days)
                setShowSnooze(false)
              }}
              style={{
                width: '100%',
                padding: '8px 10px',
                background: 'transparent',
                border: 'none',
                borderRadius: '7px',
                color: '#aaa',
                fontSize: '13px',
                cursor: 'pointer',
                textAlign: 'left',
                fontFamily: 'DM Sans, sans-serif',
                transition: 'all 0.12s',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#2d2a1a'
                e.currentTarget.style.color = '#f97316'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = '#aaa'
              }}
            >
              <span>{option.label}</span>
              <span style={{ fontSize: '11px', color: '#444' }}>
                {option.days === 1 ? 'tomorrow' :
                 option.days === 7 ? 'in 7 days' :
                 `in ${option.days} days`}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}