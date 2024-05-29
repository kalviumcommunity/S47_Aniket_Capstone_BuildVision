import React, { useEffect, useState } from 'react'
import NavigationBar from './NavigationBar'
import navcss from '../css/Navigation.module.css'
import css from '../css/Profile.module.css'
import { Link, useParams } from 'react-router-dom'
import profile from '../../Assets/profile.png'
import axios from 'axios'

function Profile() {
    const [data, setdata] = useState([])
    const [design, setdesign] = useState([])
    const role = useParams().role
    const id = useParams().id

    const deleteDesign = (did) => {
        axios.delete(`${import.meta.env.VITE_SERVER_URL}/DeleteDesign/${role}/${id}/${did}`)
            .then((res) => res.json())
            .then((datas) => {
                console.log(datas)
            })
            .catch((err) => console.log(err))
        // window.location.reload()
    }
    useEffect(() => {
        axios(`${import.meta.env.VITE_SERVER_URL}/Profile/${role}/${id}`)
            .then((datas) => {
                setdata(datas.data)
            })
            .catch((err) => console.log(err))
        if(role === "Architect"){
            axios(`${import.meta.env.VITE_SERVER_URL}/ShowDesign/${role}/${id}`)
            .then((datas) => {
                setdesign(datas.data)
                // console.log(datas)
            })
            .catch((err) => console.log(err))
        }
    }, [data,design])

    return (
        <div className={navcss.navbar}>
            <NavigationBar />
            <div className={css.body}>
                <div className={css.main}>
                    <header>
                        <div className={css.left}>
                            {data && data.Role === "Architect" && (
                                <>
                                    <h3>Name : {data.ArchitectName}</h3>
                                    <h3>No Of Projects : {data.NoOfProjects || "0"}</h3>
                                    <h3>Year Of Experience : {data.YearOfExperience || "0"}</h3>
                                    <h3>Phone Number : +91 {data.ArchiPhoneNumber ? data.ArchiPhoneNumber : "**********"}</h3>
                                    <h3>Email : {data.ArchiEmail}</h3>
                                </>
                            )}
                            {data && data.Role === "Client" && (
                                <>
                                    <h3>Name : {data.ClientName}</h3>
                                    <h3>D.O.B : {data.DOB || "**/**/****"}</h3>
                                    <h3>Phone Number : +91 {data.ClientPhoneNumber ? data.ClientPhoneNumber : "**********"}</h3>
                                    <h3>Email : {data.ClientEmail}</h3>
                                </>
                            )}
                            <div className={css.buttons}>
                                <Link to={`/Profileedit/${role}/${id}`}><button className={css.editbtn}>Edit</button></Link>
                                {data.Role === "Architect" && (
                                    <Link to={`/AddDesign/${role}/${id}`}><button className={css.addbtn}>Add Design</button></Link>
                                )}
                            </div>
                        </div>
                        <div className={css.right}>
                            {data && (data.ImageOfArchitect === undefined || data.ImageOfClient === undefined) ?  <img src={`${import.meta.env.VITE_SERVER_URL}/Upload/Architect/${(data.ImageOfArchitect ? data.ImageOfArchitect[0] : data.ImageOfClient)}`} alt="" className={css.image} />:<img src={profile} alt="" className={css.image} />}
                        </div>
                    </header>
                </div>
                <div className={css.designmain}>
                    {design && data.Role === "Architect" && (<div >
                        <div className={css.designheading}>
                            {design && (design.length > 0) && (<h1>Designs</h1>)}
                        </div>
                        {design.map((designs) => (
                            <div className={css.designcontainer} key={designs._id}>
                                <div className={css.designleft}>
                                    <img src={`${import.meta.env.VITE_SERVER_URL}/Upload/Design/${designs.ImageOfDesign[0].replace(/ /g, '%20')}`} alt="Image of Design is missing" className={css.designimage} />
                                </div>
                                <div className={css.designright}>
                                    <ul>
                                        <li>Architect Name : {data.ArchitectName}</li>
                                        <li>Year Of Experience : {data.YearOfExperience}</li>
                                        <li>Dimentions of Plot : {designs.AreaOfPlot}</li>
                                        <li>Dimentions of Map : {designs.AreaOfMap}</li>
                                        <li>Details of Map : {designs.DetailsOfMap}</li>
                                        <li>Price : {designs.Price}</li>
                                    </ul>
                                    <div className={css.buttons}>
                                        <Link to={`/EditDesign/${role}/${id}/${designs._id}`}><button className={css.editbtn}>Edit</button></Link>
                                        <button className={css.deletebtn} onClick={() => deleteDesign(designs._id)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>)}
                </div>
            </div>
        </div>
    )
}

export default Profile
