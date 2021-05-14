import React from 'react'
import ButtonM from '@material-ui/core/Button'

type Props = {
  text: string
  variant?: 'text' | 'outlined' | 'contained'
  color?: 'primary' | 'secondary'
}

const Button: React.FC<Props> = ({ text, variant, color }: Props) => {
  return (
    <ButtonM
      variant={variant}
      className="button-wrap"
      color={color}
      style={{ width: '100%', height: '56px' }}
    >
      {text}
    </ButtonM>
  )
}

export default Button
