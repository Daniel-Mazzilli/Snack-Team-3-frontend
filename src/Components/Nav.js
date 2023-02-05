import { Link } from "react-router-dom";
import { useContextProvider } from "../Provider/Provider";
import darkMode from "../assets/darkmode.png";
import lightMode from "../assets/lightmode.png";
import "./Nav.css";

export default function Nav() {
  const { theme, setTheme } = useContextProvider();
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <nav>
      <Link to="/">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2553/2553691.png"
          alt="logo"
          height="45px"
        />
      </Link>
      <Link to="/snacks">Snax</Link>
      <Link to="/snacks/new">New</Link>
      <Link to="/about">About</Link>
      <button className="toggleTheme" onClick={toggleTheme}>
        {theme === "light" ? (
          <img className="toggleButton" src={lightMode} alt="lm" />
        ) : (
          <img className="toggleButton" src={darkMode} alt="dm" />
        )}
      </button>
    </nav>
  );
}
