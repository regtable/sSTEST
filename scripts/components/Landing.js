import React, { useState, useEffect } from 'https://cdn.skypack.dev/react';
const Landing = ({setActiveWindow ,id, setid, isloggedin, setisloggedin, setfirstrun, firstrun,setwax,landscape,metamaskon,metamaskAddress,setmetamaskon,setmetamaskAddress} ) => {
const handleClicklog = () => {
        setActiveWindow({ type: 'login' });
  }; 
  const handleClicksign = () => {
        setActiveWindow({ type: 'signup' });
  };


  return (
    <div class="login">
      {!landscape ? (
        <div style={{display:"grid"}}>
                    <i class="fa-solid fa-group-arrows-rotate login-button rotator txtglow" style={{fontSize:"8rem"}}></i>
          <div class="login-button loginmsg  txtglow"   >!!!---...ROTATE DEVICE...---!!!</div>   <div class="login-button loginmsg  txtglow"   >{navigator.userAgent}</div>
          
</div>
      ) : (
        <div class="login">
          <div class="login-button"  onClick={handleClicklog}>Login</div>
            <i  class="login-img" src="../../public/icon.png"/>
          <div class="login-button"onClick={handleClicksign} metamaskon={metamaskon} setmetamaskAddress={setmetamaskAddress} setmetamaskon={setmetamaskon} metamaskAddress={metamaskAddress}>Sign up  </div>
        </div>
      )}
    </div>
  );
};

export default Landing;