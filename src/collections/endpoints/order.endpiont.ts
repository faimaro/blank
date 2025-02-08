import { Endpoint, PayloadRequest } from 'payload'
import { NextResponse } from 'next/server'
import { OrderService } from './services/orders.service'

const OrderEndpoint: Endpoint[] = [
  {
    path: '/createOrder',
    method: 'post',
    handler: async (req: PayloadRequest) => {
      try {
        const data = await req.json() // Leer el body solo una vez

        if (!data || typeof data !== 'object') {
          return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
        }

        console.log('Request received:', data.items)

        const { items, customer, paymentMethod } = data

        const order = await OrderService.createOrder(items, customer, paymentMethod)

        return NextResponse.json(order, { status: 201 })
      } catch (error) {
        console.error('Error creating order:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
      }
    },
  },
]

export default OrderEndpoint
