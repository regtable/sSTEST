// Hangar.js
import React, { useState, useEffect } from 'https://cdn.skypack.dev/react';
import Waxa from './Wax';

const LoginModal = ({id, setid, isloggedin, setisloggedin, setfirstrun, firstrun,setwax,settopbar,setActiveWindow ,setanchor,setcloud,landscape}) => {
   const [selectedPartsInShips, setSelectedPartsInShips] = useState([]);
  const [isLogina, setlogina] = useState(false);
  const [isLoginc, setloginc] = useState(false);
  
  
  const handleWindowToggle = (window) => {
    if (window === "anchor") {
      setlogina(true);
    } else if (window === "cloud") {
      setloginc(true);
    }
  };
  
  
  return (<>
      {landscape&&<>
          <button style={{ display: "grid", justifyItems: "center", width: "50%" }} onClick={() => handleWindowToggle('anchor')}>anchor</button>
          <div style={{ display: "grid", justifyItems: "center", width: "70%", height: "1rem", backgroundColor: "#004" }}></div>
          <button style={{ display: "grid", justifyItems: "center", width: "50%" }} onClick={() => handleWindowToggle('cloud')}>cloud</button>
          <div style={{ display: "grid", justifyItems: "center", width: "70%", height: "1rem", backgroundColor: "#004" }}></div>
          {isLogina && !isloggedin && <Waxa id={id} setwax={setwax}  anchor={true} id={id} setid={setid} isloggedin={isloggedin} setfirstrun={setfirstrun} setisloggedin={setisloggedin}settopbar={settopbar} setActiveWindow={setActiveWindow}setanchor={setanchor} setcloud={setcloud}/>}
          {isLoginc && !isloggedin && <Waxa id={id} setwax={setwax}  cloud={true} id={id} setid={setid} isloggedin={isloggedin} setfirstrun={setfirstrun} setisloggedin={setisloggedin} settopbar={settopbar} setActiveWindow={setActiveWindow} setanchor={setanchor} setcloud={setcloud}/>}

            </>}
      </>
  );
};


export default LoginModal;