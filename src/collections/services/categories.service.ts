import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Category } from '@/payload-types'

export class CategoriesService {
  private static async getPayloadClient() {
    return await getPayload({
      config: configPromise,
    })
  }

  static async findById(id: string): Promise<Category | null> {
    try {
      const payload = await this.getPayloadClient()
      const category = await payload.findByID({
        collection: 'categories',
        id,
      })
      return category as Category
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
      const categories = await payload.find({
        collection: 'categories',
        ...query,
      })
      return categories
    } catch (error) {
      console.error('Error in findAll:', error)
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

  static async findVisibleInMenu() {
    return this.findAll({
      where: {
        visibleInMenu: {
          equals: true,
        },
      },
    })
  }

  static async findByBranch(branchId: string) {
    return this.findAll({
      where: {
        branch: {
          equals: branchId,
        },
      },
    })
  }

  static async findByName(name: string) {
    try {
      if (!name.trim()) throw new Error('Invalid name')

      const payload = await this.getPayloadClient()
      return await payload.find({
        collection: 'categories',
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

  static async update(id: string, data: Partial<Category>): Promise<Category | null> {
    try {
      if (!id.trim()) throw new Error('Invalid ID')
      if (!data || Object.keys(data).length === 0) throw new Error('No data provided')

      const payload = await this.getPayloadClient()
      const updatedCategory = await payload.update({
        collection: 'categories',
        id,
        data,
      })

      return updatedCategory as Category
    } catch (error) {
      console.error(`Error updating category (${id}):`, error)
      return null
    }
  }

  static async delete(id: string): Promise<boolean> {
    try {
      if (!id.trim()) throw new Error('Invalid ID')

      const payload = await this.getPayloadClient()
      await payload.delete({
        collection: 'categories',
        id,
      })

      return true
    } catch (error) {
      console.error(`Error deleting category (${id}):`, error)
      return false
    }
  }

  static async reorder(categoryIds: string[]): Promise<boolean> {
    try {
      const payload = await this.getPayloadClient()
      await Promise.all(
        categoryIds.map((id, index) =>
          payload.update({
            collection: 'categories',
            id,
            data: { catOrder: index },
          }),
        ),
      )
      return true
    } catch (error) {
      console.error('Error reordering categories:', error)
      return false
    }
  }
}
