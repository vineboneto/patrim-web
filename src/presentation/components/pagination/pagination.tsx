import './pagination-styles.css'
import { LoadContext } from '@/presentation/components'

import React, { useContext } from 'react'
import PaginationM from '@material-ui/lab/Pagination'

const Pagination: React.FC = () => {
  const { state, setState } = useContext(LoadContext)

  const handleChangePagination = (e: any, page: number): void => {
    setState({
      ...state,
      currentPage: page,
      skip: (page - 1) * state.take
    })
  }

  return (
    <div className="col-12 pagination-wrap">
      <PaginationM
        data-testid="pagination"
        onChange={handleChangePagination}
        count={state.totalPage}
        page={state.currentPage}
        size="large" color="primary"
      />
    </div>
  )
}

export default Pagination
