import './login-styles.css'
import { FormContext, FormStatus, Input, LoginContainer, Logo, SubmitButton } from '@/presentation/components'
import { Validation } from '@/presentation/protocols'
import { Authentication } from '@/domain/usecases'

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

type Props = {
  validation: Validation
  authentication: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    try {
      setState(old => ({ ...old, isLoading: true }))
      const { email, password } = state
      await authentication.auth({
        email,
        password
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="login-wrap">
      <Logo />
      <FormContext.Provider value={{ state, setState }}>
        <LoginContainer>
          <form data-testid="form" onSubmit={handleSubmit}>
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
