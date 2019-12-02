import React from 'react'
import '../../styles/Button.css'

function Toggle({ text, handleToggle, className }) {
  const defaultClassName = 'button'

  return (
    <button onClick={handleToggle} className={className || defaultClassName}>
      {text}
    </button>
  )
}

export default Toggle
