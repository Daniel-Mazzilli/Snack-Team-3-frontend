import { useState, useEffect } from "react";
import { useContextProvider } from "../Provider/Provider";
import { Link, useParams, useNavigate } from "react-router-dom";
import SolidHeart from "../assets/heart-solid.png";
import EmptyHeart from "../assets/heart-regular.png";
import noImage from "../assets/default.png"
import "./SnackShow.css";

export default function SnackShow() {
  const { API, axios } = useContextProvider();
  const [snack, setSnack] = useState([]);
  let { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    // console.log("useFffect running");
    axios
      .get(`${API}/snacks/${id}`)
      .then((res) => {
        console.log(res.data);
        setSnack(res.data);
      })
      .catch(() => navigate("/not-found"));
  }, [id, navigate]);

  const deleteSnack = () => {
    axios
      .delete(`${API}/snacks/${id}`)
      .then(() => {
        navigate(`/snacks`);
      })
      .catch((c) => console.error("catch", c));
  };

  const handleDelete = () => {
    deleteSnack();
  };

  return (
    <div className="snack-info">
      <h1>{snack.name}</h1>
      <div className="snackInfo">
        <img className="snack-img" src={ snack.image? snack.image : noImage} alt="snack-image" />
        <div className="snack-text">
          <h5>
            <strong>
              <b>Description: </b>
            </strong>
            {snack.description}
          </h5>
          <h5>
            <strong>
              <b>Fiber(g): </b>
            </strong>
            {snack.fiber}
          </h5>
          <h5>
            <strong>
              <b>Protein(g): </b>
            </strong>
            {snack.protein}
          </h5>
          <h5>
            <strong>
              <b>Carbs(g): </b>
            </strong>
            {snack.carbs}
          </h5>
          <h5>
            <strong>
              <b>Added Sugar(g): </b>
            </strong>
            {snack.added_sugar}
          </h5>
          <h5>
            <strong>
              <b>Healthy: </b>
            </strong>
            {snack.is_healthy ? (
              <img src={SolidHeart} alt="logo" height="25px" />
            ) : (
              <img src={EmptyHeart} alt="logo" height="25px" />
            )}
          </h5>
        </div>
      </div>
      <div className="buttons">
        <div>
          <Link to={`/snacks`}>
            <button className="navButtons">Back</button>
          </Link>
        </div>
        <div>
          <Link to={`/snacks/${id}/edit`}>
            <button className="navButtons">Edit</button>
          </Link>
        </div>
        <div>
          <button className="navButtons" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
