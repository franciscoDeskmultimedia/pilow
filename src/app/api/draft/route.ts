
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import config from '../../../payload/payload.config'

export async function GET(request: Request) {
  await getPayload({ config })
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const url = searchParams.get('url')

  // Use a dedicated draft secret or fallback to PAYLOAD_SECRET (server-side only)
  // Ideally use NEXT_PUBLIC_DRAFT_SECRET for client-server consistency
  const expectedSecret = process.env.NEXT_PUBLIC_DRAFT_SECRET || process.env.PAYLOAD_SECRET;

  if (!secret || secret !== expectedSecret) {
    return new Response('Invalid secret', { status: 401 })
  }

  if (!url) {
    return new Response('Missing URL', { status: 400 })
  }

  const draft = await draftMode()
  draft.enable()

  redirect(url)
}
