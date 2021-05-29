import './login-styles.css'
import { ApiContext, FormContext, FormStatus, Input, LoginContainer, Logo, SubmitButton, TitleForm } from '@/presentation/components'
import { Validation } from '@/presentation/protocols'
import { Authentication } from '@/domain/usecases'

import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

type Props = {
  validation: Validation
  authentication: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const { setCurrentAccount } = useContext(ApiContext)
  const history = useHistory()
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
      if (state.isFormInvalid || state.isLoading) return
      setState(old => ({ ...old, isLoading: true }))
      const { email, password } = state
      const account = await authentication.auth({
        email,
        password
      })
      setCurrentAccount(account)
      history.replace('/')
    } catch (error) {
      setState(old => ({
        ...old,
        mainError: error.message,
        isLoading: false
      }))
    }
  }

  return (
    <div className="login-wrap">
      <Logo />
      <FormContext.Provider value={{ state, setState }}>
        <LoginContainer>
          <form data-testid="form" onSubmit={handleSubmit}>
            <TitleForm>Login</TitleForm>
            <Input type="text" name="email" placeholder="Digite o seu email" />
            <Input type="password" name="password" placeholder="Digite a sua senha" />
            <div className="action-wrap">
              <SubmitButton text="Entrar" style={{ height: 'auto', width: 'auto' }} />
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
