import React from 'react'
import '../../styles/Button.css'
import '../../styles/Toggle.css'

function Toggle({ text, handleToggle, className }) {
  const defaultClassName = 'button toggle'

  return (
    <button onClick={handleToggle} className={className || defaultClassName}>
      {text}
    </button>
  )
}

export default Toggle
