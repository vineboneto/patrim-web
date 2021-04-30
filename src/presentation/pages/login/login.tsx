import './login-styles.css'
import { FormContext, FormStatus, Input, LoginContainer, Logo, SubmitButton } from '@/presentation/components'
import { Validation } from '@/presentation/protocols'

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

type Props = {
  validation: Validation
}

const Login: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    mainError: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: ''
  })

  useEffect(() => { validate('email') }, [state.email])
  useEffect(() => { validate('password') }, [state.password])

  const validate = (field: string): void => {
    const { email, password } = state
    const formData = { email, password }
    setState(old => ({ ...old, [`${field}Error`]: validation.validate(field, formData) }))
    setState(old => ({
      ...old,
      isFormInvalid: !!old.emailError || !!old.passwordError
    }))
  }

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
              <Link data-testid="signup-link" replace to="/signup" className="link">Criar uma conta</Link>
            </div>
            <FormStatus />
          </form>
        </LoginContainer>
      </FormContext.Provider>
    </div>
  )
}

export default Login
