export type PatrimonyModel = {
  id: number
  number: string
  brand: string
  description?: string
  category: {
    id: number
    name: string
  }
  owner: {
    id: number
    name: string
    sector: {
      id: number
      name: string
    }
  }
}
