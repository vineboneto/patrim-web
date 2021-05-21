import { FormContext } from '@/presentation/components'

import React, { ButtonHTMLAttributes, useContext } from 'react'
import Button from '@material-ui/core/Button'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string
}

const SubmitButton: React.FC<Props> = ({ text, ...props }: Props) => {
  const { state } = useContext(FormContext)
  return (
    <Button
      style={ props.style || { height: '56px', marginTop: '30px' }}
      type="submit"
      data-testid="submit"
      variant="contained"
      color="primary"
      disabled={state.isFormInvalid}
    >
      {text}
    </Button>
  )
}

export default SubmitButton
