// Import the required dependencies
import React, { useState, useEffect } from 'https://cdn.skypack.dev/react';
import ShipSquare from './ShipSquare';
import Modal from './Modal';

// Ship Component
const Ship = ({ selectedPartsInShips, setSelectedPartsInShips, shipKey,setActions,id,allplanets,accapis,ahapis,images ,allParts,setAllParts }) => {
  // State
    const raritys = ['silver', 'green', 'blue', 'purple', 'gold', 'red','cyan'];
    const srcs = ['scripts/public/shipCommon.png',
                  'scripts/public/shipUncommon.png',
                  'scripts/public/shipRare.png', 
                  'scripts/public/shipEpica.png', 
                  'scripts/public/shipLegendary.png',
                  'scripts/public/shipMythic.png',
                  'scripts/public/shipFounder.png'];
  const [isLoading, setIsLoading] = useState(true);
  const [selectedParts, setSelectedParts] = useState(Array(12).fill(null));
  const [installedParts, setInstalledParts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [buttons, setButtons] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [tooltipText, setTooltipText] = useState("empty");
  const [showTip, setShowTip] = useState(false);
  const [station, setstation] = useState(false);
  const [shipstation, setshipstation] = useState(0);
  const [atPlanet, setAtPlanet] = useState(false);
  const [Planet, setPlanet] = useState("");
  const [traveling, settraveling] = useState(false);
  const [context, setcontext] = useState("");
const [shiprarity,setshiprarity]=useState(0)
  // Part names
  const selectedNames = [
    'Flight Control Chair',
    'Cooling System',
    'High-Power Thruster',
    'Secondary Thrusters',
    'Holo-Computer',
    'AI System',
    'Life Support',
    'Shield System',
    'Kyanite Storage',
    'Kyanite Extractor',
    'Engine',
    'Kyanite Resonator',
  ];

    function convertToPlanetName(planetID) {
    const maxQuadrantsPerSystem = 4;
    const maxplanetsPersector = 4;
    const maxSystemsPerSector = 24;
    const maxSectors = 24;
    const station = Math.floor(planetID / 16384);
    const sector = Math.floor((planetID % 16384) / 4096);
    const system = Math.floor((planetID % 4096) / 128);
    const quadrant = Math.floor((planetID % 128) / 4);
    const planet = planetID % maxQuadrantsPerSystem;
    return { station, sector, system, quadrant, planet };
  }
  // Event Handlers
  const handleMouseEnter = (e, text) => {
    setMousePosition({ x: e.clientX, y: e.clientY });

    const tooltips = {
      setParts: "click to install parts",
      remove: "click to remove all parts from ship",
      undo: "click to reset parts selection",
    };

    setTooltipText(tooltips[text] || "empty");
    setShowTip(true);
  };

  const handleMouseLeave = () => {
    setShowTip(false);
  };
  
function hasAtLeastOneNonNullEntry(arr) {
  const requiredEntries = 12;

  return arr.some((entry) => entry !== null) && arr.filter((entry) => entry !== null).length >= requiredEntries;
}
  // Reset selected parts
  const reset = () => {
   const arr=selectedParts.filter((a) => a !== null)
    console.log(arr)
    arr.forEach((item)=>{
      setSelectedPartsInShips([...selectedPartsInShips.filter((a) => a !== item.asset_id)])
    })
    setSelectedParts(Array(12).fill(null));
    setAllParts((oldall)=>[...oldall,...arr])
     
    setShowTip(false);

  };
  function convert(t) {
  return t=t-(Date.now()/1000)
  
}
  const remove = () => {
    
installedParts.forEach((p)=>{
console.log(p)
    const newActions={
            "account":"starshipgame",
            "name":"unattachpart",
            authorization: [{
            actor: id,
            permission: 'active',
            }],
            data: {
            "player":id,
            "starship":shipKey,
            "part":p,
            },
    }
    if(p>0)
  setActions((oldActions) => [...oldActions,newActions]);
  })
      setShowTip(false);
       //  setActions((oldActions) => [...oldActions,{handler:"sendAll"}]);

  };
        const claim = () => {
console.log("claim",id,shipKey)
      const newActionu={
            "account":"starshipgame",
            "name":"collect",
            authorization: [{
            actor: id,
            permission: 'active',
            }],
            data: {
            "player":id,
            "starship":shipKey,
                        },
    }
           setActions((oldActions) => [...oldActions,newActionu]);

      }
                function deploy()  {
let planetto
                  var sortedPlanets = allplanets
  .filter(planet => convertToPlanetName(planet.id).station === shipstation)
  .filter(planet => convertToPlanetName(planet.id).sector === 0)
  .filter(planet => planet.owner === id);
                  console.log(sortedPlanets.length)
                  if(sortedPlanets.length<1){
                      sortedPlanets = allplanets
                     .filter(planet => convertToPlanetName(planet.id).station === shipstation)
  .filter(planet => convertToPlanetName(planet.id).sector === 0)
planetto=sortedPlanets[0]
                     }else{
                       planetto=sortedPlanets[0]
                     }
                  console.log("sending to ",planetto.id,shipstation)


      const newActionu={
            "account":"starshipgame",
            "name":"move2planet",
            authorization: [{
            actor: id,
            permission: 'active',
            }],
            data: {
            "player":id,
            "starship":shipKey,
              planet:planetto.id
                        },
    }
      
                           setActions((oldActions) => [...oldActions,newActionu]);
      }
  const apply = () => {
   
    installedParts.forEach((installedPart, index) => {
  const selectedPart = selectedParts[index];
      const newActionu={
            "account":"starshipgame",
            "name":"unattachpart",
            authorization: [{
            actor: id,
            permission: 'active',
            }],
            data: {
            "player":id,
            "starship":shipKey,
            "part":installedPart,
            },
    }  

if(selectedPart !==null){
        const newActions={
            "account":"atomicassets",
            "name":"transfer",
            authorization: [{
            actor: id,
            permission: 'active',
            }],
            data: {
            "from":id,
            "asset_ids":[selectedPart.asset_id],
             "memo":"Staking Part",
             "to":"starshipgame"
            },
    }
        const newActioni={
            "account":"starshipgame",
            "name":"attachpart",
            authorization: [{
            actor: id,
            permission: 'active',
            }],
            data: {
            "player":id,
            "starship":shipKey,
            "part":selectedPart.asset_id,
            },
        }
  
   if (installedPart && selectedPart.asset_id >0) {
     setActions((oldActions) => [...oldActions,newActionu]);
         setActions((oldActions) => [...oldActions,newActions]);
              setActions((oldActions) => [...oldActions,newActioni]);

    console.log(`Overlap at index ${index}: Installed Part - ${installedPart}, Selected Part - ${selectedPart.asset_id}`);
  }else
    if(selectedPart.asset_id>0){
               setActions((oldActions) => [...oldActions,newActions]);
         setActions((oldActions) => [...oldActions,newActioni]);
    console.log(`No overlap at index ${index}: Installed Part - ${installedPart}, Selected Part - ${selectedPart.asset_id}`);

  }else{
        console.log(`no parts modified index ${index}: Installed Part - ${installedPart}, Selected Part - ${selectedPart}`);
  }
}
 
});
      //   setActions((oldActions) => [...oldActions,{handler:"sendAll"}]);

    setShowTip(false);

  };

function selectBest(){
  if(!allParts){
    console.error("no inventory?")
  }
      selectedParts.forEach((installedPart, index) => {
  const selectedPart1 = selectedParts[index];
        
      
        var newarr=allParts.filter((p)=>p.name===selectedNames[index])
        const filteredParts = newarr
    .filter((part) => selectedNames.includes(part.name) && !selectedPartsInShips.includes(part.asset_id))
   
        var newarrsort=filteredParts.sort((p,np)=>p.data.rdata<np.data.rdata)
        
        
        
        console.log(newarrsort)
        const selectedPart=newarrsort[0]

                  console.log(selectedPart.asset_id)

setSelectedParts((prevSelectedParts) => {

        const newSelectedParts = [...prevSelectedParts];
        newSelectedParts[index] = { ...selectedPart, index: index, partId: selectedPart.asset_id };
        setSelectedPartsInShips((prevSelectedPartsInShips) => {
          const i = prevSelectedPartsInShips.indexOf(prevSelectedParts[index]?.asset_id);
          const updatedSelectedPartsInShips = [...prevSelectedPartsInShips];
          if (i > -1) updatedSelectedPartsInShips.splice(i, 1);
          updatedSelectedPartsInShips.push(selectedPart.asset_id);
                              console.log("us",selectedPart.asset_id,prevSelectedParts,selectedPartsInShips)

          return updatedSelectedPartsInShips;
        });
                     
  console.log("ns",selectedPart.asset_id,prevSelectedParts,newSelectedParts)

        return newSelectedParts;
      });
      });
  
   
};
     var is=0

  // Fetch all parts from the API
  useEffect(async () => {

if(is+1>10){
  is=0
}      try {
        // Fetch parts data
      
  console.log("allparts",allParts)
      } catch (error) {
        console.error('Error fetching data:', error);
        is++
      } finally {
        setIsLoading(false);
      }

  }, []);
  
async function setinstalledparts(){
  if(is+1>10){
  is=0
}      try {
        // Fetch installed parts data
   var  n=Math.floor(Math.random()*accapis.length)
        const response2 = await fetch(`${accapis[n][1]}/v1/chain/get_table_rows`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            json: true,
            code: "starshipgame",
            table: "starshipdata",
            scope: "starshipgame",
            encode_type: "json",
            upper_bound: shipKey,
            lower_bound: shipKey,
            limit: "1"
          }),
        });
is++
        const data2 = await response2.json();

      
        setInstalledParts(data2.rows[0]?.parts || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        is++
      } finally {
        setIsLoading(false);
      }

}
  function fetchData2(index, nft) {
        
 var  n=Math.floor(Math.random()*ahapis.length)
  return fetch(`${ahapis[n][1]}/atomicassets/v1/assets/${nft}`)
    .then(response => response.json())
    .then(data => data.data?.image)
    .catch(error => {
      console.error(`Error fetching data for ${nft}`, error);
      return null; // or handle the error in an appropriate way
    });
    is++
}

  // Update buttons based on selected parts
  useEffect(() => {
    const hasNonEmptyParts = selectedParts.some(part => part !== null && part !== '');
    setButtons(hasNonEmptyParts);
  }, [selectedParts]);
