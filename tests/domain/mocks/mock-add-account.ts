import { AddAccount } from '@/domain/usecases'

import faker from 'faker'

export const mockAccountModel = (): AddAccount.Model => ({
  name: faker.name.findName(),
  accessToken: faker.datatype.uuid()
})

export const mockAddAccountParams = (): AddAccount.Params => {
  const password = faker.internet.password()
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password
  }
}
