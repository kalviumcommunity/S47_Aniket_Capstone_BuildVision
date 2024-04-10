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

  // console.log(designdata)
  // console.log(Archidata)
  return (
      <h1>Please Login ....</h1>
      )
    }
  else{
    return(
    <>
      <div className={navcss.navbar}>
        <NavigationBar/>
        <div className={css.main}>
          <div className={css.head}>
            {designdata.map((data) => (
              <div className={css.card} key={data._id}>
                <img src={data.ImageOfDesign} alt="" className={css.image}/>
                <div className={css.details}>
                  <h1>{Archidata.find(Archidata => Archidata._id === data.ArchitectId).ArchitectName}</h1>
                  <h1>{Archidata.find(Archidata => Archidata._id === data.ArchitectId).YearOfExperience}</h1>
                  <h1>{data.AreaOfPlot}</h1>
                  <p>{data.AreaOfMap}</p>
                  <p>{data.DetailsOfMap}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>

    )
  }
}

export default DesignPage