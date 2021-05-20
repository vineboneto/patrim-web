import { FormContext } from '@/presentation/components'

import React, { useContext } from 'react'
import Button from '@material-ui/core/Button'

type Props = {
  text: string
}

const SubmitButton: React.FC<Props> = ({ text }: Props) => {
  const { state } = useContext(FormContext)
  return (
    <Button
      style={{ height: '56px', marginTop: '30px' }}
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
