import './patrimony-list-styles.css'

import { Header } from '@/presentation/components'

import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Pagination from '@material-ui/lab/Pagination'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

const PatrimonyList: React.FC = () => {
  return (
    <div className="patrimony-list-wrap">
      <Header title="Patrimônios" />
      <div className="container patrimony-list-content">
        <div className="row gy-4">
          <div className="col-12">
            <Link to="/patrimonies/new">
            <Button variant="contained" color="primary" style={{ width: '100%' }}>Novo</Button>
            </Link>
          </div>
          <div className="col-12 col-md-6 col-lg-4">
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
          </div>
          <div className="col-12 col-md-6 col-lg-4">
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
          </div>
          <div className="col-12 col-md-6 col-lg-4">
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
          </div>
          <div className="col-12 col-md-6 col-lg-4">
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
          </div>
          <div className="col-12 col-md-6 col-lg-4">
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
          </div>
        </div>
        <div className="row">
          <div className="col-12 pagination-wrap">
            <Pagination count={1} size="large" color="primary" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatrimonyList
