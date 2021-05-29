import { FormContext, DialogContext, Combobox } from '@/presentation/components'
import { DialogContent, OpenDialogButton, FormOwner } from '@/presentation/pages/patrimony-create/components'

import React, { useContext } from 'react'

const DialogContentOwner: React.FC = () => {
  const { state, setState } = useContext(FormContext)
  const { validation, add, load } = useContext(DialogContext)

  const handleDialog = (value: boolean): void => {
    setState(old => ({ ...old, openDialogOwner: value }))
  }

  return (
    <DialogContent>
      <OpenDialogButton handleOpenDialog={() => handleDialog(true)} />
      <Combobox name="owner" placeholder="Proprietário" options={state.owners} />
      <FormOwner
        open={state.openDialogOwner}
        validation={validation}
        handleCloseDialog={() => handleDialog(false)}
        addOwner={add}
        loadSectors={load}
      />
    </DialogContent>
  )
}

export default DialogContentOwner
