import React, { useEffectEvent } from 'react'
import { useEffect , useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { getData } from '../../hooks/localstorage'

const Protected = () => {
   
 const [isUserExist, setIsUserExist] = useState(false)

 const userData = getData('userData')

 const setExistence = useEffectEvent(()=>{
   !isUserExist ?   setIsUserExist(true) : ''
 })

 useEffect(()=>{
    if(!userData) return
    setExistence()
 } , [userData])

 
 
 if(!userData) return <Navigate to={'/home'}  replace/>
 return <Outlet/>
}

export default Protected