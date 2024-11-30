import React, { useEffect, useState } from 'react'
import NavigationBar from './NavigationBar'
import navcss from '../css/Navigation.module.css'
import axios from 'axios'
import logo from '../../Assets/Logo.png'
import css from '../css/Designpage.module.css'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'


function DesignPage() {
  const [data, setdata] = useState([]);
  const [error, setError] = useState("");
  const { user, isAuthenticated, getAccessTokenSilently, isLoading } = useAuth0();
  const [filter, setFilter] = useState("");
  const [sortedData, setSortedData] = useState([]);
  const navigate = useNavigate();

  // Filter sorting logic
  useEffect(() => {
    const sorted = [...data].sort((a, b) => {
      if (filter === "Low to High Plot Area") return a.AreaOfPlot - b.AreaOfPlot;
      if (filter === "High to Low Plot Area") return b.AreaOfPlot - a.AreaOfPlot;
      if (filter === "Low to High Map Area") return a.AreaOfMap - b.AreaOfMap;
      if (filter === "High to Low Map Area") return b.AreaOfMap - a.AreaOfMap;
      return 0;
    });
    setSortedData(sorted);
  }, [filter, data]);

  // Fetch data logic
  useEffect(() => {
    const getData = async () => {
      try {
        const token = isAuthenticated ? await getAccessTokenSilently() : localStorage.getItem("Token");
        const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/Designs`, {
          headers: {
            Authorization: token,
          },
        });
        setdata(res.data);
      } catch (err) {
        setError("An error occurred while fetching data.");
      }
    };
    getData();
  }, []);

  // Render logic
  if (isLoading) return <h1 style={{ textAlign: "center" }}>Loading...</h1>;
  if (error) return <h1 style={{ textAlign: "center", color: "red" }}>{error}</h1>;

  return (
    <div className={navcss.navbar}>
      <NavigationBar />
      <div className={css.head}>
        <div className={css.header}>
          <img src={logo} alt="Logo" className={css.logo} />
          <select className={css.filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="">All</option>
            <option value="Low to High Plot Area">Low to High Plot Area</option>
            <option value="High to Low Plot Area">High to Low Plot Area</option>
            <option value="Low to High Map Area">Low to High Map Area</option>
            <option value="High to Low Map Area">High to Low Map Area</option>
          </select>
        </div>
        {sortedData.map((item) => (
          <div className={css.card} key={item._id}>
            <img
              src={`${import.meta.env.VITE_SERVER_URL}/Upload/Design/${item.ImageOfDesign[0].replace(/ /g, "%20")}`}
              alt="Design"
              className={css.img}
            />
            <ul className={css.details}>
              <li>Creator: {item.ArchitectName}</li>
              <li>Experience: {item.ArchitectExperience} years</li>
              <li>Map Area: {item.AreaOfMap} sq. ft.</li>
              <li>Plot Area: {item.AreaOfPlot} sq. ft.</li>
              <li>Details: {item.DetailsOfMap}</li>
              <li>Price: ${item.Price}</li>
              <button className={css.btn}>Order</button>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}


export default DesignPage