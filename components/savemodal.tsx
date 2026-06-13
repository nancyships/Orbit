'use client'

import { useState, useRef } from 'react'

type Category = 'READ' | 'WATCH' | 'DO'

type Item = {
  id: string
  title: string
  url: string | null
  note: string | null
  category: string
  createdAt: string
}

export default function SaveModal({
  onClose,
  onSaved
}: {
  onClose: () => void
  onSaved: (item: Item) => void
}) {
  const [input, setInput] = useState('')
  const [category, setCategory] = useState<Category>('READ')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [fetchingTitle, setFetchingTitle] = useState(false)
  const [title, setTitle] = useState('')
  const titleRef = useRef<HTMLInputElement>(null)

  function isUrl(text: string) {
    return text.startsWith('http://') || text.startsWith('https://')
  }

  async function fetchTitle(url: string) {
    if (!url.startsWith('http')) return
    setFetchingTitle(true)
    try {
      const res = await fetch('/api/fetch-title', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      })
      const data = await res.json()
      if (data.title) setTitle(data.title)
    } catch {
      // silently fail
    }
    setFetchingTitle(false)
  }

  async function handleSave() {
    if (!input.trim()) {
      setError('Please enter a link or note.')
      return
    }

    setLoading(true)
    setError('')

    const finalTitle = titleRef.current?.value?.trim() || title.trim() || input.trim()

    const body = isUrl(input)
    ? { url: input, title: finalTitle, category }
    : { note: input, title: input, category }


    const res = await fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })

    if (!res.ok) {
      setError('Something went wrong. Try again.')
      setLoading(false)
      return
    }

    const data = await res.json()
    setLoading(false)
    onSaved(data.item)
    onClose()
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.6)',
          zIndex: 40
        }}
      />

      {/* Modal */}
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        maxWidth: '400px',
        background: '#1A1A1A',
        border: '0.5px solid #2a2a2a',
        borderRadius: '14px',
        padding: '24px',
        zIndex: 50,
        fontFamily: 'DM Sans, sans-serif'
      }}>

        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <div style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#F4F4F4'
          }}>
            Save to Orbit
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#555',
              fontSize: '18px',
              cursor: 'pointer',
              padding: '0 4px'
            }}
          >
            ✕
          </button>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: '#2d1a1a',
            border: '0.5px solid #ef444433',
            borderRadius: '8px',
            padding: '10px 13px',
            fontSize: '12px',
            color: '#ef4444',
            marginBottom: '14px'
          }}>
            {error}
          </div>
        )}

        {/* Input */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{
            fontSize: '12px',
            color: '#666',
            display: 'block',
            marginBottom: '6px'
          }}>
            Link or note
          </label>
          <textarea
            placeholder="Paste a URL or type anything..."
            value={input}
              onChange={(e) => {
                const val = e.target.value
                setInput(val)
                setTitle('')
                // Auto fetch title when a full URL is pasted
                if (val.startsWith('http') && val.length > 10) {
                  fetchTitle(val)
                }
              }}
              rows={3}
            style={{
              width: '100%',
              background: '#0F0F0F',
              border: '0.5px solid #2a2a2a',
              borderRadius: '8px',
              padding: '11px 14px',
              fontSize: '14px',
              color: '#F4F4F4',
              fontFamily: 'DM Sans, sans-serif',
              outline: 'none',
              resize: 'none',
              boxSizing: 'border-box'
            }}
          />
          {/* Title field — shows after URL is pasted */}
          {(isUrl(input)) && (
            <div style={{ marginBottom: '16px' }}>
              <label style={{
                fontSize: '12px',
                color: '#666',
                display: 'block',
                marginBottom: '6px'
              }}>
                Title
              </label>
              <input
                ref={titleRef}
                type="text"
                placeholder={fetchingTitle ? 'Fetching title...' : 'Add a title'}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{
                  width: '100%',
                  background: '#0F0F0F',
                  border: '0.5px solid #2a2a2a',
                  borderRadius: '8px',
                  padding: '11px 14px',
                  fontSize: '14px',
                  color: fetchingTitle ? '#444' : '#F4F4F4',
                  fontFamily: 'DM Sans, sans-serif',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          )}
        </div>

        {/* Category */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            fontSize: '12px',
            color: '#666',
            display: 'block',
            marginBottom: '8px'
          }}>
            Category
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            {(['READ', 'WATCH', 'DO'] as Category[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                style={{
                  flex: 1,
                  padding: '8px',
                  border: category === cat
                    ? '1.5px solid #6366F1'
                    : '0.5px solid #2a2a2a',
                  borderRadius: '8px',
                  background: category === cat ? '#6366F133' : 'transparent',
                  color: category === cat ? '#6366F1' : '#555',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontFamily: 'DM Sans, sans-serif',
                  transition: 'all 0.15s'
                }}
              >
                {cat === 'READ' ? '📖 Read' : cat === 'WATCH' ? '▶️ Watch' : '✓ Do'}
              </button>
            ))}
          </div>
        </div>

        {/* Save button */}
        <button
          onClick={handleSave}
          disabled={loading}
          style={{
            width: '100%',
            background: loading ? '#4a4a8a' : '#6366F1',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '12px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontFamily: 'DM Sans, sans-serif'
          }}
        >
          {loading ? 'Saving...' : 'Save to Orbit'}
        </button>

      </div>
    </>
  )
}