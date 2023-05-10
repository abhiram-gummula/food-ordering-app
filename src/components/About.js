import { Outlet } from "react-router-dom"
import Profile from "./ProfileClass"
const About = () => {
  return (
    <div>
      <h1>About Us Page</h1>
      <p>This is part of the course I am doing to learn React.</p>
      <Outlet />
    </div>
  )
}

export default About