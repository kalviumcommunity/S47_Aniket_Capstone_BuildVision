import React from 'react'
import NavigationBar from '../NavigationBar'
import navcss from '../../css/Navigation.module.css'
import css from '../../css/AddDesign.module.css'
import DesignImage from '../../../Assets/DesignFormImage.png'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function AddDesign() {
  const { id } = useParams()
  const { role } = useParams()
  const { register, handleSubmit, formState: { errors } } = useForm()

  const submit = (data) => {
    console.log(data)
    console.log(data.ImageOfDesign[0])
    const formdata = new FormData();
    formdata.append("ArchitectId", id)
    formdata.append("AreaOfPlot", data.AreaOfPlot)
    formdata.append("AreaOfMap", data.AreaOfMap)
    formdata.append("DetailsOfMap", data.DetailsOfMap)
    formdata.append("ImageOfDesign", data.ImageOfDesign[0])

    const ddata = () => {
      axios.post(`http://localhost:3000/AddDesign/${role}/${id}`, formdata)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    }
    ddata()
  }


  return (
    <div className={navcss.navbar}>
      <NavigationBar />
      <div className={css.body}>
        <div className={css.main}>
          <img src="{DesignImage}" alt="" />
          <div className={css.container}>
            <h1>Add Design</h1>
            <form className={css.form}>
              <div className={css.detail}>
                <label>Area of Plot</label>
                <input type='text' {...register("AreaOfPlot", { required: "Area of Plot is required" })} placeholder="Enter Area of Plot" />
              </div>
              {errors.AreaOfPlot && <p className={css.alert}>{errors.AreaOfPlot.message}</p>}
              <div className={css.detail}>
                <label>Area of Map</label>
                <input type='text' {...register("AreaOfMap", { required: "Area of Map is required" })} placeholder="Enter Area of Map" />
              </div>
              {errors.AreaOfMap && <p className={css.alert}>{errors.AreaOfMap.message}</p>}
              <div className={css.detail}>
                <label>Details of Map</label>
                <input type='text' {...register("DetailsOfMap", { required: "Details of Map is required" })} placeholder="Enter Details of Map" />
              </div>
              {errors.DetailsOfMap && <p className={css.alert}>{errors.DetailsOfMap.message}</p>}
              <div className={css.detail}>
                <label>Image of Map</label>
                <input type='file' {...register("ImageOfDesign", { required: "Image of Design is required" })} placeholder="Upload Image of Map" />
              </div>
              {errors.ImageOfDesign && <p className={css.alert}>{errors.ImageOfDesign.message}</p>}
              <button onClick={handleSubmit(submit)}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddDesign