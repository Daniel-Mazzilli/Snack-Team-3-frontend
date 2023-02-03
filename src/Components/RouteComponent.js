import { Routes, Route, Navigate } from "react-router-dom";
import { useContextProvider } from "../Provider/Provider.js";
import Home from "../Pages/Home.js";
import Index from "../Pages/Index.js";
import Show from "../Pages/Show.js";
import Edit from "../Pages/Edit.js";
import New from "../Pages/New.js";
import About from "../Pages/About.js";
import FourOFour from "../Pages/FourOFour.js";
import Hidden from "../Pages/Hidden.js";

export default function RouteComponent() {
  const { hidden } = useContextProvider();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/snacks" element={<Index />} />
      <Route path="/snacks/:id" element={<Show />} />
      <Route path="/snacks/:id/edit" element={<Edit />} />
      <Route path="/snacks/new" element={<New />} />
      <Route path="/about" element={<About />} />
      <Route path="/not-found" element={<FourOFour />} />
      {hidden?<></>:<Route path="/d3v$f4v$" element={<Hidden />} />}
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  );
}
