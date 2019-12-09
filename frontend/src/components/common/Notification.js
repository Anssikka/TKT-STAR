import React from 'react'
import '../../styles/Notification.css'

function Notification({text}) {
  console.log(text)
  if (text) {
  return (
    <div>
      <p class="notification">{text}</p>
    </div>
  )
  } else { 
    return null
  }
}

export default Notification
