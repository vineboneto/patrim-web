import { Button } from '@/presentation/components'

import React from 'react'
import DialogM from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'

type Props = {
  text: string
  open: boolean
  handleCloseDialog: () => void
  handleAction: (params?: any) => void
}

const Dialog: React.FC<Props> = (props: Props) => {
  return (
    <DialogM
      role="dialog"
      open={props.open}
      onClose={props.handleCloseDialog}
    >
      <DialogTitle>{props.text}</DialogTitle>
      <DialogActions className="dialog-actions" >
        <Button
          style={{ width: 'auto', height: 'auto' }}
          onClick={props.handleCloseDialog}
          role="close-button"
          color="primary"
          text="Fechar"
          variant="outlined"
        />
        <Button
          style={{ width: 'auto', height: 'auto' }}
          onClick={props.handleAction}
          data-testid="action-button"
          color="secondary"
          text="Excluir"
          variant="outlined"
        />
      </DialogActions>
    </DialogM>
  )
}

export default Dialog
