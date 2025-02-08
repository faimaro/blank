import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Order, Plate } from '@/payload-types'

// Función auxiliar para generar un ID único (puedes cambiar esto según tu implementación)
const generateUniqueId = (): string =>
  `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

export class OrderService {
  private static async getPayloadClient() {
    return await getPayload({
      config: configPromise,
    })
  }

  static async findById(id: string): Promise<Order | null> {
    try {
      const payload = await this.getPayloadClient()
      return (await payload.findByID({
        collection: 'orders',
        id,
        depth: 2,
      })) as Order
    } catch (error) {
      console.error('Error in findById:', error)
      return null
    }
  }

  static async findAll(query: { where?: any; sort?: string; limit?: number; page?: number } = {}) {
    try {
      const payload = await this.getPayloadClient()
      return await payload.find({
        collection: 'orders',
        ...query,
      })
    } catch (error) {
      console.error('Error in findAll:', error)
      return { docs: [], totalDocs: 0, totalPages: 0, page: 1 }
    }
  }

  static async findByCustomer(customerId: string) {
    return this.findAll({
      where: {
        customer: {
          equals: customerId,
        },
      },
    })
  }

  static async findByStatus(status: string) {
    return this.findAll({
      where: {
        status: {
          equals: status,
        },
      },
    })
  }

  static async createOrder(
    items: Array<{ plate: string | Plate; quantity: number; price: number }>,
    customers: { name: string; email: string; phone: string; address: string },
    paymentMethod: 'cash' | 'bank-transfer' | 'credit-card',
  ): Promise<Order | null> {
    try {
      const payload = await this.getPayloadClient()

      const newOrder: Order = {
        id: generateUniqueId(), // Función para generar un ID único
        customer: customers, // Ahora tiene el tipo correcto
        items: items, // items ahora tiene la estructura correcta
        status: 'pending',
        paymentMethod: paymentMethod, // Se pasa correctamente el método de pago
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      const savedOrder = await payload.create({
        collection: 'orders',
        data: newOrder,
      })

      return savedOrder
    } catch (error) {
      console.error('Error creating order:', error)
      return null
    }
  }

  static async update(id: string, data: Partial<Order>): Promise<Order | null> {
    try {
      if (!id.trim()) throw new Error('Invalid ID')
      if (!data || Object.keys(data).length === 0) throw new Error('No data provided')

      const payload = await this.getPayloadClient()
      return (await payload.update({
        collection: 'orders',
        id,
        data,
      })) as Order
    } catch (error) {
      console.error(`Error updating order (${id}):`, error)
      return null
    }
  }

  static async delete(id: string): Promise<boolean> {
    try {
      if (!id.trim()) throw new Error('Invalid ID')

      const payload = await this.getPayloadClient()
      await payload.delete({
        collection: 'orders',
        id,
      })

      return true
    } catch (error) {
      console.error(`Error deleting order (${id}):`, error)
      return false
    }
  }
}
