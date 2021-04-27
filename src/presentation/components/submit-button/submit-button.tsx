import { FormContext } from '@/presentation/components'

import React, { useContext } from 'react'

type Props = {
  text: string
}

const SubmitButton: React.FC<Props> = ({ text }: Props) => {
  const { state } = useContext(FormContext)
  return (
     <button
      data-testid="submit"
      type="submit"
      className="btn btn-primary btn-lg"
      disabled={state.isFormInvalid}
    >
      {text}
    </button>
  )
}

export default SubmitButton
