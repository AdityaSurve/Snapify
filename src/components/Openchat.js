import React, { useContext } from 'react'
import '../styling/Chats.css'
import Messages from './Messages'
import Inputfield from './Inputfield'
import { Chatcontext } from '../context/notes/Chatcontext'

const Openchat = ({ user }) => {
  const { data } = useContext(Chatcontext)
  return (
    <div className='openchat'>
      <div className="openchatinfo">
        <img src={data.user.imageURL} alt="" id='searchimage' />
        <span className='openchatspan'>{data?.user?.name}</span>
      </div>
      <Messages user={user} />
      <Inputfield />
    </div>
  )
}

export default Openchat