import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    let streak = await prisma.streak.findUnique({
      where: { userId: user.id }
    })

    if (!streak) {
      streak = await prisma.streak.create({
        data: {
          userId: user.id,
          currentStreak: 0,
          lastActiveAt: new Date()
        }
      })
    }

    return NextResponse.json({ streak })

  } catch (error) {
    console.error('Streak fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch streak' },
      { status: 500 }
    )
  }
}

export async function POST() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const existing = await prisma.streak.findUnique({
      where: { userId: user.id }
    })

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    let newStreak = 1

    if (existing) {
      const lastActive = new Date(existing.lastActiveAt)
      lastActive.setHours(0, 0, 0, 0)

      // Already acted today — don't increment
      if (lastActive.getTime() === today.getTime()) {
        return NextResponse.json({ streak: existing })
      }

      // Acted yesterday — continue streak
      if (lastActive.getTime() === yesterday.getTime()) {
        newStreak = existing.currentStreak + 1
      }

      // Older than yesterday — streak resets to 1
    }

    const streak = await prisma.streak.upsert({
      where: { userId: user.id },
      update: {
        currentStreak: newStreak,
        lastActiveAt: new Date()
      },
      create: {
        userId: user.id,
        currentStreak: newStreak,
        lastActiveAt: new Date()
      }
    })

    return NextResponse.json({ streak })

  } catch (error) {
    console.error('Streak update error:', error)
    return NextResponse.json(
      { error: 'Failed to update streak' },
      { status: 500 }
    )
  }
}