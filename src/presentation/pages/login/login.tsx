import './login-styles.css'
import { FormContext, FormStatus, Input, LoginContainer, Logo, SubmitButton } from '@/presentation/components'

import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login: React.FC = () => {
  const [state, setState] = useState({

  })

  return (
    <div className="login-wrap">
      <Logo />
      <FormContext.Provider value={{ state, setState }}>
        <LoginContainer>
          <form data-testid="form">
            <h2>Login</h2>
            <Input type="name" name="email" placeholder="Digite o seu email" />
            <Input type="password" name="password" placeholder="Digite a sua senha" />
            <div className="action-wrap">
              <SubmitButton text="Cadastrar" />
              <Link data-testid="login-link" replace to="/login" className="link">Criar uma conta</Link>
            </div>
            <FormStatus />
          </form>
        </LoginContainer>
      </FormContext.Provider>
    </div>
  )
}

export default Login
