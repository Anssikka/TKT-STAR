import React from 'react'
import '../../styles/Notification.css'

function Notification({ text }) {
  if (text) {
    return (
      <div>
        <p className="notification">{text}</p>
      </div>
    )
  } else {
    return null
  }
}

export default Notification
