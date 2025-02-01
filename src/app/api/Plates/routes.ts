import { PlatesService } from '@/services/plates.service'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    const categoryId = searchParams.get('categoryId')
    const minPrice = Number(searchParams.get('minPrice'))
    const maxPrice = Number(searchParams.get('maxPrice'))
    const activeOnly = searchParams.get('activeOnly') === 'true'

    if (categoryId) {
      return NextResponse.json(await PlatesService.findByCategory(categoryId))
    }

    if (!isNaN(minPrice) && !isNaN(maxPrice)) {
      return NextResponse.json(await PlatesService.findByPriceRange(minPrice, maxPrice))
    }

    if (activeOnly) {
      return NextResponse.json(await PlatesService.findActive())
    }

    return NextResponse.json(await PlatesService.findAll())
  } catch (error) {
    console.error('Error fetching plates:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
