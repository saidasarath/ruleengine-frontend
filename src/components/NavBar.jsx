import React from "react";
import {Link} from "react-router-dom";
import "../styles/navbar.css"
const Navbar=()=>{
    return(
       <nav>
        <Link to="/" className="title">RULE ENGINE</Link>
        <ul>
            <li><Link to= "/datarule">Rule Engine</Link></li>
            <li><Link to="/availabledata">Available Data</Link></li>
        </ul>
       </nav>
    )
}
export default Navbar;
