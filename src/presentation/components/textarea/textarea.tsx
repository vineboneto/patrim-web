import React, { TextareaHTMLAttributes } from 'react'
import TextField from '@material-ui/core/TextField'

type Props = TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea: React.FC<Props> = (props: Props) => {
  return (
    <div className="textarea-wrap">
      <TextField
        data-testid={`${props.name}`}
        style={{ width: '100%', margin: '10px 0' }}
        multiline
        rows={5}
        rowsMax={10}
        name={props.name}
        variant="outlined"
        label={props.placeholder}
        autoComplete="off"
      />
    </div>
  )
}

export default Textarea
