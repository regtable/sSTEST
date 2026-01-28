// Hangar.js
import React, { useState, useEffect } from 'https://cdn.skypack.dev/react';
import Waxa from './Wax';
import { encryptData, decryptData } from './encryption';
const Signup = ({id,metamaskon,metamaskAddress,setmetamaskon,setmetamaskAddress,setwax,setanchor,setcloud, setid}) => {
    const [isLogina, setlogina] = useState(false);
  const [isLoginc, setloginc] = useState(false);
  const [query, setquery] = useState("?false");
  const [enc, setenc] = useState("false");
  const [errormsg, seterrormsg] = useState("");
  const [fin, setfin] = useState(false);
  const stylemod=["rainbow","forest"]
  const handleWindowToggle = async (window2) => {
    if (window2 === "anchor") {
      setlogina(true);
    } else if (window2 === "cloud") {
      setloginc(true);
    }else if(window2==="mm")
      {
 const signature = await window.ethereum.request({
          method: 'personal_sign',
          params: [id,metamaskAddress],
          from: metamaskAddress
        });

        // Handle the signature as needed
      const signup = await   fetch(`https://backend.deploystarship.com/api/v1/accounts`, {
                      method: 'POST',
                      mode: 'cors',
                      headers: {
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'JSON'
                      },
                      body: JSON.stringify({
                        waxaccount:id,
                        signature: signature,
                        wallet: metamaskAddress.toLowerCase()
                      })
                    })
      const resp=await signup.json()  
      console.log(resp)
       if (!signup.ok && !resp.message) {
         seterrormsg(resp.status)
    throw new Error(`HTTP error! Status: ${resp.status}`);
  }else if(!signup.ok &&resp.message.details){
    seterrormsg(resp.message.details[0].message.split(":")[1])
        throw new Error(`${resp.message.details[0].message.split(":")[1]}`);

  }else{

    seterrormsg( resp.message,"please refresh and try sign in mobile users return back to the main browser and refresh/sign in")
      }
      }
  };
 useState(async ()=>{
    if (window.ethereum) {
    setmetamaskon(true)
const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setmetamaskAddress(accounts[0])


  }else{
        console.log("et not found")

  }
    
  },[])
 useEffect(() => {

  if (id !== null) {
const sensitiveData = id;
const encryptedData = encryptData(sensitiveData);
const queryString = `?data=${encodeURIComponent(encryptedData)}`;
    setenc(encryptedData);
    setquery(queryString);
    
  }else{

  }
   
}, [id]);
  
  return (
  <div style={{ minWidth: "100vw", height: "95vh", display: "grid" }}>
    <div className="signup" style={{ height: "95vh", display: "grid", justifyContent: "center" }}>
        {id && metamaskAddress !== null && fin ? (
          // Welcome message when we have an id and a metamask address
          <div>Welcome {`${id}`}</div>
        ) : metamaskon ? (
          // Connect Metamask when Metamask is detected
        <> <div className={`signup ${stylemod[((metamaskAddress !== null)? 1 : 0)]}`} style={{ display: "flex", justifyContent: "space-around", width: "45vw", height: "4rem" }}>
            Connect Metamask {`${metamaskAddress}`}
            <button style={{ display: "grid", justifyItems: "center", width: "15%", height: "2rem" }} onClick={() => handleWindowToggle('cm')} disabled={metamaskAddress !== null}>
              mm
            </button>
            
           
          </div>
            
            <div className={`signup ${stylemod[((id)? 1 : 0)]}`} style={{ display: "flex", justifyContent: "space-around", width: "45vw", height: "4rem" }}>
            Connect Wax {`${id}`}
            <button style={{ display: "grid", justifyItems: "center", width: "15%", height: "2rem" }} onClick={() => handleWindowToggle('cloud')}  disabled={id}>
              cloud
            </button>
            
            <button style={{ display: "grid", justifyItems: "center", width: "15%", height: "2rem" }} onClick={() => handleWindowToggle('anchor')}  disabled={id }>
              anchor
            </button>
            
           
          </div>
          <button style={{ display: "grid", justifyItems: "center", width: "15%", height: "2rem" }} className onClick={() => handleWindowToggle('mm')}  disabled={(!id || metamaskAddress === null) }>
              click to finish signup
            </button>
                  <div>{errormsg}</div>

</>
        ) : (
        
          // Install Metamask when Metamask is not detected
          <div>
            Install Metamask to your browser / mobile. Use the inbuilt Metamask browser to complete signup.
           <button style={{ display: "grid", justifyItems: "center", width: "6rem", height: "4rem" }} onClick={() => handleWindowToggle('cloud')}  disabled={id}>
              cloud {id}
            </button>
            
            <button style={{ display: "grid", justifyItems: "center", width: "15%", height: "2rem" }} className onClick={() => handleWindowToggle('anchor')}  disabled={id }>
              anchor
            </button>
   <a href={`https://metamask.app.link/dapp/https://000697922.deployed.codepen.website/${query}`}>
     <button disabled={(query==="?false" )}>Click me to open MetaMask app {query}</button>
</a>
          <a href={`https://metamask.io/`}>
  <button>Click me to install MetaMask</button>
</a> 
<button style={{ display: "grid", justifyItems: "center", width: "15%", height: "2rem" }} className onClick={() => handleWindowToggle('mm')}  disabled={(!id || metamaskAddress === null) }>
              click to finish signup
            </button>
               <div>{errormsg}</div>
          </div>
   
        )}
      </div>
    {isLogina && <Waxa setid={setid} justid={true} anchor={true} setanchor={setanchor} setcloud={setcloud} setwax={setwax} setisloginc={setloginc} setislogina={setlogina} />}
    {isLoginc && <Waxa setid={setid} cloud={true} justid={true} setanchor={setanchor} setcloud={setcloud} setwax={setwax} setisloginc={setloginc} setislogina={setlogina} />}
  </div>
);
};


export default Signup;