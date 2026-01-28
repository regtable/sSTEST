// ShipSquare.js
import React, { useState, useEffect } from 'https://cdn.skypack.dev/react';

const GlobalCard = ({ onClick, allplanets }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(false);
  const [showTop, setshowtop] = useState(false);
  const [topbar, settopbar] = useState(false);

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

  const allianceNames = [
    'All K-pop',
    'Pluto Alliance',
    'Bitboy Crypto',
    'Starsheep Colony',
    'CryptoStache',
    'DrunkenPunkz Cantina',
    'Funky Monkey Frat House',
    'The Hive',
    'Lava Heads',
    'Animated Punkz',
    'Celtic Alliance',
    'Dark Matter',
    'Elongate',
    'Beyond FOMO',
    'Electra Protocol',
    'TCG World',
    'Dexter Plays PH',
    'Non-Fungible Gang',
    'Temple Fehu',
    'Galactic Archade',
    'Halfdeads Valhalla',
    'Founders Legacy',
    "JR's Lands",
    'Starship Gang',
    'Pawthereum',
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

  const hasPlanet = allplanets.length > 0;

  useEffect(() => {
    // Initial data fetch
    setPage(0);
    settopbar(true)
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function calculateOpacity(maxpool, pool) {
    const n = Math.floor((pool * 10) / maxpool);

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

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;

    if (scrollHeight - scrollTop === clientHeight && !isLoading) {
      setshowtop(true);
    } else {
      setshowtop(false);
    }
  };

  const childDivStyle = {
    position: 'absolute',
    top: '90%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 15,
    background: 'black',

  };

  const right = {
    position: 'absolute',
    top: '85%',
    right: '-1vw',
    transform: 'translate(-50%, -50%)',
    zIndex: 15,
    background: 'black',
    width: '2rem',
  	textOrientation: "upright",
	writingMode: "vertical-lr",
alignItems: "center",
  display: "grid",
  gridTemplateColumns: "repeat(2,auto)",
  alignSelf: "center",

  };
function formatNumber(number) {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + 'm';
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + 'k';
  } else {
    return number.toString();
  }
}
  const left = {
    position: 'absolute',
    top: '85%',
    left: '1vw',
    transform: 'translate(-50%, -50%)',
    zIndex: 15,
    background: 'black',
    width: '2rem',
    	textOrientation: "upright",
	writingMode: "vertical-rl",
alignItems: "center",
  display: "grid",
  gridTemplateColumns: "repeat(2,auto)",
  alignSelf: "center",

  };

  return (
    <div>
      <div id="cards" onClick={onClick} onScroll={handleScroll}>
        {hasPlanet && ( () => {
  // Sort the planets
  const sortedPlanets = allplanets
    .sort((a, b) => b.pool - a.pool);

  // Slice the planets
  const slicedPlanets = sortedPlanets.slice(page, page + 50);

  // Render the planets
  return slicedPlanets.map((planet) => {
    console.log(planet)
    const splitp = convertToPlanetName(planet.id);
    const upgradeValue = upgrades[planet.type];
        return (<div>
             
                <div className="card3d" key={planet.id} onClick={() => onSelect(planet)}>
                  <img className="pimage" src={`scripts/public/${planet.type.charAt(0).toUpperCase() + planet.type.slice(1)}.png`} alt="Planet" width="25%" />
                  <div id="data">
                    <div>station id: {splitp.station}</div>
                    <div>{allianceNames[splitp.station]}</div>
                    <div>quad: {splitp.sector}</div>
                    <div>sec: {splitp.system}</div>
                    <div>sys: {splitp.sector}</div>
                    <div>num: {planet.id}</div>
                    <div>owner: {planet.owner}</div>
                  </div>
                  <div className="battery" id={`pool-max-${planet.type}`}>
                upgrade: {`${(parseInt(planet.max_pool).toFixed(4) / parseInt(upgradeValue).toFixed(4)).toFixed(4)}`}
                <ul>
                  {[...Array(10)].map((_, index) => {
                    const popacity = calculateOpacity(upgradeValue, parseInt(planet.max_pool));
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
                          background: upgradeValue === parseInt(planet.max_pool)
                            ? `rgba(255,215,0,${npopacity})`
                            : `rgba(117,182,255,${npopacity})`,
                          boxShadow: upgradeValue === parseInt(planet.max_pool)
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
                pool: {`${parseFloat(planet.pool).toFixed(4)} / ${parseFloat(planet.max_pool).toFixed(4)}`}
                <ul>
                  {[...Array(10)].map((_, index) => {
                    const popacity = calculateOpacity(parseInt(planet.max_pool), parseInt(planet.pool));
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
                          background: parseInt(planet.pool) === parseInt(planet.max_pool)
                            ? `rgba(255,215,0,${npopacity})`
                            : `rgba(117,182,255,${npopacity})`,
                          boxShadow: parseInt(planet.pool) === parseInt(planet.max_pool)
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
            </div>
              );
  });
})()}
       
        {isLoading && <div>Loading...</div>}
      </div>
      {!showTop ? <div></div> : <div className="ship3d" style={childDivStyle}>To top</div>}
      <div className="ship3d" style={right} onClick={() => setPage((page) => page + 50)}><i class="fa-solid fa-arrow-right">{formatNumber(page + 51)}</i></div>
      <div className="ship3d" style={left} onClick={() => { if (page - 50 >= 0) { setPage((page) => page - 50) } }}><i class="fa-solid fa-arrow-left">{formatNumber(page)}</i></div>
    </div>
  );
  
};

export default GlobalCard;
