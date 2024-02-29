import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <div>
            <Link to="/ArchitectureDetail"><button>Architecture Detail</button></Link>
            <Link to="/ClientDetail"><button>Client Detail</button></Link>
        </div>
        
    )
}

export default Home