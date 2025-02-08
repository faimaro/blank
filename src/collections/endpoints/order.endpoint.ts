import { Endpoint, PayloadRequest } from 'payload'
import { NextResponse } from 'next/server'
import { OrderService } from './services/orders.service'

const OrderEndpoint: Endpoint[] = [
  {
    path: '/createOrder',
    method: 'post',
    handler: async (req: PayloadRequest) => {
      try {
        let requestData
        if (req.json && typeof req.json === 'function') {
          requestData = await req.json()
        } else if (req.body) {
          requestData = await streamToJson(req.body)
        } else {
          throw new Error('Request body is empty or invalid')
        }

        console.log('Request received:', requestData)

        const { items, customer, paymentMethod } = requestData

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

// ✅ Mover la función antes de usarla
async function streamToJson(stream: any): Promise<any> {
  if (!stream) return null
  const text = await new Response(stream).text()
  return JSON.parse(text)
}
