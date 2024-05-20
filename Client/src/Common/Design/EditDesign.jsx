import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Image from '../../../Assets/EditDesignFormImage.png'
import css from '../../css/EditDesignForm.module.css'


function EditDesign() {
  const did = useParams().did
  const role = useParams().role
  const id = useParams().id
  const navigate = useNavigate()


  const [data, setdata] = useState([])
  const [AreaOfMap, setAreaOfMap] = useState("")
  const [AreaOfPlot, setAreaOfPlot] = useState("")
  const [DetailsOfMap, setDetailsOfMap] = useState("")


  const submit = () => {
    axios.put(`${import.meta.env.VITE_SERVER_URL}/EditDesign/${role}/${id}/${did}`, { AreaOfPlot, AreaOfMap, DetailsOfMap })
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => console.log(err))

    navigate(`/Profile/${role}/${id}`)
    window.location.reload()
  }

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_SERVER_URL}/Design/${role}/${id}/${did}`)
      .then((res) => {
        setdata(res.data)
      })
      .catch((err) => console.log(err))
  }, [role, id, did])

  return (
    <div className={css.main}>
      <img src={Image} alt="" className={css.image} />
      <div className={css.form}>
        <h1 className={css.heading}>Edit Design</h1>
        <div className={css.formbody}>
          <div className={css.details}>
            <label>Dimentions of Plot</label>
            <input type="text" defaultValue={data.AreaOfPlot} onChange={(e) => setAreaOfPlot(e.target.value)} className={css.input} />
          </div>
          <div className={css.details}>
            <label>Dimentions of Map</label>
            <input type="text" defaultValue={data.AreaOfMap} onChange={(e) => setAreaOfMap(e.target.value)} className={css.input} />
          </div>
          <div className={css.details}>
            <label>Details of Map</label>
            <input type="text" defaultValue={data.DetailsOfMap} onChange={(e) => setDetailsOfMap(e.target.value)} className={css.input} />
          </div>
          <div className={css.details}>
            <label>Image of Design</label>
            <input type="file" />
          </div>
          <div className={css.buttons}>
            <button onClick={() => navigate(`/Profile/${role}/${id}`)} className={css.cancel}>Cancel</button>
            <button onClick={submit} className={css.submit}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditDesign