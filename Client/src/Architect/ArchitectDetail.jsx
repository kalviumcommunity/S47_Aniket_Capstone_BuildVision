import React from 'react'
import { useForm } from 'react-hook-form'
import form from "../Detailform.module.css"
import formimage from "../../Assets/ArchitectFormImage.png"
import axios from 'axios'

function ArchitectDetail() {
    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = (data) => {
        console.log(data)
        axios.post("http://localhost:3000/ArchitectureDetail",data)
        .then((res)=>console.log(res))
        .catch((err)=>console.log(err))
    }


    return (
        <div className={form.Archipage}>
            <img src={formimage} alt="" className={form.image} />
            <div className={form.Archibox}>
                <h1>Architect</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={form.detail}>
                        <label>Name</label>
                        <input type='text' {...register("ArchitectName", { required: "Architect Name is required", pattern: { value: /^[a-zA-Z]+$/, message: "Only Alphabets are allowed" } })} placeholder="Enter Architect Name" />
                    </div>
                        {errors.ArchitectName && <p>{errors.ArchitectName.message}</p>}
                    <div className={form.detail}>
                        <label>No. of projects</label>
                        <input type='number' {...register("NoOfProjects", { required: "No. of projects is required" })} defaultValue={0} />
                    </div>
                        {errors.NoOfProjects && <p>{errors.NoOfProjects.message}</p>}
                    <div className={form.detail}>
                        <label>Year of Experience</label>
                        <input type='number' {...register("YearOfExperience", { required: "Year of Experience is required" })} defaultValue={0} />
                    </div>
                        {errors.YearOfExperience && <p>{errors.YearOfExperience.message}</p>}
                    <div className={form.detail}>
                        <label>Phone Number</label>
                        <input type='number' {...register("PhoneNumber", { required: "Phone Number is required", maxLength: { value: 10, message: "Phone No. should be 10 digits" }, minLength: { value: 10, message: "Phone No. should be 10 digits" } })} placeholder='Enter Phone Number' />
                    </div>
                        {errors.PhoneNumber && <p>{errors.PhoneNumber.message}</p>}
                    <div className={form.detail}>
                        <label>Image of Architect</label>
                        <input type="input" className={form.file}{...register("ImageOfArchitect", { required: "Image of Architect is required" })}/>
                    </div>
                        {errors.ImageOfArchitect && <p>{errors.ImageOfArchitect.message}</p>}
                    <input type="submit" className={form.ArchiSubmit}/>
                </form>
            </div>
        </div>
    )
}

export default ArchitectDetail