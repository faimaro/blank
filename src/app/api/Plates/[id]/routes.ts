import { PlatesService } from '@/services/plates.service'
import { NextResponse } from 'next/server'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const plate = await PlatesService.findById(id)

    if (!plate) {
      return NextResponse.json({ error: 'Plate not found' }, { status: 404 })
    }

    return NextResponse.json(plate)
  } catch (error) {
    console.error('Error fetching plate:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
