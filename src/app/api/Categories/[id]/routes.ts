import { CategoriesService } from '@/services/categories.service'
import { NextResponse } from 'next/server'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    if (!id || typeof id !== 'string' || id.trim() === '') {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
    }

    const category = await CategoriesService.findById(id)

    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 })
    }

    return NextResponse.json(category)
  } catch (error: any) {
    console.error(`Error fetching category with ID ${params.id}:`, error?.message)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const body = await request.json()

    const updatedCategory = await CategoriesService.update(id, body)
    if (!updatedCategory) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 })
    }

    return NextResponse.json(updatedCategory)
  } catch (error: any) {
    console.error('Error updating category:', error?.message)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const success = await CategoriesService.delete(id)

    if (success) {
      return NextResponse.json({ message: 'Category deleted successfully' })
    } else {
      return NextResponse.json({ error: 'Failed to delete category' }, { status: 400 })
    }
  } catch (error: any) {
    console.error(`Error deleting category with ID ${params.id}:`, error?.message)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
