// ShipSquare.js
import React, { useState, useEffect } from 'https://cdn.skypack.dev/react';

const PlanetCard = ({ id, onClick, planets, allplanets ,setActiveWindow ,activeWindow,settopbar,setprevpage,prevpage }) => {
    const [mytopbar, setmytopbar] = useState(false);
  const [page, setPage] = useState(false);

  const allianceNames = [
    "All K-pop",
    "Pluto Alliance",
    "Bitboy Crypto",
    "Starsheep Colony",
    "CryptoStache",
    "DrunkenPunkz Cantina",
    "Funky Monkey Frat House",
    "The Hive",
    "Lava Heads",
    "Animated Punkz",
    "Celtic Alliance",
    "Dark Matter",
    "Elongate",
    "Beyond FOMO",
    "Electra Protocol",
    "TCG World",
    "Dexter Plays PH",
    "Non-Fungible Gang",
    "Temple Fehu",
    "Galactic Archade",
    "Halfdeads Valhalla",
    "Founders Legacy",
    "JR's Lands",
    "Starship Gang",
    "Pawthereum",
  ];

  const upgrades = {
    crystal: 235000,
    desert: 110000,
    gas: 214000,
    glacier: 161000,
    grassland: 100000,
    magma: 177000,
    metallic: 194000,
    ocean: 133000,
    paradise: 146000,
    swamp: 121000,
  };

  const jobber = allplanets.filter((planet) => planet.owner === id);
  const hasPlanet = planets.length > 0;
  useEffect(() => {
    // Initial data fetch
    setPage(0);
    setmytopbar(true)
  }, []);
  function calculateOpacity(maxpool, pool) {
    const n = Math.floor((pool * 10) / maxpool);
 // eslint-disable-line react-hooks/exhaustive-deps
    let opacity;
    if (n <= 0) {
      opacity = 0;
    } else if (n >= 10) {
      opacity = 10;
    } else {
      const lowerThreshold = (n * maxpool) / 10;
      const upperThreshold = ((n + 1) * maxpool) / 10;
      const fraction = (pool - lowerThreshold) / (upperThreshold - lowerThreshold);
      opacity = n + fraction;
    }
    return opacity;
  }
  const handleWindowToggle = (data) => {
         setmytopbar(false);
             settopbar(true);

    setActiveWindow(activeWindow === data.type ? null : data.type);
  };

  function getPlanetData(nftid) {
    return (jobber = allplanets.filter((planet) => planet.nft === nftid));
  }

    function onSelect(nftid) {
console.log(nftid)  }

  return (
    <>
        <h1
          id="topbar"
          style={{maxHeight: mytopbar ? '100px' : '0',
            margin: mytopbar ? '16px 0' : '0',
            opacity: mytopbar ? 1 : 0,
            display: 'flex',
            justifyContent: 'space-around',
                          transition: 'max-height 0.5s ease, opacity 0.5s ease, margin 0.5s ease',

          }}
        >
          <i
            style={{ fontSize: '1rem' }}
            className="fa-solid fa-user"
            aria-hidden="true"
            onClick={() => handleWindowToggle({type:"account",hide:true})}
          >
            {' '}
            - Back
          </i>
          <i
            style={{ fontSize: '1rem' }}
            className="fa-solid fa-shuttle-space"
            aria-hidden="true"
            onClick={() => handleWindowToggle({type:'rentals',hide:false})}
          >
            {' '}
           () - Filter
          </i>
          <i
            style={{ fontSize: '1rem' }}
            className="fa-solid fa-earth-americas"
            aria-hidden="true"
            onClick={() => handleWindowToggle({type:'planets',hide:false})}
          >
            {' '}
           ( {planets.length}) - Upgrade
          </i>
          <i
            style={{ fontSize: '1rem' }}
            className="fa-solid fa-earth-americas"
            aria-hidden="true"
            onClick={() => handleWindowToggle({type:'allplanets',hide:false})}
          >
            {' '}
           ( ) - stats
          </i>
        </h1>
    <div id="cards" onClick={onClick}>
      
      {hasPlanet ? (
        planets.map((planet) => {
          var nft= allplanets.find((p) => p.nft === planet.asset_id);
                  let upgradeValue
        if(nft===undefined){
nft={pool:0,max_pool:0}   
           upgradeValue = upgrades[planet.name];

        }else{
                     upgradeValue = upgrades[nft.type];

        }
          const splitp = planet.data.planet_name.split("-");

          return (
            
            <div className="card3d" key={planet.id} onClick={() => onSelect(planet)}>

              <img className="pimage" src={`scripts/public/${planet.name}.png`} alt="Planet" width="25%" />
              <div id="data">
                <div>station id: {splitp[0]}</div>
                <div>{allianceNames[splitp[0]]}</div>
                <div>quad: {splitp[1]}</div>
                <div>sec: {splitp[2]}</div>
                <div>sys: {splitp[3]}</div>
                <div>num: {planet.data.planet_id}</div>
              </div>
              <div className="battery" id={`pool-max-${planet.type}`}>
                upgrade: {`${(parseInt(nft.max_pool).toFixed(4) / parseInt(upgradeValue).toFixed(4)).toFixed(4)}`}
                <ul>
                  {[...Array(10)].map((_, index) => {
                    const popacity = calculateOpacity(upgradeValue, parseInt(nft.max_pool));
                    let npopacity = 0;

                    if (popacity > index) {
                      npopacity = popacity;
                    } else if (popacity > index - 1) {
                      npopacity = 0.2;
                    } else {
                      npopacity = 0;
                    }

                    return (
                      <li
                        key={index}
                        id={`cell${index + 1}`}
                        style={{
                          background: upgradeValue === parseInt(nft.max_pool)
                            ? `rgba(255,215,0,${npopacity})`
                            : `rgba(117,182,255,${npopacity})`,
                          boxShadow: upgradeValue === parseInt(nft.max_pool)
                            ? `inset 0px 0px 10px 2px rgba(117,182,255,${npopacity}),
                               0px 0px 20px rgba(248,125,15,${npopacity})`
                            : `inset 0px 0px 10px 2px rgba(117,182,255,${npopacity}),
                               0px 0px 20px rgba(117,182,214,${npopacity})`,
                        }}
                      ></li>
                    );
                  })}
                </ul>
              </div>
              <div className="battery" id={`pool-left-${planet.id}`}>
                pool: {(parseInt(nft.pool).toFixed(4) / parseInt(nft.max_pool).toFixed(4)).toFixed(4)}
                <ul>
                  {[...Array(10)].map((_, index) => {
                    const popacity = calculateOpacity(parseInt(nft.max_pool), parseInt(nft.pool));
                    let npopacity = 0;

                    if (popacity > index) {
                      npopacity = popacity;
                    } else if (popacity > index - 1) {
                      npopacity = 0.2;
                    } else {
                      npopacity = 0;
                    }

                    return (
                      <li
                        key={index}
                        id={`cell${index + 1}`}
                        style={{
                          background: parseInt(nft.pool) === parseInt(nft.max_pool)
                            ? `rgba(255,215,0,${npopacity})`
                            : `rgba(117,182,255,${npopacity})`,
                          boxShadow: parseInt(nft.pool) === parseInt(nft.max_pool)
                            ? `inset 0px 0px 10px 2px rgba(117,182,255,${npopacity}),
                               0px 0px 20px rgba(248,125,15,${npopacity})`
                            : `inset 0px 0px 10px 2px rgba(117,182,255,${npopacity}),
                               0px 0px 20px rgba(117,182,214,${npopacity})`,
                        }}
                      ></li>
                    );
                  })}
                </ul>
              </div>
              <div className="battery" id="pool-per-wax">
                pool per wax
                <ul>
                  {[...Array(10)].map((_, index) => (
                    <li key={index} id={`cell${index + 1}`}></li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })
      ) : (
        <>
        
        <span>You have no planets or still Loading...</span>
      
          </>)}
    </div>
      </>
  );
};

export default PlanetCard;
