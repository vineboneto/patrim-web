import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import SignUp from '@/presentation/pages/signup/signup'
import { Validation } from '@/presentation/protocols'

class ValidationStub implements Validation {
  errorMessage: string

  validate (fieldName: string, input: object): string {
    return this.errorMessage
  }
}

const makeSignUp: React.FC = () => {
  return (
    <SignUp
      validation={new ValidationStub()}
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
