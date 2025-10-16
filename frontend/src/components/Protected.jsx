import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const Protected = () => {
    const userData = true
 if(!userData) return <Navigate to={'/home'}  replace/>
 return <Outlet/>
}

export default Protected