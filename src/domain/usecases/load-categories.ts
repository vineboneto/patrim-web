export interface LoadCategories {
  load (): Promise<LoadCategories.Model[]>
}

export namespace LoadCategories {
  export type Model = {
    id: number
    name: string
  }
}
