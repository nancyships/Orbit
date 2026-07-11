'use client'

import { useRouter, usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useIsMobile } from '@/lib/useIsMobile'

export default function Sidebar({
  activePage = 'dashboard'
}: {
  activePage?: string
}) {
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClient()
  const isMobile = useIsMobile()

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const navItems = [
    { label: "Today's Orbit", emoji: '🔄', page: 'dashboard', path: '/dashboard' },
    { label: 'All Saved', emoji: '📥', page: 'all-saved', path: '/all-saved' },
    { label: 'Completed', emoji: '✅', page: 'completed', path: '/completed' },
  ]

  const categoryItems = [
    { label: 'Read', emoji: '📖', page: 'read', path: '/category/read' },
    { label: 'Watch', emoji: '▶️', page: 'watch', path: '/category/watch' },
    { label: 'Do', emoji: '✓', page: 'do', path: '/category/do' },
  ]

  // Mobile bottom tab bar
  if (isMobile) {
    return (
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#111',
        borderTop: '0.5px solid #1e1e1e',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '8px 0 20px',
        zIndex: 50,
        fontFamily: 'DM Sans, sans-serif'
      }}>
        {[...navItems, { label: 'Sign out', emoji: '↪', page: 'logout', path: '' }].map((item, i) => {
          const isActive = activePage === item.page
          if (item.page === 'logout') {
            return (
              <button
                key={i}
                onClick={handleLogout}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  gap: '3px', background: 'transparent', border: 'none',
                  cursor: 'pointer', padding: '4px 8px'
                }}
              >
                <span style={{ fontSize: '20px' }}>{item.emoji}</span>
                <span style={{ fontSize: '10px', color: '#444' }}>{item.label}</span>
              </button>
            )
          }
          return (
            <button
              key={i}
              onClick={() => router.push(item.path)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: '3px', background: 'transparent', border: 'none',
                cursor: 'pointer', padding: '4px 8px'
              }}
            >
              <span style={{ fontSize: '20px' }}>{item.emoji}</span>
              <span style={{ fontSize: '10px', color: isActive ? '#6366F1' : '#444', fontWeight: isActive ? '600' : '400' }}>
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    )
  }

  // Desktop sidebar — unchanged
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
      <div
        style={{ padding: '0 20px 28px', fontSize: '20px', fontWeight: '700', color: '#F4F4F4', letterSpacing: '-0.5px', cursor: 'pointer', fontFamily: 'Bricolage Grotesque, sans-serif' }}
        onClick={() => router.push('/dashboard')}
      >
        Orbit<span style={{ color: '#6366F1' }}>.</span>
      </div>

      <div style={{ flex: 1 }}>
        {navItems.map((item, i) => (
          <NavItem
            key={i}
            label={item.label}
            emoji={item.emoji}
            active={activePage === item.page}
            onClick={() => router.push(item.path)}
          />
        ))}

        <div style={{ height: '0.5px', background: '#1e1e1e', margin: '12px 20px' }} />

        <div style={{ padding: '4px 20px', fontSize: '11px', color: '#444', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
          Categories
        </div>

        {categoryItems.map((item, i) => (
          <NavItem
            key={i}
            label={item.label}
            emoji={item.emoji}
            active={activePage === item.page}
            onClick={() => router.push(item.path)}
          />
        ))}
      </div>

      <button
        onClick={handleLogout}
        style={{
          margin: '0 12px', padding: '10px 14px', background: 'transparent',
          border: '0.5px solid #1e1e1e', borderRadius: '8px', color: '#555',
          fontSize: '13px', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
          textAlign: 'left'
        }}
      >
        Sign out
      </button>
    </div>
  )
}

function NavItem({ label, emoji, active, onClick }: { label: string; emoji: string; active?: boolean; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        padding: '9px 20px', fontSize: '14px', cursor: 'pointer',
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