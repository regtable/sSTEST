import { encryptData, decryptData } from './encryption';
import React, { useState, useEffect,useRef  } from 'https://cdn.skypack.dev/react';
import Hangar from './Hangar';
import Hangar2 from './Hangar2';
import Account from './Account';
import PlanetCard from './PlanetCard';
import GlobalCard from './GlobalCard';
import Landing from './Landing';
import Signup from './Signup';
import LoginModal from './LoginModal';
import Login from './Login';
import Thing from './Thing';
import Metamask from './Metamask';
import Apis from './Apis';
import screenfull from 'https://cdn.skypack.dev/screenfull';
import fontawesome from 'https://esm.sh/fontawesome@5.6.3';

const App = () => {
  const [metamaskAddress,setmetamaskAddress]=useState(null)
const [metamaskon,setmetamaskon]=useState(false)
const [metamaskbrowser,setmetamaskbrowser]=useState(false)
  const [activeWindow, setActiveWindow] = useState({type:"landing"});
  const [actions, setActions] = useState([]);
  const [topbar, settopbar] = useState(false);
  const [dd, setdd] = useState(false);
  const [isOpen, setisOpen] = useState(false);
  const [ismessage, setismessage] = useState(false);
  const [isapi, setisapi] = useState(false);
  const [isloggedin, setisloggedin] = useState(false);
  const [isloginscreen, setLoginScreen] = useState(false);
    const [allParts, setAllParts] = useState([]);

  const [planets, setplanets] = useState([]);
  const [images, setimages] = useState([]);
  const [global, setallships] = useState([]);
  const [allplanets, setallplanets] = useState([]);
  const [id, setid] = useState(null);
  const [firstrun, setfirstrun] = useState(false);
const [topbarText,setTopbarText] = useState("");
  const [messageText,setMessageText] = useState("a wonderful default message becase one does not exist.. enjoy (whoops)");
  const [topbarTimer,setTopBarTimer]=useState(5000);
  const [wax,setwax]=useState(null);
  const [prevpage,setprevpage]=useState("");
  const [metamask,setmetamask]=useState("");
  const [anchor,setanchor]=useState(false);
  const [cloud,setcloud]=useState(false);
    const [landscape, setLandscape] = useState(false);
  
 const [accapis, setaccapis] = useState([]);
const [ahapis, setahapis] = useState([]);

useEffect(async () => {
  const pis = await fetch("https://validate.eosnation.io/wax/reports/endpoints.json");
  const pis2 = await pis.json();
 const sortedAccapis = [...pis2.report.api_https2].sort((a, b) => (a[0].rank > b[0].rank) ? -1 : (a[0].rank < b[0].rank) ? 1 : 0).filter(api => {
  // Exclude problematic URLs
  return !api[1].includes("apiwax.3dkrender.com") && !api[1].includes("wax.greymass.com")&& !api[1].includes(" https://api.wax.greeneosio.com");
});;
  const sortedAhapis = [...pis2.report.atomic_https].sort((a, b) => (a[0].rank < b[0].rank) ? -1 : (a[0].rank > b[0].rank) ? 1 : 0).filter(api => {
  // Exclude problematic URLs
  return !api[1].includes("apiwax.3dkrender.com") && !api[1].includes("wax.greymass.com")&& !api[1].includes(" https://api.wax.greeneosio.com");
});;

  setaccapis(sortedAccapis);
  setahapis(sortedAhapis);
}, []);
  
  useEffect(() => {
    const handleResize = () => {
      // Check if the screen width is greater than the screen height
      const isLandscape = window.innerWidth > window.innerHeight;
      setLandscape(isLandscape);
          settopbar(isLandscape);

    };

    // Initial check on component mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  useEffect(() => {
      console.log("message text in")
    if(topbarText!=""){
      setdd(true)
      setTimeout(() => {
        console.log("timeout topbar")
        setdd(false);
        setTopbarText("")
      }, 5000);
    }
   // settopbar(true);
     
  }, [topbarText]);
  useEffect(() => {

    if(actions.length>0){
     setismessage(true)
    }
      }, [actions]);
    useEffect(() => {
      
    const timeoutId = setTimeout(() => {
      var time = Math.random() * 1000 * 12;
      setTimeout(() => {
        setismessage(true);
      }, time);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, []);
  
  const handleWindowToggle = (data) => {
    if(data.hide)
         settopbar(false);
       setprevpage(activeWindow)
    setActiveWindow(activeWindow === data ? null : data);
  };

  const dismisswidget = () => {
    settopbar(false);

  };

  const dismissmessage = () => {
    if (isOpen) {
      setisOpen(!isOpen);
     
    } else {
      setisOpen(!isOpen);
    }
  };
function dismissAllActions(){
    setActions( []);

}
  function dispatchAllActions(){
  setActions((oldActions) => [...oldActions,{handler:"sendAll",name:"SENDBATCH"}]);
}
  var hasid = id !== undefined;
function getColorByActionName(action){
  console.log("action",action)
  if(action.name==="attachpart"){
    return "green"
  }else if (action.name==="transfer"){
    return "sienna"
  }else if(action.name==="unattachpart"){
    return "red"
  }else if(action.name==="SENDBATCH"){
    action.name
    return  "slategrey"
  }
}
  

     useEffect(() => {
         console.log(activeWindow)
if(navigator.userAgent.includes("MetaMaskMobile")){
  setLandscape(true)
  setmetamaskbrowser(true)
  if(activeWindow.type!=="signup")
  setActiveWindow({ type: 'signup' })
                            const queryParams = new URLSearchParams(window.location.search);
  const encryptedQueryParam = queryParams.get('data');

  // Log the encrypted data to check if it's present in the URL
  console.log('Encrypted Query Param:', encryptedQueryParam);

  if (encryptedQueryParam) {
    const decryptedData = decryptData(decodeURIComponent(encryptedQueryParam));

    // Log the decrypted data to check if decryption is successful
    console.log('Decrypted Data:', decryptedData);
setid(decryptedData)
  }


}
         console.log(ahapis,accapis)

  }, [activeWindow]);
  return  (
    <div style={{ display: 'grid', justifyItems: 'center', width: '100vw' }}>
     { isloggedin&& <div id="wrapper">
        <h1
          id="dropdownmodal"
          style={{
            maxHeight: dd ? '100px' : '0',
            margin: dd ? '16px 0' : '0',
            opacity: dd ? 1 : 0,
            overflow: 'hidden',
            transition: 'max-height 0.5s ease, opacity 0.5s ease, margin 0.5s ease',
          }}
          onClick={() => dismisswidget()}
        >
          {topbarText}
        </h1>
        <h1
          id="topbar"
          style={{maxHeight: topbar ? '100px' : '0',
            margin: topbar ? '16px 0' : '0',
            opacity: topbar ? 1 : 0,
            display: 'flex',
            justifyContent: 'space-around',
                          transition: 'max-height 0.5s ease, opacity 0.5s ease, margin 0.5s ease',

          }}
        >
          <i
            style={{ fontSize: '1rem' }}
            className="fa-solid fa-user"
            aria-hidden="true"
            onClick={() => handleWindowToggle({type:'account',hide:false})}
          >
            {'x'}
           ({allParts.length}) - account
          </i>
          <i
            style={{ fontSize: '1rem' }}
            className="fa-solid fa-shuttle-space"
            aria-hidden="true"
            onClick={() => handleWindowToggle({type:'hangar',hide:false})}
          >
            {' '}
           (128) - hangar
          </i><i
            style={{ fontSize: '1rem' }}
            className="fa-solid fa-shuttle-space"
            aria-hidden="true"
            onClick={() => handleWindowToggle({type:'rentals',hide:false})}
          >
            {' '}
           ({global.length}) - global
          </i>
          <i
            style={{ fontSize: '1rem' }}
            className="fa-solid fa-earth-americas"
            aria-hidden="true"
            onClick={() => handleWindowToggle({type:'planets',hide:true})}
          >
            {' '}
           ( {planets.length}) - planets
          </i>
          <i
            style={{ fontSize: '1rem' }}
            className="fa-solid fa-earth-americas"
            aria-hidden="true"
            onClick={() => handleWindowToggle({type:'allplanets',hide:false})}
          >
            {' '}
           ( {allplanets.length}) - all planets
          </i>
        </h1>
  
      </div>}
           {(activeWindow.type === 'landing'||!landscape)  && <Landing accapis={accapis}
ahapis={ahapis} setActiveWindow={setActiveWindow}landscape={landscape} setmetamaskon={setmetamaskon} setmetamaskAddress={setmetamaskAddress} metamaskon={metamaskon} setmetamaskAddress={setmetamaskAddress}/>}
      {activeWindow.type === 'login' && landscape && <LoginModal id={id}  setwax={setwax} setid={setid} isloggedin={isloggedin} setisloggedin={setisloggedin} firstrun={firstrun} setfirstrun={setfirstrun}prevpage={prevpage} setActiveWindow={setActiveWindow} settopbar={settopbar} setanchor={setanchor} setcloud={setcloud} landscape={landscape} />}
      {activeWindow.type === 'signup'&& landscape && <Signup id={id} setwax={setwax} setActiveWindow={setActiveWindow} setmetamaskon={setmetamaskon} setmetamaskAddress={setmetamaskAddress}  setanchor={setanchor} setcloud={setcloud} metamaskon={metamaskon} metamaskAddress={metamaskAddress} setid={setid}/>}
      {activeWindow.type === 'loading'&& landscape && <Login images={images} setimages={setimages} id ={id}setplanets={setplanets}
setallships={setallships}
setallplanets={setallplanets} />}
      {(activeWindow.type === 'hangar'&& landscape) && hasid && <Hangar images={images} accapis={accapis} allParts={allParts} setAllParts={setAllParts }
ahapis={ahapis} id={id} allplanets={allplanets} setActions={setActions} prevpage={prevpage} setActiveWindow={setActiveWindow}/>}
       {(activeWindow.type === 'rentals'&& landscape) && hasid && <Hangar2 images={images} accapis={accapis}
ahapis={ahapis} id={id} allplanets={allplanets} setActions={setActions}global={global} prevpage={prevpage} setActiveWindow={setActiveWindow} />}
      {activeWindow.type === 'account'&&landscape && <Account id={id} images={images} setwax={setwax} setid={setid} isloggedin={isloggedin} setisloggedin={setisloggedin} firstrun={firstrun} setfirstrun={setfirstrun}prevpage={prevpage} setActiveWindow={setActiveWindow}/>}
      {<Apis accapis={accapis} setAllParts={setAllParts}
ahapis={ahapis} id={id} setallplanets={setallplanets} setallships={setallships} setplanets={setplanets}actions={actions}setwax={setwax}wax={wax} setActions={setActions} setid={setid} isloggedin={isloggedin} setisloggedin={setisloggedin} firstrun={firstrun} setfirstrun={setfirstrun}setTopbarText={setTopbarText} cloud={cloud} anchor={anchor} />}
      {(activeWindow.type === 'planets'&& landscape) && hasid && <PlanetCard id={id} planets={planets} allplanets={allplanets} prevpage={prevpage} setActiveWindow={setActiveWindow}  activeWindow={activeWindow} settopbar={settopbar} prevpage={prevpage} setprevpage={setprevpage}/>}
      {(activeWindow.type === 'allplanets'&& landscape) && hasid && <GlobalCard allplanets={allplanets} prevpage={prevpage} setActiveWindow={setActiveWindow}/>}

      {actions.length > 0 && (
<div
        className="ship3d"
        style={{
          justifyContent: 'center',
          alignContent: 'center',
          width: isOpen ? '90vw' : '5rem',
          height: isOpen ? '90vh' : '5rem',
          borderRadius: isOpen ? '2rem' : '5rem',
          right: isOpen ? '0rem' : '2rem',
          bottom: isOpen ? '0rem' : '2rem',
          right: !ismessage ? '-20rem' : isOpen ? '5vw' : '2rem',
          bottom: !ismessage ? '-20rem' : isOpen ? '5vh' : '2rem',
          opacity: isOpen ? '1' : '0.7',
          position: 'fixed',
          background: isOpen ? 'linear-gradient(180deg, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75))' : 'linear-gradient(180deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))',
          transition: 'width 0.5s ease, height 0.5s ease, border-radius 0.5s ease, right 0.5s ease, bottom 0.5s ease, background 0.5s ease,position 15s ease',
        zIndex:35,
          }}
        onClick={() => dismissmessage()}
      >{actions.length}
         {actions.length > 0 && isOpen&& (
    <ul2 style={{ position:"absolute", listStyle: 'none' ,padding: 0, width:"95%" ,justifyContent:"center" , overflow:"scroll", height :"95%",}}>
      {actions.map((action, index) => (
        <li2
         
          key={index}
style={{
            display:"grid",
             width:"95%",
            backgroundColor: getColorByActionName(action),
            marginBottom: '0.5rem',
            padding: '0.5rem',
            borderRadius: '0.5rem',
              fontSize:"2rem",
      

          }}
        >
          {action.name}
        </li2>
      ))}
    </ul2>
  )}
  {actions.length > 0 && isOpen && (
   <> <button
      style={{
        position:"absolute",
          bottom:"-5%",
        backgroundColor: 'blue', // Choose your button color
        color: '#fff',
        padding: '0.5rem',
        borderRadius: '0.5rem',
        marginTop: '0.5rem',
        cursor: 'pointer',
          right:"25%",
      }}
      onClick={() => dispatchAllActions()}
    >
      Dispatch All
    </button>
    <button
      style={{
        position:"absolute",
          bottom:"-5%",
        backgroundColor: 'blue', // Choose your button color
        color: '#fff',
        padding: '0.5rem',
        borderRadius: '0.5rem',
        marginTop: '0.5rem',
        cursor: 'pointer',
          left:"25%",
      }}
      onClick={() => dismissAllActions()}
    >
      Dssmiss All
    </button>
</>
  )}
      </div>
  )
      }
      

    </div>
  );
    
};

export default App;
