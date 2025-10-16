import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Protected from './components/Protected'
import Home from './pages/Home/Home'
import ChatRoom from './pages/Chat/ChatRoom'
import './global.css'

const App = () => {
  
  return (
   <Routes>

    {/* INTERACTION */}
    <Route path='/' element={<Navigate to={'/home'} replace />} />]
    <Route  path='/home' element={<Home/>} />

    {/*PROTECTED ROUTE WRAPPER */}
    <Route element={<Protected/>}>
    <Route path={'/chat'} element={<ChatRoom/>} />
    </Route>

    {/* ERROR */}
    <Route path='/*' element={<div>You are on wrong path dude</div>}  />
   </Routes>
  )
} 

export default App