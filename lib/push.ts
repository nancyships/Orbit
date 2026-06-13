import webpush from 'web-push'

webpush.setVapidDetails(
  'mailto: vaishnavi072.singh@gmail.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
)

export async function sendPushNotification(
  subscription: string,
  payload: { title: string; body: string; url?: string }
) {
  try {
    const sub = JSON.parse(subscription)
    await webpush.sendNotification(sub, JSON.stringify(payload))
    return true
  } catch (error: any) {
    console.error('Push send error:', error.message)
    console.error('Push send full error:', JSON.stringify(error, null, 2))
    return false
  }
}