import './header-styles.css'
import { User, OpenMenu } from '@/presentation/components/header/components'

import React, { memo } from 'react'

const Header: React.FC = () => {
  return (
    <div className="header-wrap">
      <OpenMenu />
      <User />
    </div>
  )
}

export default memo(Header)
