
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import config from '../../../payload/payload.config'

export async function GET(request: Request) {
  const payload = await getPayload({ config })
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const url = searchParams.get('url')

  if (secret !== process.env.PAYLOAD_SECRET) {
    return new Response('Invalid secret', { status: 401 })
  }

  if (!url) {
    return new Response('Missing URL', { status: 400 })
  }

  const draft = await draftMode()
  draft.enable()

  redirect(url)
}
