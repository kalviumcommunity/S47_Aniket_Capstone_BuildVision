import React from 'react'
import { Routes, Route } from 'react-router'
import ArchitectDetail from './Architect/ArchitectDetail'
import ClientDetail from './Client/ClientDetail'
import Homepage from './Common/Homepage'
import DesignPage from './Common/DesignPage'
import Archiprofile from './Common/Archiprofile'
import SignUp from './Common/Signup/SignUp'
import Login from './Common/Login/Login'

function App() {
  return(
    <>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path='/Login' element={<Login/>}></Route>
        <Route path='/SignUp' element={<SignUp/>}/>
        <Route path='/Archiprofile' element={<Archiprofile/>}></Route>
        <Route path="/DesignPage" element={<DesignPage/>}/>
        <Route path="/ArchitectureDetail" element={<ArchitectDetail />}/>
        <Route path="/ClientDetail" element={<ClientDetail/>}/>
      </Routes>
    </>
  )
}

export default App