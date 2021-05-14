import React from 'react'
import ButtonM from '@material-ui/core/Button'

type Props = {
  text: string
  variant: 'text' | 'outlined' | 'contained'
  color: 'primary' | 'secondary'
}

const Button: React.FC<Props> = (props: Props) => {
  return (
    <ButtonM
      { ...props }
      variant={props.variant}
      className="button-wrap"
      color={props.color}
      style={{ width: '100%', height: '56px' }}
    >
      {props.text}
    </ButtonM>
  )
}

export default Button
