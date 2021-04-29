import './signup-styles.css'
import { Input, Logo, FormStatus, FormContext, SubmitButton, ApiContext } from '@/presentation/components'
import { Validation } from '@/presentation/protocols'
import { AddAccount } from '@/domain/usecases'

import React, { FormEvent, useContext, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

type Props = {
  validation: Validation
  addAccount: AddAccount
}

const SignUp: React.FC<Props> = ({ validation, addAccount }: Props) => {
  const history = useHistory()
  const { setCurrentAccount } = useContext(ApiContext)
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    mainError: '',
    name: '',
    nameError: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
    passwordConfirmation: '',
    passwordConfirmationError: ''
  })

  useEffect(() => { validate('name') }, [state.name])
  useEffect(() => { validate('email') }, [state.email])
  useEffect(() => { validate('password') }, [state.password])
  useEffect(() => { validate('passwordConfirmation') }, [state.passwordConfirmation])

  const validate = (field: string): void => {
    const { name, email, password, passwordConfirmation } = state
    const formData = { name, email, password, passwordConfirmation }
    setState(old => ({ ...old, [`${field}Error`]: validation.validate(field, formData) }))
    setState(old => ({
      ...old,
      isFormInvalid: !!old.nameError || !!old.emailError || !!old.passwordError || !!old.passwordConfirmationError
    }))
  }

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isFormInvalid || state.isLoading) return
      setState(old => ({ ...old, isLoading: true }))
      const { name, email, password, passwordConfirmation } = state
      const account = await addAccount.add({
        name,
        email,
        password,
        passwordConfirmation
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
    <div className="signup-wrap">
      <Logo />
      <FormContext.Provider value={{ state, setState }}>
        <div className="form-wrap">
          <form data-testid="form" onSubmit={handleSubmit}>
            <h2>Crie sua Conta</h2>
            <Input type="name" name="name" placeholder="Digite o seu nome" />
            <Input type="name" name="email" placeholder="Digite o seu email" />
            <Input type="password" name="password" placeholder="Digite a sua senha" />
            <Input type="password" name="passwordConfirmation" placeholder="Confirme a sua senha" />
            <div className="action-wrap">
              <SubmitButton text="Cadastrar" />
              <Link data-testid="login-link" replace to="/login" className="link">Voltar para login</Link>
            </div>
          </form>
          <FormStatus />
        </div>
      </FormContext.Provider>
    </div>
  )
}

export default SignUp
