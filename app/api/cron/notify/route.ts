import { prisma } from '@/lib/prisma'
import { sendPushNotification } from '@/lib/push'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  // Verify this is called by Vercel Cron
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const users = await prisma.user.findMany({
    where: {
      pushSubscription: { not: null }
    },
    include: {
      items: {
        where: { status: 'ACTIVE' },
        orderBy: { createdAt: 'asc' }
      }
    }
  })

  let sent = 0

  for (const user of users) {
    if (!user.pushSubscription || user.items.length === 0) continue

    const oldestItem = user.items[0]
    const daysOld = Math.floor(
      (Date.now() - new Date(oldestItem.createdAt).getTime()) / (1000 * 60 * 60 * 24)
    )

    let title = ''
    let body = ''

    if (daysOld >= 7) {
      title = 'Your past self was really onto something.'
      body = `You saved "${oldestItem.title.slice(0, 50)}" ${daysOld} days ago. Today might be the day.`
    } else if (user.items.length >= 3) {
      title = 'Your Orbit is waiting.'
      body = `You have ${user.items.length} things saved. Pick one — it'll only take a minute.`
    } else {
      continue // skip if nothing meaningful to say
    }

    const success = await sendPushNotification(user.pushSubscription, {
      title,
      body,
      url: '/dashboard'
    })

    if (success) sent++
  }

  return NextResponse.json({ success: true, notified: sent, totalUsers: users.length })
}