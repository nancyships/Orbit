import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  const { url } = body

  if (!url) {
    return NextResponse.json(
      { error: 'URL is required' },
      { status: 400 }
    )
  }

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; OrbitBot/1.0)'
      }
    })

    const html = await res.text()

    // Try og:title first — most sites have this
    const ogTitle = html.match(
      /<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["']/i
    )?.[1]

    // Fall back to <title> tag
    const pageTitle = html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]

    const title = ogTitle || pageTitle || url

    return NextResponse.json({
      title: title.trim().slice(0, 200)
    })

  } catch {
    // If fetch fails just return the URL as title
    return NextResponse.json({ title: url })
  }
}