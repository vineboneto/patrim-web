import './item-styles.css'
import { ActionsList, Dialog } from '@/presentation/components'

import React, { useState } from 'react'

export type ItemProps = {
  id: string
  number: string
  brand: string
  category: string
  owner: string
  sector: string
}

type Props = {
  patrimony: ItemProps
  handleDelete: (id: number) => void
}

const Item: React.FC<Props> = ({ patrimony, handleDelete }: Props) => {
  const [open, setOpen] = useState(false)

  const handleOpenDialog = (): void => setOpen(true)

  const handleCloseDialog = (): void => setOpen(false)

  return (
    <div className="col-12 col-md-6 col-lg-4" role="item">
      <div className="patrimony-item">
        <div className="item-body">
          <h5>{patrimony.category}<span>{patrimony.number}</span></h5>
          <p><span>Proprietário:</span> {patrimony.owner}</p>
          <p><span>Marca:</span> {patrimony.brand}</p>
          <p><span>Setor:</span> {patrimony.sector}</p>
        </div>
        <footer>
          <ActionsList
            linkToEdit={`/patrimonies/update/${patrimony.id}`}
            handleOpenDialog={handleOpenDialog}
          />
        </footer>
        <Dialog
          open={open}
          handleCloseDialog={handleCloseDialog}
          handleAction={() => {
            handleDelete(Number(patrimony.id))
            handleCloseDialog()
          }}
          text={`Tem certeza que deseja excluir esse patrimônio: ${patrimony.number} ?`}
        />
      </div>
    </div >
  )
}

export default Item
