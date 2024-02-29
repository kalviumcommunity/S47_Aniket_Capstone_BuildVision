import React from 'react'
import { useForm } from 'react-hook-form'
import form from "../Detailform.module.css"
import formimage from "../../Assets/ArchitectFormImage.png"
function ArchitectDetail() {
    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = (data) => {
        console.log(data)
    }
    return (
        <div className={form.page}>
            <img src={formimage} alt="" className={form.image} />
            <div className={form.box}>
                <h1>Architect</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={form.detail}>
                        <label>Name</label>
                        <input type='text' {...register("ArchitectName", { required: "Architect Name is required", pattern: { value: /^[a-zA-Z]+$/, message: "Only Alphabets are allowed" } })} placeholder="Enter Architect Name" />
                        {errors.ArchitectName && <p>{errors.ArchitectName.message}</p>}
                    </div>
                    <div className={form.detail}>
                        <label>No. of projects</label>
                        <input type='number' {...register("NoOfProjects", { required: "No. of projects is required" })} defaultValue={0} />
                        {errors.NoOfProjects && <p>{errors.NoOfProjects.message}</p>}
                    </div>
                    <div className={form.detail}>
                        <label>Year of Experience</label>
                        <input type='number' {...register("YearOfExperience", { required: "Year of Experience is required" })} defaultValue={0} />
                        {errors.YearOfExperience && <p>{errors.YearOfExperience.message}</p>}
                    </div>
                    <div className={form.detail}>
                        <label>Phone Number</label>
                        <input type='number' {...register("PhoneNumber", { required: "Phone Number is required", maxLength: { value: 10, message: "Phone No. should be 10 digits" }, minLength: { value: 10, message: "Phone No. should be 10 digits" } })} placeholder='Enter Phone Number' />
                        {errors.PhoneNumber && <p>{errors.PhoneNumber.message}</p>}
                    </div>
                    <div className={form.detail}>
                        <label>Image of Architect</label>
                        <input type="file" className={form.file}{...register("ImageOfArchitect", { required: "Image of Architect is required" })} placeholder="Enter Architect Name" />
                        {errors.ImageOfArchitect && <p>{errors.ImageOfArchitect.message}</p>}
                    </div>
                    <input type="submit" className={form.ArchiSubmit}/>
                </form>
            </div>
        </div>
    )
}

export default ArchitectDetail