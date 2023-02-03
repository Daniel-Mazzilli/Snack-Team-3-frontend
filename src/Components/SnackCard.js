import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useContextProvider } from "../Provider/Provider"
import { IconCheckbox } from "react-icon-checkbox"
import { IconContext } from "react-icons";
import { FaStar } from "react-icons/fa"
import { IoNutritionSharp, IoTrashOutline } from "react-icons/io5"
import { GiWrappedSweet } from "react-icons/gi"
import { TbStarOff } from "react-icons/tb"
import noImage from "../assets/default.png"
import "./SnackCard.css"

export default function SnackCard({snack, setSearchResult, setSearch, favorite, setFavorite}) {
    const {id, name, fiber, protein, added_sugar, is_healthy, image, description, carbs} = snack
    const { API, axios, snacks, setSnacks } = useContextProvider()
    const[checked, setChecked] = useState(false)

    function handleDelete(){
        axios.delete(`${API}/snacks/${id}`)
        .then((respJson) => {
            const idValue= respJson.data.id
            const newSnacks = snacks.filter(({id}) => idValue !== id)
            setSnacks(newSnacks)
            setSearch("")
            setSearchResult(newSnacks)
        })
        .catch(err => console.log(err))
    }

    function handleCheckbox() {
        setChecked(!checked)
        const exist = favorite.find(obj => +id === obj.id)
        if(!exist){
         const favObj = snacks.find(obj=> +id === obj.id)
         setFavorite([...favorite, favObj])
         localStorage.setItem('favorites', JSON.stringify([...favorite, favObj]))
        }
        if(exist){
            const removeFav = favorite.filter(obj => +obj.id !== +id)
            setFavorite(removeFav)
            localStorage.setItem('favorites', JSON.stringify(removeFav))  
        }
    }
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('favorites'))
        if(data){
            const isFav = data.find(obj => +obj.id === id)
            if(!isFav){
                setChecked(false)
            }
            else {
                setChecked(true)
            }
        } 
    },[id])

    return(
       <>
        <Link to={`/snacks/${id}`}>
            <div className="container">
                <img src={image ? image : noImage} alt={name} />
                <div className="middle">
                    <div className="text">{name}</div>
                </div>
            </div>
        </Link>
       
        <section className="snack-details">
        <Link to={`/snacks/${id}`}>
            <p>{name}</p>
        </Link>
            <p>{description}</p>
            <p>{is_healthy ? <IoNutritionSharp color={"green"} size={"35px"}/> : <GiWrappedSweet color={"#E3056C"} size={"40px"}/> }</p>
        </section>
        {/* favorite / delete */}
        <section className="index-fav-delete">
            <span>

            <IconCheckbox 
                type = "checkbox"
                checked = {checked}
                checkedIcon={
                    <IconContext.Provider value={{color: "gold", size: "40px"}}>
                        <FaStar />
                    </IconContext.Provider>}
                uncheckedIcon={
                    <IconContext.Provider value={{color: "white", size: "40px"}}>
                        <TbStarOff />
                    </IconContext.Provider>}
                onClick={() => handleCheckbox()}
                />
            </span>

            <span onClick={(event) => handleDelete(event)}><IoTrashOutline color={"#2283e6"} size={"40px"}/>
            </span>
        </section>
        <hr/>
       </>
    )
}