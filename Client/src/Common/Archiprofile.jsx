import React, { useEffect, useState } from 'react'
import NavigationBar from './NavigationBar'
import navcss from '../css/Navigation.module.css'
import css from "../css/ArchiProfilepage.module.css"
import logo from "../../Assets/Logo.png"
import profile from "../../Assets/profile.png"
import axios from 'axios'

function ArchiProfile() {
  const [data, setdata] = useState([])
  const [error, setError] = useState("")

  useEffect(() => {
    // console.log("token", localStorage.getItem("Token"))

    axios.get('http://localhost:3000/ArchiSignU', {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("Token")
      }
    })
      .then((datas) => {
        setdata(datas.data);
        console.log(datas.data)
      })

      .catch((err) => setError(err.response.data))
  }, [])
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
              <select name="Filter" id="" className={css.filter}>
                <option value="" selected disabled hidden>Filter</option>
                <option value="default">Default</option>
                <option value="Experiece">Experience</option>
                <option value="No. Of Projects">No. Of Projects</option>
              </select>
            </div>
            <div className={css.body}>
              {data.map((datas) => (
                <div className={css.card} key={datas._id}>
                  <div>
                    {datas.ImageOfArchitect && datas.ImageOfArchitect[0] && datas.ImageOfArchitect[0] !== "undefined" ? (
                      <img
                        src={`http://localhost:3000/Upload/Architect/${datas.ImageOfArchitect[0].replace(/ /g, '%20')}`}
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
                      <button onClick={() => window.location.href = `mailto:${datas.ArchiEmail}` } className={css.contactbtn}>Email Me</button>
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

  export default ArchiProfile; 