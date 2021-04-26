import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import SignUp from '@/presentation/pages/signup/signup'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signup" exact component={SignUp} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
