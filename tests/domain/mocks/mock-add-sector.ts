import { AddSector } from '../usecases'

import faker from 'faker'

export const mockAddSectorParams = (): AddSector.Params => ({
  name: faker.name.findName()
})
