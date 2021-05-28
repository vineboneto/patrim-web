import { Button } from '@/presentation/components'

import React from 'react'
import DialogM from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'

type Props = {
  title: string
  textActionDialog: string
  open: boolean
  handleCloseDialog: () => void
  handleAction: (params?: any) => void
  children?: any
}

const Dialog: React.FC<Props> = ({ handleAction, handleCloseDialog, open, title, textActionDialog, children }: Props) => {
  return (
    <DialogM
      role="dialog"
      open={open}
      onClose={handleCloseDialog}
    >
      <DialogTitle>{title}</DialogTitle>
      {children}
      <DialogActions className="dialog-actions" >
        <Button
          style={{ width: 'auto', height: 'auto' }}
          onClick={handleCloseDialog}
          role="close-button"
          color="primary"
          text="Fechar"
          variant="outlined"
        />
        <Button
          style={{ width: 'auto', height: 'auto' }}
          onClick={handleAction}
          data-testid="action-button"
          color="secondary"
          text={textActionDialog}
          variant="outlined"
        />
      </DialogActions>
    </DialogM>
  )
}

export default Dialog
