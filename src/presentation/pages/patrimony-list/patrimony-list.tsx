import './patrimony-list-styles.css'

import { Header } from '@/presentation/components'

import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'

const PatrimonyList: React.FC = () => {
  return (
    <div className="patrimony-list-wrap">
      <Header title="Patrimônios" />

      <aside className="sidebar">
        <ul>
          <li>
            <Link replace to="#">
              <Button>
                Patrimônios
              </Button>
            </Link>
          </li>
          <li>
            <Link replace to="#">
              <Button>
                Proprietários
              </Button>
            </Link>
          </li>
          <li>
            <Link replace to="#">
              <Button>
                Setores
              </Button>
            </Link>
          </li>
          <li>
            <Link replace to="#">
              <Button>
                Categorias
              </Button>
            </Link>
          </li>
        </ul>
      </aside>
      <div className="patrimony-items">
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
                <Button color="primary" variant="contained" >
                  Editar
                </Button>
              </Link>
              <Link replace to="#">
                <Button color="secondary" variant="contained" >
                  Excluir
                </Button>
              </Link>
            </div>
          </footer>
        </div>
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
                <Button color="primary" variant="contained" >
                  Editar
                </Button>
              </Link>
              <Link replace to="#">
                <Button color="secondary" variant="contained" >
                  Excluir
                </Button>
              </Link>
            </div>
          </footer>
        </div>
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
                <Button color="primary" variant="contained" >
                  Editar
                </Button>
              </Link>
              <Link replace to="#">
                <Button color="secondary" variant="contained" >
                  Excluir
                </Button>
              </Link>
            </div>
          </footer>
        </div>
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
                <Button color="primary" variant="contained" >
                  Editar
                </Button>
              </Link>
              <Link replace to="#">
                <Button color="secondary" variant="contained" >
                  Excluir
                </Button>
              </Link>
            </div>
          </footer>
        </div>
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
                <Button color="primary" variant="contained" >
                  Editar
                </Button>
              </Link>
              <Link replace to="#">
                <Button color="secondary" variant="contained" >
                  Excluir
                </Button>
              </Link>
            </div>
          </footer>
        </div>
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
                <Button color="primary" variant="contained" >
                  Editar
                </Button>
              </Link>
              <Link replace to="#">
                <Button color="secondary" variant="contained" >
                  Excluir
                </Button>
              </Link>
            </div>
          </footer>
        </div>
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
                <Button color="primary" variant="contained" >
                  Editar
                </Button>
              </Link>
              <Link replace to="#">
                <Button color="secondary" variant="contained" >
                  Excluir
                </Button>
              </Link>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default PatrimonyList
