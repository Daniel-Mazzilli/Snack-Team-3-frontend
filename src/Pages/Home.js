import { Link } from "react-router-dom";
import welcome from "../assets/Welcome.png";

export default function Home() {
  return (
    <div id="home">
      {/* <h1>Welcome to Snax!</h1> */}
      <img src={welcome} alt="welcome" />
      <p>
        <span>Welcome to SNAX!</span>
        <br/>
        An app that allows you to log your favorite snacks, and some of ours too 😉 .{" "} While traversing this app, we have ensured that you will be able to see if whether or{" "}
        <Link id="hint" to="/snacks/new">
          d3v$f4v$
        </Link>{" "} not your snack is healthy.
        View some of our favorite couch and blanket companions, add your own snacks, come back to update them, and if they have lived on past their expiration date, delete them. 
        <br/>
        Click on any of the above links to get started!  
      </p>
      {/* <img src="https://media0.giphy.com/media/WQZJkXIPyxsFW4wuaC/giphy.gif?cid=790b76115edec05a6fac57a8cd9d14772b2b9a7ee9004857&rid=giphy.gif&ct=s" alt="snack all day" height="340px" /> */}
    </div>
  );
}
