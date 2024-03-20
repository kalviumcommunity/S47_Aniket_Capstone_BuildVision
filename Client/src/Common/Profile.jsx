import React, { useEffect, useState } from 'react'
import NavigationBar from './NavigationBar'
import navcss from '../css/Navigation.module.css'
import css from '../css/Profile.module.css'
import { Link, useParams } from 'react-router-dom'
import profile from '../../Assets/profile.png'

function Profile() {
    const [data, setdata] = useState([])
    const role = useParams().role
    const email = useParams().email

    useEffect(() => {
        fetch(`http://localhost:3000/Profile/${role}/${email}`)
            .then((res) => { return res.json() })
            .then((datas) => {
                setdata(datas[0])
            })
            .catch((err) => console.log(err))
        console.log(data)
    }, [role, email])

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
                                    <h3>Birth Year : {data.BirthYear || "****"}</h3>
                                    <h3>Phone Number : +91 {data.ClientPhoneNumber? data.ClientPhoneNumber : "**********"}</h3>
                                    <h3>Email : {data.ClientEmail}</h3>
                                </>
                            )}
                            <div className={css.buttons}>
                                <Link to={`/Profileedit/${role}/${email}/${data._id}`}><button className={css.editbtn}>Edit</button></Link>
                                <button className={css.addbtn}>Add Design</button>
                            </div>
                        </div>
                        <div className={css.right}>
                            {data && (data.ImageOfArchitect === undefined || data.ImageOfClient === undefined) ? <img src={profile} alt="" className={css.image} /> : <img src={`http://localhost:3000/Upload/Architect/${(data.ImageOfArchitect[0] ? data.ImageOfArchitect[0] : data.ImageOfClient[0]).replace(/ /g, '%20')}`} alt="" className={css.image} />}
                        </div>
                    </header>
                </div>
            </div>
        </div>
    )
}

export default Profile