import webpush from 'web-push'

webpush.setVapidDetails(
  'mailto:youremail@example.com',
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
  } catch (error) {
    console.error('Push send error:', error)
    return false
  }
}