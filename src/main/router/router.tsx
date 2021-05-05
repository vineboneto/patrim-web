import { makeSignUp, makeLogin, makeHome } from '@/main/factories/pages'
import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '@/main/adapters'
import { ApiContext, PrivateRoute } from '@/presentation/components'
import { PatrimonyCreate } from '@/presentation/pages'

import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Validation } from '@/presentation/protocols'

class ValidationStub implements Validation {
  validate (fieldName: string, input: object): string {
    return ''
  }
}

const makePatrimonyCreate: React.FC = () => {
  return (
    <PatrimonyCreate validation={new ValidationStub()} />
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
          <PrivateRoute path="/" exact component={makeHome} />
          <PrivateRoute path="/patrimonies/new" exact component={makePatrimonyCreate} />
        </Switch>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Router
