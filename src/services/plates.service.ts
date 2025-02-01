import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Plate } from '@/payload-types'

export class PlatesService {
  private static async getPayloadClient() {
    return await getPayload({
      config: configPromise,
    })
  }

  static async findById(id: string): Promise<Plate | null> {
    try {
      const payload = await this.getPayloadClient()
      const plate = await payload.findByID({
        collection: 'plates',
        id,
      })
      return plate as Plate
    } catch (error) {
      console.error('Error in findById:', error)
      return null
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
      const plates = await payload.find({
        collection: 'plates',
        ...query,
      })
      return plates
    } catch (error) {
      console.error('Error in findAll:', error)
      return { docs: [], totalDocs: 0, totalPages: 0, page: 1 }
    }
  }

  static async findByCategory(categoryId: string) {
    return this.findAll({
      where: {
        category: {
          equals: categoryId,
        },
      },
    })
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

  static async findByPriceRange(minPrice: number, maxPrice: number) {
    return this.findAll({
      where: {
        and: [
          {
            price: {
              greater_than_equal: minPrice,
            },
          },
          {
            price: {
              less_than_equal: maxPrice,
            },
          },
        ],
      },
    })
  }
}
