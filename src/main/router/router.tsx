import { makeSignUp, makeLogin } from '@/main/factories/pages'
import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '@/main/adapters'
import { ApiContext } from '@/presentation/components'

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
        </Switch>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Router
