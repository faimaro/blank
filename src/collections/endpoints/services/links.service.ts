import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Link } from '@/payload-types'

export class LinkService {
  private static async getPayloadClient() {
    return await getPayload({
      config: configPromise,
    })
  }
}
