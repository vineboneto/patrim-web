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
          open={props.open}
          onClose={props.handleCloseDialog}
          role="dialog"
        >
          <DialogTitle>{props.text}</DialogTitle>
          <DialogActions className="dialog-actions" >
            <Button
              style={{ width: 'auto', height: 'auto' }}
              onClick={props.handleCloseDialog}
              data-testid="close-dialog"
              color="primary"
              text="Fechar"
              variant="outlined"
            />
            <Button
              style={{ width: 'auto', height: 'auto' }}
              onClick={props.handleAction}
              data-testid="delete-patrimony"
              color="secondary"
              text="Excluir"
              variant="outlined"
            />
          </DialogActions>
        </DialogM>
  )
}

export default Dialog
