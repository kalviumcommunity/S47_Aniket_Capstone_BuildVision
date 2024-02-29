import React from 'react'
import { Routes, Route } from 'react-router'
import ArchitectDetail from './Architect/ArchitectDetail'
import ClientDetail from './Client/ClientDetail'
import Home from './Home'

function App() {
  return(
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/ArchitectureDetail" element={<ArchitectDetail />}/>
        <Route path="/ClientDetail" element={<ClientDetail/>}/>
      </Routes>
    </>
  )
}

export default App