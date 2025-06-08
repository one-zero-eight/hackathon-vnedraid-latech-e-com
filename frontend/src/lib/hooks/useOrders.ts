export const getOrders = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URLP}/orders`)
  if (!res.ok) {
    throw new Error('Failed to fetch orders')
  }

  return res.json()
}
