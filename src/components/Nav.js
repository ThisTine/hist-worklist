import { NavLink } from "react-router-dom"
import {FiHome,FiUser,FiPlus} from 'react-icons/fi'
const NavBar = ()=>{
    return(

            <nav className="navbar">
                <div className="nav-top">
                <NavLink className="nav-item nav-logo" to="/" exact> <FiHome/> </NavLink>
                <NavLink className="nav-item" to="/add"> <FiPlus/> </NavLink> 
                <NavLink className="nav-item sm-show" to="/user"> <FiUser/> </NavLink>                    
                </div>
                <div className="nav-bottom">
                <NavLink className="nav-item" to="/user"> <FiUser/> </NavLink>    
                </div>
            </nav>
    )
}
export default NavBar;