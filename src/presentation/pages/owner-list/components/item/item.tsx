import './item-styles.css'
import { ActionsList, Dialog } from '@/presentation/components'

import React, { useState } from 'react'

export type ItemProps = {
  id: string
  name: string
  sector: string
}

type Props = {
  owner: ItemProps
  handleDelete: (id: number) => void
}

const Item: React.FC<Props> = ({ owner, handleDelete }: Props) => {
  const [open, setOpen] = useState(false)

  const handleOpenDialog = (): void => setOpen(true)

  const handleCloseDialog = (): void => setOpen(false)

  return (
    <div className="col-12 col-md-6 col-lg-4" role="item">
      <div className="owner-item" data-testid="owner-item">
        <div className="item-body">
          <h5>{owner.name}</h5>
        </div>
        <footer>
          <p><span>Setor:</span> {owner.sector}</p>
          <div className="action-wrap">
            <ActionsList
              linkToEdit={`/owners/update/${owner.id}`}
              handleOpenDialog={handleOpenDialog}
            />
          </div>
        </footer>
        <Dialog
          open={open}
          text={`Tem certeza que deseja excluir esse proprietário: ${owner.name} ?`}
          handleCloseDialog={handleCloseDialog}
          handleAction={() => {
            handleDelete(Number(owner.id))
            handleCloseDialog()
          }}
        />
      </div>
    </div >
  )
}

export default Item
