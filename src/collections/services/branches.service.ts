import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Branch } from '@/payload-types'

export class BranchesService {
  private static async getPayloadClient() {
    return await getPayload({
      config: configPromise,
    })
  }

  static async findById(id: string): Promise<Branch | null> {
    try {
      const payload = await this.getPayloadClient()
      const branch = await payload.findByID({
        collection: 'branches',
        id,
      })
      return branch as Branch
    } catch (error: any) {
      console.error('Error in findById:', error?.message)
      return null
    }
  }

  static async findByMerchant(merchantId: string) {
    try {
      const payload = await this.getPayloadClient()
      return await payload.find({
        collection: 'branches',
        where: {
          comercio: { equals: merchantId },
        },
      })
    } catch (error: any) {
      console.error(`Error fetching branches for merchant (${merchantId}):`, error?.message)
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
      const branches = await payload.find({
        collection: 'branches',
        ...query,
      })
      return branches
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
        collection: 'branches',
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

  static async update(id: string, data: Partial<Branch>): Promise<Branch | null> {
    try {
      if (!id.trim()) throw new Error('Invalid ID')
      if (!data || Object.keys(data).length === 0) throw new Error('No data provided')

      const payload = await this.getPayloadClient()
      const updatedBranch = await payload.update({
        collection: 'branches',
        id,
        data,
      })

      return updatedBranch as Branch
    } catch (error: any) {
      console.error(`Error updating branch (${id}):`, error?.message)
      return null
    }
  }

  static async delete(id: string): Promise<boolean> {
    try {
      if (!id.trim()) throw new Error('Invalid ID')

      const payload = await this.getPayloadClient()
      await payload.delete({
        collection: 'branches',
        id,
      })

      return true
    } catch (error: any) {
      console.error(`Error deleting branch (${id}):`, error?.message)
      return false
    }
  }
}
