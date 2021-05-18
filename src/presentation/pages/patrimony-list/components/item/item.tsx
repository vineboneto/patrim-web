import './item-styles.css'
import { Button } from '@/presentation/components'

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import IconButton from '@material-ui/core/IconButton'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'

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
          <IconButton>
            <Link to={`/patrimonies/update/${patrimony.id}`} role="link-update">
              <EditIcon color="primary" />
            </Link>
          </IconButton>
          <IconButton onClick={() => setOpen(true)} role="open-dialog">
            <DeleteIcon color="error" />
          </IconButton>
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
          >
            <DialogTitle>{`Tem certeza que deseja excluir esse patrimônio: ${patrimony.number} ?`}</DialogTitle>
            <DialogActions>
              <Button
                onClick={() => setOpen(false)}
                color="primary"
                text="Fechar"
                variant="text"
              />
              <Button
                onClick={() => handleDelete(Number(patrimony.id))}
                data-testid="delete-patrimony"
                color="primary"
                text="Excluir"
                variant="text"
              />
            </DialogActions>
          </Dialog>
        </footer>
      </div>
    </div >
  )
}

export default Item
