import { makeSignUp } from '@/main/factories/pages'
import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '@/main/adapters'
import { ApiContext } from '@/presentation/components'
import { Validation } from '@/presentation/protocols'
import { Login } from '@/presentation/pages'
import { Authentication } from '@/domain/usecases'

import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

export class ValidationStub implements Validation {
  errorMessage: string

  validate (fieldName: string, input: object): string {
    return this.errorMessage
  }
}

export class AuthenticationSpy implements Authentication {
  params: Authentication.Params
  account = null
  callsCount = 0

  async auth (params: Authentication.Params): Promise<Authentication.Model> {
    this.callsCount++
    this.params = params
    return this.account
  }
}

export const makeLogin: React.FC = () => {
  return (
    <Login
      validation={new ValidationStub()}
      authentication={new AuthenticationSpy()}
    />
  )
}

const Router: React.FC = () => {
  return (
    <ApiContext.Provider value={{
      setCurrentAccount: setCurrentAccountAdapter,
      getCurrentAccount: getCurrentAccountAdapter
    }}>
      <BrowserRouter>
        <Switch>
          <Route path="/signup" exact component={makeSignUp} />
          <Route path="/login" exact component={makeLogin} />
        </Switch>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Router
