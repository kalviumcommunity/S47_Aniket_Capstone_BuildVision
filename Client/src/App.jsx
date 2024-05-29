import React from 'react'
import { Routes, Route } from 'react-router'
import Homepage from './Common/Homepage'
import DesignPage from './Common/DesignPage'
import ArchiProfile from './Common/Archiprofile'
import SignUp from './Common/Signup/SignUp'
import Login from './Common/Login/Login'
import Profile from './Common/Profile'
import Profileedit from './Common/Edit/Profileedit'
import AddDesign from './Common/Design/AddDesign'
import EditDesign from './Common/Design/EditDesign'

function App() {
  return(
    <>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path='/Login' element={<Login/>}></Route>
        <Route path='/SignUp' element={<SignUp/>}/>
        <Route path='/ArchiProfile' element={<ArchiProfile/>}></Route>
        <Route path="/DesignPage" element={<DesignPage/>}/>
        <Route path="/Profile/:role/:id" element={<Profile/>}/>
        <Route path="/Profileedit/:role/:id" element={<Profileedit/>}/>
        <Route path='/AddDesign/:role/:id' element={<AddDesign/>}/>
        <Route path='/EditDesign/:role/:id/:did' element={<EditDesign/>}/>
      </Routes>
    </>
  )
}

export default App