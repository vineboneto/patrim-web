import './login-container-styles.css'

import React from 'react'

const LoginContainer: React.FC = ({ children }: any) => {
  return (
    <div className="form-login-wrap">
      {children}
    </div>
  )
}

export default LoginContainer
