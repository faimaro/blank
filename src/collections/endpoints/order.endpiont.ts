import { Endpoint, PayloadRequest } from 'payload'
import { NextResponse } from 'next/server'
import { OrderService } from './services/orders.service'

const OrderEndpoint: Endpoint[] = [
  {
    path: '/',
    method: 'post',
    handler: async (req: PayloadRequest) => {
      try {
        console.log('Request received:', req)

        const { data } = req
        if (!data || typeof data !== 'object') {
          return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
        }

        // Extraer los datos del body
        const plateId = data.plateId
        const branchId = Number(data.branchId)
        const sizeId = Number(data.sizeId)
        const garnishGroup = Array.isArray(data.garnishGroup) ? data.garnishGroup : null

        // Validación de los datos requeridos
        if (!plateId || !branchId || !sizeId || !garnishGroup) {
          return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        // Llamar al servicio para crear la orden
        const newOrder = await OrderService.createOrder(plateId, branchId, sizeId, garnishGroup)

        if (!newOrder) {
          return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
        }

        return NextResponse.json(newOrder, { status: 201 })
      } catch (error: any) {
        console.error('Error creating order:', error?.message)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
      }
    },
  },
]

export default OrderEndpoint
