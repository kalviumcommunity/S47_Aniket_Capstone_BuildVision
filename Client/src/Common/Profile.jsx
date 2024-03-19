import React, { useEffect, useState } from 'react'
import NavigationBar from './NavigationBar'
import navcss from '../css/Navigation.module.css'
import css from '../css/Profile.module.css'
import { useParams } from 'react-router-dom'

function Profile() {
    const [data, setdata] = useState([])
    const Role = useParams().role
    const id = useParams().email

    useEffect(() => {
        fetch(`http://localhost:3000/Profile/${Role}/${id}`)
            .then((res) => {return res.json()})
            .then((datas) => {
                setdata(datas[0])
            })
            .catch((err) => console.log(err))
        },[Role, id])

    return (
        <div className={navcss.navbar}>
            <NavigationBar />
            <div className={css.body}>
                <header>
                    <p>email:{data.ArchiEmail || data.ClientEmail}</p>
                </header>
            </div>
        </div>
    )
}

export default Profile