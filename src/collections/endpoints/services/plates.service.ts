import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Plate, Size, GarnishGroup } from '@/payload-types'

export class PlatesService {
  private static async getPayloadClient() {
    return await getPayload({
      config: configPromise,
    })
  }

  static async findById(id: string): Promise<Plate | null> {
    try {
      const payload = await this.getPayloadClient()
      const plate = (await payload.findByID({
        collection: 'plates',
        id,
        depth: 2,
      })) as Plate

      if (plate.sizes && Array.isArray(plate.sizes)) {
        plate.sizes = plate.sizes.map((size): Size | string => {
          if (typeof size === 'string') {
            return size
          } else if (typeof size === 'object' && size !== null) {
            return {
              id: size.id,
              isVisibleInMenu: size.isVisibleInMenu ?? null,
              name: size.name,
              price: size.price,
              updatedAt: size.updatedAt || new Date().toISOString(),
              createdAt: size.createdAt || new Date().toISOString(),
            }
          }
          return size as string // Fallback, aunque no debería ocurrir
        })
      }

      if (plate.garnishGroups && Array.isArray(plate.garnishGroups)) {
        plate.garnishGroups = plate.garnishGroups.map((group): GarnishGroup | string => {
          if (typeof group === 'string') {
            return group
          } else if (typeof group === 'object' && group !== null) {
            return {
              id: group.id,
              name: group.name,
              description: group.description ?? null,
              mandatory: group.mandatory ?? null,
              maxQuantity: group.maxQuantity ?? null,
              minQuantity: group.minQuantity ?? null,
              multipleSelection: group.multipleSelection ?? null,
              garnishes: group.garnishes ?? null,
              updatedAt: group.updatedAt || new Date().toISOString(),
              createdAt: group.createdAt || new Date().toISOString(),
            }
          }
          return group as string // Fallback, aunque no debería ocurrir
        })
      }

      return plate
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

  static async findByName(name: string) {
    try {
      if (!name.trim()) throw new Error('Invalid name')

      const payload = await this.getPayloadClient()
      return await payload.find({
        collection: 'plates',
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

  static async findByBranches(branchId: string) {
    try {
      if (!branchId.trim()) throw new Error('Invalid branch ID')

      const payload = await this.getPayloadClient()
      return await payload.find({
        collection: 'plates',
        where: {
          branch: {
            equals: branchId,
          },
        },
      })
    } catch (error: any) {
      console.error(`Error in findByBranches (${branchId}):`, error?.message)
      return { docs: [], totalDocs: 0, totalPages: 0, page: 1 }
    }
  }

  static async update(id: string, data: Partial<Plate>): Promise<Plate | null> {
    try {
      if (!id.trim()) throw new Error('Invalid ID')
      if (!data || Object.keys(data).length === 0) throw new Error('No data provided')

      const payload = await this.getPayloadClient()
      const updatedPlate = await payload.update({
        collection: 'plates',
        id,
        data,
      })

      return updatedPlate as Plate
    } catch (error) {
      console.error(`Error updating plate (${id}):`, error)
      return null
    }
  }

  static async delete(id: string): Promise<boolean> {
    try {
      if (!id.trim()) throw new Error('Invalid ID')

      const payload = await this.getPayloadClient()
      await payload.delete({
        collection: 'plates',
        id,
      })

      return true
    } catch (error) {
      console.error(`Error deleting plate (${id}):`, error)
      return false
    }
  }
}
