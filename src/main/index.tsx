import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-grid.css'
import '@/presentation/styles/global.css'

import React from 'react'
import ReactDOM from 'react-dom'
import Router from '@/main/router/router'

ReactDOM.render(
  <Router />,
  document.getElementById('root')
)
