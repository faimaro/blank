import { CategoriesService } from '@/services/categories.service'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    const branchId = searchParams.get('branchId')
    const activeOnly = searchParams.get('activeOnly') === 'true'
    const visibleOnly = searchParams.get('visibleOnly') === 'true'
    const name = searchParams.get('name')

    if (branchId) {
      return NextResponse.json(await CategoriesService.findByBranch(branchId))
    }

    if (activeOnly) {
      return NextResponse.json(await CategoriesService.findActive())
    }

    if (visibleOnly) {
      return NextResponse.json(await CategoriesService.findVisibleInMenu())
    }

    if (name) {
      return NextResponse.json(await CategoriesService.findByName(name))
    }

    return NextResponse.json(await CategoriesService.findAll())
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const categoryIds = await request.json()
    const success = await CategoriesService.reorder(categoryIds)

    if (success) {
      return NextResponse.json({ message: 'Categories reordered successfully' })
    } else {
      return NextResponse.json({ error: 'Failed to reorder categories' }, { status: 400 })
    }
  } catch (error) {
    console.error('Error reordering categories:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
