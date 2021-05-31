import './open-dialog-button-styles.css'

import React from 'react'
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded'
import IconButton from '@material-ui/core/IconButton'

type Props = {
  handleOpenDialog: () => void
}

const OpenDialogButton: React.FC<Props> = ({ handleOpenDialog }: Props) => {
  return (
    <IconButton className="open-dialog-content" onClick={handleOpenDialog} tabIndex={-1}>
      <AddCircleRoundedIcon color="primary" />
    </IconButton>
  )
}

export default OpenDialogButton
