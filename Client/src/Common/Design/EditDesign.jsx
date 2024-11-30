import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Image from '../../../Assets/EditDesignFormImage.png';
import css from '../../css/EditDesignForm.module.css';

function EditDesign() {
  const { did, role, id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({});
  const [AreaOfMap, setAreaOfMap] = useState("");
  const [AreaOfPlot, setAreaOfPlot] = useState("");
  const [DetailsOfMap, setDetailsOfMap] = useState("");
  const [Price, setPrice] = useState("");

  const handleSubmit = () => {
    axios.put(`${import.meta.env.VITE_SERVER_URL}/EditDesign/${role}/${id}/${did}`, {
      AreaOfPlot,
      AreaOfMap,
      DetailsOfMap,
      Price,
    })
      .then(() => {
        navigate(`/Profile/${role}/${id}`);
        window.location.reload();
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_SERVER_URL}/Design/${role}/${id}/${did}`)
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, [role, id, did]);

  return (
    <div className={css.body}>
      <div className={css.main}>
        <img src={Image} alt="Edit Design" className={css.img} />
        <div className={css.container}>
          <h1 className={css.heading}>Edit Design</h1>
          <form className={css.form}>
            <div className={css.detail}>
              <label>Dimensions of Plot</label>
              <input
                type="text"
                defaultValue={data.AreaOfPlot}
                onChange={e => setAreaOfPlot(e.target.value)}
                className={css.input}
              />
            </div>
            <div className={css.detail}>
              <label>Dimensions of Map</label>
              <input
                type="text"
                defaultValue={data.AreaOfMap}
                onChange={e => setAreaOfMap(e.target.value)}
                className={css.input}
              />
            </div>
            <div className={css.detail}>
              <label>Details of Map</label>
              <input
                type="text"
                defaultValue={data.DetailsOfMap}
                onChange={e => setDetailsOfMap(e.target.value)}
                className={css.input}
              />
            </div>
            <div className={css.detail}>
              <label>Price</label>
              <input
                type="number"
                defaultValue={data.Price}
                onChange={e => setPrice(e.target.value)}
                className={css.input}
              />
            </div>
            <div className={css.detail}>
              <label>Image of Design</label>
              <input type="file" className={css.input} />
            </div>
            <div className={css.btns}>
              <button
                type="button"
                onClick={() => navigate(`/Profile/${role}/${id}`)}
                className={css.cancel}
              >
                Cancel
              </button>
              <button type="button" onClick={handleSubmit} className={css.submit}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditDesign;
