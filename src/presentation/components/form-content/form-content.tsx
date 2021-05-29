import './form-content-styles.css'
import React, { FormEvent } from 'react'

type Props = {
  handleSubmit?: (event: FormEvent) => void
}

const FormContent: React.FC<Props> = ({ handleSubmit, children }: any) => {
  return (
    <div className="form-content">
      <form onSubmit={handleSubmit}>
        {children}
      </form>
    </div>
  )
}

export default FormContent
