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
    const items = await prisma.item.findMany({
      where: {
        userId: user.id,
        status: 'COMPLETED'
      },
      orderBy: { updatedAt: 'desc' }
    })

    return NextResponse.json({ items })

  } catch (error) {
    console.error('Completed fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch completed items' },
      { status: 500 }
    )
  }
}