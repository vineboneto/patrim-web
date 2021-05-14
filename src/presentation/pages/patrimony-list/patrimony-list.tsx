import './patrimony-list-styles.css'

import { Header, Input, FormContext } from '@/presentation/components'

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Pagination from '@material-ui/lab/Pagination'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

const PatrimonyList: React.FC = () => {
  const [state, setState] = useState({
    isLoading: false,
    number: '',
    category: '',
    owner: ''
  })

  return (
    <div className="patrimony-list-wrap">
      <Header title="Patrimônios" />
      <div className="container patrimony-list-content">
        <div className="row gy-4">
          <FormContext.Provider value={{ state, setState }}>
            <form className="form-content">
              <div className="row">
                <div className="col-12 col-lg-3">
                  <Input type="text" name="owner" placeholder="Proprietário" />
                </div>
                <div className="col-12 col-lg-3">
                  <Input type="text" name="number" placeholder="Número" />
                </div>
                <div className="col-12 col-lg-3">
                  <Input name="category" placeholder="Categoria" />
                </div>
                <div className="col-12 col-lg-3">
                  <Button variant="outlined" color="primary" style={{ width: '100%', height: '56px' }}>Pesquisar</Button>
                </div>
              </div>
            </form>
          </FormContext.Provider>
          <div className="col-12">
            <Link to="/patrimonies/new">
              <Button variant="contained" color="primary" style={{ width: '100%', height: '56px' }}>Novo</Button>
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
