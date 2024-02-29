import React from 'react'
import { useForm } from 'react-hook-form'
import form from "../Detailform.module.css"
import formimage from "../../Assets/ClientFormImage.png"
function ClientDetail() {
    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = (data) => {
        console.log(data)
    }
    return (
        <div className={form.Clientpage}>
            <div className={form.Clientbox}>
                <h1>Client</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={form.detail}>
                        <label>Name</label>
                        <input type='text' {...register("ClientName", { required: "Client Name is required", pattern: { value: /^[a-zA-Z]+$/, message: "Only Alphabets are allowed" } })} placeholder="Enter Client Name" />
                    </div>
                        {errors.ClientName && <p>{errors.ClientName.message}</p>}
                    <div className={form.detail}>
                        <label>Birth Year</label>
                        <input type="number" {...register("BirthYear", { required: "Birth Year is required" , min:{value: 1900, message: "Year should be greater than 1900"} , max:{value: 2022, message: "Year should be less than 2022"}})} placeholder='Enter Birth Year' />  {/*Year should update Every years*/}
                    </div>
                        {errors.BirthYear && <p>{errors.BirthYear.message}</p>}
                    <div className={form.detail}>
                        <label>Phone Number</label>
                        <input type='number' {...register("PhoneNumber", { required: "Phone Number is required", maxLength: { value: 10, message: "Phone No. should be 10 digits" }, minLength: { value: 10, message: "Phone No. should be 10 digits" } })} placeholder='Enter Phone Number' />
                    </div>
                        {errors.PhoneNumber && <p>{errors.PhoneNumber.message}</p>}
                    <div className={form.detail}>
                        <label>Image of Client</label>
                        <input type="file" className={form.file}{...register("ImageOfClient", { required: "Image of Client is required" })} />
                    </div>
                        {errors.ImageOfClient && <p>{errors.ImageOfClient.message}</p>}
                    <input type="submit" className={form.ClientSubmit}/>
                </form>
            </div>
          <img src={formimage} alt="" className={form.image} />
        </div>
    )
}

export default ClientDetail