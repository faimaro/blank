import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Merchant } from '../payload-types'

export class MerchantsService {
  private static async getPayloadClient() {
    return await getPayload({
      config: configPromise,
    })
  }

  static async findById(id: string): Promise<Merchant | null> {
    try {
      const payload = await this.getPayloadClient()
      const merchant = await payload.findByID({
        collection: 'merchants',
        id,
      })
      return merchant as Merchant
    } catch (error: any) {
      console.error('Error in findById:', error?.message)
      return null
    }
  }

  static async findByMerchant(merchantId: string) {
    try {
      const payload = await this.getPayloadClient()
      return await payload.find({
        collection: 'merchants',
        where: {
          comercio: { equals: merchantId },
        },
      })
    } catch (error: any) {
      console.error(`Error fetching merchants for merchant (${merchantId}):`, error?.message)
      return []
    }
  }

  static async findAll(
    query: {
      where?: any
      sort?: string
      limit?: number
      page?: number
    } = {},
  ) {
    try {
      const payload = await this.getPayloadClient()
      const merchants = await payload.find({
        collection: 'merchants',
        ...query,
      })
      return merchants
    } catch (error: any) {
      console.error('Error in findAll:', error?.message)
      return { docs: [], totalDocs: 0, totalPages: 0, page: 1 }
    }
  }

  static async findActive() {
    return this.findAll({
      where: {
        isActive: {
          equals: true,
        },
      },
    })
  }

  static async findByName(name: string) {
    try {
      if (!name.trim()) throw new Error('Invalid name')

      const payload = await this.getPayloadClient()
      return await payload.find({
        collection: 'merchants',
        where: {
          name: {
            contains: name,
          },
        },
      })
    } catch (error: any) {
      console.error(`Error in findByName (${name}):`, error?.message)
      return { docs: [], totalDocs: 0, totalPages: 0, page: 1 }
    }
  }

  static async update(id: string, data: Partial<Merchant>): Promise<Merchant | null> {
    try {
      if (!id.trim()) throw new Error('Invalid ID')
      if (!data || Object.keys(data).length === 0) throw new Error('No data provided')

      const payload = await this.getPayloadClient()
      const updatedMerchant = await payload.update({
        collection: 'merchants',
        id,
        data,
      })

      return updatedMerchant as Merchant
    } catch (error: any) {
      console.error(`Error updating merchant (${id}):`, error?.message)
      return null
    }
  }

  static async delete(id: string): Promise<boolean> {
    try {
      if (!id.trim()) throw new Error('Invalid ID')

      const payload = await this.getPayloadClient()
      await payload.delete({
        collection: 'merchants',
        id,
      })

      return true
    } catch (error: any) {
      console.error(`Error deleting merchant (${id}):`, error?.message)
      return false
    }
  }
}
