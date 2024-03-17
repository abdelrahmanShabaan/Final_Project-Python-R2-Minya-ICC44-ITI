import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { FaRegHeart } from "react-icons/fa";
import {CgShoppingCart } from "react-icons/cg";


function Navbar() {
  return (


            <>
              <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid">
            <a className="navbar-brand" to="#" style={{ color: 'white' }}>Ecommerce</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {/* <li className="nav-link" style={{ color: 'white' }}>Home </li>
                <li className="nav-link" style={{ color: 'white' }}>Categories </li>
                <li className="nav-link" style={{ color: 'white' }}>MyCart </li>
                <li className="nav-link" style={{ color: 'white' }}>Favoriate Page </li> */}
                  <li className="nav-item">
                    <Link className="nav-link" to="/product" style={{ color: 'white' }}>product</Link>
                </li>
                </ul>
               </div>
           </div>
           <nav style={{marginRight: '1rem'}}>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0" > 
            <li className="nav-item">
            <Link className="nav-item" to="/whishlist" style={{ color: 'white' , marginRight :'0.5rem' , textAlign: 'center'}}> <FaRegHeart  style={{ color: 'red' }} />  Whishlist </Link>
            </li>
            <li className="nav-item">
            <Link className="nav-item" to="/cart" style={{ color: 'white' }}> <CgShoppingCart /> cart </Link>
            </li>
                <li>
                    <Link className="nav-link signup_display" to="/signup"style={{ display: 'block' ,  color: 'white'}}  id="sign_item">signup</Link>
                </li>
                <li className="nav-item">
          </li>
               </ul>
         </nav>
         </nav>
        
                
            
            
            
            
            </>


  
  
  )
}




export default Navbar;