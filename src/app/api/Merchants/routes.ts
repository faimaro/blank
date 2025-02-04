import { MerchantsService } from '@/services/merchants.service'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    const merchantId = searchParams.get('merchantId')
    const activeOnly = searchParams.get('activeOnly') === 'true'
    const name = searchParams.get('name')
    const branchId = searchParams.get('branchId')

    if (merchantId) {
      return NextResponse.json(await MerchantsService.findByMerchant(merchantId))
    }

    if (activeOnly) {
      return NextResponse.json(await MerchantsService.findActive())
    }

    if (name) {
      return NextResponse.json(await MerchantsService.findByName(name))
    }

    if (branchId) {
      return NextResponse.json(await MerchantsService.findById(branchId))
    }

    return NextResponse.json(await MerchantsService.findAll())
  } catch (error) {
    console.error('Error fetching merchants:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
