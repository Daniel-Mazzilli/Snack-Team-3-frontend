import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useContextProvider } from "../Provider/Provider.js";
import { WiStars } from "react-icons/wi"
import SnackCard from "./SnackCard.js";
import "./SnacksIndex.css";
import { Axios } from "axios";

export default function SnacksIndex() {
  const { snacks, setSnacks, axios, API } = useContextProvider();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [radio, setRadio] = useState("");
  const [favorite, setFavorite] = useState([]);
  const data =
    searchResult.length > 0 || search ? [...searchResult] : [...snacks];

  function filterSearch(string, objArr) {
    const filteredSnacks = objArr.filter(({ name }) => {
      const input = string.toLowerCase().split(` `).join(``);
      const snackName = name.toLowerCase().split(` `).join(``);

      if (input === "") return objArr;
      else {
        return snackName.includes(input);
      }
    });
    if (radio) {
      const healthy = radio === "healthy" ? true : false;
      const healthyfilter = filteredSnacks.filter(
        ({ is_healthy }) => is_healthy === healthy
      );
      setSearchResult(healthyfilter);
    } else {
      setSearchResult(filteredSnacks);
    }
  }

  function handleSearch(e) {
    const value = e.target.value;
    setSearchResult([...snacks]);
    setSearch(value);
    filterSearch(value, [...snacks]);
  }

  function handleRadio(e) {
    const value = e.target.value;
    setRadio(value);
    const healthy = value === "healthy" ? true : false;
    if (value && !search) {
      const healthyfilter = snacks.filter(
        ({ is_healthy }) => is_healthy === healthy
      );
      setSearchResult(healthyfilter);
    } else if (search) {
      const healthyfilter = searchResult.filter(
        ({ is_healthy }) => is_healthy === healthy
      );
      setSearchResult(healthyfilter);
    } else {
      setSearchResult(snacks);
    }
  }

  useEffect(() => {
    // favorites
    const data = JSON.parse(localStorage.getItem('favorites'))
    
      // compare if value is in snacks, if not remove from favorites
      const idArrFav = data.map(({id}) => id )
      const snackIdArr = snacks.map(({id}) => id)

      const noMatch = idArrFav.filter(el => !snackIdArr.includes(el))
      if(noMatch.length > 0){
      // filter out favArr
      const updatedFavs = favorite.filter(({id}) => id !== noMatch[0])
      setFavorite(updatedFavs)
      localStorage.setItem('favorites', JSON.stringify(updatedFavs))
      }
      else {
        setFavorite(data)
      }
      axios.get(`${API}/snacks`)
      .then(({data}) => setSnacks(data))
      .catch(err => console.log(err))
    
    
  }, [snacks.length, favorite.length]);

  return (
    <div className="index">
      <section className="index-header">
        <img 
        className="cat-gif" 
        src="https://i.pinimg.com/originals/75/92/9c/75929ccf9a403ec6405c0adbd8fc2977.gif" 
        alt="snacking"/>
        <img 
        className="cat-gif" 
        src="https://i.postimg.cc/653ytWF5/cat-snack.gif" 
        alt="snacking" />
        
        <div className="search">
          {/* searchbar */}
            <input
              id="searchbar"
              type="text"
              placeholder="Search Snacks"
              value={search}
              onChange={(event) => {
                handleSearch(event);
              }}
            />
       
          {/* radio buttons */}
          <section className="radio">
            <label htmlFor="healthy">
              <input
                type="radio"
                id="healthy"
                name="radio-button"
                checked={radio === "healthy" ? true : false}
                value="healthy"
                onChange={(event) => handleRadio(event)}
              />{" "}
              Healthy
            </label>

            <label htmlFor="unhealthy">
              <input
                type="radio"
                id="unhealthy"
                name="radio-button"
                checked={radio === "unhealthy" ? true : false}
                value="unhealthy"
                onChange={(event) => handleRadio(event)}
              />{" "}
              Unhealthy
            </label>

            <label htmlFor="showAll">
              <input
                type="radio"
                id="showAll"
                name="radio-button"
                checked={radio === "" ? true : false}
                value=""
                onChange={(event) => handleRadio(event)}
              />{" "}
              Show All
            </label>
          </section>
        </div>
      </section>


      {/* aside1 fiber/ protein */}
      <aside className="index-left">
        <div className="fiber">
          <h5>High in Fiber:</h5>
          {snacks.map(({ fiber, name, id }) => {
            if (+fiber > 15) {
              return (
                <Link key={id} to={`/snacks/${id}`}>
                  <li><span>{name}</span></li>
                </Link>
              );
            }
          })}
        </div>
        <hr />
        <div className="fiber">
          <h5>High In Protein</h5>
          {snacks.map(({ protein, name, id }) => {
            if (+protein > 20) {
              return (
                <Link key={id} to={`/snacks/${id}`}>
                  <li>{name}</li>
                </Link>
              );
            }
          })}
        </div>
      </aside>

      {/* snack details */}
      <section className="index-snack">
        {data.map((snack) => (
          <SnackCard
            key={snack.id}
            snack={snack}
            setSearch={setSearch}
            setSearchResult={setSearchResult}
            favorite={favorite}
            setFavorite={setFavorite}
          />
        ))}
      </section>

      {/* aside 2 favorites list */}
      <aside className="index-right">
        <h5><span>Favorites</span> <WiStars color={"gold"} size={"40px"} /></h5>
        {
        favorite.map(({ id, name }) => {
          return (
            <li key={id}>
              <Link to={`/snacks/${id}`}>{name}</Link>
            </li> 
          );
        })}
      </aside>

      {/* add (+) botton/icon/link */}
      <Link to="/snacks/new">
        <img
          src="https://www.pngkey.com/png/detail/136-1362850_this-free-icons-png-design-of-plus-icon.png"
          alt="plus-sign"
          className="add-button"
        />
      </Link>
    </div>
  );
}
