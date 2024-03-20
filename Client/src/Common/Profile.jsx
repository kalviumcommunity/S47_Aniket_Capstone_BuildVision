import React, { useEffect, useState } from 'react'
import NavigationBar from './NavigationBar'
import navcss from '../css/Navigation.module.css'
import css from '../css/Profile.module.css'
import { Link, useParams } from 'react-router-dom'
import profile from '../../Assets/profile.png'

function Profile() {
    const [data, setdata] = useState([])
    const role = useParams().role
    const id = useParams().id

    useEffect(() => {
        fetch(`http://localhost:3000/Profile/${role}/${id}`)
            .then((res) => res.json())
            .then((datas) => {
                setdata(datas)
            })
            .catch((err) => console.log(err))
    }, [role, id])

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
                            {data && (data.ImageOfArchitect === undefined || data.ImageOfClient === undefined) ? <img src={profile} alt="" className={css.image} /> : <img src={`http://localhost:3000/Upload/Architect/${(data.ImageOfArchitect[0] ? data.ImageOfArchitect[0] : data.ImageOfClient[0]).replace(/ /g, '%20')}`} alt="" className={css.image} />}
                        </div>
                    </header>
                </div>
            </div>
        </div>
    )
}

export default Profile