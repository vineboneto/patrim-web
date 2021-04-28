import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import SignUp from '@/presentation/pages/signup/signup'
import { Validation } from '@/presentation/protocols'
import { AddAccount } from '@/domain/usecases'

class ValidationStub implements Validation {
  errorMessage: string

  validate (fieldName: string, input: object): string {
    return this.errorMessage
  }
}

class AddAccountSpy implements AddAccount {
  params: AddAccount.Params
  account = null
  callsCount = 0

  async add (params: AddAccount.Params): Promise<AddAccount.Model> {
    this.callsCount++
    this.params = params
    return this.account
  }
}

const makeSignUp: React.FC = () => {
  return (
    <SignUp
      validation={new ValidationStub()}
      addAccount={new AddAccountSpy()}
    />
  )
}

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signup" exact component={makeSignUp} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
