import React, { useEffect, useState } from 'react'
import NavigationBar from './NavigationBar'
import navcss from '../css/Navigation.module.css'
import axios from 'axios'
import logo from '../../Assets/Logo.png'
import css from '../css/Designpage.module.css'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'


function DesignPage() {
  const [data, setdata] = useState([])
  const [error, setError] = useState("")
  const { user, isAuthenticated, getAccessTokenSilently, isLoading } = useAuth0()
  const [filter, setFilter] = useState("")
  const [sortedData, setSortedData] = useState([])
  const navigate = useNavigate()


  //use effect for filtering the data
  useEffect(() => {
    const sorted = [...data].sort((a, b) => {
      if (filter === "") {
        return 0;
      } else if (filter === "Low to High Plot Area") {
        return a.AreaOfPlot - b.AreaOfPlot;
      }
      else if (filter === "High to Low Plot Area") {
        return b.AreaOfPlot - a.AreaOfPlot;
      }
      else if (filter === "Low to High Map Area") {
        return a.AreaOfMap - b.AreaOfMap;
      }
      else if (filter === "High to Low Map Area") {
        return b.AreaOfMap - a.AreaOfMap;
      }

    });
    setSortedData(sorted);
  }, [filter, data]);



//storing data of user come from sigup page with auth0
  useEffect(() => {
    if (navigate[-1]==="/SignUp") {
      if (localStorage.getItem("Role") === "Client") {
        const formdata = new FormData();

        formdata.append("ClientEmail", user.email)
        formdata.append("ClientName", user.name)
        formdata.append("ImageOfClient", user.picture)
        formdata.append("Role", "Client");
        formdata.append("BirthYear", "0");
        formdata.append("ClientPhoneNumber", "0");
        axios.post(`${import.meta.env.VITE_SERVER_URL}/ClientSignUp`, formdata)
          .then((res) => {
            alert(res.data.result)
            // navigate("/DesignPage")
          })
          .catch((err) => {
            alert(err.response)
            navigate("/")
          })
      }
      else if (localStorage.getItem("Role") === "Architect") {
        const formdata = new FormData();
        formdata.append("ImageOfArchitect", user.picture)
        formdata.append("ArchitectName", user.name)
        formdata.append("ArchiEmail", user.email)
        formdata.append("Role", "Architect")
        formdata.append("NoOfProjects", "0")
        formdata.append("YearOfExperience", "0")
        formdata.append("ArchiPhoneNumber", "0")

        // if(data){
        axios.post(`${import.meta.env.VITE_SERVER_URL}/ArchiSignUp`, formdata)
          .then((res) => {
            alert(res.data.result)
            navigate("/DesignPage")
          })
          .catch((err) => {
            alert(err.response)
            navigate("/")
          })
      }
    }
  }, [])

//getting the data of design page
  useEffect(() => {
    const getdata = async () => {
      const token = isAuthenticated ? await getAccessTokenSilently() : localStorage.getItem("Token")
      // console.log(isAuthenticated, token)
      await axios.get(`${import.meta.env.VITE_SERVER_URL}/Designs`, {
        headers: {
          "Content-Type": "text",
          "Authorization": token
        }
      })
        .then((res) => {
          setdata(res.data)
          // console.log(res.data)
        })
        .catch((err) => {
          console.log(err)
          setError(true)
        })
    }
    getdata()
  }, [])

  if (error) {
    return (
      <h1>Please Login ....</h1>
    )
  }
  if (isLoading) {
    return (
      <h1>Loading ....</h1>
    )
  }
  if (!error) {
    return (
      <>
        <div className={navcss.navbar}>
          <NavigationBar />
          <div className={css.head}>
            <div className={css.header}>
              <img src={logo} alt="" className={css.logo} />
              <select name="Filter" id="" className={css.filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="" defaultValue={true}>All</option>
                <option value="Low to High Plot Area">Low to High PLot Area</option>
                <option value="High to Low Plot Area">High to Low Plot Area</option>
                <option value="Low to High Map Area">Low to High Map Area</option>
                <option value="High to Low Map Area">High to Low Map Area</option>
              </select>
            </div>
            {
              sortedData.map((item) => {
                return (

                  <div className={css.card} key={item._id}>
                    <img src={`${import.meta.env.VITE_SERVER_URL}/Upload/Design/${item.ImageOfDesign[0].replace(/ /g, "%20")}`} alt="Image is not Available" className={css.img} />
                    <ul className={css.details}>
                      <li>Creater : {item.ArchitectName}</li>
                      <li>Year of Experience : {item.ArchitectExperience}</li>
                      <li>Area of map : {item.AreaOfMap}</li>
                      <li>Area of plot : {item.AreaOfPlot}</li>
                      <li>Details of map : {item.DetailsOfMap}</li>
                      <li>Price: {item.Price}</li>
                    <button className={css.btn}>Order</button>
                    </ul>
                  </div>

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