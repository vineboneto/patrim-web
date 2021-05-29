import './input-group-styles.css'
import React from 'react'

const InputGroup: React.FC = ({ children }: any) => {
  return (
    <div className="input-group">
      {children}
    </div>
  )
}

export default InputGroup
