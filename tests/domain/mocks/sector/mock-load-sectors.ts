import { LoadSectors } from '@/domain/usecases'
import { mockSectorsModel } from '@/tests/domain/mocks'

export const mockLoadSectorsParams = (): LoadSectors.Params => ({
  skip: 0,
  take: 9
})

export class LoadSectorsSpy implements LoadSectors {
  callsCount = 0
  params: LoadSectors.Params
  data = {
    model: mockSectorsModel(),
    count: mockSectorsModel().length
  }

  async load (params: LoadSectors.Params): Promise<LoadSectors.Model> {
    this.params = params
    this.callsCount++
    return this.data
  }
}
