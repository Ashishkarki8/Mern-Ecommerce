import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
<div className="flex w-full min-h-screen border border-4 border-red-800">

<div className="items-center justify-center hidden w-1/2 px-12 bg-black border border-2 border-yellow-600 lg:flex">
  <div className="max-w-md space-y-6 text-center border border-2 border-blue-600 text-primary-foreground">
    <h1 className="text-4xl font-extrabold tracking-tight ">welcome to the ecommerce </h1>
  </div>
 
</div>
<div className="flex items-center justify-center flex-1 px-4 py-12 bg-background sm:px-6 ">
    <Outlet/>  {/* others layout */}  {/* login rah register which is child routes ko lagi pani yo mathi ko layout apply huncha */}
  </div>
</div>
)
}

export default AuthLayout