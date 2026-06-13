'use client'

import { useRouter } from 'next/navigation'

export default function LandingPage() {
  const router = useRouter()

  const heading = { fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 800 }
  const body = { fontFamily: 'DM Sans, sans-serif' }

  return (
    <div style={{ ...body, background: '#0A0A0A', color: '#F4F4F4' }}>

      {/* Nav */}
      <nav style={{
        padding: '20px 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '0.5px solid #1a1a1a'
      }}>
        <div style={{ ...heading, fontSize: '22px', letterSpacing: '-0.5px' }}>
          Orbit<span style={{ color: '#6366F1' }}>.</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '13px', color: '#555', cursor: 'pointer' }}
            onClick={() => router.push('/login')}>
            Log in
          </span>
          <button
            onClick={() => router.push('/signup')}
            style={{
              padding: '9px 20px',
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
            Get started free
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        padding: '88px 24px 80px',
        textAlign: 'center',
        maxWidth: '760px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '7px',
          background: '#6366F115',
          border: '0.5px solid #6366F133',
          borderRadius: '20px',
          padding: '5px 16px',
          fontSize: '12px',
          color: '#8b8ff8',
          fontWeight: '600',
          marginBottom: '28px',
          letterSpacing: '0.3px'
        }}>
          ✨ Proactive resurfacing — a new way to save
        </div>

        <h1 style={{
          ...heading,
          fontSize: '52px',
          lineHeight: '1.1',
          letterSpacing: '-2px',
          marginBottom: '22px'
        }}>
          You saved it.<br />
          <span style={{ color: '#6366F1' }}>Now actually use it.</span>
        </h1>

        <p style={{
          fontSize: '17px',
          color: '#888',
          lineHeight: '1.75',
          maxWidth: '500px',
          margin: '0 auto 40px',
          fontWeight: '400'
        }}>
          Every app makes <strong style={{ color: '#F4F4F4', fontWeight: '500' }}>saving easy.</strong> Nobody built the thing that brings it back.
          Orbit resurfaces the right saved item at the right moment — automatically.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button
            onClick={() => router.push('/signup')}
            style={{
              padding: '14px 32px',
              background: '#6366F1',
              border: 'none',
              borderRadius: '10px',
              color: '#fff',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              fontFamily: 'DM Sans, sans-serif',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            Start for free →
          </button>
          <button 
            onClick={() => {
              document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })
            }}
          style={{
            padding: '14px 24px',
            background: 'transparent',
            border: '0.5px solid #222',
            borderRadius: '10px',
            color: '#555',
            fontSize: '14px',
            cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif'
          }}>
            See how it works
          </button>
        </div>
        <p style={{ fontSize: '12px', color: '#2a2a2a', marginTop: '16px' }}>
          Free forever for core features. No credit card.
        </p>
      </section>

      {/* Stats */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '48px',
        padding: '32px 24px',
        borderTop: '0.5px solid #111',
        borderBottom: '0.5px solid #111',
        flexWrap: 'wrap'
      }}>
        {[
          { num: '200+', label: 'avg. saved links per person' },
          { num: '4%', label: 'ever get revisited' },
          { num: '0', label: 'apps that fix the return problem' }
        ].map((stat, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ ...heading, fontSize: '28px' }}>{stat.num}</div>
            <div style={{ fontSize: '12px', color: '#444', marginTop: '3px' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Problem section */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <div style={{
            fontSize: '11px',
            color: '#6366F1',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            fontWeight: '600',
            marginBottom: '14px'
          }}>
            The problem
          </div>
          <h2 style={{ ...heading, fontSize: '32px', letterSpacing: '-0.8px', marginBottom: '10px' }}>
            Sound familiar?
          </h2>
          <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.7', marginBottom: '36px' }}>
            You save with the best intentions. Then life happens. The pile grows. The guilt builds. Nothing ever gets used.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '10px'
          }}>
            {[
              {
                bg: '#0d2218', border: '#1a4a2e', iconBg: '#1a4a2e',
                icon: '💬', title: 'WhatsApp to yourself',
                desc: 'Links sent to yourself at midnight — never opened, buried under 200 other messages.',
                quote: '"I\'ll read this tomorrow."',
                color: '#4a9e6a', quoteColor: '#2a6a3a'
              },
              {
                bg: '#1a1535', border: '#2d2660', iconBg: '#2d2660',
                icon: '🔖', title: 'Browser bookmarks',
                desc: 'A folder called "Read Later" with 87 links — the oldest one is from 2021.',
                quote: '"I definitely need this someday."',
                color: '#7b77cc', quoteColor: '#4a4590'
              },
              {
                bg: '#2d1010', border: '#5a1f1f', iconBg: '#5a1f1f',
                icon: '▶️', title: 'Watch Later graveyard',
                desc: '47 YouTube videos. You\'ve watched exactly zero. New ones keep getting added.',
                quote: '"This looks really useful."',
                color: '#cc6666', quoteColor: '#8a3333'
              },
              {
                bg: '#1a1a0d', border: '#3a3a15', iconBg: '#3a3a15',
                icon: '📝', title: 'Notes from inspiration',
                desc: 'Written at 11pm when you were fired up. Never opened again. That idea is gone.',
                quote: '"I had such a good idea that day."',
                color: '#9e9e4a', quoteColor: '#5e5e2a'
              }
            ].map((card, i) => (
              <div key={i} style={{
                background: card.bg,
                border: `0.5px solid ${card.border}`,
                borderRadius: '14px',
                padding: '18px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '9px',
                  background: card.iconBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '17px'
                }}>
                  {card.icon}
                </div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#F4F4F4' }}>
                  {card.title}
                </div>
                <div style={{ fontSize: '12px', lineHeight: '1.6', color: card.color }}>
                  {card.desc}
                </div>
                <div style={{ fontSize: '13px', fontStyle: 'italic', color: card.quoteColor }}>
                  {card.quote}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '80px 24px', background: '#0d0d0d', borderTop: '0.5px solid #111' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <div style={{
            fontSize: '11px', color: '#6366F1', textTransform: 'uppercase',
            letterSpacing: '1px', fontWeight: '600', marginBottom: '14px'
          }}>
            What Orbit does
          </div>
          <h2 style={{ ...heading, fontSize: '32px', letterSpacing: '-0.8px', marginBottom: '10px' }}>
            Built to bring things back
          </h2>
          <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.7', marginBottom: '36px' }}>
            Every other app solves the saving problem. Orbit solves the returning problem.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[
              { iconBg: '#6366F115', iconColor: '#6366F1', icon: '⚡', title: 'Save in 5 seconds',
                desc: 'Paste a URL or type a note. Auto-detects the title. No folders, no friction, no decisions.',
                tagBg: '#6366F115', tagColor: '#8b8ff8', tag: 'Read · Watch · Do' },
              { iconBg: '#22C55E15', iconColor: '#22C55E', icon: '🔄', title: 'Daily resurfacing feed',
                desc: 'Every day Orbit picks 5 items and puts them in your feed. No searching. No scrolling through graveyards.',
                tagBg: '#22C55E15', tagColor: '#22C55E', tag: '5 items · every day' },
              { iconBg: '#f9731615', iconColor: '#f97316', icon: '🔔', title: 'Smart notifications',
                desc: 'Orbit reaches out when something needs your attention — with copy that actually makes you want to open it.',
                tagBg: '#f9731615', tagColor: '#f97316', tag: '1 per day · never spam' },
              { iconBg: '#6366F115', iconColor: '#6366F1', icon: '🪐', title: 'Your orbit forms',
                desc: 'Watch your planet grow as you clear items. Progress is cumulative — no daily pressure, no streaks to break.',
                tagBg: '#6366F115', tagColor: '#8b8ff8', tag: 'Total cleared · this week' }
            ].map((feat, i) => (
              <div key={i} style={{
                background: '#111',
                border: '0.5px solid #1a1a1a',
                borderRadius: '14px',
                padding: '22px'
              }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '12px',
                  background: feat.iconBg, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', marginBottom: '16px', fontSize: '20px'
                }}>
                  {feat.icon}
                </div>
                <div style={{ fontSize: '15px', fontWeight: '600', color: '#F4F4F4', marginBottom: '7px' }}>
                  {feat.title}
                </div>
                <div style={{ fontSize: '13px', color: '#555', lineHeight: '1.65' }}>
                  {feat.desc}
                </div>
                <span style={{
                  display: 'inline-block', fontSize: '10px', fontWeight: '600',
                  padding: '2px 9px', borderRadius: '20px', marginTop: '12px',
                  letterSpacing: '0.3px', background: feat.tagBg, color: feat.tagColor
                }}>
                  {feat.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" style={{ padding: '80px 24px', borderTop: '0.5px solid #111' }}>
        <div style={{ maxWidth: '580px', margin: '0 auto' }}>
          <div style={{
            fontSize: '11px', color: '#6366F1', textTransform: 'uppercase',
            letterSpacing: '1px', fontWeight: '600', marginBottom: '14px'
          }}>
            How it works
          </div>
          <h2 style={{ ...heading, fontSize: '32px', letterSpacing: '-0.8px', marginBottom: '10px' }}>
            Three steps. That's it.
          </h2>

          <div style={{ marginTop: '40px' }}>
            {[
  { num: '1', bg: '#6366F122', color: '#6366F1', border: '#6366F133',
    title: 'Save anything in seconds',
    desc: "Paste a link or type a note. Pick Read, Watch, or Do. Orbit fetches the title automatically. You're done in under 5 seconds." },
  { num: '2', bg: '#22C55E22', color: '#22C55E', border: '#22C55E33',
    title: 'Orbit brings it back',
    desc: 'Every day Orbit surfaces 5 items — the oldest ones, urgent tasks, and things you snoozed. You didn\'t have to remember.' },
  { num: '3', bg: '#f9731622', color: '#f97316', border: '#f9731633',
    title: 'Act, snooze, or dismiss',
    desc: 'Read it and mark done. Not ready? Snooze it. No longer relevant? Dismiss guilt-free. Your orbit clears and your planet grows.' }
].map((step, i) => (
  <div key={i} style={{
    display: 'flex',
    gap: '20px',
    paddingBottom: i < 2 ? '36px' : '0px',
    position: 'relative'
  }}>
    {i < 2 && (
      <div style={{
        position: 'absolute',
        left: '19px',
        top: '46px',
        height: '36px',
        width: '0.5px',
        background: '#1a1a1a'
      }} />
    )}
    <div style={{
      width: '40px', height: '40px', borderRadius: '50%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '16px', fontWeight: '800',
      flexShrink: 0, background: step.bg, color: step.color,
      border: `0.5px solid ${step.border}`
    }}>
      {step.num}
    </div>
    <div style={{ paddingTop: '8px' }}>
      <div style={{ fontSize: '16px', fontWeight: '600', color: '#F4F4F4', marginBottom: '6px' }}>
        {step.title}
      </div>
      <div style={{ fontSize: '13px', color: '#555', lineHeight: '1.65' }}>
        {step.desc}
      </div>
    </div>
  </div>
))}
            
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: '80px 24px',
        textAlign: 'center',
        borderTop: '0.5px solid #111',
        background: '#0d0d0d'
      }}>
        <div style={{ maxWidth: '520px', margin: '0 auto' }}>
          <h2 style={{ ...heading, fontSize: '38px', letterSpacing: '-1px', marginBottom: '14px', lineHeight: '1.15' }}>
            Stop saving things<br />to <span style={{ color: '#6366F1' }}>forget them.</span>
          </h2>
          <p style={{ fontSize: '15px', color: '#555', marginBottom: '32px', lineHeight: '1.7' }}>
            Join Orbit and start actually using the things you save with intention. Free to start. No credit card needed.
          </p>
          <button
            onClick={() => router.push('/signup')}
            style={{
              padding: '15px 40px',
              background: '#6366F1',
              border: 'none',
              borderRadius: '10px',
              color: '#fff',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              fontFamily: 'DM Sans, sans-serif'
            }}
          >
            Create your Orbit
          </button>
          <p style={{ fontSize: '12px', color: '#333', marginTop: '12px' }}>
            Free forever for core features.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '24px 48px',
        borderTop: '0.5px solid #111',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '8px'
      }}>
        <div style={{ ...heading, fontSize: '16px', color: '#222' }}>
          Orbit<span style={{ color: '#333' }}>.</span>
        </div>
        <div style={{ fontSize: '12px', color: '#2a2a2a' }}>
          Built with intention. For people who save with intention.
        </div>
      </footer>
    </div>
  )
}