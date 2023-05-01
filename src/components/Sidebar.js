import React from 'react'
import '../styling/Chats.css'
import Chatnav from './Chatnav'
import Search from './Search'
import Userschats from './Userschats'

const Sidebar = (props) => {
  const {user,imagesrc}=props
  return (
    <div className='sidebar'>
      <Chatnav user={user} imagesrc={imagesrc}/>
      <Search curuser={user} imagesrc={imagesrc}/>
      <Userschats curuser={user}/>
    </div>
  )
}

export default Sidebar