type ProgressProps = {
  totalCleared: number
  totalSaved: number
  clearedThisWeek: number
}

export default function OrbitProgress({
  totalCleared,
  totalSaved,
  clearedThisWeek
}: ProgressProps) {
  const waiting = totalSaved
  const progressPercent = totalSaved + totalCleared === 0
    ? 0
    : Math.round((totalCleared / (totalSaved + totalCleared)) * 100)

  function getPlanetStage() {
    if (totalCleared === 0) return { emoji: '🌑', label: 'Dormant' }
    if (totalCleared < 5) return { emoji: '🪨', label: 'Forming' }
    if (totalCleared < 15) return { emoji: '🌍', label: 'Growing' }
    if (totalCleared < 30) return { emoji: '🪐', label: 'Orbiting' }
    return { emoji: '⭐', label: 'Stellar' }
  }

  const planet = getPlanetStage()

  return (
    <div style={{
      background: '#111',
      border: '0.5px solid #1e1e1e',
      borderRadius: '14px',
      padding: '16px 20px',
      marginBottom: '24px',
      maxWidth: '680px'
    }}>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px'
      }}>

        {/* Planet visual */}
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: '#0F0F0F',
          border: '0.5px solid #2a2a2a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '28px',
          flexShrink: 0,
          position: 'relative'
        }}>
          {planet.emoji}
          {/* Orbit ring */}
          <div style={{
            position: 'absolute',
            width: '80px',
            height: '22px',
            borderRadius: '50%',
            border: '1px solid #6366F133',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }} />
          {/* Stage badge */}
          <div style={{
            position: 'absolute',
            bottom: '-8px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#6366F1',
            color: '#fff',
            fontSize: '9px',
            fontWeight: '700',
            padding: '1px 7px',
            borderRadius: '20px',
            whiteSpace: 'nowrap',
            letterSpacing: '0.3px'
          }}>
            {planet.label}
          </div>
        </div>

        {/* Stats */}
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: '13px',
            fontWeight: '600',
            color: '#F4F4F4',
            marginBottom: '10px'
          }}>
            Your Orbit is {planet.label.toLowerCase()}
          </div>

          {/* Three stats */}
          <div style={{
            display: 'flex',
            gap: '20px',
            marginBottom: '12px'
          }}>
            <div>
              <div style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#F4F4F4',
                lineHeight: 1
              }}>
                {totalCleared}
              </div>
              <div style={{
                fontSize: '10px',
                color: '#444',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginTop: '3px'
              }}>
                cleared
              </div>
            </div>
            <div style={{
              width: '0.5px',
              background: '#1e1e1e',
              alignSelf: 'stretch'
            }} />
            <div>
              <div style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#22C55E',
                lineHeight: 1
              }}>
                {clearedThisWeek}
              </div>
              <div style={{
                fontSize: '10px',
                color: '#444',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginTop: '3px'
              }}>
                this week
              </div>
            </div>
            <div style={{
              width: '0.5px',
              background: '#1e1e1e',
              alignSelf: 'stretch'
            }} />
            <div>
              <div style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#6366F1',
                lineHeight: 1
              }}>
                {waiting}
              </div>
              <div style={{
                fontSize: '10px',
                color: '#444',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginTop: '3px'
              }}>
                waiting
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{
            height: '3px',
            background: '#1e1e1e',
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: `${progressPercent}%`,
              background: 'linear-gradient(90deg, #6366F1, #22C55E)',
              borderRadius: '4px',
              transition: 'width 0.5s ease'
            }} />
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '4px'
          }}>
            <span style={{ fontSize: '10px', color: '#444' }}>
              {progressPercent}% cleared
            </span>
            <span style={{ fontSize: '10px', color: '#444' }}>
              {totalSaved + totalCleared} total saved
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}