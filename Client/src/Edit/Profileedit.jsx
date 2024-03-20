import React, { useEffect, useState } from 'react'
import navcss from '../css/Navigation.module.css'
import NavigationBar from '../Common/NavigationBar'
import css from '../css/ProfileEdit.module.css'
import { useParams ,useNavigate} from 'react-router-dom'
import axios from 'axios'
import archiimage from '../../Assets/ArchitectFormImage.png'
import clientimage from '../../Assets/ClientFormImage.png'
import { useForm } from 'react-hook-form'


function Profileedit() {
    const [ArchitectName, setArchitectName] = useState("")
    const [ClientName, setClientName] = useState("")
    const [YearOfExperience, setYearOfExperience] = useState("")
    const [NoOfProjects, setNoOfProjects] = useState("")
    const [BirthYear, setBirthYear] = useState("")
    const [ClinetPhoneNumber, setClinetPhoneNumber] = useState("")
    const [ArchiPhoneNumber, setArchiPhoneNumber] = useState("")


    const role = useParams().role
    const email = useParams().email
    const id=useParams().id
    const navigate=useNavigate()

    useEffect(() => {
        try {
            if(role === "Architect"){
                axios.get(`http://localhost:3000/Profile/${role}/${email}`)
                    .then((data) => {
                        setArchitectName(data.data[0].ArchitectName)    
                        setArchiPhoneNumber(data.data[0].PhoneNumber)
                        setYearOfExperience(data.data[0].YearOfExperience)
                        setNoOfProjects(data.data[0].NoOfProjects)
                    })
                    .catch((err) => console.log(err))
            }else{
                axios.get(`http://localhost:3000/Profile/${role}/${email}`)
                    .then((data) => {
                        setClientName(data.data[0].ClientName)
                        setClinetPhoneNumber(data.data[0].PhoneNumber)
                        setBirthYear(data.data[0].BirthYear)
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
                axios.put(`http://localhost:3000/Profileedit/${role}/${email}/${id}`, {ArchitectName, YearOfExperience, NoOfProjects, ArchiPhoneNumber})
                    .then((res) => {
                        console.log(res.data)
                    })
                    .catch((err) => console.log(err))
            }   
        }else{
            if (data) {
                axios.put(`http://localhost:3000/Profileedit/${role}/${email}/${id}`, {ClientName, BirthYear, ClinetPhoneNumber})
                    .then((res) => {
                        console.log(res.data)
                    })
                    .catch((err) => console.log(err))
            }
        }
        navigate(`/Profile/${role}/${email}`)
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
        setClinetPhoneNumber(e.target.value)
    }
    const handleBirth = (e) =>{
        setBirthYear(e.target.value)
    }
    const handleCname = (e) =>{
        setClientName(e.target.value)
    }

    return (
        <div className={navcss.navbar}>
            <NavigationBar />
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
                                    <label>Birth Year</label>
                                    <input type="number" defaultValue={BirthYear==0?"":BirthYear} placeholder='Enter Birth Year' onChange={(e)=>handleBirth(e)}/>
                                </div><div className={css.detail}>
                                    <label>Phone Number</label>
                                    <input type="number" defaultValue={PhoneNumber==0?"":PhoneNumber} placeholder='Enter Phone Number' onChange={(e)=>handleCphone(e)}/>
                                </div><div className={css.detail}>
                                    <label>Image</label>
                                    <input type="file"  onChange={(e)=>handlCimage(e)}/>
                                </div>
                            </>
                        )
                        }
                        <button className={css.submit} onClick={submit}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profileedit