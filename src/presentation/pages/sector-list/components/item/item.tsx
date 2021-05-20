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
  name: string
}

type Props = {
  sector: ItemProps
  handleDelete: (id: number) => void
}

const Item: React.FC<Props> = ({ sector, handleDelete }: Props) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="col-12 col-md-6 col-lg-4" role="item">
      <div className="sector-item">
        <div className="item-body">
          <span>{sector.name}</span>
        </div>
        <footer>
          <IconButton>
            <Link to={`/sectors/update/${sector.id}`} role="link-update">
              <EditIcon color="primary" />
            </Link>
          </IconButton>
          <IconButton onClick={() => setOpen(true)} role="open-dialog">
            <DeleteIcon color="error" />
          </IconButton>
        </footer>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          role="dialog"
        >
          <DialogTitle>{`Tem certeza que deseja excluir esse setor: ${sector.name} ?`}</DialogTitle>
          <DialogActions className="dialog-actions" >
            <Button
              style={{ width: 'auto', height: 'auto' }}
              onClick={() => setOpen(false)}
              data-testid="close-dialog"
              color="primary"
              text="Fechar"
              variant="outlined"
            />
            <Button
              style={{ width: 'auto', height: 'auto' }}
              onClick={() => handleDelete(Number(sector.id))}
              data-testid="delete-patrimony"
              color="secondary"
              text="Excluir"
              variant="outlined"
            />
          </DialogActions>
        </Dialog>
      </div>
    </div >
  )
}

export default Item
