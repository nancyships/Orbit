'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

export default function LandingPage() {
  const router = useRouter()
  const typingRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const ctaAnimRef = useRef<HTMLDivElement>(null)

  const heading = { fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 800 }
  const body = { fontFamily: 'DM Sans, sans-serif' }

  // Typing animation
  useEffect(() => {
    const phrases = [
      'Now actually use it.',
      'Before you forget it.',
      'While it still matters.',
      'Without the guilt.',
      'Starting today.'
    ]
    let phraseIndex = 0
    let charIndex = 0
    let deleting = false
    let timer: NodeJS.Timeout

    function type() {
      const el = typingRef.current
      if (!el) return
      const current = phrases[phraseIndex]
      if (!deleting) {
        charIndex++
        el.innerHTML = current.slice(0, charIndex) + '<span style="display:inline-block;width:3px;height:56px;background:#6366F1;margin-left:4px;vertical-align:middle;animation:blink 1s infinite"></span>'
        if (charIndex === current.length) {
          deleting = true
          timer = setTimeout(type, 2200)
          return
        }
      } else {
        charIndex--
        el.innerHTML = current.slice(0, charIndex) + '<span style="display:inline-block;width:3px;height:56px;background:#6366F1;margin-left:4px;vertical-align:middle;animation:blink 1s infinite"></span>'
        if (charIndex === 0) {
          deleting = false
          phraseIndex = (phraseIndex + 1) % phrases.length
        }
      }
      timer = setTimeout(type, deleting ? 35 : 65)
    }
    type()
    return () => clearTimeout(timer)
  }, [])

  // Scroll trigger for CTA animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && ctaAnimRef.current) {
            ctaAnimRef.current.style.animationPlayState = 'running'
            ctaAnimRef.current.querySelectorAll('.orbit-ring').forEach((el: any) => {
              el.style.animationPlayState = 'running'
            })
          }
        })
      },
      { threshold: 0.2 }
    )
    if (ctaRef.current) observer.observe(ctaRef.current)
    return () => observer.disconnect()
  }, [])

  // Scroll fade-in for sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = '1';
            (entry.target as HTMLElement).style.transform = 'translateY(0)'
          }
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll('.fade-section').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const problemCards = [
    { icon: '💬', iconBg: '#1a4a2e', title: 'WhatsApp to yourself', desc: 'Links sent at midnight — never opened, buried under 200 other messages.', quote: '"I\'ll read this tomorrow."' },
    { icon: '🔖', iconBg: '#2d2660', title: 'Browser bookmarks', desc: 'A "Read Later" folder with 87 links — the oldest one is from 2021.', quote: '"I definitely need this someday."' },
    { icon: '▶️', iconBg: '#5a1f1f', title: 'Watch Later graveyard', desc: '47 YouTube videos. You\'ve watched exactly zero. New ones keep getting added.', quote: '"This looks really useful."' },
    { icon: '📝', iconBg: '#3a3a15', title: 'Notes from inspiration', desc: 'Written at 11pm when you were fired up. Never opened again.', quote: '"I had such a good idea that day."' }
  ]

  const features = [
    { iconBg: '#6366F115', icon: '⚡', title: 'Save in 5 seconds', desc: 'Paste a URL or type a note. Auto-detects the title. No folders, no friction, no decisions.', tag: 'Read · Watch · Do', tagBg: '#6366F115', tagColor: '#8b8ff8' },
    { iconBg: '#22C55E15', icon: '🔄', title: 'Daily resurfacing feed', desc: 'Every day Orbit picks 5 items and puts them in your feed. No searching. No scrolling through graveyards.', tag: '5 items · every day', tagBg: '#22C55E15', tagColor: '#22C55E' },
    { iconBg: '#f9731615', icon: '🔔', title: 'Smart notifications', desc: 'Orbit reaches out when something needs your attention — with copy that actually makes you want to open it.', tag: '1 per day · never spam', tagBg: '#f9731615', tagColor: '#f97316' },
    { iconBg: '#6366F115', icon: '🪐', title: 'Your orbit forms', desc: 'Watch your planet grow as you clear items. Progress is cumulative — no daily pressure, no streaks to break.', tag: 'Total cleared · this week', tagBg: '#6366F115', tagColor: '#8b8ff8' }
  ]

  const sectionTag = (text: string) => (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      background: '#6366F115',
      border: '0.5px solid #6366F133',
      borderRadius: '20px',
      padding: '4px 14px',
      fontSize: '13px',
      color: '#8b8ff8',
      fontWeight: '600',
      marginBottom: '16px',
      letterSpacing: '0.2px'
    }}>
      ✦ {text}
    </div>
  )

  const cardHeader = (title: string) => (
    <div style={{ padding: '14px 18px', borderBottom: '0.5px solid #1a1a1a', display: 'flex', alignItems: 'center', gap: '6px' }}>
      {['#22C55E', '#f97316', '#6366F1'].map((c, i) => (
        <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: c }} />
      ))}
      <span style={{ fontSize: '12px', color: '#555', fontWeight: '500', marginLeft: '4px' }}>{title}</span>
    </div>
  )

  return (
    <div style={{ ...body, background: '#0A0A0A', color: '#F4F4F4' }}>
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes orbit-spin { from{transform:translate(-50%,-50%) rotate(0deg)} to{transform:translate(-50%,-50%) rotate(360deg)} }
        @keyframes orbit-spin-reverse { from{transform:translate(-50%,-50%) rotate(0deg)} to{transform:translate(-50%,-50%) rotate(-360deg)} }
        @keyframes orbit-spin-slow { from{transform:translate(-50%,-50%) rotate(0deg)} to{transform:translate(-50%,-50%) rotate(360deg)} }
        @keyframes glow-pulse { 0%,100%{opacity:0.5} 50%{opacity:1} }
        .orbit-ring { animation-play-state: paused; }
        .fade-section { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
      `}</style>

      {/* Nav */}
      <nav style={{
        padding: '20px 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '0.5px solid #1a1a1a',
        position: 'relative',
        zIndex: 10,
        maxWidth: '1100px',
        margin: '0 auto',
        width: '100%'
      }}>
        <div style={{ ...heading, fontSize: '22px', letterSpacing: '-0.5px' }}>
          Orbit<span style={{ color: '#6366F1' }}>.</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span onClick={() => router.push('/login')} style={{ fontSize: '14px', color: '#666', cursor: 'pointer' }}>
            Log in
          </span>
          <button
            onClick={() => router.push('/signup')}
            style={{ padding: '10px 22px', background: '#6366F1', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '14px', fontWeight: '600', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}
          >
            Get started free
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ position: 'relative', padding: '110px 24px 90px', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', width: '500px', height: '500px', borderRadius: '50%', border: '0.5px solid #6366F110', transform: 'translate(-50%,-50%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', width: '750px', height: '750px', borderRadius: '50%', border: '0.5px solid #6366F108', transform: 'translate(-50%,-50%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', width: '1000px', height: '1000px', borderRadius: '50%', border: '0.5px solid #6366F105', transform: 'translate(-50%,-50%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '700px', borderRadius: '50%', background: 'radial-gradient(circle, #6366F118 0%, #6366F106 40%, transparent 70%)', pointerEvents: 'none', animation: 'glow-pulse 4s ease-in-out infinite' }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '800px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '7px',
            background: '#6366F115', border: '0.5px solid #6366F133',
            borderRadius: '20px', padding: '5px 16px', fontSize: '13px',
            color: '#8b8ff8', fontWeight: '600', marginBottom: '36px', letterSpacing: '0.2px'
          }}>
            ✨ Proactive resurfacing — a new way to use what you save
          </div>

          <h1 style={{ ...heading, fontSize: '68px', lineHeight: '1.05', letterSpacing: '-3px', marginBottom: '12px' }}>
            You saved it.
          </h1>

          <div
            ref={typingRef}
            style={{ ...heading, fontSize: '68px', lineHeight: '1.05', letterSpacing: '-3px', color: '#6366F1', marginBottom: '32px', minHeight: '80px' }}
          />

          <p style={{ fontSize: '19px', color: '#aaa', lineHeight: '1.8', maxWidth: '520px', margin: '0 auto 44px' }}>
            Every app makes <strong style={{ color: '#F4F4F4', fontWeight: '500' }}>saving easy.</strong> Nobody built the thing that brings it back. Orbit resurfaces the right saved item at the right moment — automatically.
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '18px' }}>
            <button
              onClick={() => router.push('/signup')}
              style={{ padding: '15px 36px', background: '#6366F1', border: 'none', borderRadius: '10px', color: '#fff', fontSize: '16px', fontWeight: '600', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}
            >
              Start for free →
            </button>
            <button
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ padding: '15px 26px', background: 'transparent', border: '0.5px solid #222', borderRadius: '10px', color: '#666', fontSize: '15px', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}
            >
              See how it works
            </button>
          </div>
          <p style={{ fontSize: '13px', color: '#2a2a2a' }}>Free forever for core features. No credit card.</p>
        </div>
      </section>

      {/* Problem — comes second */}
      <section className="fade-section" style={{ padding: '88px 24px', background: '#0d0d0d', borderTop: '0.5px solid #111' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {sectionTag('The problem')}
          <h2 style={{ ...heading, fontSize: '40px', letterSpacing: '-1px', marginBottom: '14px', lineHeight: '1.15' }}>
            Sound familiar?
          </h2>
          <p style={{ fontSize: '17px', color: '#999', lineHeight: '1.75', marginBottom: '40px', maxWidth: '540px' }}>
            You save with the best intentions. Then life happens. The pile grows. The guilt builds. Nothing ever gets used.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {problemCards.map((card, i) => (
              <div key={i} style={{ background: '#111', border: '0.5px solid #1a1a1a', borderRadius: '16px', padding: '22px 24px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: card.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', marginBottom: '14px' }}>
                  {card.icon}
                </div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#F4F4F4', marginBottom: '7px' }}>{card.title}</div>
                <div style={{ fontSize: '14px', color: '#888', lineHeight: '1.65', marginBottom: '8px' }}>{card.desc}</div>
                <div style={{ fontSize: '13px', fontStyle: 'italic', color: '#444' }}>{card.quote}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="fade-section" style={{ padding: '88px 24px', borderTop: '0.5px solid #111' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          {sectionTag('How it works')}
          <h2 style={{ ...heading, fontSize: '40px', letterSpacing: '-1px', marginBottom: '48px', lineHeight: '1.15' }}>
            Three steps. That's it.
          </h2>
          {[
            { num: '1', bg: '#6366F122', color: '#6366F1', border: '#6366F133', title: 'Save anything in seconds', desc: "Paste a link or type a note. Pick Read, Watch, or Do. Orbit fetches the title automatically. Done in under 5 seconds — no setup, no folders, no decisions." },
            { num: '2', bg: '#22C55E22', color: '#22C55E', border: '#22C55E33', title: 'Orbit brings it back', desc: "Every day Orbit surfaces 5 items — the oldest ones, urgent tasks, and things you snoozed. You didn't have to remember. Orbit did it for you." },
            { num: '3', bg: '#f9731622', color: '#f97316', border: '#f9731633', title: 'Act, snooze, or dismiss', desc: "Read it and mark done. Not ready? Snooze it for exactly when you want. No longer relevant? Dismiss guilt-free. Your orbit clears. Your planet grows." }
          ].map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: '24px', paddingBottom: i < 2 ? '40px' : '0', position: 'relative' }}>
              {i < 2 && <div style={{ position: 'absolute', left: '21px', top: '50px', height: '40px', width: '0.5px', background: '#1a1a1a' }} />}
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '17px', fontWeight: '800', flexShrink: 0, background: step.bg, color: step.color, border: `0.5px solid ${step.border}` }}>
                {step.num}
              </div>
              <div style={{ paddingTop: '10px' }}>
                <div style={{ fontSize: '18px', fontWeight: '600', color: '#F4F4F4', marginBottom: '8px' }}>{step.title}</div>
                <div style={{ fontSize: '15px', color: '#888', lineHeight: '1.7' }}>{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Product cards */}
      <section className="fade-section" style={{ padding: '88px 24px', background: '#0d0d0d', borderTop: '0.5px solid #111' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {sectionTag('See it in action')}
          <h2 style={{ ...heading, fontSize: '40px', letterSpacing: '-1px', marginBottom: '14px', lineHeight: '1.15' }}>
            Everything you need.<br />Nothing you don't.
          </h2>
          <p style={{ fontSize: '17px', color: '#999', lineHeight: '1.75', marginBottom: '48px', maxWidth: '520px' }}>
            A fast save, a daily feed, and a notification that actually makes you open it.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>

            {/* Today's Orbit */}
            <div style={{ background: '#111', border: '0.5px solid #1a1a1a', borderRadius: '16px', overflow: 'hidden' }}>
              {cardHeader("Today's Orbit")}
              <div style={{ padding: '18px 20px' }}>
                <div style={{ fontSize: '12px', color: '#444', marginBottom: '12px' }}>3 things resurfaced for you today</div>
                {[
                  { icon: '📖', bg: '#1a2035', title: 'The psychology of procrastination', meta: 'READ · 12 days ago' },
                  { icon: '✓', bg: '#1a2e1a', title: 'Update portfolio before placement', meta: 'DO · 5 days ago' },
                  { icon: '▶️', bg: '#2d1a1a', title: 'System design interview crash course', meta: 'WATCH · 21 days ago' }
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 11px', background: '#0d0d0d', border: '0.5px solid #1a1a1a', borderRadius: '9px', marginBottom: '8px' }}>
                    <div style={{ width: '30px', height: '30px', borderRadius: '7px', background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', flexShrink: 0 }}>{item.icon}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '13px', fontWeight: '500', color: '#F4F4F4', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</div>
                      <div style={{ fontSize: '11px', color: '#444', marginTop: '2px' }}>{item.meta}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      {['✓', '⏰', '✕'].map((a, j) => (
                        <div key={j} style={{ width: '24px', height: '24px', border: '0.5px solid #1a1a1a', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: '#444' }}>{a}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Save flow */}
            <div style={{ background: '#111', border: '0.5px solid #1a1a1a', borderRadius: '16px', overflow: 'hidden' }}>
              {cardHeader('Save to Orbit')}
              <div style={{ padding: '18px 20px' }}>
                <div style={{ fontSize: '12px', color: '#444', marginBottom: '8px' }}>Paste a link or type a note</div>
                <div style={{ background: '#0d0d0d', border: '0.5px solid #2a2a2a', borderRadius: '8px', padding: '10px 13px', fontSize: '13px', color: '#555', marginBottom: '12px' }}>
                  https://psychologytoday.com/procrastination
                </div>
                <div style={{ fontSize: '12px', color: '#444', marginBottom: '6px' }}>Auto-detected title</div>
                <div style={{ background: '#0d0d0d', border: '0.5px solid #2a2a2a', borderRadius: '8px', padding: '10px 13px', fontSize: '13px', color: '#F4F4F4', marginBottom: '14px' }}>
                  The psychology of procrastination
                </div>
                <div style={{ display: 'flex', gap: '7px', marginBottom: '14px' }}>
                  {[{ l: '📖 Read', s: true }, { l: '▶️ Watch', s: false }, { l: '✓ Do', s: false }].map((c, i) => (
                    <div key={i} style={{ padding: '6px 13px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', border: '0.5px solid', background: c.s ? '#6366F133' : 'transparent', color: c.s ? '#6366F1' : '#444', borderColor: c.s ? '#6366F144' : '#1a1a1a' }}>
                      {c.l}
                    </div>
                  ))}
                </div>
                <div style={{ width: '100%', padding: '10px', background: '#6366F1', borderRadius: '8px', color: '#fff', fontSize: '13px', fontWeight: '600', textAlign: 'center' }}>
                  Save to Orbit
                </div>
              </div>
            </div>

            {/* Orbit Formation */}
            <div style={{ background: '#111', border: '0.5px solid #1a1a1a', borderRadius: '16px', overflow: 'hidden' }}>
              {cardHeader('Your Orbit is forming')}
              <div style={{ padding: '18px 20px', textAlign: 'center' }}>
                <div style={{ fontSize: '44px', marginBottom: '10px' }}>🪐</div>
                <div style={{ fontSize: '13px', color: '#666', marginBottom: '18px' }}>Orbiting — 12 things cleared</div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '28px', marginBottom: '16px' }}>
                  {[{ n: '12', l: 'cleared', c: '#F4F4F4' }, { n: '4', l: 'this week', c: '#22C55E' }, { n: '8', l: 'waiting', c: '#6366F1' }].map((s, i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                      <div style={{ ...heading, fontSize: '22px', color: s.c }}>{s.n}</div>
                      <div style={{ fontSize: '11px', color: '#444', textTransform: 'uppercase', letterSpacing: '0.4px', marginTop: '3px' }}>{s.l}</div>
                    </div>
                  ))}
                </div>
                <div style={{ height: '3px', background: '#1a1a1a', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: '23%', background: 'linear-gradient(90deg, #6366F1, #22C55E)', borderRadius: '4px' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
                  <span style={{ fontSize: '11px', color: '#444' }}>23% cleared</span>
                  <span style={{ fontSize: '11px', color: '#444' }}>20 total saved</span>
                </div>
              </div>
            </div>

            {/* Notification */}
            <div style={{ background: '#111', border: '0.5px solid #1a1a1a', borderRadius: '16px', overflow: 'hidden' }}>
              {cardHeader('Daily notification')}
              <div style={{ padding: '18px 20px' }}>
                <div style={{ fontSize: '12px', color: '#444', marginBottom: '14px' }}>One nudge a day. Never spam.</div>
                <div style={{ background: '#0d0d0d', border: '0.5px solid #1a1a1a', borderRadius: '12px', padding: '14px', display: 'flex', gap: '12px' }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#6366F122', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>🪐</div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: '#F4F4F4', marginBottom: '4px' }}>Your past self was really onto something.</div>
                    <div style={{ fontSize: '12px', color: '#777', lineHeight: '1.55' }}>You saved "The psychology of procrastination" 12 days ago. Today might be the day.</div>
                    <div style={{ fontSize: '11px', color: '#333', marginTop: '5px' }}>now · Orbit</div>
                  </div>
                </div>
                <div style={{ marginTop: '14px', fontSize: '12px', color: '#333', textAlign: 'center' }}>
                  Sent at 8pm every evening
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features */}
      <section className="fade-section" style={{ padding: '88px 24px', borderTop: '0.5px solid #111' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {sectionTag('What Orbit does')}
          <h2 style={{ ...heading, fontSize: '40px', letterSpacing: '-1px', marginBottom: '14px', lineHeight: '1.15' }}>
            Built to bring things back
          </h2>
          <p style={{ fontSize: '17px', color: '#999', lineHeight: '1.75', marginBottom: '40px', maxWidth: '500px' }}>
            Every other app solves the saving problem. Orbit solves the returning problem.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            {features.map((feat, i) => (
              <div key={i} style={{ background: '#111', border: '0.5px solid #1a1a1a', borderRadius: '16px', padding: '24px' }}>
                <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: feat.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px', fontSize: '22px' }}>
                  {feat.icon}
                </div>
                <div style={{ fontSize: '17px', fontWeight: '600', color: '#F4F4F4', marginBottom: '8px' }}>{feat.title}</div>
                <div style={{ fontSize: '14px', color: '#888', lineHeight: '1.7' }}>{feat.desc}</div>
                <span style={{ display: 'inline-block', fontSize: '11px', fontWeight: '600', padding: '3px 10px', borderRadius: '20px', marginTop: '14px', background: feat.tagBg, color: feat.tagColor }}>
                  {feat.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA with scroll-triggered orbit animation */}
      <section ref={ctaRef} className="fade-section" style={{ padding: '140px 24px', textAlign: 'center', borderTop: '0.5px solid #111', position: 'relative', overflow: 'hidden', background: '#0A0A0A' }}>

        <div ref={ctaAnimRef}>
          {/* Ring 1 */}
          <div className="orbit-ring" style={{ position: 'absolute', top: '50%', left: '50%', width: '280px', height: '280px', borderRadius: '50%', border: '0.5px solid #6366F130', animation: 'orbit-spin 18s linear infinite', animationPlayState: 'paused', pointerEvents: 'none' }}>
            <div style={{ position: 'absolute', top: '-5px', left: '50%', transform: 'translateX(-50%)', width: '10px', height: '10px', borderRadius: '50%', background: '#6366F1', boxShadow: '0 0 12px #6366F1' }} />
          </div>
          {/* Ring 2 */}
          <div className="orbit-ring" style={{ position: 'absolute', top: '50%', left: '50%', width: '420px', height: '420px', borderRadius: '50%', border: '0.5px solid #22C55E18', animation: 'orbit-spin-reverse 28s linear infinite', animationPlayState: 'paused', pointerEvents: 'none' }}>
            <div style={{ position: 'absolute', top: '-4px', left: '50%', transform: 'translateX(-50%)', width: '8px', height: '8px', borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 10px #22C55E' }} />
          </div>
          {/* Ring 3 */}
          <div className="orbit-ring" style={{ position: 'absolute', top: '50%', left: '50%', width: '560px', height: '560px', borderRadius: '50%', border: '0.5px solid #f9731612', animation: 'orbit-spin-slow 42s linear infinite', animationPlayState: 'paused', pointerEvents: 'none' }}>
            <div style={{ position: 'absolute', top: '-4px', left: '50%', transform: 'translateX(-50%)', width: '7px', height: '7px', borderRadius: '50%', background: '#f97316', boxShadow: '0 0 8px #f97316' }} />
          </div>
          {/* Glow only — no planet emoji in center */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, #6366F112 0%, transparent 65%)', pointerEvents: 'none', animation: 'glow-pulse 3s ease-in-out infinite' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '560px', margin: '0 auto' }}>
          <h2 style={{ ...heading, fontSize: '48px', letterSpacing: '-1.5px', lineHeight: '1.1', marginBottom: '18px' }}>
            Stop saving things<br />to <span style={{ color: '#6366F1' }}>forget them.</span>
          </h2>
          <p style={{ fontSize: '17px', color: '#888', marginBottom: '36px', lineHeight: '1.75' }}>
            Join Orbit and start actually using the things you save with intention. Free to start. No credit card needed.
          </p>
          <button
            onClick={() => router.push('/signup')}
            style={{ padding: '16px 44px', background: '#6366F1', border: 'none', borderRadius: '10px', color: '#fff', fontSize: '17px', fontWeight: '600', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}
          >
            Create your Orbit
          </button>
          <p style={{ fontSize: '13px', color: '#333', marginTop: '16px' }}>
            Free forever for core features.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '28px 48px', borderTop: '0.5px solid #111', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ ...heading, fontSize: '17px', color: '#333' }}>
          Orbit<span style={{ color: '#444' }}>.</span>
        </div>
        <div style={{ fontSize: '13px', color: '#333' }}>
          Built with intention. For people who save with intention.
        </div>
      </footer>

    </div>
  )
}