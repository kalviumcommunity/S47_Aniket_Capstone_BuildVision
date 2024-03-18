import React, { useEffect, useState } from 'react'
import NavigationBar from './NavigationBar'
import navcss from '../css/Navigation.module.css'

function DesignPage() {
  const [data, setdata] = useState([])

  useEffect(()=>{
    fetch('http://localhost:3000/ArchiSignU')
    .then((res)=>res.json())
    .then((datas)=>{
      setdata(datas);
      console.log(datas)
    })
    .catch((err)=>console.log(err))
  },[])

  document.cookie="Role"
  return (
    <div className={navcss.navbar}>
        <NavigationBar/>
        <div>DesignPage</div>
    </div>
  )
}

export default DesignPage