import { Button } from '@/presentation/components'

import React from 'react'
import { Link } from 'react-router-dom'

const ButtonNew: React.FC = () => {
  return (
    <Link to="/patrimonies/new" data-testid="patrimonies-new">
      <Button variant="contained" color="primary" text="Novo" />
    </Link>
  )
}

export default ButtonNew
