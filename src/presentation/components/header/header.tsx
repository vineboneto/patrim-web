import './header-styles.css'
import { User, OpenMenu } from '@/presentation/components/header/components'

import React, { memo } from 'react'

type Props = {
  title: string
}

const Header: React.FC<Props> = ({ title }: Props) => {
  return (
    <div className="header-wrap">
      <OpenMenu />
      <h2>{title}</h2>
      <User />
    </div>
  )
}

export default memo(Header)
