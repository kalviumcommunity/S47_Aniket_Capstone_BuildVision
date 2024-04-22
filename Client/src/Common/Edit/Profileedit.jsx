import React, { useEffect, useState } from 'react'
import css from '../../css/ProfileEdit.module.css'
import { useParams ,useNavigate} from 'react-router-dom'
import axios from 'axios'
import archiimage from '../../../Assets/ArchitectFormImage.png'
import clientimage from '../../../Assets/ClientFormImage.png'
import { useForm } from 'react-hook-form'



function Profileedit() {
    const [ArchitectName, setArchitectName] = useState("")
    const [ClientName, setClientName] = useState("")
    const [YearOfExperience, setYearOfExperience] = useState("")
    const [NoOfProjects, setNoOfProjects] = useState("")
    const [DOB, setBirthYear] = useState("")
    const [ClientPhoneNumber, setClientPhoneNumber] = useState("")
    const [ArchiPhoneNumber, setArchiPhoneNumber] = useState("")


    const role = useParams().role
    const id=useParams().id
    const navigate=useNavigate()

    useEffect(() => {
        try {
            if(role === "Architect"){
                axios.get(`${import.meta.env.VITE_SERVER_URL}/Profile/${role}/${id}`)
                    .then((data) => {
                        setArchitectName(data.data.ArchitectName)    
                        setArchiPhoneNumber(data.data.PhoneNumber)
                        setYearOfExperience(data.data.YearOfExperience)
                        setNoOfProjects(data.data.NoOfProjects)
                    })
                    .catch((err) => console.log(err))

            }else{
                axios.get(`${import.meta.env.VITE_SERVER_URL}/Profile/${role}/${id}`)
                    .then((data) => {
                        setClientName(data.data.ClientName)
                        setClientPhoneNumber(data.data.PhoneNumber)
                        setBirthYear(data.data.DOB)
                    })
                    .catch((err) => console.log(err))
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    const submit = (data) => {
        if(role === "Architect"){
            if (data) {
                axios.put(`${import.meta.env.VITE_SERVER_URL}/Profileedit/${role}/${id}`, {ArchitectName, YearOfExperience, NoOfProjects, ArchiPhoneNumber})
                    .then((res) => {
                        console.log(res.data)
                    })
                    .catch((err) => console.log(err))
            }   
        }else{
            if (data) {
                axios.put(`${import.meta.env.VITE_SERVER_URL}/Profileedit/${role}/${id}`, {ClientName, BirthYear, ClinetPhoneNumber})

                    .then((res) => {
                        console.log(res.data)
                    })
                    .catch((err) => console.log(err))
            }
        }
        navigate(`/Profile/${role}/${id}`)
    }
    const handleAname = (e) =>{
        setArchitectName(e.target.value)
    }
    const handleProject = (e) =>{
        setNoOfProjects(e.target.value)
    }
    const handleExp = (e) =>{
        setYearOfExperience(e.target.value)
    }
    const handleAphone = (e) =>{
        setArchiPhoneNumber(e.target.value)
    }
    const handleCphone = (e) =>{
        setClientPhoneNumber(e.target.value)
    }
    const handleBirth = (e) =>{
        setBirthYear(e.target.value)
    }
    const handleCname = (e) =>{
        setClientName(e.target.value)
    }

    return (
            <div className={css.body}>
                <img src={role == "Architect" ? archiimage : clientimage} alt="" className={css.mainimage}/>
                <div className={css.container}>
                    <h1>{role}</h1>
                    <div  className={css.form}>
                        {role === "Architect" && (
                            <>
                                <div className={css.detail}>
                                    <label>Name</label>
                                    <input type="text" defaultValue={ArchitectName} placeholder='Enter Name' onChange={(e)=>handleAname(e)}/>
                                </div><div className={css.detail}>
                                    <label>No. of projects</label>
                                    <input type="number" defaultValue={NoOfProjects==0?"":NoOfProjects} placeholder='Enter no of projects' onChange={(e)=>handleProject(e)}/>
                                </div><div className={css.detail}>
                                    <label>Year of Experience</label>
                                    <input type="number" defaultValue={YearOfExperience==0?"":YearOfExperience} placeholder='Enter Year of experience' onChange={(e)=>handleExp(e)}/>
                                </div><div className={css.detail}>
                                    <label>Phone Number</label>
                                    <input type="number" defaultValue={ArchiPhoneNumber==0?"":ArchiPhoneNumber} placeholder='Enter Phone Number' onChange={(e)=>handleAphone(e)}/>
                                </div><div className={css.detail}>
                                    <label>Image</label>
                                    <input type="file"  onChange={(e)=>handleAimage(e)}/>
                                </div>
                            </>
                        )}
                        {role === "Client" && (
                            <>
                                <div className={css.detail}>
                                    <label>Name</label>
                                    <input type="text" defaultValue={ClientName} placeholder='Enter Name' onChange={(e)=>handleCname(e)}/>
                                </div><div className={css.detail}>
                                    <label>Date of Birth</label>
                                    <input type="date" defaultValue={DOB} placeholder='Enter DOB' onChange={(e)=>handleBirth(e)}/>
                                </div><div className={css.detail}>
                                    <label>Phone Number</label>
                                    <input type="number" defaultValue={ClientPhoneNumber==0?"":ClientPhoneNumber} placeholder='Enter Phone Number' onChange={(e)=>handleCphone(e)}/>
                                </div><div className={css.detail}>
                                    <label>Image</label>
                                    <input type="file"  onChange={(e)=>handlCimage(e)}/>
                                </div>
                            </>
                        )
                        }
                        <div className={css.button}>
                        <button className={css.submit} onClick={() => navigate(`/Profile/${role}/${id}`)}>Cancel</button>
                        <button className={css.submit} onClick={submit}>Submit</button>

                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Profileedit