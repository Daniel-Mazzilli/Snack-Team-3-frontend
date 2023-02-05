import { Link } from "react-router-dom";
import welcome from "../assets/Welcome.png";

export default function Home() {
  return (
    <div id="home">
      <img src={welcome} alt="welcome" />
      <p>
        <span>Welcome to SNAX!</span>
        <br/>
        An app that allows you to log your favorite snacks, and some of ours too 😉 .{" "} While traversing this app, we have ensured that you will be able to see if whether or{" "}
        <Link id="hint" className="type in name" to="/snacks/new">
          P0i$0n
        </Link>{" "} not your snack is healthy.
        View some of our favorite couch and blanket companions, add your own snacks, come back to update them, and if they have lived on past their expiration date, delete them. 
        <br/>
        Click on any of the above links to get started!  
      </p>
    </div>
  );
}
