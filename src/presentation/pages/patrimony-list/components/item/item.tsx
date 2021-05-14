import './item-styles.css'

import React from 'react'
import { Link } from 'react-router-dom'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

const Item: React.FC = () => {
  return (
    <div className="patrimony-item">
      <div className="item-body">
        <h5>Computador<span>86521</span></h5>
        <p><span>Proprietário:</span> Vinicius</p>
        <p><span>Marca:</span> Dell</p>
        <p><span>Setor:</span> UPA</p>
      </div>
      <footer>
        <div className="link-group">
          <Link replace to="#">
            <EditIcon color="primary" />
          </Link>
          <Link replace to="#">
            <DeleteIcon color="error" />
          </Link>
        </div>
      </footer>
    </div>
  )
}

export default Item
