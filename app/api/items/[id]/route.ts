import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  const { id } = await params
  const body = await request.json()
  const { status, snoozedUntil } = body

  try {
    const item = await prisma.item.update({
      where: { id },
      data: {
        status,
        snoozedUntil: snoozedUntil ? new Date(snoozedUntil) : null
      }
    })

    return NextResponse.json({ success: true, item })

  } catch (error) {
    console.error('Update error:', error)
    return NextResponse.json(
      { error: 'Failed to update item' },
      { status: 500 }
    )
  }
}