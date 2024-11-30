import React, { useEffect, useState } from "react";
import NavigationBar from "./NavigationBar";
import navcss from "../css/Navigation.module.css";
import css from "../css/ArchiProfilepage.module.css";
import logo from "../../Assets/Logo.png";
import profile from "../../Assets/profile.png";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

function ArchiProfile() {
  const [data, setdata] = useState([]);
  const [error, setError] = useState("");
  const { isAuthenticated, getAccessTokenSilently, isLoading } = useAuth0();
  const [filter, setFilter] = useState("");

  const filterdata = () => {
    if (!filter) {
      return data;
    }

    const [min, max] = filter.split("-");
    const minYears = parseInt(min);
    const maxYears = max === "+" ? Infinity : parseInt(max);

    return data.filter(
      (architect) =>
        architect.YearOfExperience >= minYears &&
        architect.YearOfExperience < maxYears
    );
  };

  const filterArchitect = filterdata();

  useEffect(() => {
    const getdata = async () => {
      const token = isAuthenticated
        ? await getAccessTokenSilently()
        : localStorage.getItem("Token");
      axios
        .get(`${import.meta.env.VITE_SERVER_URL}/ArchiSignU`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        })
        .then((datas) => {
          setdata(datas.data);
        })
        .catch((err) => setError(err.response.data));
    };
    getdata();
  }, []);

  if (isLoading) {
    return <h1>Loading....</h1>;
  }
  if (error) {
    return <h1>Please Login ....</h1>;
  } else {
    return (
      <>
        <div className={navcss.navbar}>
          <NavigationBar />
          <div className={css.main}>
            <div className={css.head}>
              <img src={logo} alt="Logo" className={css.logo} />
              <select
                name="Filter"
                id=""
                className={css.filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="" defaultValue={true}>
                  Year Of Experience
                </option>
                <option value="0-5">0-5 years</option>
                <option value="5-10">5-10 years</option>
                <option value="10-15">10-15 years</option>
                <option value="15+">15+ years</option>
              </select>
            </div>
            <div className={css.body}>
              {filterArchitect.map((datas) => (
                <div className={css.card} key={datas._id}>
                  <div>
                    {datas.ImageOfArchitect &&
                    datas.ImageOfArchitect[0] &&
                    datas.ImageOfArchitect[0] !== "undefined" ? (
                      <img
                        src={`${import.meta.env.VITE_SERVER_URL}/Upload/Architect/${datas.ImageOfArchitect[0].replace(
                          / /g,
                          "%20"
                        )}`}
                        alt="Architect"
                        className={css.archiimage}
                      />
                    ) : (
                      <img
                        src={profile}
                        alt="Default Profile"
                        className={css.archiimage}
                      />
                    )}
                  </div>
                  <div>
                    <p className={css.name}>Name: {datas.ArchitectName}</p>
                    <p>No of Projects: {datas.NoOfProjects || 0}</p>
                    <p>Year Of Experience: {datas.YearOfExperience || 0}</p>
                    <p>Email: {datas.ArchiEmail}</p>
                    <div className={css.buttons}>
                      {datas.ArchiPhoneNumber ? (
                        <button className={css.contactbtn}>
                          {datas.ArchiPhoneNumber}
                        </button>
                        
                      ):""}
                      <button
                        onClick={() =>
                          (window.location.href = `mailto:${datas.ArchiEmail}`)
                        }
                        className={css.contactbtn}
                      >
                        Email Me
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ArchiProfile;
