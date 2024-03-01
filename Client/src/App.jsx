import React from 'react'
import { Routes, Route } from 'react-router'
import ArchitectDetail from './Architect/ArchitectDetail'
import ClientDetail from './Client/ClientDetail'
import Home from './Home'
import DesignPage from './Common/DesignPage'
import Archiprofile from './Common/Archiprofile'

function App() {
  return(
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/Archiprofile' element={<Archiprofile/>}></Route>
        <Route path="/DesignPage" element={<DesignPage/>}/>
        <Route path="/ArchitectureDetail" element={<ArchitectDetail />}/>
        <Route path="/ClientDetail" element={<ClientDetail/>}/>
      </Routes>
    </>
  )
}

export default App