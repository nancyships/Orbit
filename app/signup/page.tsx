'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../lib/supabase/client'

export default function SignupPage() {
  const router = useRouter()
  const supabase = createClient()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSignup() {
    setLoading(true)
    setError('')

    if (!email || !password){
      setError('Please fill in both fields.')
      setLoading(false)
      return
    }

    if (password.length < 6) {
    setError('Password must be at least 6 characters.')
    setLoading(false)
    return
    }

    const {data, error } = await supabase.auth.signUp({           //supabase signup
      email,                              
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/dashboard')
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0F0F0F',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'DM Sans, sans-serif',
      padding: '20px'
    }}>
      <div style={{ width: '100%', maxWidth: '340px' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#F4F4F4',
            letterSpacing: '-1px',
            marginBottom: '4px'
          }}>
            Orbit<span style={{ color: '#6366F1' }}>.</span>
          </div>
          <div style={{ fontSize: '13px', color: '#444' }}>
            don't just save it. actually use it.
          </div>
        </div>

        {/* Form box */}
        <div style={{
          background: '#1A1A1A',
          border: '0.5px solid #2a2a2a',
          borderRadius: '14px',
          padding: '28px 24px'
        }}>
          <div style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#F4F4F4',
            marginBottom: '4px'
          }}>
            Create your account
          </div>
          <div style={{
            fontSize: '13px',
            color: '#555',
            marginBottom: '24px'
          }}>
            Start building your Orbit today.
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

          
          {/* Email input */}
          <div style={{ marginBottom: '14px' }}>
            <label style={{
              fontSize: '12px',
              color: '#666',
              display: 'block',
              marginBottom: '6px'
            }}>
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Password input */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              fontSize: '12px',
              color: '#666',
              display: 'block',
              marginBottom: '6px'
            }}>
              Password
            </label>
            <input
              type="password"
              placeholder="minimum 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Submit button */}
          <button
            onClick={handleSignup}
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
              fontFamily: 'DM Sans, sans-serif',
              transition: 'opacity 0.15s'
            }}
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>

          {/* Switch to login */}
          <div style={{
            textAlign: 'center',
            fontSize: '13px',
            color: '#555',
            marginTop: '16px'
          }}>
            Already have an account?{' '}
            <span
              onClick={() => router.push('/login')}
              style={{
                color: '#6366F1',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              Log in
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}