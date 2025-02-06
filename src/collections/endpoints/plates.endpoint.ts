import { Endpoint } from 'payload'
import { NextResponse } from 'next/server'
import { PlatesService } from '../services/plates.service'

const PlatesEndpoint: Endpoint[] = [
  {
    path: '/:id/tracking',
    method: 'get',
    handler: async (req) => {
      try {
        const id = req.routeParams?.id

        if (!id || typeof id !== 'string' || id.trim() === '') {
          return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
        }

        const plate = await PlatesService.findById(id)

        if (!plate) {
          return NextResponse.json({ error: 'Plate not found' }, { status: 404 })
        }

        return NextResponse.json(plate)
      } catch (error: any) {
        console.error('Error fetching plate', error?.message)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
      }
    },
  },
]

export default PlatesEndpoint
