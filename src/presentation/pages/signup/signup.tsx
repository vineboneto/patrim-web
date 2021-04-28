import './signup-styles.css'
import { Input, Logo, FormStatus, FormContext, SubmitButton } from '@/presentation/components'
import { Validation } from '@/presentation/protocols'
import { AddAccount } from '@/domain/usecases'

import React, { FormEvent, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

type Props = {
  validation: Validation
  addAccount: AddAccount
}

const SignUp: React.FC<Props> = ({ validation, addAccount }: Props) => {
  const history = useHistory()
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
    console.log('Chamou')
    try {
      if (state.isFormInvalid || state.isLoading) return
      setState(old => ({ ...old, isLoading: true }))
      const { name, email, password, passwordConfirmation } = state
      await addAccount.add({
        name,
        email,
        password,
        passwordConfirmation
      })
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
    <FormContext.Provider value={{ state, setState }}>
      <div className="signup-wrap">
        <Logo />
        <div className="form-wrap">
          <div className="form-container">
            <h2>Crie sua Conta</h2>
            <form data-testid="form" onSubmit={handleSubmit}>
              <Input type="name" name="name" placeholder="Digite o seu nome" />
              <Input type="name" name="email" placeholder="Digite o seu email" />
              <Input type="password" name="password" placeholder="Digite a sua senha" />
              <Input type="password" name="passwordConfirmation" placeholder="Confirme a sua senha" />
              <SubmitButton text="Cadastrar" />
            </form>
          </div>
          <FormStatus />
        </div>
      </div>
    </FormContext.Provider>
  )
}

export default SignUp
