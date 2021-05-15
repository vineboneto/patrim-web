import './pagination-styles.css'

import React from 'react'
import PaginationM from '@material-ui/lab/Pagination'

type Props = {
  handleChange: (e: any, page: number) => void
  count: number
}

const Pagination: React.FC<Props> = ({ handleChange, count }: Props) => {
  return (
    <div className="col-12 pagination-wrap">
      <PaginationM
        data-testid="pagination"
        onChange={handleChange}
        count={count}
        size="large" color="primary"
      />
    </div>
  )
}

export default Pagination
