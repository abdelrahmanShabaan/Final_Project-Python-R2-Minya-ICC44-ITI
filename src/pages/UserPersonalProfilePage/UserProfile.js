import React, { useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import UserSidebar from '../../components/UserProfileComponents/UserSidebar'
import AccountSettings from '../../components/UserProfileComponents/AccountSettings'
import './UserProfile.css'
import ChangePassword from '../../components/UserProfileComponents/ChangePassword'
import YourOrders from '../../components/UserProfileComponents/YourOrders'
import UserAddress from '../../components/UserProfileComponents/UserAddress'
import LegalNotice from '../../components/UserProfileComponents/LegalNotice'

const UserProfile = () => {

    //Basic of profile Active page 
    const {activepage} = useParams()

    
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

  
    // alert(activepage)
  return (
    <div className='userprofile'>
 

         <div className='userprofilein'>
            <div className='left'>
            <div className="card">
            <img height="250px"  src="https://lh3.googleusercontent.com/oUUiPB9sq3ACq4bUaRmo8pgvC4FUpRRrQKcGIBSOsafawZfRpF1vruFeYt6uCfL6wGDQyvOi6Ez9Bpf1Fb7APKjIyVsft7FLGR6QqdRFTiceNQBm1In9aZyrXp33cZi9pUNqjHASdA=s170-no" alt="Person" class="card__image"/>
            <h1 style={{ textAlign: 'center', fontSize: '20px' }}>Welcome {formData.name}</h1>
            </div>
              <UserSidebar activepage={activepage}/>
            </div>
            <div className='right'>
              {activepage === 'accountsettings' && <AccountSettings/>}
              {/* {activepage === 'changepassword' && <ChangePassword/>} */}
              {activepage === 'yourorders' && <YourOrders/>}
              {/* {activepage === 'address' && <UserAddress/>} */}
              {activepage === 'legalnotice' && <LegalNotice/>}
            </div>
         </div>
  </div>
  )
}

export default UserProfile;