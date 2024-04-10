import React, { useEffect, useState } from 'react'
import NavigationBar from './NavigationBar'
import navcss from '../css/Navigation.module.css'
import css from '../css/DesignPage.module.css'

function DesignPage(){
  const [designdata, setdesigndata] = useState([])
  const [Archidata, setArchidata] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/DesignPage')
      .then((res) => res.json())
      .then((datas) => {
         setdesigndata(datas);
        // console.log(datas)
      })
      .catch((err) => console.log(err))

    fetch('http://localhost:3000/ArchiSignU')
      .then((res) => res.json())
      .then((datas) => {
         setArchidata(datas);
        // console.log(datas)
      })
      .catch((err) => console.log(err))
  }, [])

  document.cookie = "Role"

  // console.log(designdata)
  // console.log(Archidata)
  return (
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

export default DesignPage