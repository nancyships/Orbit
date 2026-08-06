'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

export default function LandingPage() {
  const router = useRouter()
  const typingRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@700,800&f[]=general-sans@400,500&display=swap'


    document.head.appendChild(link)
  }, [])

  const h = { fontFamily: '"Cabinet Grotesk", sans-serif' }
  const b = { fontFamily:  '"General Sans", sans-serif'}

  useEffect(() => {
    const phrases = [
      'die in silence.',
      'get forgotten.',
      'collect dust.',
      'go to waste.',
      'stay buried.'
    ]
    let pi = 0, ci = 0, del = false
    let t: NodeJS.Timeout

    function type() {
      const el = typingRef.current
      if (!el) return
      const cur = phrases[pi]
      if (!del) {
        ci++
        el.innerHTML = cur.slice(0, ci) + '<span style="display:inline-block;width:2px;height:0.85em;background:#5B5FED;margin-left:2px;vertical-align:middle"></span>'
        if (ci === cur.length) { del = true; t = setTimeout(type, 2000); return }
      } else {
        ci--
        el.innerHTML = cur.slice(0, ci) + '<span style="display:inline-block;width:2px;height:0.85em;background:#5B5FED;margin-left:2px;vertical-align:middle"></span>'
        if (ci === 0) { del = false; pi = (pi + 1) % phrases.length }
      }
      t = setTimeout(type, del ? 30 : 60)
    }
    setTimeout(type, 800)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).style.opacity = '1';
          (e.target as HTMLElement).style.transform = 'translateY(0)'
        }
      })
    }, { threshold: 0.08 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting && ctaRef.current) {
          ctaRef.current.querySelectorAll('.ring').forEach((r: any) => {
            r.style.animationPlayState = 'running'
          })
        }
      })
    }, { threshold: 0.2 })
    if (ctaRef.current) obs.observe(ctaRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div style={{ ...b, background: '#0C0C0C', color: '#F0EDE8', overflowX: 'hidden' }}>
      <style>{`
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes spin1{from{transform:translate(-50%,-50%) rotate(0deg)}to{transform:translate(-50%,-50%) rotate(360deg)}}
        @keyframes spin2{from{transform:translate(-50%,-50%) rotate(0deg)}to{transform:translate(-50%,-50%) rotate(-360deg)}}
        @keyframes spin3{from{transform:translate(-50%,-50%) rotate(0deg)}to{transform:translate(-50%,-50%) rotate(360deg)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        .ring{animation-play-state:paused}
        .reveal{opacity:0;transform:translateY(20px);transition:opacity 0.65s ease,transform 0.65s ease}
        @media(max-width:768px){
          .hero-h1{font-size:44px !important;letter-spacing:-2px !important}
          .hero-typing{font-size:44px !important}
          .hero-sub{font-size:16px !important}
          .two-col{grid-template-columns:1fr !important}
          .nav-pad{padding:16px 20px !important}
          .section-pad{padding:64px 20px !important}
          .hero-pad{padding:80px 20px 64px !important}
        }
      `}</style>

      {/* Nav */}
      <nav className="nav-pad" style={{
        padding: '22px 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '0.5px solid #1C1C1C'
      }}>
        <div style={{ ...h, fontSize: '20px', fontWeight: 700, letterSpacing: '-0.5px', color: '#F0EDE8' }}>
          Orbit<span style={{ color: '#5B5FED' }}>.</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span onClick={() => router.push('/login')} style={{ ...b, fontSize: '14px', color: '#666', cursor: 'pointer' }}>
            Log in
          </span>
          <button onClick={() => router.push('/signup')} style={{
            ...b, padding: '9px 22px', background: '#5B5FED', border: 'none',
            borderRadius: '6px', color: '#fff', fontSize: '14px',
            fontWeight: '600', cursor: 'pointer'
          }}>
            Get started
          </button>
        </div>
      </nav>

      {/* Hero — left aligned */}
      <section className="hero-pad" style={{
        padding: '100px 48px 80px',
        maxWidth: '1100px',
        margin: '0 auto',
        position: 'relative'
      }}>
        <div style={{
          display: 'inline-block',
          fontSize: '12px',
          color: '#5B5FED',
          fontWeight: '600',
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          marginBottom: '28px',
          ...b
        }}>
          Proactive resurfacing
        </div>

        <h1 className="hero-h1" style={{
          ...h,
          fontSize: '72px',
          fontWeight: 700,
          lineHeight: '1.02',
          letterSpacing: '-3px',
          marginBottom: '16px',
          maxWidth: '760px',
          color: '#F0EDE8'
        }}>
          Your saved things<br />
          don't have to{' '}
          <span style={{ color: '#5B5FED', fontStyle: 'italic' }}>
            <span ref={typingRef} className="hero-typing" style={{ fontSize: '72px' }} />
          </span>
        </h1>

        <p className="hero-sub" style={{
          ...b,
          fontSize: '18px',
          color: '#888',
          lineHeight: '1.75',
          maxWidth: '480px',
          marginBottom: '44px'
        }}>
          Orbit is the only app that resurfaces what you saved —
          automatically, daily, without you having to remember.
        </p>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button onClick={() => router.push('/signup')} style={{
            ...b, padding: '14px 32px', background: '#5B5FED', border: 'none',
            borderRadius: '6px', color: '#fff', fontSize: '15px',
            fontWeight: '600', cursor: 'pointer'
          }}>
            Start for free
          </button>
          <span onClick={() => document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ ...b, fontSize: '14px', color: '#555', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
            See how it works
          </span>
        </div>

        <p style={{ ...b, fontSize: '12px', color: '#333', marginTop: '16px' }}>
          Free forever for core features.
        </p>

        {/* Floating stat — right side, desktop only */}
        <div style={{
          position: 'absolute', right: '48px', top: '120px',
          background: '#141414', border: '0.5px solid #222',
          borderRadius: '8px', padding: '16px 20px', maxWidth: '200px'
        }}>
          <div style={{ ...h, fontSize: '36px', fontWeight: 700, color: '#F0EDE8', lineHeight: 1 }}>4%</div>
          <div style={{ ...b, fontSize: '13px', color: '#666', marginTop: '6px', lineHeight: '1.5' }}>
            of saved links ever get revisited. Orbit fixes that.
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ borderTop: '0.5px solid #1C1C1C' }} />

      {/* Problem — raw and direct */}
      <section className="section-pad reveal" style={{ padding: '88px 48px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>
          <div>
            <div style={{ ...b, fontSize: '12px', color: '#5B5FED', fontWeight: '600', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '20px' }}>
              The problem
            </div>
            <h2 style={{ ...h, fontSize: '44px', fontWeight: 700, letterSpacing: '-1.5px', lineHeight: '1.1', color: '#F0EDE8', marginBottom: '20px' }}>
              You save it.<br />You forget it.<br />Every time.
            </h2>
            <p style={{ ...b, fontSize: '16px', color: '#777', lineHeight: '1.8', maxWidth: '360px' }}>
              The problem isn't that you don't care. It's that nothing ever brings it back. Your saved pile grows. Your guilt grows. Nothing gets used.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', paddingTop: '8px' }}>
            {[
              { label: 'WhatsApp to yourself', desc: 'Sent at midnight. Buried by morning. Never opened.' },
              { label: 'Browser bookmarks', desc: '"Read Later" folder. 87 links. Last opened in 2022.' },
              { label: 'Watch Later', desc: '47 videos. You\'ve watched zero. New ones keep coming.' },
              { label: 'Inspired notes', desc: 'Written at 11pm. Never opened again. That idea is gone.' },
            ].map((item, i) => (
              <div key={i} style={{
                padding: '18px 0',
                borderBottom: '0.5px solid #1C1C1C',
                display: 'flex',
                gap: '16px',
                alignItems: 'flex-start'
              }}>
                <div style={{ ...h, fontSize: '13px', color: '#2a2a2a', fontWeight: 700, minWidth: '24px', paddingTop: '2px' }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div>
                  <div style={{ ...b, fontSize: '15px', fontWeight: '600', color: '#F0EDE8', marginBottom: '4px' }}>{item.label}</div>
                  <div style={{ ...b, fontSize: '13px', color: '#555', lineHeight: '1.6' }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ borderTop: '0.5px solid #1C1C1C' }} />

      {/* How it works */}
      <section id="how" className="section-pad reveal" style={{ padding: '88px 48px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ ...b, fontSize: '12px', color: '#5B5FED', fontWeight: '600', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '20px' }}>
          How it works
        </div>
        <h2 style={{ ...h, fontSize: '44px', fontWeight: 700, letterSpacing: '-1.5px', lineHeight: '1.1', color: '#F0EDE8', marginBottom: '64px', maxWidth: '500px' }}>
          Three steps.<br />That's genuinely it.
        </h2>
        <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2px' }}>
          {[
            { num: '01', title: 'Save anything', desc: 'Paste a link or type a note. Orbit auto-fetches the title. Done in under 5 seconds.', accent: '#5B5FED' },
            { num: '02', title: 'Orbit resurfaces it', desc: 'Every day, Orbit picks 5 items from your saved pile and puts them in your feed. No searching. No remembering.', accent: '#22C55E' },
            { num: '03', title: 'Act on it', desc: 'Mark done, snooze for later, or dismiss. Every action makes your orbit healthier.', accent: '#f97316' },
          ].map((step, i) => (
            <div key={i} style={{
              padding: '32px',
              background: '#0F0F0F',
              border: '0.5px solid #1C1C1C',
              borderRadius: '8px'
            }}>
              <div style={{ ...h, fontSize: '48px', fontWeight: 700, color: '#1a1a1a', marginBottom: '20px', lineHeight: 1 }}>{step.num}</div>
              <div style={{ ...b, fontSize: '17px', fontWeight: '600', color: '#F0EDE8', marginBottom: '10px' }}>{step.title}</div>
              <div style={{ ...b, fontSize: '14px', color: '#666', lineHeight: '1.7' }}>{step.desc}</div>
              <div style={{ width: '24px', height: '2px', background: step.accent, marginTop: '24px', borderRadius: '2px' }} />
            </div>
          ))}
        </div>
      </section>

      <div style={{ borderTop: '0.5px solid #1C1C1C' }} />

      {/* Product preview */}
      <section className="section-pad reveal" style={{ padding: '88px 48px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ ...b, fontSize: '12px', color: '#5B5FED', fontWeight: '600', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '20px' }}>
          Inside Orbit
        </div>
        <h2 style={{ ...h, fontSize: '44px', fontWeight: 700, letterSpacing: '-1.5px', lineHeight: '1.1', color: '#F0EDE8', marginBottom: '48px', maxWidth: '500px' }}>
          Everything you need.<br />Nothing you don't.
        </h2>

        <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>

          {/* Today's Orbit card */}
          <div style={{ background: '#0F0F0F', border: '0.5px solid #1C1C1C', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '14px 18px', borderBottom: '0.5px solid #1C1C1C', display: 'flex', alignItems: 'center', gap: '6px' }}>
              {['#ef4444', '#f97316', '#22C55E'].map((c, i) => <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: c }} />)}
              <span style={{ ...b, fontSize: '12px', color: '#444', marginLeft: '6px' }}>Today's Orbit</span>
            </div>
            <div style={{ padding: '20px' }}>
              <div style={{ ...b, fontSize: '11px', color: '#333', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>3 things resurfaced</div>
              {[
                { icon: '📖', title: 'The psychology of procrastination', meta: 'Read · 12 days ago', accent: '#1a2035' },
                { icon: '✓', title: 'Update portfolio before placement', meta: 'Do · 5 days ago', accent: '#1a2e1a' },
                { icon: '▶', title: 'System design interview crash course', meta: 'Watch · 21 days ago', accent: '#2d1a1a' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', background: '#141414', border: '0.5px solid #1C1C1C', borderRadius: '6px', marginBottom: '6px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '5px', background: item.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', flexShrink: 0 }}>{item.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ ...b, fontSize: '12px', fontWeight: '500', color: '#F0EDE8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</div>
                    <div style={{ ...b, fontSize: '10px', color: '#444', marginTop: '2px' }}>{item.meta}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {['✓', '⏰', '✕'].map((a, j) => (
                      <div key={j} style={{ width: '22px', height: '22px', border: '0.5px solid #222', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#444' }}>{a}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

            {/* Save flow */}
            <div style={{ background: '#0F0F0F', border: '0.5px solid #1C1C1C', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ padding: '14px 18px', borderBottom: '0.5px solid #1C1C1C', display: 'flex', alignItems: 'center', gap: '6px' }}>
                {['#ef4444', '#f97316', '#22C55E'].map((c, i) => <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: c }} />)}
                <span style={{ ...b, fontSize: '12px', color: '#444', marginLeft: '6px' }}>Save to Orbit</span>
              </div>
              <div style={{ padding: '16px 18px' }}>
                <div style={{ background: '#141414', border: '0.5px solid #222', borderRadius: '5px', padding: '9px 12px', fontSize: '12px', color: '#F0EDE8', marginBottom: '8px', ...b }}>
                  The psychology of procrastination
                </div>
                <div style={{ display: 'flex', gap: '6px', marginBottom: '10px' }}>
                  {[{ l: '📖 Read', s: true }, { l: '▶ Watch', s: false }, { l: '✓ Do', s: false }].map((c, i) => (
                    <div key={i} style={{ ...b, padding: '5px 11px', borderRadius: '4px', fontSize: '11px', fontWeight: '600', border: '0.5px solid', background: c.s ? '#5B5FED' : 'transparent', color: c.s ? '#fff' : '#444', borderColor: c.s ? '#5B5FED' : '#222' }}>{c.l}</div>
                  ))}
                </div>
                <div style={{ ...b, width: '100%', padding: '9px', background: '#5B5FED', borderRadius: '5px', color: '#fff', fontSize: '12px', fontWeight: '600', textAlign: 'center' }}>Save to Orbit</div>
              </div>
            </div>

            {/* Notification */}
            <div style={{ background: '#0F0F0F', border: '0.5px solid #1C1C1C', borderRadius: '8px', padding: '18px' }}>
              <div style={{ ...b, fontSize: '11px', color: '#333', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '12px' }}>Daily notification</div>
              <div style={{ background: '#141414', border: '0.5px solid #1C1C1C', borderRadius: '6px', padding: '13px', display: 'flex', gap: '10px' }}>
                <div style={{ width: '30px', height: '30px', borderRadius: '6px', background: '#5B5FED22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', flexShrink: 0 }}>🪐</div>
                <div>
                  <div style={{ ...b, fontSize: '12px', fontWeight: '600', color: '#F0EDE8', marginBottom: '3px' }}>Your past self was really onto something.</div>
                  <div style={{ ...b, fontSize: '11px', color: '#555', lineHeight: '1.5' }}>You saved this 12 days ago. Today might be the day.</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <div style={{ borderTop: '0.5px solid #1C1C1C' }} />

      {/* CTA */}
      <section ref={ctaRef} className="section-pad reveal" style={{ padding: '120px 48px', position: 'relative', overflow: 'hidden', maxWidth: '100%' }}>

        {/* Scroll-triggered rings */}
        <div className="ring" style={{ position: 'absolute', top: '50%', left: '50%', width: '300px', height: '300px', borderRadius: '50%', border: '0.5px solid #5B5FED22', animation: 'spin1 20s linear infinite', animationPlayState: 'paused', pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '-4px', left: '50%', transform: 'translateX(-50%)', width: '8px', height: '8px', borderRadius: '50%', background: '#5B5FED', boxShadow: '0 0 8px #5B5FED' }} />
        </div>
        <div className="ring" style={{ position: 'absolute', top: '50%', left: '50%', width: '480px', height: '480px', borderRadius: '50%', border: '0.5px solid #22C55E14', animation: 'spin2 32s linear infinite', animationPlayState: 'paused', pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '-3px', left: '50%', transform: 'translateX(-50%)', width: '6px', height: '6px', borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 6px #22C55E' }} />
        </div>
        <div className="ring" style={{ position: 'absolute', top: '50%', left: '50%', width: '650px', height: '650px', borderRadius: '50%', border: '0.5px solid #5B5FED0a', animation: 'spin3 48s linear infinite', animationPlayState: 'paused', pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '-3px', left: '50%', transform: 'translateX(-50%)', width: '5px', height: '5px', borderRadius: '50%', background: '#f97316', boxShadow: '0 0 5px #f97316' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ ...h, fontSize: '52px', fontWeight: 700, letterSpacing: '-2px', lineHeight: '1.08', marginBottom: '20px', color: '#F0EDE8' }}>
            Stop letting your<br />saved things<br />
            <span style={{ color: '#5B5FED', fontStyle: 'italic' }}>die quietly.</span>
          </h2>
          <p style={{ ...b, fontSize: '17px', color: '#777', marginBottom: '36px', lineHeight: '1.75', maxWidth: '420px', margin: '0 auto 36px' }}>
            Orbit resurfaces what you saved, daily, automatically. Start free. No credit card. No setup.
          </p>
          <button onClick={() => router.push('/signup')} style={{
            ...b, padding: '15px 44px', background: '#5B5FED', border: 'none',
            borderRadius: '6px', color: '#fff', fontSize: '16px',
            fontWeight: '600', cursor: 'pointer'
          }}>
            Create your Orbit
          </button>
          <p style={{ ...b, fontSize: '12px', color: '#2a2a2a', marginTop: '16px' }}>Free forever for core features.</p>
        </div>
      </section>

      {/* Footer */}
      <div style={{ borderTop: '0.5px solid #1C1C1C' }} />
      <footer style={{ padding: '24px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ ...h, fontSize: '16px', fontWeight: 700, color: '#2a2a2a' }}>
          Orbit<span style={{ color: '#333' }}>.</span>
        </div>
        <div style={{ ...b, fontSize: '12px', color: '#2a2a2a' }}>
          Built with intention. For people who save with intention.
        </div>
      </footer>
    </div>
  )
}