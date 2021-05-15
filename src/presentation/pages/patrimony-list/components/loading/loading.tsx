import './loading-styles.css'
import { Loading as LoadingG } from '@/presentation/components'

import React from 'react'

const Loading: React.FC = () => {
  return (
    <div className="col-12 loading">
      <LoadingG />
    </div>
  )
}

export default Loading
