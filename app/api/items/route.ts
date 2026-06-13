import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    // Active items
    const items = await prisma.item.findMany({
      where: { userId: user.id, status: 'ACTIVE' },
      orderBy: { createdAt: 'asc' }
    })

    // Total cleared — done + dismissed
    const totalCleared = await prisma.item.count({
      where: {
        userId: user.id,
        status: { in: ['COMPLETED', 'DISMISSED'] }
      }
    })

    // Cleared this week
    const weekStart = new Date()
    weekStart.setDate(weekStart.getDate() - weekStart.getDay())
    weekStart.setHours(0, 0, 0, 0)

    const clearedThisWeek = await prisma.item.count({
      where: {
        userId: user.id,
        status: { in: ['COMPLETED', 'DISMISSED'] },
        updatedAt: { gte: weekStart }
      }
    })

    return NextResponse.json({ items, totalCleared, clearedThisWeek })

  } catch (error) {
    console.error('Fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch items' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  const body = await request.json()
  const { url, note, title, category } = body

  if (!title) {
    return NextResponse.json(
      { error: 'Title is required' },
      { status: 400 }
    )
  }

  try {
    // Make sure user exists in our database
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: {
        id: user.id,
        email: user.email!
      }
    })

    // Create the item
    const item = await prisma.item.create({
      data: {
        userId: user.id,
        url: url || null,
        note: note || null,
        title,
        category: category || 'READ'
      }
    })

    return NextResponse.json({ success: true, item })

  } catch (error) {
    console.error('Save error:', error)
    return NextResponse.json(
      { error: 'Failed to save item' },
      { status: 500 }
    )
  }
}