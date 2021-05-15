import './item-styles.css'

import React from 'react'
import { Link } from 'react-router-dom'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

export type ItemProps = {
  id: string
  number: string
  brand: string
  category: string
  owner: string
  sector: string
}

export type Props = {
  patrimony: ItemProps
}

const Item: React.FC<Props> = ({ patrimony }: Props) => {
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
          <Link to={`/patrimonies/update/${patrimony.id}`} role="link-update">
            <EditIcon color="primary" />
          </Link>
          <Link replace to="#">
            <DeleteIcon color="error" />
          </Link>
        </footer>
      </div>
    </div>
  )
}

export default Item
