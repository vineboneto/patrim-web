import './item-styles.css'
import { ActionsList, Dialog } from '@/presentation/components'

import React, { useState } from 'react'

export type ItemProps = {
  id: string
  name: string
}

type Props = {
  category: ItemProps
  handleDelete: (id: number) => void
}

const Item: React.FC<Props> = ({ category, handleDelete }: Props) => {
  const [open, setOpen] = useState(false)

  const handleOpenDialog = (): void => setOpen(true)

  const handleCloseDialog = (): void => setOpen(false)

  return (
    <div className="col-12 col-md-6 col-lg-4" role="item">
      <div className="category-item" data-testid="category-item">
        <div className="item-body">
          <span>{category.name}</span>
        </div>
        <footer>
          <ActionsList
            linkToEdit={`/categories/update/${category.id}`}
            handleOpenDialog={handleOpenDialog}
          />
        </footer>
        <Dialog
          open={open}
          text={`Tem certeza que deseja excluir esse setor: ${category.name} ?`}
          handleCloseDialog={handleCloseDialog}
          handleAction={() => {
            handleDelete(Number(category.id))
            handleCloseDialog()
          }}
        />
      </div>
    </div >
  )
}

export default Item
