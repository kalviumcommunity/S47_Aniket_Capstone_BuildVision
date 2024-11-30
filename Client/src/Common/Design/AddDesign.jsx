import React, { useState } from 'react'
import NavigationBar from '../NavigationBar'
import navcss from '../../css/Navigation.module.css'
import css from '../../css/AddDesign.module.css'
import DesignImage from '../../../Assets/DesignFormImage.png'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'


function AddDesign() {
  const { id } = useParams()
  const { role } = useParams()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [Archidata, setArchidata] = useState([])
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false);

  const submit = (data) => {
    setIsLoading(true);
    const formdata = new FormData();
    formdata.append("ArchitectId", Archidata._id);

    axios.post(`${import.meta.env.VITE_SERVER_URL}/AddDesign/${role}/${id}`, formdata)
      .then(() => {
        setIsLoading(false);
        navigate(`/Profile/${role}/${id}`);
      })
      .catch(() => {
        setIsLoading(false);
        alert("An error occurred. Please try again.");
      });
  };


  useEffect(() => {
    axios.get(`${import.meta.env.VITE_SERVER_URL}/Profile/${role}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((res) => {
        // console.log(res.data)
        setArchidata(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  })

  // const submit = (data) => {
  //   console.log(data)
  //   console.log(data.ImageOfDesign[0])
  //   const formdata = new FormData();
  //   formdata.append("ArchitectId", Archidata._id)
  //   formdata.append("ArchitectName", Archidata.ArchitectName)
  //   formdata.append("ArchitectEmail", Archidata.ArchiEmail)
  //   formdata.append("ArchitectExperience", Archidata.ArchitectExperience || 0)
  //   formdata.append("ArchiPhoneNumber", Archidata.ArchiPhoneNumber || 0)
  //   formdata.append("AreaOfPlot", data.AreaOfPlot)
  //   formdata.append("AreaOfMap", data.AreaOfMap)
  //   formdata.append("DetailsOfMap", data.DetailsOfMap)
  //   formdata.append("Price", data.Price)
  //   formdata.append("ImageOfDesign", data.ImageOfDesign[0])

  //   const ddata = () => {
  //     axios.post(`${import.meta.env.VITE_SERVER_URL}/AddDesign/${role}/${id}`, formdata)
  //       .then((res) => console.log(res))
  //       .catch((err) => console.log(err))
  //   }
  //   ddata()

  //   navigate(`/Profile/${role}/${id}`)
  // }


  return (
    <div className={navcss.navbar}>
      <NavigationBar />
      <div className={css.body}>
        <div className={css.main}>
          <div className={css.container}>
            <h1 className={css.heading}>Add Design</h1>
            <form className={css.form}>
              <div className={css.detail}>
                <label>Dimentions of Plot</label>
                <input type='text' {...register("AreaOfPlot", { required: "Area of Plot is required" })} placeholder="Enter Area of Plot in msq" className={css.input} />
              </div>
              {errors.AreaOfPlot && <p className={css.alert}>{errors.AreaOfPlot.message}</p>}
              <div className={css.detail}>
                <label>Dimentions of Map</label>
                <input type='text' {...register("AreaOfMap", { required: "Area of Map is required" })} placeholder="Enter Area of Map in msq" className={css.input} />
              </div>
              {errors.AreaOfMap && <p className={css.alert}>{errors.AreaOfMap.message}</p>}
              <div className={css.detail}>
                <label>Details of Map</label>
                <input type='text' {...register("DetailsOfMap", { required: "Details of Map is required" })} placeholder="Enter Details of Map" className={css.input} />
              </div>
              {errors.DetailsOfMap && <p className={css.alert}>{errors.DetailsOfMap.message}</p>}
              <div className={css.detail}>
                <label>Price</label>
                <input type='number' {...register("Price", { required: "Price is required" })} placeholder="Enter Price" className={css.input} />
              </div>
              {errors.Price && <p className={css.alert}>{errors.Price.message}</p>}
              <div className={css.detail}>
                <label>Image of Map</label>
                <input type='file' {...register("ImageOfDesign", { required: "Image of Map is required" })} placeholder="Upload Image of Map" className={css.input} />
              </div>
              {errors.ImageOfDesign && <p className={css.alert}>{errors.ImageOfDesign.message}</p>}
              <div className={css.btns}>
                <button onClick={() => navigate(`/Profile/${role}/${id}`)} className={css.cancel}>Cancel</button>
                <button onClick={handleSubmit(submit)} className={css.submit}>Submit</button>
              </div>
            </form>
          </div>
          <img src={DesignImage} alt="" className={css.img} />
        </div>
      </div>
    </div>
  )
}

export default AddDesign