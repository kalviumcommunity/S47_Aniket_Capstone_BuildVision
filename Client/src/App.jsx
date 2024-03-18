import React from 'react'
import { Routes, Route } from 'react-router'
import ArchitectDetail from './Architect/ArchitectDetail'
import ClientDetail from './Client/ClientDetail'
import Homepage from './Common/Homepage'
import DesignPage from './Common/DesignPage'
import ArchiProfile from './Common/ArchiProfile'
import SignUp from './Common/Signup/SignUp'
import Login from './Common/Login/Login'
import Profile from './Common/Profile'

function App() {
  return(
    <>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path='/Login' element={<Login/>}></Route>
        <Route path='/SignUp' element={<SignUp/>}/>
        <Route path='/ArchiProfile' element={<ArchiProfile/>}></Route>
        <Route path="/DesignPage" element={<DesignPage/>}/>
        <Route path="/ArchitectureDetail" element={<ArchitectDetail />}/>
        <Route path="/ClientDetail" element={<ClientDetail/>}/>
        <Route path="/Profile/:role/:email" element={<Profile/>}/>
      </Routes>
    </>
  )
}

export default App