import NavBar from "@/components/NavBar";
import { Outlet } from "react-router-dom";

export default function Root() {
  const navListL = [
    { to: "/", text: "Home" },
    { to: "/mind", text: "Mind" },
  ];
  const navListR = [
    { to: "/register", text: "Register" },
    { to: "/login", text: "Login" },
  ];
  return (
    <>
      <NavBar navListL={navListL} navListR={navListR}></NavBar>
      <Outlet />
    </>
  );
}
