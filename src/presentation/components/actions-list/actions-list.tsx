import React from 'react'
import { Link } from 'react-router-dom'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import IconButton from '@material-ui/core/IconButton'

type Props = {
  linkToEdit: string
  handleOpenDialog: () => void
}

const ActionsList: React.FC<Props> = ({ linkToEdit, handleOpenDialog }: Props) => {
  return (
    <>
      <IconButton>
        <Link to={linkToEdit} role="link-update">
          <EditIcon color="primary" />
        </Link>
      </IconButton>
      <IconButton onClick={handleOpenDialog} role="open-dialog">
        <DeleteIcon color="error" />
      </IconButton>
    </>
  )
}

export default ActionsList
