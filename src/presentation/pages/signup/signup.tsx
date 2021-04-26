import React from 'react'
import { Input, Logo } from '@/presentation/components'

import './signup-styles.css'

const SignUp: React.FC = () => {
  return (
    <div className="signup-wrap">
      <Logo />
      <div className="form-wrap">
        <div className="form-container container">
          <h2>Crie sua Conta</h2>
          <form>
            <Input type="name" name="name" placeholder="Digite o seu nome" />
            <Input type="name" name="email" placeholder="Digite o seu email" />
            <Input type="password" name="password" placeholder="Digite a sua senha" />
            <Input type="password" name="password-confirmation" placeholder="Confirme a sua senha" />
          </form>
          <button type="button" className="btn btn-primary">Criar conta</button>
        </div>
      </div>
    </div>
  )
}

export default SignUp
