'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function Sidebar({
  activePage = 'dashboard'
}: {
  activePage?: string
}) {
  const router = useRouter()
  const supabase = createClient()

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div style={{
      width: '220px',
      minHeight: '100vh',
      background: '#111111',
      borderRight: '0.5px solid #1e1e1e',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 0',
      flexShrink: 0,
      fontFamily: 'DM Sans, sans-serif'
    }}>

      {/* Logo */}
      <div style={{
        padding: '0 20px 28px',
        fontSize: '20px',
        fontWeight: '700',
        color: '#F4F4F4',
        letterSpacing: '-0.5px',
        cursor: 'pointer'
      }}
        onClick={() => router.push('/dashboard')}
      >
        Orbit<span style={{ color: '#6366F1' }}>.</span>
      </div>

      {/* Nav */}
      <div style={{ flex: 1 }}>
        <NavItem
          label="Today's Orbit"
          emoji="🔄"
          active={activePage === 'dashboard'}
          onClick={() => router.push('/dashboard')}
        />
        <NavItem
          label="All Saved"
          emoji="📥"
          active={activePage === 'all-saved'}
          onClick={() => router.push('/all-saved')}
        />
        <NavItem
          label="Completed"
          emoji="✅"
          active={activePage === 'completed'}
          onClick={() => router.push('/completed')}
        />

        <div style={{
          height: '0.5px',
          background: '#1e1e1e',
          margin: '12px 20px'
        }} />

        <div style={{
          padding: '4px 20px',
          fontSize: '11px',
          color: '#444',
          textTransform: 'uppercase',
          letterSpacing: '0.6px'
        }}>
          Categories
        </div>

        <NavItem
          label="Read"
          emoji="📖"
          active={activePage === 'read'}
          onClick={() => router.push('/category/read')}
        />
        <NavItem
          label="Watch"
          emoji="▶️"
          active={activePage === 'watch'}
          onClick={() => router.push('/category/watch')}
        />
        <NavItem
          label="Do"
          emoji="✓"
          active={activePage === 'do'}
          onClick={() => router.push('/category/do')}
        />
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        style={{
          margin: '0 12px',
          padding: '10px 14px',
          background: 'transparent',
          border: '0.5px solid #1e1e1e',
          borderRadius: '8px',
          color: '#555',
          fontSize: '13px',
          cursor: 'pointer',
          fontFamily: 'DM Sans, sans-serif',
          textAlign: 'left',
          transition: 'all 0.15s'
        }}
      >
        Sign out
      </button>
    </div>
  )
}

function NavItem({
  label,
  emoji,
  active,
  onClick
}: {
  label: string
  emoji: string
  active?: boolean
  onClick: () => void
}) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '9px 20px',
        fontSize: '14px',
        cursor: 'pointer',
        color: active ? '#F4F4F4' : '#666',
        background: active ? '#1A1A1A' : 'transparent',
        borderRight: active ? '2px solid #6366F1' : '2px solid transparent',
        transition: 'all 0.15s'
      }}
    >
      <span>{emoji}</span>
      {label}
    </div>
  )
}