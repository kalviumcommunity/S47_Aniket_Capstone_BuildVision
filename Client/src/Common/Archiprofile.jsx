import React, { useEffect, useState } from 'react'
import NavigationBar from './NavigationBar'
import navcss from '../css/Navigation.module.css'
import css from "../css/ArchiProfilepage.module.css"
import logo from "../../Assets/Logo.png"
import profile from "../../Assets/profile.png"

function ArchiProfile() {
  const [data, setdata] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/ArchiSignU')
      .then((res) => res.json())
      .then((datas) => {
        setdata(datas);
        console.log(datas)
      })

      .catch((err) => console.log(err))
  }, [])

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
            {data.map((data) => (
              <div className={css.card} key={data._id}>
                <div>
                  {data.ImageOfArchitect?<img src={`http://localhost:3000/Upload/Architect/${data.ImageOfArchitect[0].replace(/ /g, '%20')}`} alt="" className={css.archiimage}/>:<img src={profile} alt="" className={css.archiimage}/>}
                </div>
                <div>
                  <p style={{ fontWeight: "bold" }}>Name : {data.ArchitectName}</p>
                  {data.NoOfProjects ? <p>No of Projects : {data.NoOfProjects}</p> : <p>No of Projects : 0</p>}
                  {data.YearOfExperience ? <p>Year Of Experience : {data.YearOfExperience}</p> : <p>Year Of Experience : 0</p>}
                  <p>Email : {data.ArchiEmail}</p>
                  <div>
                    {data.PhoneNo ? <button className={css.contactbtn} >{data.PhoneNo}</button> : <p></p> }
                    <button onClick={() => window.location.href = `mailto:${data.ArchiEmail}`} className={css.contactbtn}>Email Me</button>
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

export default ArchiProfile; 