import './dialog-content-styles.css'
import React from 'react'

const DialogContent: React.FC = ({ children }: any) => {
  return (
    <div className="dialog-content">
      {children}
    </div>
  )
}

export default DialogContent
