import {
  makeSignUp,
  makeLogin,
  makePatrimonyCreate,
  makePatrimonyUpdate,
  makePatrimonyList,
  makeSectorList,
  makeSectorCreate,
  makeSectorUpdate,
  makeCategoryList,
  makeCategoryCreate,
  makeCategoryUpdate,
  makeOwnerList,
  makeOwnerCreate,
  makeOwnerUpdate
} from '@/main/factories/pages'
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
          <PrivateRoute path="/patrimonies/update/:id" exact component={makePatrimonyUpdate} />
          <PrivateRoute path="/sectors" exact component={makeSectorList} />
          <PrivateRoute path="/sectors/new" exact component={makeSectorCreate} />
          <PrivateRoute path="/sectors/update/:id" exact component={makeSectorUpdate} />
          <PrivateRoute path="/categories" exact component={makeCategoryList} />
          <PrivateRoute path="/categories/new" exact component={makeCategoryCreate} />
          <PrivateRoute path="/categories/update/:id" exact component={makeCategoryUpdate} />
          <PrivateRoute path="/owners" exact component={makeOwnerList} />
          <PrivateRoute path="/owners/new" exact component={makeOwnerCreate} />
          <PrivateRoute path="/owners/update/:id" exact component={makeOwnerUpdate} />
        </Switch>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Router
