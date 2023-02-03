import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContextProvider } from "../Provider/Provider.js";
import Solid from "../assets/heart-solid.png";
import Outline from "../assets/heart-regular.png";
import NoImage from "../assets/default.png";
import "./Form.css";

export default function Form() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { axios, API, setHidden, trigger, setTrigger } = useContextProvider();
  const [isHealthy, setIsHealthy] = useState(false);
  const [modal, setModal] = useState(false);
  const [snack, setSnack] = useState({
    name: "",
    carbs: "",
    fiber: "",
    protein: "",
    added_sugar: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    if (id) {
      axios
        .get(`${API}/snacks/${id}`)
        .then((res) => setSnack(res.data))
        .catch((error) => navigate("/not-found"));
    }
  }, [id]);

  useEffect(() => {
    if ((snack.fiber < 5 && snack.protein < 5) || snack.added_sugar > 5) {
      setIsHealthy(false);
    } else {
      setIsHealthy(true);
    }
  }, [snack.fiber, snack.protein, snack.added_sugar]);

  useEffect(() => {
    if (snack.name === "P0i$0n") {
      setHidden(false);
      setModal(true);
    }
  }, [snack.name]);

  const handleChange = (event) => {
    setSnack({ ...snack, [event.target.id]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (id) {
      axios
        .put(`${API}/snacks/${id}`, snack)
        .then(() => {
          navigate(`/snacks/${id}`);
          setTrigger(-trigger);
        })
        .catch((error) => console.log(error));
    } else {
      axios
        .post(`${API}/snacks`, snack)
        .then(navigate("/snacks"))
        .catch((error) => console.log(error));
    }
  };

  const proceed = () => {
    setModal(false);
    navigate("/P0i$0n");
  };

  return (
    <div className="form">
      <h2>{id ? "" : "Add a Snack"}</h2>

      <form onSubmit={handleSubmit}>
        <div id="form-img">
          <img
            src={snack.image !== "" ? snack.image : NoImage}
            alt="awaiting valid url"
          />
          <div>
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              onChange={handleChange}
              value={snack.name}
              required
            />
            <label htmlFor="image">Image URL:</label>
            <input
              id="image"
              type="url"
              placeholder="include http:// or https://"
              onChange={handleChange}
              value={snack.image}
            />
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              onChange={handleChange}
              value={snack.description}
            />
          </div>
        </div>

        <div id="form-icon">
          <div>
            <label htmlFor="carbs">Carbs (g):</label>
            <input
              id="carbs"
              type="number"
              min="0"
              step="0.1"
              onChange={handleChange}
              value={snack.carbs}
            />
            <label htmlFor="fiber">Fiber (g):</label>
            <input
              id="fiber"
              type="number"
              min="0"
              step="0.1"
              onChange={handleChange}
              value={snack.fiber}
            />
            <label htmlFor="protein">Protein (g):</label>
            <input
              id="protein"
              type="number"
              min="0"
              step="0.1"
              onChange={handleChange}
              value={snack.protein}
            />
            <label htmlFor="added_sugar">Added Sugar (g):</label>
            <input
              id="added_sugar"
              type="number"
              min="0"
              step="0.1"
              onChange={handleChange}
              value={snack.added_sugar}
            />
          </div>
          <div id="health-icon">
            <img src={isHealthy ? Solid : Outline} alt="health icon" />
            <h3>{isHealthy ? "healthy" : "unhealthy"}</h3>
          </div>
        </div>
        <input
          id="submit-button"
          type="submit"
          value={id ? "Save Changes" : "Add Snack"}
        />
      </form>
      {modal && (
        <div className="overlay">
          <div id="secret-modal">
            <h4>Congratulations!</h4>
            <h4>You have unlocked an easter egg!</h4>
            <button onClick={proceed}>proceed</button>
          </div>
        </div>
      )}
    </div>
  );
}
