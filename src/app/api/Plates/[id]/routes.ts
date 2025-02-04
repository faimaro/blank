import { PlatesService } from '@/services/plates.service'
import { NextResponse } from 'next/server'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    if (!id || typeof id !== 'string' || id.trim() === '') {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
    }

    const plate = await PlatesService.findById(id)

    if (!plate) {
      return NextResponse.json({ error: 'Plate not found' }, { status: 404 })
    }

    return NextResponse.json(plate)
  } catch (error: any) {
    console.error(`Error fetching plate with ID ${params.id}:`, error?.message)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    await PlatesService.delete(id)
    return NextResponse.json({ message: 'Plate deleted successfully' })
  } catch (error: any) {
    console.log(`Error deleting plate with ID ${params.id}:`, error?.error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const body = await request.json()

    const updatedPlate = await PlatesService.update(id, body)
    if (!updatedPlate) return NextResponse.json({ error: 'Plate not found' }, { status: 404 })

    return NextResponse.json(updatedPlate)
  } catch (error: any) {
    console.error('Error updating plate:', error?.message)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