useEffect(()=>{
  setInterval(async()=>{
    setinstalledparts()
 var  n=Math.floor(Math.random()*accapis.length)
     const response2 = await fetch(`${accapis[n][1]}/v1/chain/get_table_rows`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            json: true,
            code: "starshipgame",
            table: "starshipdata",
            scope: "starshipgame",
            encode_type: "json",
            upper_bound: shipKey,
            lower_bound: shipKey,
            limit: "1"
          }),
        });
    const data=await response2.json()
                      console.log("hit checks",convert(data.rows[0].end)<0,data.rows[0]?.end,traveling,station,atPlanet)
    
    setshiprarity(data.rows[0].rarity)
     const plan=allplanets.filter((a)=>a.id===data.rows[0].planet)
    if(plan[0]){
setPlanet(plan[0].type)
           console.log(Planet)

    }
    if(convert(data.rows[0].end)<0){
 settraveling(false)
  if(data.rows[0].planet<=0){
    setAtPlanet(false)
    setstation(true)
    setshipstation(data.rows[0].spacestation)
                  setcontext("station")
                console.log("stationary checksstation",traveling,station,atPlanet,data.rows[0])

  }else{
    setAtPlanet(true)
        setstation(false)
                  setcontext("planet")
  
                console.log("stationary checks planet",traveling,station,atPlanet)


  }

              }else{     
              settraveling(true)
                setcontext("orbit")
  if(data.planet<=0){
    setAtPlanet(true)

    setstation(false)
  }else if(data.planet===0){
    setAtPlanet(false)
        setstation(true)
  }else{
        

  }
                    console.log("moving checks",Date.now()/1000<data.rows[0]?.end,traveling,station,atPlanet,data.rows[0]?.planet)

}                           console.log("exit checks",Date.now()/1000<data.rows[0]?.end,traveling,station,atPlanet)
    
 },1000*30)
  
},[])
  // Handle square click
  const handleSquareClick = (index) => {
    setClickedIndex(index);
    setIsModalOpen(true);
  };

  // Handle part selection
  const handlePartSelect = (part, parts) => {
    if (parts === "close") {
      setIsModalOpen(false);
    } else {

setSelectedParts((prevSelectedParts) => {
  const newSelectedParts = [...prevSelectedParts];

  // Check if there's a part currently at clickedIndex to prevent null errors in console.log
  if (newSelectedParts[clickedIndex]) {
    console.log(
      "im updating parts here coming off : going on ",
      newSelectedParts[clickedIndex].asset_id,
      ":",
      part.asset_id
    );
  }

  // Update the selected part at the clicked index
  const partComingOff = newSelectedParts[clickedIndex];
  newSelectedParts[clickedIndex] = { ...part, index: clickedIndex, partId: part.asset_id };

  // Update selected parts in ships
  setSelectedPartsInShips((prevSelectedPartsInShips) => {
    const i = prevSelectedPartsInShips.indexOf(partComingOff?.asset_id);
    const updatedSelectedPartsInShips = [...prevSelectedPartsInShips];

    // Remove the part coming off from selected parts in ships
    if (i > -1) updatedSelectedPartsInShips.splice(i, 1);

    // Add the new part to selected parts in ships
    updatedSelectedPartsInShips.push(part.asset_id);
    return updatedSelectedPartsInShips;
  });

  // Update allParts: remove the new part, add the part coming off
  setAllParts((oldAllParts) => {
    const updatedAllParts = oldAllParts.filter((p) => p.asset_id !== part.asset_id); // Remove new part
    if (partComingOff) updatedAllParts.push(partComingOff); // Add part coming off if it exists
    return updatedAllParts;
  });

  return newSelectedParts;
});

setIsModalOpen(false);
    }
  };
  
  // Ship Component JSX
  return ( 
    <>
      {context==="station"&&(
    <div className="ship3d">
      {/* Ship Image */}
      <img className="part3d" src={srcs[shiprarity]} alt="Ship" style={{ height: "8rem" ,
  width: "95%",
  borderRadius: "2rem",
  alignSelf:" center",
    boxShadow: `
      0 0 0.2rem ${raritys[shiprarity] || 'gold'},
      0 0 0.2rem ${raritys[shiprarity] || 'gold'},
      0 0 2rem ${raritys[shiprarity] || 'gold'},
      0 0 0.8rem ${raritys[shiprarity] || 'gold'},
      0 0 2.8rem ${raritys[shiprarity] || 'gold'},
      inset 0 0 1.3rem ${raritys[shiprarity] || 'gold'}
    `,}} />

      {/* Ship Squares */}
      <div id="parts">
        {Array.from({ length: 12 }, (_, index) => (
          <ShipSquare
            key={selectedNames[index]}
            shipKey={shipKey}
            squareKey={selectedNames[index]}
            index={index}
            onClick={() => handleSquareClick(index)}
            selectedPart={selectedParts[index]}
            installedParts={installedParts}
            images={images}
            accapis={accapis}
            ahapis={ahapis}
          />
        ))}

        {/* Buttons */}
        {buttons ? (
          <i className="fa-regular fa-circle-xmark part3d"
            data-tip="reset selection"
            onMouseEnter={(e) => handleMouseEnter(e, "remove")}
            onMouseLeave={handleMouseLeave}
            onClick={() => remove()}
            style={{
              boxShadow: `
                0 0 0.2rem orangered,
                0 0 0.2rem darkorange,
                0 0 2rem gold
              `,
              border: '2px solid #1e3799',
              color: 'maroon',
              fontSize: "2rem",
              display: "grid",
              justifyItems: "center",
                zIndex:24,
            }}
          ></i>
        ) : (
          <i className="fa-solid fa-ellipsis part3d"
            style={{
              boxShadow: `
                0 0 0.2rem lightgray,
                0 0 0.2rem gray,
                0 0 2rem darkgray
              `,
              border: '2px solid #1e3799',
              color: 'grey',
              fontSize: "2rem",
              display: "grid",
              justifyItems: "center",
            }}
          ></i>
        )}

        {buttons ? (
          <i className="fa-solid fa-rotate-left part3d"
            data-tip="reset selection"
            onMouseEnter={(e) => handleMouseEnter(e, "undo")}
            onMouseLeave={handleMouseLeave}
            onClick={() => reset()}
            style={{
              boxShadow: `
                0 0 0.2rem cornflowerblue,
                0 0 0.2rem royalblue,
                0 0 2rem mediumslateblue
              `,
              border: '2px solid #1e3799',
              color: 'cornflowerblue',
              fontSize: "2rem",
              display: "grid",
              justifyItems: "center",
                zIndex:24,
            }}
          ></i>
        ) : (
          <i className="fa-solid fa-ellipsis part3d"
            style={{
              boxShadow: `
                0 0 0.2rem lightgray,
                0 0 0.2rem gray,
                0 0 2rem darkgray
              `,
              border: '2px solid #1e3799',
              color: 'grey',
              fontSize: "2rem",
              display: "grid",
              justifyItems: "center",
            }}
          ></i>
        )}

        {buttons ? (
          <i className="fa-regular fa-circle-check part3d"
            data-tip="apply selection"
            onMouseEnter={(e) => handleMouseEnter(e, "setParts")}
            onMouseLeave={handleMouseLeave}
                        onClick={() => apply()}

            style={{
              boxShadow: `
                0 0 0.2rem forestgreen,
                0 0 0.2rem darkgreen,
                0 0 2rem green
              `,
              border: '2px solid #1e3799',
              color: 'green',
              fontSize: "2rem",
              display: "grid",
              justifyItems: "center",
                zIndex:24,
            }}
          ></i>
        ) : (
          <i className="fa-solid fa-ellipsis part3d"
            style={{
              boxShadow: `
                0 0 0.2rem lightgray,
                0 0 0.2rem gray,
                0 0 2rem darkgray
              `,
              border: '2px solid #1e3799',
              color: 'grey',
              fontSize: "2rem",
              display: "grid",
              justifyItems: "center",
            }}
          ></i>
        )}
        
        {buttons ? (
          <i className="fa-regular fa-face-kiss-wink-heart"
            data-tip="apply selection"
            onMouseEnter={(e) => handleMouseEnter(e, "setParts")}
            onMouseLeave={handleMouseLeave}
                        onClick={() => selectBest()}

            style={{
              boxShadow: `
                0 0 0.2rem forestgreen,
                0 0 0.2rem darkgreen,
                0 0 2rem green
              `,
              border: '2px solid #1e3799',
              color: 'green',
              fontSize: "2rem",
              display: "grid",
              justifyItems: "center",
                zIndex:24,
            }}
          ></i>
        ) : (
          <i className="fa-solid fa-ellipsis part3d"
            style={{
              boxShadow: `
                0 0 0.2rem lightgray,
                0 0 0.2rem gray,
                0 0 2rem darkgray
              `,
              border: '2px solid #1e3799',
              color: 'grey',
              fontSize: "2rem",
              display: "grid",
              justifyItems: "center",
            }}
          ></i>
        )}
        
        {station && !traveling ? (
          
          <i className="fa-solid fa-gas-pump part3d"
            data-tip="apply selection"
            onMouseEnter={(e) => handleMouseEnter(e, "setParts")}
            onMouseLeave={handleMouseLeave}
                        onClick={() => deploy(allplanets)}

            style={{
              boxShadow: `
                0 0 0.2rem forestgreen,
                0 0 0.2rem darkgreen,
                0 0 2rem green
              `,
              border: '2px solid #1e3799',
              color: 'green',
              fontSize: "2rem",
              display: "grid",
              justifyItems: "center",
                zIndex:24,
            }}
          ></i>
        ) : (
          <i className="fa-solid fa-gas-pump part3d"
            style={{
              boxShadow: `
                0 0 0.2rem lightgray,
                0 0 0.2rem gray,
                0 0 2rem darkgray
              `,
              border: '2px solid #1e3799',
              color: 'grey',
              fontSize: "2rem",
              display: "grid",
              justifyItems: "center",
            }}
          ></i>
        )}
         {atPlanet && !traveling? (
          
          <i className="fa-solid fa-person-walking-arrow-loop-left part3d"
            data-tip="apply selection"
            onMouseEnter={(e) => handleMouseEnter(e, "setParts")}
            onMouseLeave={handleMouseLeave}
                        onClick={() => apply()}

            style={{
              boxShadow: `
                0 0 0.2rem forestgreen,
                0 0 0.2rem darkgreen,
                0 0 2rem green
              `,
              border: '2px solid #1e3799',
              color: 'green',
              fontSize: "2rem",
              display: "grid",
              justifyItems: "center",
                zIndex:24,
            }}
          ></i>
        ) : (
          <i className="fa-solid fa-person-walking-arrow-loop-left part3d"
            style={{
              boxShadow: `
                0 0 0.2rem lightgray,
                0 0 0.2rem gray,
                0 0 2rem darkgray
              `,
              border: '2px solid #1e3799',
              color: 'grey',
              fontSize: "2rem",
              display: "grid",
              justifyItems: "center",
            }}
          ></i>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal style={{
          zIndex:27,
          }}
          isLoading={isLoading} // Pass isLoading to Modal
          allParts={allParts}
          selectedNames={clickedIndex !== null ? [selectedNames[clickedIndex]] : selectedNames}
          onSelect={handlePartSelect}
          selectedPartsInShips={selectedPartsInShips
                               }
        />
      )}

      {/* Tooltip */}
      {showTip && (
        <div
          style={{
            position: 'fixed',
            top: `${mousePosition.y}px`,
            left: `${mousePosition.x}px`,
            backgroundColor: 'lightblue',
            padding: '10px',
            border: '1px solid #ccc',
              zIndex:25,
          }}
        >
          {tooltipText}
        </div>
      )}
    </div>)}
      {context==="planet"&&(
    <div className="ship3d">
      {/* Ship Image */}
      <img className="part3d" src={`scripts/public/${Planet.charAt(0).toUpperCase() + Planet.slice(1)}.png`} alt={Planet} style={{ height: "8rem" ,
  width: "95%",
  borderRadius: "2rem",
  alignSelf:" center",
    boxShadow: `
      0 0 0.2rem ${raritys[shiprarity] || 'gold'},
      0 0 0.2rem ${raritys[shiprarity] || 'gold'},
      0 0 2rem ${raritys[shiprarity] || 'gold'},
      0 0 0.8rem ${raritys[shiprarity] || 'gold'},
      0 0 2.8rem ${raritys[shiprarity] || 'gold'},
      inset 0 0 1.3rem ${raritys[shiprarity] || 'gold'}
    `,}} />

      {/* Ship Squares */}
      <div id="parts">
        
                {Array.from({ length: 12 },  (_, index) => {

  return (
    <div  className="part3d" key={index}>
      <img id="part"
        src={`https://ipfs.neftyblocks.io/ipfs/QmVPi4LzEUdptUhd3fyMeiJgLfX8namDQLRShiS2dBcKt7
`} 
        alt={`Part ${index}`}
   
      />
    </div>
  );
})}
        {/* Buttons */}
        {buttons ? (
          <i className="fa-regular fa-circle-xmark part3d"
            data-tip="reset selection"
            onMouseEnter={(e) => handleMouseEnter(e, "remove")}
            onMouseLeave={handleMouseLeave}
            onClick={() => remove()}
            style={{
              boxShadow: `
                0 0 0.2rem orangered,
                0 0 0.2rem darkorange,
                0 0 2rem gold
              `,
              border: '2px solid #1e3799',
              color: 'maroon',
              fontSize: "2rem",
              display: "grid",
              justifyItems: "center",
                zIndex:24,
            }}
          ></i>
        ) : (
          <i className="fa-solid fa-ellipsis part3d"
            style={{
              boxShadow: `
                0 0 0.2rem lightgray,
                0 0 0.2rem gray,
                0 0 2rem darkgray
              `,
              border: '2px solid #1e3799',
              color: 'grey',
              fontSize: "2rem",
              display: "grid",
              justifyItems: "center",
            }}
          ></i>
        )}

        {buttons ? (
          <i className="fa-solid fa-rotate-left part3d"
            data-tip="reset selection"
            onMouseEnter={(e) => handleMouseEnter(e, "undo")}
            onMouseLeave={handleMouseLeave}
            onClick={() => reset()}
            style={{
              boxShadow: `
                0 0 0.2rem cornflowerblue,
                0 0 0.2rem royalblue,
                0 0 2rem mediumslateblue
              `,
              border: '2px solid #1e3799',
              color: 'cornflowerblue',
              fontSize: "2rem",
              display: "grid",
              justifyItems: "center",
                zIndex:24,
            }}
          ></i>
        ) : (
          <i className="fa-solid fa-ellipsis part3d"
            style={{
              boxShadow: `
                0 0 0.2rem lightgray,
                0 0 0.2rem gray,
                0 0 2rem darkgray
              `,
              border: '2px solid #1e3799',
              color: 'grey',
              fontSize: "2rem",
              display: "grid",
              justifyItems: "center",
            }}
          ></i>
        )}

        {buttons ? (
          <i className="fa-regular fa-circle-check part3d"
            data-tip="apply selection"
            onMouseEnter={(e) => handleMouseEnter(e, "setParts")}
            onMouseLeave={handleMouseLeave}

            style={{
              boxShadow: `
                0 0 0.2rem forestgreen,
                0 0 0.2rem darkgreen,
                0 0 2rem green
              `,
              border: '2px solid #1e3799',
              color: 'green',
              fontSize: "2rem",
              display: "grid",
              justifyItems: "center",
                zIndex:24,
            }}
          ></i>
        ) : (
          <i className="fa-solid fa-ellipsis part3d"
            style={{
              boxShadow: `
                0 0 0.2rem lightgray,
                0 0 0.2rem gray,
                0 0 2rem darkgray
              `,
              border: '2px solid #1e3799',
              color: 'grey',
              fontSize: "2rem",
              display: "grid",
              justifyItems: "center",
            }}
          ></i>
        )}
        
        {buttons ? (
          <i className="fa-regular fa-face-kiss-wink-heart"
            data-tip="apply selection"
            onMouseEnter={(e) => handleMouseEnter(e, "setParts")}
            onMouseLeave={handleMouseLeave}
                        onClick={() => selectBest()}

            style={{
              boxShadow: `
                0 0 0.2rem forestgreen,
                0 0 0.2rem darkgreen,
                0 0 2rem green
              `,
              border: '2px solid #1e3799',
              color: 'green',
              fontSize: "2rem",
              display: "grid",
              justifyItems: "center",
                zIndex:24,
            }}
          ></i>
        ) : (
          <i className="fa-solid fa-ellipsis part3d"
            style={{
              boxShadow: `
                0 0 0.2rem lightgray,
                0 0 0.2rem gray,
                0 0 2rem darkgray
              `,
              border: '2px solid #1e3799',
              color: 'grey',
              fontSize: "2rem",
              display: "grid",
              justifyItems: "center",
            }}
          ></i>
        )}
        
        {station && !traveling ? (
          
          <i className="fa-solid fa-gas-pump part3d"
            data-tip="apply selection"
            onMouseEnter={(e) => handleMouseEnter(e, "setParts")}
            onMouseLeave={handleMouseLeave}
                        onClick={() =>deploy()}

            style={{
              boxShadow: `
                0 0 0.2rem pink,
                0 0 0.2rem red,
                0 0 2rem blue
              `,
              border: '2px solid #1e3799',
              color: 'green',
              fontSize: "2rem",
              display: "grid",
              justifyItems: "center",
                zIndex:24,
            }}
          ></i>
        ) : (
          <i className="fa-solid fa-gas-pump part3d"
            style={{
              boxShadow: `
                0 0 0.2rem lightgray,
                0 0 0.2rem gray,
                0 0 2rem darkgray
              `,
              border: '2px solid #1e3799',
              color: 'grey',
              fontSize: "2rem",
              display: "grid",
              justifyItems: "center",
            }}
          ></i>
        )}
         {atPlanet && !traveling? (
          
          <i className="fa-solid fa-person-walking-arrow-loop-left part3d"
            data-tip="apply selection"
            onMouseEnter={(e) => handleMouseEnter(e, "setParts")}
            onMouseLeave={handleMouseLeave}
                        onClick={() => claim()}

            style={{
              boxShadow: `
                 0 0 0.2rem pink,
                0 0 0.2rem red,
                0 0 2rem blue
              `,
              border: '2px solid #1e3799',
              color: 'green',
              fontSize: "2rem",
              display: "grid",
              justifyItems: "center",
                zIndex:24,
            }}
          ></i>
        ) : (
          <i className="fa-solid fa-person-walking-arrow-loop-left part3d"
            style={{
              boxShadow: `
                0 0 0.2rem lightgray,
                0 0 0.2rem gray,
                0 0 2rem darkgray
              `,
              border: '2px solid #1e3799',
              color: 'grey',
              fontSize: "2rem",
              display: "grid",
              justifyItems: "center",
            }}
          ></i>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal style={{
          zIndex:27,
          }}
          isLoading={isLoading} // Pass isLoading to Modal
          allParts={allParts}
          selectedNames={clickedIndex !== null ? [selectedNames[clickedIndex]] : selectedNames}
          onSelect={handlePartSelect}
          selectedPartsInShips={selectedPartsInShips
                               }
        />
      )}

      {/* Tooltip */}
      {showTip && (
        <div
          style={{
            position: 'fixed',
            top: `${mousePosition.y}px`,
            left: `${mousePosition.x}px`,
            backgroundColor: 'lightblue',
            padding: '10px',
            border: '1px solid #ccc',
              zIndex:25,
          }}
        >
          {tooltipText}
        </div>
      )}
    </div>)}
       {context==="orbit"&&(
    <div className="ship3d">
      {/* Ship Image */}
         <img className="part3d" src="https://assets.codepen.io/6121774/shipTravelling.gif" alt="Ship" style={{ height: "8rem" ,
  width: "95%",
  borderRadius: "2rem",
  alignSelf:" center",
    boxShadow: `
      0 0 0.2rem ${raritys[shiprarity] || 'gold'},
      0 0 0.2rem ${raritys[shiprarity] || 'gold'},
      0 0 2rem ${raritys[shiprarity] || 'gold'},
      0 0 0.8rem ${raritys[shiprarity] || 'gold'},
      0 0 2.8rem ${raritys[shiprarity] || 'gold'},
      inset 0 0 1.3rem ${raritys[shiprarity] || 'gold'}
    `,}} />

      {/* Ship Squares */}
      <div id="parts">
        {Array.from({ length: 12 },  (_, index) => {
  // Fetch the image URL (replace 'YOUR_API_ENDPOINT' with the actual API endpoint)

  return (
    <div className="part3d" key={index}>
      <img
        id="part"
        src={`https://ipfs.neftyblocks.io/ipfs/Qmd9vU8GrkhnKJ1cmXejCq8qsm95Bs5CWmFkArPF7w8mPo
`} 
        alt={`Part ${index}`}
   
      />
    </div>
  );
})}
        {/* Buttons */}
        {buttons ? (
          <i className="fa-regular fa-circle-xmark part3d"
            data-tip="reset selection"
            onMouseEnter={(e) => handleMouseEnter(e, "remove")}
            onMouseLeave={handleMouseLeave}
            onClick={() => remove()}
            style={{
              boxShadow: `
                0 0 0.2rem orangered,
                0 0 0.2rem darkorange,
                0 0 2rem gold
              `,
              border: '2px solid #1e3799',
              color: 'maroon',
              fontSize: "2rem",
              display: "grid",
              justifyItems: "center",
                zIndex:24,
            }}
          ></i>
        ) : (
          <i className="fa-solid fa-ellipsis part3d"
            style={{
              boxShadow: `
                0 0 0.2rem lightgray,
                0 0 0.2rem gray,
                0 0 2rem darkgray
              `,
              border: '2px solid #1e3799',
              color: 'grey',
              fontSize: "2rem",
              display: "grid",
              justifyItems: "center",
            }}
          ></i>
        )}

        {buttons ? (
          <i className="fa-solid fa-rotate-left part3d"
            data-tip="reset selection"
            onMouseEnter={(e) => handleMouseEnter(e, "undo")}
            onMouseLeave={handleMouseLeave}
            onClick={() => reset()}
            style={{
              boxShadow: `
                0 0 0.2rem cornflowerblue,
                0 0 0.2rem royalblue,
                0 0 2rem mediumslateblue
              `,
              border: '2px solid #1e3799',
              color: 'cornflowerblue',
              fontSize: "2rem",
              display: "grid",
              justifyItems: "center",
                zIndex:24,
            }}
          ></i>
        ) : (
          <i className="fa-solid fa-ellipsis part3d"
            style={{
              boxShadow: `
                0 0 0.2rem lightgray,
                0 0 0.2rem gray,
                0 0 2rem darkgray
              `,
              border: '2px solid #1e3799',
              color: 'grey',
              fontSize: "2rem",
              display: "grid",
              justifyItems: "center",
            }}
          ></i>
        )}

        {buttons ? (
          <i className="fa-regular fa-circle-check part3d"
            data-tip="apply selection"
            onMouseEnter={(e) => handleMouseEnter(e, "setParts")}
            onMouseLeave={handleMouseLeave}
                        onClick={() => apply()}

            style={{
              boxShadow: `
                0 0 0.2rem forestgreen,
                0 0 0.2rem darkgreen,
                0 0 2rem green
              `,
              border: '2px solid #1e3799',
              color: 'green',
              fontSize: "2rem",
              display: "grid",
              justifyItems: "center",
                zIndex:24,
            }}
          ></i>
        ) : (
          <i className="fa-solid fa-ellipsis part3d"
            style={{
              boxShadow: `
                0 0 0.2rem lightgray,
                0 0 0.2rem gray,
                0 0 2rem darkgray
              `,
              border: '2px solid #1e3799',
              color: 'grey',
              fontSize: "2rem",
              display: "grid",
              justifyItems: "center",
            }}
          ></i>
        )}
        
        {buttons ? (
          <i className="fa-regular fa-face-kiss-wink-heart"
            data-tip="apply selection"
            onMouseEnter={(e) => handleMouseEnter(e, "setParts")}
            onMouseLeave={handleMouseLeave}
                        onClick={() => selectBest()}

            style={{
              boxShadow: `
                0 0 0.2rem forestgreen,
                0 0 0.2rem darkgreen,
                0 0 2rem green
              `,
              border: '2px solid #1e3799',
              color: 'green',
              fontSize: "2rem",
              display: "grid",
              justifyItems: "center",
                zIndex:24,
            }}
          ></i>
        ) : (
          <i className="fa-solid fa-ellipsis part3d"
            style={{
              boxShadow: `
                0 0 0.2rem lightgray,
                0 0 0.2rem gray,
                0 0 2rem darkgray
              `,
              border: '2px solid #1e3799',
              color: 'grey',
              fontSize: "2rem",
              display: "grid",
              justifyItems: "center",
            }}
          ></i>
        )}
        
        {station && !traveling ? (
          
          <i className="fa-solid fa-gas-pump part3d"
            data-tip="apply selection"
            onMouseEnter={(e) => handleMouseEnter(e, "setParts")}
            onMouseLeave={handleMouseLeave}
                        onClick={() => apply()}

            style={{
              boxShadow: `
                0 0 0.2rem forestgreen,
                0 0 0.2rem darkgreen,
                0 0 2rem green
              `,
              border: '2px solid #1e3799',
              color: 'green',
              fontSize: "2rem",
              display: "grid",
              justifyItems: "center",
                zIndex:24,
            }}
          ></i>
        ) : (
          <i className="fa-solid fa-gas-pump part3d"
            style={{
              boxShadow: `
                0 0 0.2rem lightgray,
                0 0 0.2rem gray,
                0 0 2rem darkgray
              `,
              border: '2px solid #1e3799',
              color: 'grey',
              fontSize: "2rem",
              display: "grid",
              justifyItems: "center",
            }}
          ></i>
        )}
         {atPlanet && !traveling? (
          
          <i className="fa-solid fa-person-walking-arrow-loop-left part3d"
            data-tip="apply selection"
            onMouseEnter={(e) => handleMouseEnter(e, "setParts")}
            onMouseLeave={handleMouseLeave}
                        onClick={() => apply()}

            style={{
              boxShadow: `
                0 0 0.2rem forestgreen,
                0 0 0.2rem darkgreen,
                0 0 2rem green
              `,
              border: '2px solid #1e3799',
              color: 'green',
              fontSize: "2rem",
              display: "grid",
              justifyItems: "center",
                zIndex:24,
            }}
          ></i>
        ) : (
          <i className="fa-solid fa-person-walking-arrow-loop-left part3d"
            style={{
              boxShadow: `
                0 0 0.2rem lightgray,
                0 0 0.2rem gray,
                0 0 2rem darkgray
              `,
              border: '2px solid #1e3799',
              color: 'grey',
              fontSize: "2rem",
              display: "grid",
              justifyItems: "center",
            }}
          ></i>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal style={{
          zIndex:27,
          }}
          isLoading={isLoading} // Pass isLoading to Modal
          allParts={allParts}
          selectedNames={clickedIndex !== null ? [selectedNames[clickedIndex]] : selectedNames}
          onSelect={handlePartSelect}
          selectedPartsInShips={selectedPartsInShips
                               }
        />
      )}

      {/* Tooltip */}
      {showTip && (
        <div
          style={{
            position: 'fixed',
            top: `${mousePosition.y}px`,
            left: `${mousePosition.x}px`,
            backgroundColor: 'lightblue',
            padding: '10px',
            border: '1px solid #ccc',
              zIndex:25,
          }}
        >
          {tooltipText}
        </div>
      )}
    </div>)}
      </>
    
    
    
  );
};

export default Ship;