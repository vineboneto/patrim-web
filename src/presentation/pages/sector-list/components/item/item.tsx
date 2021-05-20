import './item-styles.css'
import { ActionsList, Dialog } from '@/presentation/components'

import React, { useState } from 'react'

export type ItemProps = {
  id: string
  name: string
}

type Props = {
  sector: ItemProps
  handleDelete: (id: number) => void
}

const Item: React.FC<Props> = ({ sector, handleDelete }: Props) => {
  const [open, setOpen] = useState(false)

  const handleOpenDialog = (): void => setOpen(true)

  const handleCloseDialog = (): void => setOpen(false)

  return (
    <div className="col-12 col-md-6 col-lg-4" role="item">
      <div className="sector-item">
        <div className="item-body">
          <span>{sector.name}</span>
        </div>
        <footer>
          <ActionsList
            linkToEdit={`/sectors/update/${sector.id}`}
            handleOpenDialog={handleOpenDialog}
          />
        </footer>
        <Dialog
          open={open}
          text={`Tem certeza que deseja excluir esse setor: ${sector.name} ?`}
          handleAction={() => handleDelete(Number(sector.id))}
          handleCloseDialog={handleCloseDialog}
        />
      </div>
    </div >
  )
}

export default Item
