import React, { useEffect, useState } from 'react'
import NavigationBar from './NavigationBar'
import navcss from '../css/Navigation.module.css'
import css from "../css/ArchiProfilepage.module.css"
import logo from "../../Assets/Logo.png"
import profile from "../../Assets/profile.png"
import axios from 'axios'
import { useAuth0 } from "@auth0/auth0-react"


function ArchiProfile() {
  const [data, setdata] = useState([])
  const [error, setError] = useState("")
  const { isAuthenticated, getAccessTokenSilently, isLoading } = useAuth0();
  const [filter, setFilter] = useState("")
  const [sortedData, setSortedData] = useState([])

  useEffect(() => {
    const sorted = [...data].sort((a, b) => {
      if (filter === "") {
        return 0;
      } else if (filter === "Low to High Projects") {
        return a.NoOfProjects - b.NoOfProjects;
      } else if (filter === "High to Low Projects") {
        return b.NoOfProjects - a.NoOfProjects;
      } else if (filter === "Low to High Experience") {
        return a.YearOfExperience - b.YearOfExperience;
      } else if (filter === "High to Low Experience") {
        return b.YearOfExperience - a.YearOfExperience;
      } else {
        return 0;
      }
    });
    setSortedData(sorted);
  }, [filter, data]);
  

  useEffect(() => {
    // console.log("token", localStorage.getItem("Token"))
    const getdata = async () => {
      const token = isAuthenticated ? await getAccessTokenSilently() : localStorage.getItem("Token")
      axios.get(`${import.meta.env.VITE_SERVER_URL}/ArchiSignU`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        }
      })
        .then((datas) => {
          setdata(datas.data);
          // console.log(datas.data)
        })

        .catch((err) => setError(err.response.data))

    }
    getdata()
  }, [])


  if (isLoading) {
    return <h1>Loading....</h1>
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
          <div className={css.main}>
            <div className={css.head}>
              <img src={logo} alt="" className={css.logo} />
              <select name="Filter" id="" className={css.filter} aria-placeholder='Filter' onChange={(e) => setFilter(e.target.value)}>
                <option value="" defaultValue={true}>ALL</option>
                <option value="Low to High Projects">Low to High Projects</option>
                <option value="High to Low Projects">High to Low Projects</option>
                <option value="Low to High Experience">Low to High Experience</option>
                <option value="High to Low Experience">High to Low Experience</option>
              </select>
            </div>
            <div className={css.body}>
              {sortedData.map((datas) => (
                <div className={css.card} key={datas._id}>
                  <div>
                    {datas.ImageOfArchitect && datas.ImageOfArchitect[0] && datas.ImageOfArchitect[0] !== "undefined" ? (
                      <img
                        src={`${import.meta.env.VITE_SERVER_URL}/Upload/Architect/${datas.ImageOfArchitect[0].replace(/ /g, '%20')}`}
                        alt=""
                        className={css.archiimage}
                      />
                    ) : (
                      <img src={profile} alt="" className={css.archiimage} />
                    )}
                  </div>

                  <div>
                    <p style={{ fontWeight: "bold" }}>Name : {datas.ArchitectName}</p>
                    {datas.NoOfProjects ? <p>No of Projects : {datas.NoOfProjects}</p> : <p>No of Projects : 0</p>}
                    {datas.YearOfExperience ? <p>Year Of Experience : {datas.YearOfExperience}</p> : <p>Year Of Experience : 0</p>}
                    <p>Email : {datas.ArchiEmail}</p>
                    <div>
                      {datas.ArchiPhoneNumber ? <button className={css.contactbtn} >{datas.ArchiPhoneNumber}</button> : <p></p>}
                      <button onClick={() => window.location.href = `mailto:${datas.ArchiEmail}`} className={css.contactbtn}>Email Me</button>
                    </div>

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

export default ArchiProfile