import React, { useState } from 'react'
import { User } from '../../App'
type Props = {
  setModal: (value: string)=> void
  user: User| null
}
export default function WelcomeUser({setModal, user}: Props) {

  return (
    <div>
      <div className="modal-wrapper">
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="modal-container"
        >
          <div className="modal-close">
            <button
              className="close-btn"
              onClick={() => {
                setModal('');
              }}
            >
              X
            </button>
            </div>
            <h2>Welcome, {user?.fullName}</h2>
            <h5>Finally you are here!</h5>
        </div>
      </div>
    </div>
  )
}
