// Hangar.js
import React, { useState, useEffect } from 'https://cdn.skypack.dev/react';
import Waxa from './Wax';

const Account = ({ id, setid, isloggedin, setisloggedin, setfirstrun, firstrun,setwax,images }) => {
  const [selectedPartsInShips, setSelectedPartsInShips] = useState([]);
  const [isLogina, setlogina] = useState(false);
  const [isLoginc, setloginc] = useState(false);
  const [timeend, settimeend] = useState(Date.now());
  const [timenow, settimenow] = useState(Date.now());
    useEffect(() => {

  
    },[])

  
 
function calculateOpacity(maxpool, pool) {
    const n =pool/maxpool;
  let opacity;
    if (n <= 0) {
      opacity = 0;
    } else if (n >= 10) {
      opacity = 10;
    } else {
      const lowerThreshold = (n * 10) / 10;
      const upperThreshold = ((n + 1) * maxpool) / 10;
      const fraction = (pool - lowerThreshold) / (upperThreshold - lowerThreshold);
      opacity = n + fraction;
    }
  console.log(n,timenow,timeend,timenow-timeend)
    return opacity;
  }
  console.log(firstrun, "hit accounts");

  const handleWindowToggle = (window) => {
    if (window === "anchor") {
      setlogina(true);
    } else if (window === "cloud") {
      setloginc(true);
    }
  };
  
 

// ...


  return (
    <div id="cards">
      {isloggedin ? (
        <> <div className="battery" id={`pool-left-${1}`}>
                pool: {timenow}
                <ul>
                       {[...Array(10)].map((_, index) => {
                    const popacity = calculateOpacity( timenow,timeend);
                    let npopacity = 0;

                    if (popacity > index) {
                      npopacity = popacity;
                    } else if (popacity > index -1) {
                      npopacity = 0.2;
                    } else {
                      npopacity = 0;
                    }
                    return (
                      <li
                        key={index}
                        id={`cell${index + 1}`}
                        style={{
                          background:timenow === timeend
                            ? `rgba(255,215,0,${npopacity})`
                            : `rgba(117,182,255,${npopacity})`,
                          boxShadow: timenow === timeend
                            ? `inset 0px 0px 10px 2px rgba(117,182,255,${npopacity}),
                               0px 0px 20px rgba(248,125,15,${npopacity})`
                            : `inset 0px 0px 10px 2px rgba(117,182,255,${npopacity}),
                               0px 0px 20px rgba(117,182,214,${npopacity})`,
                            width:`${95/10}vw`,
                              padding:"0px",
                                margin:"0px",
                                    top:Math.random()*50,
                                    left:Math.random()*50,
                        }}
                      ></li>
                    );
                  })}
                </ul>
  
              </div>
          <div style={{ display: "grid", justifyItems: "center", width: "50%" }}>{id}</div>
              <h1>"Smart" Image Glow Effect</h1>
    <div id="maskparent">
      <img src="https://cdn.discordapp.com/attachments/874775208714702898/1186796957327437845/sspng.png?ex=65948dcc&is=658218cc&hm=a54ff38b2bd4542b276095553e57dfc959ea2f7b0004967c36cd3482e6a24a1c&" id="mask" alt="Majora's Mask with glow" />
    </div>
        {images.map((img2, index) => {
            console.log(img2)
              const key=Object.keys(img2)[0]
  if (img2[key].image) {
    return <img key={index} className="part3d" src={img2[key].image} alt="My Image" />;
  }
  if (img2[key].video) {
     return  <video
            className="part3d"
            autoPlay
            loop
            muted
            playsInline
            src={img2[key].video}
            type="video/mp4"
          ></video>;
  }
  return null; // handle the case where neither image nor video is present
})}
        </>
      ) : (
        <>
          <button style={{ display: "grid", justifyItems: "center", width: "50%" }} onClick={() => handleWindowToggle('anchor')}>anchor</button>
          <div style={{ display: "grid", justifyItems: "center", width: "70%", height: "1rem", backgroundColor: "#004" }}></div>
          <button style={{ display: "grid", justifyItems: "center", width: "50%" }} onClick={() => handleWindowToggle('cloud')}>cloud</button>
          <div style={{ display: "grid", justifyItems: "center", width: "70%", height: "1rem", backgroundColor: "#004" }}></div>
          {isLogina && !isloggedin && <Waxa id={id} setwax={setwax}  anchor={true} id={id} setid={setid} isloggedin={isloggedin} setfirstrun={setfirstrun} setisloggedin={setisloggedin} />}
          {isLoginc && !isloggedin && <Waxa id={id} setwax={setwax}  cloud={true} id={id} setid={setid} isloggedin={isloggedin} setfirstrun={setfirstrun} setisloggedin={setisloggedin} />}

            </>
      )}
    </div>
  );
};

export default Account;
