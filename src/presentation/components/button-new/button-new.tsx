import { Button } from '@/presentation/components'

import React from 'react'
import { Link } from 'react-router-dom'

type Props = {
  to: string
}

const ButtonNew: React.FC<Props> = ({ to }: Props) => {
  return (
    <div className="col-12">
      <Link to={to} data-testid="link-new">
        <Button variant="contained" color="primary" text="Novo" />
      </Link>
    </div>
  )
}

export default ButtonNew
