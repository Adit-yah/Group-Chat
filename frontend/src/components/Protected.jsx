import React from 'react'
import { useEffect , useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { getData } from '../../hooks/localstorage'

const Protected = () => {
   
 const userData= getData('userData')
 console.log(userData);
 
 
 if(!userData) return <Navigate to={'/home'}  replace/>
 return <Outlet/>
}

export default Protected