import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContextProvider } from "../Provider/Provider"
import DevCard from "../Components/DevCard.js";

export default function About() {
  const { API, axios } = useContextProvider();
  const [devs, setDevs] = useState([])
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/devs`)
      .then((res) => setDevs(res.data))
      .catch(() => navigate("/not-found"));
  }, [navigate],[]);


  return (
    <>
      <h2 className="about-h2">Snack On This!</h2>
      <div className="dev-container">
        {
          devs.map(dev => <DevCard key={dev.id} dev={dev} />)
        }
      </div>
    </>
  );
}
