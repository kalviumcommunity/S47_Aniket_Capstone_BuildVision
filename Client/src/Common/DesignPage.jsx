import React, { useEffect, useState } from 'react'
import NavigationBar from './NavigationBar'
import navcss from '../css/Navigation.module.css'
import axios from 'axios'
import logo from '../../Assets/Logo.png'
import css from '../css/Designpage.module.css'
import { useAuth0 } from '@auth0/auth0-react'

function DesignPage() {
  const [data, setdata] = useState([])
  const [error, setError] = useState(false)
  const { isAuthenticated, getAccessTokenSilently, isLoading } = useAuth0()

  useEffect(() => {
    const getdata = async () => {
      const token=isAuthenticated? await getAccessTokenSilently():localStorage.getItem("Token")
      console.log(token)
      axios.get('http://localhost:3000/Designs', {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " +  token
        }
      })
        .then((res) => {
          setdata(res.data)
          console.log(res.data)
        })
        // .catch((err) => setError(err.response.data))
    }
    getdata()
  }, [])

  if(isLoading) {
    return (
      <h1>Loading ....</h1>
    )
  }
  if (error) {
    return (
      <h1>Please Login ....</h1>
    )
  }
  else {
    return (
      <>
        <div className={navcss.navbar}>
          <NavigationBar />
          <div className={css.head}>
            <div className={css.header}>
              <img src={logo} alt="" className={css.logo} />
              <select name="Filter" id="" className={css.filter}>
                <option value="" selected disabled hidden>Filter</option>
                <option value="default">Default</option>
              </select>
            </div>
            {
              data.map((item) => {
                console.log(item)
                return (
                  <>
                    <div className={css.card} key={item._id}>
                      <img src={item.ImageOfDesign} alt="Image is not Available" className={css.img} />
                      <ul className={css.details}>
                        <li>Creater : {item.ArchitectName}</li>
                        <li>Year of Experience : {item.ArchitectExperience}</li>
                        <li>Area of map : {item.AreaOfMap}</li>
                        <li>Area of plot : {item.AreaOfPlot}</li>
                        <li>Details of map : {item.DetailsOfMap}</li>
                      </ul>
                    </div>
                  </>
                )
              })
            }
          </div>
        </div>
      </>

    )
  }
}

export default DesignPage