import React, { useEffect, useState } from 'react'
import './AccountSettings.css'
import { useNavigate, useLocation } from "react-router-dom";


const AccountSettings = () => {
 
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
  });

  
  /** Redirection */
  useEffect(() => {
    if (localStorage.getItem("login") !== null) {
      const user = JSON.parse(localStorage.getItem("login"));
      if (user.role === "seller") {
        navigate("/Dashboard");
      } else {
        // Set name and email from local storage
        setFormData((prevData) => ({
          ...prevData,
          name: user.name,
          email: user.email,
        }));
      }
    } else {
      navigate("/user");
    }
  
  },);
  

  return (
    <>
    
    
<div className='accountsettings'>
<h2 className='mainhead1' style={{ alignItems: 'center' }}>Personal Information</h2>

</div>

<div class="col-sm-8">
    <div class="card-block">
        <h6 class="m-b-20 p-b-5 b-b-default f-w-600">Details</h6>
        <div class="row">
            <div class="col-sm-6">
                <p class="m-b-10 f-w-600">Full Name :</p>
                <h6 class="text-muted f-w-400">{formData.name}</h6>
            </div>
            <div class="col-sm-6">
                <p class="m-b-10 f-w-600">Email :</p>
                <h6 class="text-muted f-w-400">{formData.email}</h6>
            </div>
        </div>
        {/* <ul className="social-link list-unstyled m-t-40 m-b-10">
      <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="facebook" data-abc="true"><i className="mdi mdi-facebook feather icon-facebook facebook" aria-hidden="true"></i></a></li>
      <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="twitter" data-abc="true"><i className="mdi mdi-twitter feather icon-twitter twitter" aria-hidden="true"></i></a></li>
      <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="instagram" data-abc="true"><i className="mdi mdi-instagram feather icon-instagram instagram" aria-hidden="true"></i></a></li>
    </ul> */}
    </div>
    </div>

    



</>      
  )
}

export default AccountSettings