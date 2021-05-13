import { makeSignUp, makeLogin, makePatrimonyCreate, makePatrimonyList } from '@/main/factories/pages'
import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '@/main/adapters'
import { ApiContext, PrivateRoute } from '@/presentation/components'

import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

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
          <PrivateRoute path="/" exact component={makePatrimonyList} />
          <PrivateRoute path="/patrimonies/new" exact component={makePatrimonyCreate} />
        </Switch>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Router
