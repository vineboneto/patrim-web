import { Button } from '@/presentation/components'

import React from 'react'
import { Link } from 'react-router-dom'

const ButtonNew: React.FC = () => {
  return (
    <div className="col-12">
      <Link to="/patrimonies/new" data-testid="link-new">
        <Button variant="contained" color="primary" text="Novo" />
      </Link>
    </div>
  )
}

export default ButtonNew
