import { FormContext, DialogContext, Combobox } from '@/presentation/components'
import { DialogContent, OpenDialogButton, FormCategory } from '@/presentation/pages/patrimony-create/components'

import React, { useContext } from 'react'

const DialogContentCategory: React.FC = () => {
  const { state, setState } = useContext(FormContext)
  const { validation, add } = useContext(DialogContext)

  const handleDialog = (value: boolean): void => {
    setState(old => ({ ...old, openDialogCategory: value }))
  }

  return (
    <DialogContent>
      <OpenDialogButton handleOpenDialog={() => handleDialog(true)} />
      <Combobox name="category" placeholder="Categoria" options={state.categories} />
      <FormCategory
        open={state.openDialogCategory}
        validation={validation}
        handleCloseDialog={() => handleDialog(false)}
        addCategory={add}
      />
    </DialogContent>
  )
}

export default DialogContentCategory
