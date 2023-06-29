'use client'

import { useSearchParams } from 'next/navigation'

function ProductDetail() {
  const router = useSearchParams()
  const level = router.get('level')
  return <h1>Details about product {level}</h1>
}

export default ProductDetail