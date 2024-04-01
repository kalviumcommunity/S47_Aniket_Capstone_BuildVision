import React, { useEffect, useState } from 'react'
import NavigationBar from './NavigationBar'
import navcss from '../css/Navigation.module.css'
import axios from 'axios'

function DesignPage() {
  const [data, setdata] = useState([])
  const [error, setError] = useState(false)
  const token = localStorage.getItem("Token")

  useEffect(() => {
    axios.get('http://localhost:3000/ClientSignU', {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("Token")
      }
    })
      .then((res) => {
        setdata(res.data)
        // console.log(res.data)
      })
      .catch((err) => setError(err.response.data))
  }, [])

  document.cookie = "Role"
  if(error){
  return (
      <h1>Please Login ....</h1>
      )
    }
  else{
    return(
    <>
      <div className={navcss.navbar}>
        <NavigationBar/>
        <div>DesignPage</div>
      </div>
    </>

    )
  }
}

export default DesignPage