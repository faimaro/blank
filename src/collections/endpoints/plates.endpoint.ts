import { Endpoint } from 'payload'
import { NextResponse } from 'next/server'
import { PlatesService } from '../services/plates.service'

const PlatesEndpoint: Endpoint[] = [
  {
    path: '/',
    method: 'get',
    handler: async (req) => {
      try {
        const body = req.data
        if (!body || typeof body !== 'object') {
          return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
        }

        const categoryId = body.get('categoryId')
        const minPrice = Number(body.get('minPrice'))
        const maxPrice = Number(body.get('maxPrice'))
        const activeOnly = body.get('activeOnly') === 'true'
        const name = body.get('name')
        const platesBranches = body.get('platesBranches')

        if (categoryId) {
          return NextResponse.json(await PlatesService.findByCategory(categoryId))
        }

        if (!isNaN(minPrice) && !isNaN(maxPrice)) {
          return NextResponse.json(await PlatesService.findByPriceRange(minPrice, maxPrice))
        }

        if (activeOnly) {
          return NextResponse.json(await PlatesService.findActive())
        }

        if (name) {
          return NextResponse.json(await PlatesService.findByName(name))
        }

        if (platesBranches) {
          return NextResponse.json(await PlatesService.findByBranches(platesBranches))
        }

        return NextResponse.json(await PlatesService.findAll())
      } catch (error: any) {
        console.error('Error fetching plates', error?.message)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
      }
    },
  },
  {
    path: '/:id',
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
  {
    path: '/:id',
    method: 'delete',
    handler: async (req) => {
      try {
        const id = req.routeParams?.id

        if (!id || typeof id !== 'string' || id.trim() === '') {
          return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
        }

        await PlatesService.delete(id)
        return NextResponse.json({ message: 'Plate deleted successfully' })
      } catch (error: any) {
        console.log(`Error deleting plate`, error?.error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
      }
    },
  },
  {
    path: '/:id',
    method: 'put',
    handler: async (req) => {
      try {
        const id = req.routeParams?.id
        const body = req.data

        if (!id || typeof id !== 'string' || id.trim() === '') {
          return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
        }
        if (!body || typeof body !== 'object') {
          return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
        }

        const updatedPlate = await PlatesService.update(id, body)
        if (!updatedPlate) return NextResponse.json({ error: 'Plate not found' }, { status: 404 })

        return NextResponse.json(updatedPlate)
      } catch (error: any) {
        console.error('Error updating plate:', error?.message)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
      }
    },
  },
]

export default PlatesEndpoint
