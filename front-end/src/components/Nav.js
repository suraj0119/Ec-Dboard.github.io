import react, { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';


const Nav=()=>{
    
    const auth =localStorage.getItem('user');
    const navigate = useNavigate();
    
    const logout = ()=>{
        localStorage.clear();
        navigate('/signup')
    }

    return(
        <div>
            <img src="https://t4.ftcdn.net/jpg/04/42/01/81/360_F_442018137_F4FTedsmVBxmaibxMKuNbeIms8Xkk1e4.jpg" alt="logo" className="logo"/>
           {auth? <ul className="nav-ul">
                <li><Link to="/">Products</Link></li>
                <li><Link to="/add">Add Product</Link></li>
                <li><Link to="/update">Update Product</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                
            
                <li><Link onClick={logout} to="/signup">Logout ({JSON.parse(auth).name})</Link></li>
                </ul>
                    :
                    <ul className="nav-ul nav-right">
                    <li><Link to="/signup">SignUp</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    </ul> 
           }
                
        </div>
    )
} 

export default Nav;