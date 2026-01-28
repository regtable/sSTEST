import React, { useState, useEffect } from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';
import CryptoJS from 'https://esm.sh/crypto-js@4.2.0';
import process from 'https://esm.sh/process@0.11.10';
import { ExplorerApi } from 'https://esm.sh/atomicassets?bundle';
import React$1 from 'https://esm.sh/react@18.2.0';
import 'https://esm.sh/react@18';
import 'https://cdn.skypack.dev/screenfull';
import 'https://esm.sh/fontawesome@5.6.3';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'justfuvkingmadness';

const encryptData = data => {
  const encryptedData = CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
  const base64EncodedData = btoa(encryptedData); // Base64 encoding

  return base64EncodedData;
};

const decryptData = base64EncodedData => {
  const encryptedData = atob(base64EncodedData); // Base64 decoding

  const decryptedData = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
  return decryptedData;
};

var _img;
const api = new ExplorerApi("https://aa-wax-public1.neftyblocks.com", "atomicassets", {
  fetch
});

const ShipSquare = ({
  shipKey,
  squareKey,
  index,
  onClick,
  selectedPart,
  installedParts,
  images,
  accapis,
  ahapis
}) => {
  const raritys = ['silver', 'green', 'blue', 'purple', 'gold', 'red'];
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [rarity, setRarity] = useState(null);
  const [nftid, setnftid] = useState(null);

  const filterImages = (name, rdata) => {
    return images.filter(item => {
      const key = Object.keys(item)[0]; // Assuming there is only one key in each object

      const currentItem = item[key]; // Check if the item has the desired name and rdata values

      return key === name && parseInt(rdata) === parseInt(currentItem.rdata);
    });
  };

  var is = 0;

  const fetchData = async assetId => {
    if (video || image && nftid === assetId) return;

    if (is + 1 > 10) {
      is = 0;
    }

    try {
      const data = await api.getAsset(`${assetId}`);
      console.log("dataa", data);
      is++; // Example usage:

      const filteredImages = filterImages(data.name, data.data.rdata); // Access image and video properties from the first matching item

      if (filteredImages.length > 1) var firstMatchingItem = filteredImages[1];else var firstMatchingItem = filteredImages[0];

      if (firstMatchingItem) {
        const {
          image,
          video
        } = firstMatchingItem[Object.keys(firstMatchingItem)[0]];
        if (image) setImage(image);
        if (video) setVideo(video);
        setnftid(assetId);
      }

      setRarity(data.data.rdata); // Adjust this based on your API response structure
    } catch (error) {
      is++;
      console.error('Error fetching shipsquare:', error);
    }
  };

  useEffect(() => {
    if (installedParts[index] > 0 || selectedPart) {
      const assetId = selectedPart ? selectedPart.asset_id : installedParts[index];
      fetchData(assetId);
    }
  }, [installedParts, index, selectedPart]);
  const boxStyle = {
    boxShadow: `
      0 0 0.2rem ${raritys[rarity] || 'gold'},
      0 0 0.2rem ${raritys[rarity] || 'gold'},
      0 0 2rem ${raritys[rarity] || 'gold'},
      0 0 0.8rem ${raritys[rarity] || 'gold'},
      0 0 2.8rem ${raritys[rarity] || 'gold'},
      inset 0 0 1.3rem ${raritys[rarity] || 'gold'}
    `
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "part3d",
    onClick: onClick
  }, selectedPart || installedParts[index] > 0 ? image ? /*#__PURE__*/React.createElement("img", {
    id: "part",
    src: image,
    alt: "Ship",
    style: boxStyle
  }) : /*#__PURE__*/React.createElement("video", {
    id: "part",
    autoPlay: true,
    loop: true,
    muted: true,
    playsInline: true,
    style: boxStyle,
    src: video,
    type: "video/mp4"
  }) : _img || (_img = /*#__PURE__*/React.createElement("img", {
    id: "part",
    src: "https://assets.codepen.io/6121774/spanner.png",
    alt: ""
  })));
};

var _div$3;

const Modal = ({
  isLoading,
  allParts,
  selectedNames,
  onSelect,
  selectedPartsInShips
}) => {
  // Filter and sort parts based on selected names and rarity
  const filteredParts = allParts.filter(part => selectedNames.includes(part.data.name) && !selectedPartsInShips.includes(part.asset_id)).sort((a, b) => b.data.rdata - a.data.rdata);
  console.log(selectedPartsInShips);
  return /*#__PURE__*/React$1.createElement("div", {
    style: modalStyle
  }, /*#__PURE__*/React$1.createElement("div", {
    style: contentStyle
  }, isLoading ? _div$3 || (_div$3 = /*#__PURE__*/React$1.createElement("div", {
    style: loadingStyle
  }, "Loading...")) : filteredParts.map(part => /*#__PURE__*/React$1.createElement("div", {
    style: {
      maxWidth: "49%"
    },
    key: part.id,
    onClick: () => onSelect(part)
  }, part.data.img ? /*#__PURE__*/React$1.createElement("img", {
    src: `https://ipfs.neftyblocks.io/ipfs/${part.data.img}`,
    alt: "Ship",
    style: {
      maxWidth: "100%",
      maxHeight: "100%",
      width: "auto",
      height: "auto"
    }
  }) : /*#__PURE__*/React$1.createElement("video", {
    autoPlay: true,
    loop: true,
    muted: true,
    playsInline: true,
    style: {
      maxWidth: "100%",
      maxHeight: "100%",
      width: "auto",
      height: "auto"
    }
  }, /*#__PURE__*/React$1.createElement("source", {
    src: `https://ipfs.neftyblocks.io/ipfs/${part.data.video}`,
    type: "video/mp4"
  }), "Your browser does not support the video tag."), /*#__PURE__*/React$1.createElement("p", null, "id: ", part.asset_id)))));
};

const modalStyle = {
  position: "fixed",
  top: "10vh",
  left: "0px",
  width: "100%",
  height: "80vh",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};
const contentStyle = {
  display: "inline-flex",
  flexWrap: "wrap",

  /* Allow items to wrap to the next line */
  width: "50%",
  // Adjust this value based on your preference
  maxHeight: "100vh",
  // 100% of the viewport height
  overflowY: "auto",
  // Enable vertical scrolling if necessary
  padding: "20px",
  backgroundColor: "#fff",
  // Adjust background color as needed
  borderRadius: "8px" // Add border radius for a rounded appearance

};
const loadingStyle = {
  color: "#000",
  fontSize: "20px"
};

// Import the required dependencies

const Ship = ({
  selectedPartsInShips,
  setSelectedPartsInShips,
  shipKey,
  setActions,
  id,
  allplanets,
  accapis,
  ahapis,
  images,
  allParts,
  setAllParts
}) => {
  // State
  const raritys = ['silver', 'green', 'blue', 'purple', 'gold', 'red', 'cyan'];
  const srcs = ['scripts/public/shipCommon.png', 'scripts/public/shipUncommon.png', 'scripts/public/shipRare.png', 'scripts/public/shipEpica.png', 'scripts/public/shipLegendary.png', 'scripts/public/shipMythic.png', 'scripts/public/shipFounder.png'];
  const [isLoading, setIsLoading] = useState(true);
  const [selectedParts, setSelectedParts] = useState(Array(12).fill(null));
  const [installedParts, setInstalledParts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [buttons, setButtons] = useState(false);
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });
  const [tooltipText, setTooltipText] = useState("empty");
  const [showTip, setShowTip] = useState(false);
  const [station, setstation] = useState(false);
  const [shipstation, setshipstation] = useState(0);
  const [atPlanet, setAtPlanet] = useState(false);
  const [Planet, setPlanet] = useState("");
  const [traveling, settraveling] = useState(false);
  const [context, setcontext] = useState("");
  const [shiprarity, setshiprarity] = useState(0); // Part names

  const selectedNames = ['Flight Control Chair', 'Cooling System', 'High-Power Thruster', 'Secondary Thrusters', 'Holo-Computer', 'AI System', 'Life Support', 'Shield System', 'Kyanite Storage', 'Kyanite Extractor', 'Engine', 'Kyanite Resonator'];

  function convertToPlanetName(planetID) {
    const maxQuadrantsPerSystem = 4;
    const station = Math.floor(planetID / 16384);
    const sector = Math.floor(planetID % 16384 / 4096);
    const system = Math.floor(planetID % 4096 / 128);
    const quadrant = Math.floor(planetID % 128 / 4);
    const planet = planetID % maxQuadrantsPerSystem;
    return {
      station,
      sector,
      system,
      quadrant,
      planet
    };
  } // Event Handlers


  const handleMouseEnter = (e, text) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY
    });
    const tooltips = {
      setParts: "click to install parts",
      remove: "click to remove all parts from ship",
      undo: "click to reset parts selection"
    };
    setTooltipText(tooltips[text] || "empty");
    setShowTip(true);
  };

  const handleMouseLeave = () => {
    setShowTip(false);
  };


  const reset = () => {
    const arr = selectedParts.filter(a => a !== null);
    console.log(arr);
    arr.forEach(item => {
      setSelectedPartsInShips([...selectedPartsInShips.filter(a => a !== item.asset_id)]);
    });
    setSelectedParts(Array(12).fill(null));
    setAllParts(oldall => [...oldall, ...arr]);
    setShowTip(false);
  };

  function convert(t) {
    return t = t - Date.now() / 1000;
  }

  const remove = () => {
    installedParts.forEach(p => {
      console.log(p);
      const newActions = {
        "account": "starshipgame",
        "name": "unattachpart",
        authorization: [{
          actor: id,
          permission: 'active'
        }],
        data: {
          "player": id,
          "starship": shipKey,
          "part": p
        }
      };
      if (p > 0) setActions(oldActions => [...oldActions, newActions]);
    });
    setShowTip(false); //  setActions((oldActions) => [...oldActions,{handler:"sendAll"}]);
  };

  const claim = () => {
    console.log("claim", id, shipKey);
    const newActionu = {
      "account": "starshipgame",
      "name": "collect",
      authorization: [{
        actor: id,
        permission: 'active'
      }],
      data: {
        "player": id,
        "starship": shipKey
      }
    };
    setActions(oldActions => [...oldActions, newActionu]);
  };

  function deploy() {
    let planetto;
    var sortedPlanets = allplanets.filter(planet => convertToPlanetName(planet.id).station === shipstation).filter(planet => convertToPlanetName(planet.id).sector === 0).filter(planet => planet.owner === id);
    console.log(sortedPlanets.length);

    if (sortedPlanets.length < 1) {
      sortedPlanets = allplanets.filter(planet => convertToPlanetName(planet.id).station === shipstation).filter(planet => convertToPlanetName(planet.id).sector === 0);
      planetto = sortedPlanets[0];
    } else {
      planetto = sortedPlanets[0];
    }

    console.log("sending to ", planetto.id, shipstation);
    const newActionu = {
      "account": "starshipgame",
      "name": "move2planet",
      authorization: [{
        actor: id,
        permission: 'active'
      }],
      data: {
        "player": id,
        "starship": shipKey,
        planet: planetto.id
      }
    };
    setActions(oldActions => [...oldActions, newActionu]);
  }

  const apply = () => {
    installedParts.forEach((installedPart, index) => {
      const selectedPart = selectedParts[index];
      const newActionu = {
        "account": "starshipgame",
        "name": "unattachpart",
        authorization: [{
          actor: id,
          permission: 'active'
        }],
        data: {
          "player": id,
          "starship": shipKey,
          "part": installedPart
        }
      };

      if (selectedPart !== null) {
        const newActions = {
          "account": "atomicassets",
          "name": "transfer",
          authorization: [{
            actor: id,
            permission: 'active'
          }],
          data: {
            "from": id,
            "asset_ids": [selectedPart.asset_id],
            "memo": "Staking Part",
            "to": "starshipgame"
          }
        };
        const newActioni = {
          "account": "starshipgame",
          "name": "attachpart",
          authorization: [{
            actor: id,
            permission: 'active'
          }],
          data: {
            "player": id,
            "starship": shipKey,
            "part": selectedPart.asset_id
          }
        };

        if (installedPart && selectedPart.asset_id > 0) {
          setActions(oldActions => [...oldActions, newActionu]);
          setActions(oldActions => [...oldActions, newActions]);
          setActions(oldActions => [...oldActions, newActioni]);
          console.log(`Overlap at index ${index}: Installed Part - ${installedPart}, Selected Part - ${selectedPart.asset_id}`);
        } else if (selectedPart.asset_id > 0) {
          setActions(oldActions => [...oldActions, newActions]);
          setActions(oldActions => [...oldActions, newActioni]);
          console.log(`No overlap at index ${index}: Installed Part - ${installedPart}, Selected Part - ${selectedPart.asset_id}`);
        } else {
          console.log(`no parts modified index ${index}: Installed Part - ${installedPart}, Selected Part - ${selectedPart}`);
        }
      }
    }); //   setActions((oldActions) => [...oldActions,{handler:"sendAll"}]);

    setShowTip(false);
  };

  function selectBest() {
    if (!allParts) {
      console.error("no inventory?");
    }

    selectedParts.forEach((installedPart, index) => {
      selectedParts[index];
      var newarr = allParts.filter(p => p.name === selectedNames[index]);
      const filteredParts = newarr.filter(part => selectedNames.includes(part.name) && !selectedPartsInShips.includes(part.asset_id));
      var newarrsort = filteredParts.sort((p, np) => p.data.rdata < np.data.rdata);
      console.log(newarrsort);
      const selectedPart = newarrsort[0];
      console.log(selectedPart.asset_id);
      setSelectedParts(prevSelectedParts => {
        const newSelectedParts = [...prevSelectedParts];
        newSelectedParts[index] = { ...selectedPart,
          index: index,
          partId: selectedPart.asset_id
        };
        setSelectedPartsInShips(prevSelectedPartsInShips => {
          var _prevSelectedParts$in;

          const i = prevSelectedPartsInShips.indexOf((_prevSelectedParts$in = prevSelectedParts[index]) === null || _prevSelectedParts$in === void 0 ? void 0 : _prevSelectedParts$in.asset_id);
          const updatedSelectedPartsInShips = [...prevSelectedPartsInShips];
          if (i > -1) updatedSelectedPartsInShips.splice(i, 1);
          updatedSelectedPartsInShips.push(selectedPart.asset_id);
          console.log("us", selectedPart.asset_id, prevSelectedParts, selectedPartsInShips);
          return updatedSelectedPartsInShips;
        });
        console.log("ns", selectedPart.asset_id, prevSelectedParts, newSelectedParts);
        return newSelectedParts;
      });
    });
  }
  var is = 0; // Fetch all parts from the API

  useEffect(async () => {
    if (is + 1 > 10) {
      is = 0;
    }

    try {
      // Fetch parts data
      console.log("allparts", allParts);
    } catch (error) {
      console.error('Error fetching data:', error);
      is++;
    } finally {
      setIsLoading(false);
    }
  }, []);

  async function setinstalledparts() {
    if (is + 1 > 10) {
      is = 0;
    }

    try {
      var _data2$rows$;

      // Fetch installed parts data
      var n = Math.floor(Math.random() * accapis.length);
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
        })
      });
      is++;
      const data2 = await response2.json();
      setInstalledParts(((_data2$rows$ = data2.rows[0]) === null || _data2$rows$ === void 0 ? void 0 : _data2$rows$.parts) || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      is++;
    } finally {
      setIsLoading(false);
    }
  }


  useEffect(() => {
    const hasNonEmptyParts = selectedParts.some(part => part !== null && part !== '');
    setButtons(hasNonEmptyParts);
  }, [selectedParts]);
  useEffect(() => {
    setInterval(async () => {
      var _data$rows$, _data$rows$4;

      setinstalledparts();
      var n = Math.floor(Math.random() * accapis.length);
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
        })
      });
      const data = await response2.json();
      console.log("hit checks", convert(data.rows[0].end) < 0, (_data$rows$ = data.rows[0]) === null || _data$rows$ === void 0 ? void 0 : _data$rows$.end, traveling, station, atPlanet);
      setshiprarity(data.rows[0].rarity);
      const plan = allplanets.filter(a => a.id === data.rows[0].planet);

      if (plan[0]) {
        setPlanet(plan[0].type);
        console.log(Planet);
      }

      if (convert(data.rows[0].end) < 0) {
        settraveling(false);

        if (data.rows[0].planet <= 0) {
          setAtPlanet(false);
          setstation(true);
          setshipstation(data.rows[0].spacestation);
          setcontext("station");
          console.log("stationary checksstation", traveling, station, atPlanet, data.rows[0]);
        } else {
          setAtPlanet(true);
          setstation(false);
          setcontext("planet");
          console.log("stationary checks planet", traveling, station, atPlanet);
        }
      } else {
        var _data$rows$2, _data$rows$3;

        settraveling(true);
        setcontext("orbit");

        if (data.planet <= 0) {
          setAtPlanet(true);
          setstation(false);
        } else if (data.planet === 0) {
          setAtPlanet(false);
          setstation(true);
        } else ;

        console.log("moving checks", Date.now() / 1000 < ((_data$rows$2 = data.rows[0]) === null || _data$rows$2 === void 0 ? void 0 : _data$rows$2.end), traveling, station, atPlanet, (_data$rows$3 = data.rows[0]) === null || _data$rows$3 === void 0 ? void 0 : _data$rows$3.planet);
      }

      console.log("exit checks", Date.now() / 1000 < ((_data$rows$4 = data.rows[0]) === null || _data$rows$4 === void 0 ? void 0 : _data$rows$4.end), traveling, station, atPlanet);
    }, 1000 * 30);
  }, []); // Handle square click

  const handleSquareClick = index => {
    setClickedIndex(index);
    setIsModalOpen(true);
  }; // Handle part selection


  const handlePartSelect = (part, parts) => {
    if (parts === "close") {
      setIsModalOpen(false);
    } else {
      setSelectedParts(prevSelectedParts => {
        const newSelectedParts = [...prevSelectedParts]; // Check if there's a part currently at clickedIndex to prevent null errors in console.log

        if (newSelectedParts[clickedIndex]) {
          console.log("im updating parts here coming off : going on ", newSelectedParts[clickedIndex].asset_id, ":", part.asset_id);
        } // Update the selected part at the clicked index


        const partComingOff = newSelectedParts[clickedIndex];
        newSelectedParts[clickedIndex] = { ...part,
          index: clickedIndex,
          partId: part.asset_id
        }; // Update selected parts in ships

        setSelectedPartsInShips(prevSelectedPartsInShips => {
          const i = prevSelectedPartsInShips.indexOf(partComingOff === null || partComingOff === void 0 ? void 0 : partComingOff.asset_id);
          const updatedSelectedPartsInShips = [...prevSelectedPartsInShips]; // Remove the part coming off from selected parts in ships

          if (i > -1) updatedSelectedPartsInShips.splice(i, 1); // Add the new part to selected parts in ships

          updatedSelectedPartsInShips.push(part.asset_id);
          return updatedSelectedPartsInShips;
        }); // Update allParts: remove the new part, add the part coming off

        setAllParts(oldAllParts => {
          const updatedAllParts = oldAllParts.filter(p => p.asset_id !== part.asset_id); // Remove new part

          if (partComingOff) updatedAllParts.push(partComingOff); // Add part coming off if it exists

          return updatedAllParts;
        });
        return newSelectedParts;
      });
      setIsModalOpen(false);
    }
  }; // Ship Component JSX


  return /*#__PURE__*/React.createElement(React.Fragment, null, context === "station" && /*#__PURE__*/React.createElement("div", {
    className: "ship3d"
  }, /*#__PURE__*/React.createElement("img", {
    className: "part3d",
    src: srcs[shiprarity],
    alt: "Ship",
    style: {
      height: "8rem",
      width: "95%",
      borderRadius: "2rem",
      alignSelf: " center",
      boxShadow: `
      0 0 0.2rem ${raritys[shiprarity] || 'gold'},
      0 0 0.2rem ${raritys[shiprarity] || 'gold'},
      0 0 2rem ${raritys[shiprarity] || 'gold'},
      0 0 0.8rem ${raritys[shiprarity] || 'gold'},
      0 0 2.8rem ${raritys[shiprarity] || 'gold'},
      inset 0 0 1.3rem ${raritys[shiprarity] || 'gold'}
    `
    }
  }), /*#__PURE__*/React.createElement("div", {
    id: "parts"
  }, Array.from({
    length: 12
  }, (_, index) => /*#__PURE__*/React.createElement(ShipSquare, {
    key: selectedNames[index],
    shipKey: shipKey,
    squareKey: selectedNames[index],
    index: index,
    onClick: () => handleSquareClick(index),
    selectedPart: selectedParts[index],
    installedParts: installedParts,
    images: images,
    accapis: accapis,
    ahapis: ahapis
  })), buttons ? /*#__PURE__*/React.createElement("i", {
    className: "fa-regular fa-circle-xmark part3d",
    "data-tip": "reset selection",
    onMouseEnter: e => handleMouseEnter(e, "remove"),
    onMouseLeave: handleMouseLeave,
    onClick: () => remove(),
    style: {
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
      zIndex: 24
    }
  }) : /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-ellipsis part3d",
    style: {
      boxShadow: `
                0 0 0.2rem lightgray,
                0 0 0.2rem gray,
                0 0 2rem darkgray
              `,
      border: '2px solid #1e3799',
      color: 'grey',
      fontSize: "2rem",
      display: "grid",
      justifyItems: "center"
    }
  }), buttons ? /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-rotate-left part3d",
    "data-tip": "reset selection",
    onMouseEnter: e => handleMouseEnter(e, "undo"),
    onMouseLeave: handleMouseLeave,
    onClick: () => reset(),
    style: {
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
      zIndex: 24
    }
  }) : /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-ellipsis part3d",
    style: {
      boxShadow: `
                0 0 0.2rem lightgray,
                0 0 0.2rem gray,
                0 0 2rem darkgray
              `,
      border: '2px solid #1e3799',
      color: 'grey',
      fontSize: "2rem",
      display: "grid",
      justifyItems: "center"
    }
  }), buttons ? /*#__PURE__*/React.createElement("i", {
    className: "fa-regular fa-circle-check part3d",
    "data-tip": "apply selection",
    onMouseEnter: e => handleMouseEnter(e, "setParts"),
    onMouseLeave: handleMouseLeave,
    onClick: () => apply(),
    style: {
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
      zIndex: 24
    }
  }) : /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-ellipsis part3d",
    style: {
      boxShadow: `
                0 0 0.2rem lightgray,
                0 0 0.2rem gray,
                0 0 2rem darkgray
              `,
      border: '2px solid #1e3799',
      color: 'grey',
      fontSize: "2rem",
      display: "grid",
      justifyItems: "center"
    }
  }), buttons ? /*#__PURE__*/React.createElement("i", {
    className: "fa-regular fa-face-kiss-wink-heart",
    "data-tip": "apply selection",
    onMouseEnter: e => handleMouseEnter(e, "setParts"),
    onMouseLeave: handleMouseLeave,
    onClick: () => selectBest(),
    style: {
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
      zIndex: 24
    }
  }) : /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-ellipsis part3d",
    style: {
      boxShadow: `
                0 0 0.2rem lightgray,
                0 0 0.2rem gray,
                0 0 2rem darkgray
              `,
      border: '2px solid #1e3799',
      color: 'grey',
      fontSize: "2rem",
      display: "grid",
      justifyItems: "center"
    }
  }), station && !traveling ? /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-gas-pump part3d",
    "data-tip": "apply selection",
    onMouseEnter: e => handleMouseEnter(e, "setParts"),
    onMouseLeave: handleMouseLeave,
    onClick: () => deploy(),
    style: {
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
      zIndex: 24
    }
  }) : /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-gas-pump part3d",
    style: {
      boxShadow: `
                0 0 0.2rem lightgray,
                0 0 0.2rem gray,
                0 0 2rem darkgray
              `,
      border: '2px solid #1e3799',
      color: 'grey',
      fontSize: "2rem",
      display: "grid",
      justifyItems: "center"
    }
  }), atPlanet && !traveling ? /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-person-walking-arrow-loop-left part3d",
    "data-tip": "apply selection",
    onMouseEnter: e => handleMouseEnter(e, "setParts"),
    onMouseLeave: handleMouseLeave,
    onClick: () => apply(),
    style: {
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
      zIndex: 24
    }
  }) : /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-person-walking-arrow-loop-left part3d",
    style: {
      boxShadow: `
                0 0 0.2rem lightgray,
                0 0 0.2rem gray,
                0 0 2rem darkgray
              `,
      border: '2px solid #1e3799',
      color: 'grey',
      fontSize: "2rem",
      display: "grid",
      justifyItems: "center"
    }
  })), isModalOpen && /*#__PURE__*/React.createElement(Modal, {
    style: {
      zIndex: 27
    },
    isLoading: isLoading // Pass isLoading to Modal
    ,
    allParts: allParts,
    selectedNames: clickedIndex !== null ? [selectedNames[clickedIndex]] : selectedNames,
    onSelect: handlePartSelect,
    selectedPartsInShips: selectedPartsInShips
  }), showTip && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      top: `${mousePosition.y}px`,
      left: `${mousePosition.x}px`,
      backgroundColor: 'lightblue',
      padding: '10px',
      border: '1px solid #ccc',
      zIndex: 25
    }
  }, tooltipText)), context === "planet" && /*#__PURE__*/React.createElement("div", {
    className: "ship3d"
  }, /*#__PURE__*/React.createElement("img", {
    className: "part3d",
    src: `scripts/public/${Planet.charAt(0).toUpperCase() + Planet.slice(1)}.png`,
    alt: Planet,
    style: {
      height: "8rem",
      width: "95%",
      borderRadius: "2rem",
      alignSelf: " center",
      boxShadow: `
      0 0 0.2rem ${raritys[shiprarity] || 'gold'},
      0 0 0.2rem ${raritys[shiprarity] || 'gold'},
      0 0 2rem ${raritys[shiprarity] || 'gold'},
      0 0 0.8rem ${raritys[shiprarity] || 'gold'},
      0 0 2.8rem ${raritys[shiprarity] || 'gold'},
      inset 0 0 1.3rem ${raritys[shiprarity] || 'gold'}
    `
    }
  }), /*#__PURE__*/React.createElement("div", {
    id: "parts"
  }, Array.from({
    length: 12
  }, (_, index) => {
    return /*#__PURE__*/React.createElement("div", {
      className: "part3d",
      key: index
    }, /*#__PURE__*/React.createElement("img", {
      id: "part",
      src: `https://ipfs.neftyblocks.io/ipfs/QmVPi4LzEUdptUhd3fyMeiJgLfX8namDQLRShiS2dBcKt7
`,
      alt: `Part ${index}`
    }));
  }), buttons ? /*#__PURE__*/React.createElement("i", {
    className: "fa-regular fa-circle-xmark part3d",
    "data-tip": "reset selection",
    onMouseEnter: e => handleMouseEnter(e, "remove"),
    onMouseLeave: handleMouseLeave,
    onClick: () => remove(),
    style: {
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
      zIndex: 24
    }
  }) : /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-ellipsis part3d",
    style: {
      boxShadow: `
                0 0 0.2rem lightgray,
                0 0 0.2rem gray,
                0 0 2rem darkgray
              `,
      border: '2px solid #1e3799',
      color: 'grey',
      fontSize: "2rem",
      display: "grid",
      justifyItems: "center"
    }
  }), buttons ? /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-rotate-left part3d",
    "data-tip": "reset selection",
    onMouseEnter: e => handleMouseEnter(e, "undo"),
    onMouseLeave: handleMouseLeave,
    onClick: () => reset(),
    style: {
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
      zIndex: 24
    }
  }) : /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-ellipsis part3d",
    style: {
      boxShadow: `
                0 0 0.2rem lightgray,
                0 0 0.2rem gray,
                0 0 2rem darkgray
              `,
      border: '2px solid #1e3799',
      color: 'grey',
      fontSize: "2rem",
      display: "grid",
      justifyItems: "center"
    }
  }), buttons ? /*#__PURE__*/React.createElement("i", {
    className: "fa-regular fa-circle-check part3d",
    "data-tip": "apply selection",
    onMouseEnter: e => handleMouseEnter(e, "setParts"),
    onMouseLeave: handleMouseLeave,
    style: {
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
      zIndex: 24
    }
  }) : /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-ellipsis part3d",
    style: {
      boxShadow: `
                0 0 0.2rem lightgray,
                0 0 0.2rem gray,
                0 0 2rem darkgray
              `,
      border: '2px solid #1e3799',
      color: 'grey',
      fontSize: "2rem",
      display: "grid",
      justifyItems: "center"
    }
  }), buttons ? /*#__PURE__*/React.createElement("i", {
    className: "fa-regular fa-face-kiss-wink-heart",
    "data-tip": "apply selection",
    onMouseEnter: e => handleMouseEnter(e, "setParts"),
    onMouseLeave: handleMouseLeave,
    onClick: () => selectBest(),
    style: {
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
      zIndex: 24
    }
  }) : /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-ellipsis part3d",
    style: {
      boxShadow: `
                0 0 0.2rem lightgray,
                0 0 0.2rem gray,
                0 0 2rem darkgray
              `,
      border: '2px solid #1e3799',
      color: 'grey',
      fontSize: "2rem",
      display: "grid",
      justifyItems: "center"
    }
  }), station && !traveling ? /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-gas-pump part3d",
    "data-tip": "apply selection",
    onMouseEnter: e => handleMouseEnter(e, "setParts"),
    onMouseLeave: handleMouseLeave,
    onClick: () => deploy(),
    style: {
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
      zIndex: 24
    }
  }) : /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-gas-pump part3d",
    style: {
      boxShadow: `
                0 0 0.2rem lightgray,
                0 0 0.2rem gray,
                0 0 2rem darkgray
              `,
      border: '2px solid #1e3799',
      color: 'grey',
      fontSize: "2rem",
      display: "grid",
      justifyItems: "center"
    }
  }), atPlanet && !traveling ? /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-person-walking-arrow-loop-left part3d",
    "data-tip": "apply selection",
    onMouseEnter: e => handleMouseEnter(e, "setParts"),
    onMouseLeave: handleMouseLeave,
    onClick: () => claim(),
    style: {
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
      zIndex: 24
    }
  }) : /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-person-walking-arrow-loop-left part3d",
    style: {
      boxShadow: `
                0 0 0.2rem lightgray,
                0 0 0.2rem gray,
                0 0 2rem darkgray
              `,
      border: '2px solid #1e3799',
      color: 'grey',
      fontSize: "2rem",
      display: "grid",
      justifyItems: "center"
    }
  })), isModalOpen && /*#__PURE__*/React.createElement(Modal, {
    style: {
      zIndex: 27
    },
    isLoading: isLoading // Pass isLoading to Modal
    ,
    allParts: allParts,
    selectedNames: clickedIndex !== null ? [selectedNames[clickedIndex]] : selectedNames,
    onSelect: handlePartSelect,
    selectedPartsInShips: selectedPartsInShips
  }), showTip && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      top: `${mousePosition.y}px`,
      left: `${mousePosition.x}px`,
      backgroundColor: 'lightblue',
      padding: '10px',
      border: '1px solid #ccc',
      zIndex: 25
    }
  }, tooltipText)), context === "orbit" && /*#__PURE__*/React.createElement("div", {
    className: "ship3d"
  }, /*#__PURE__*/React.createElement("img", {
    className: "part3d",
    src: "https://assets.codepen.io/6121774/shipTravelling.gif",
    alt: "Ship",
    style: {
      height: "8rem",
      width: "95%",
      borderRadius: "2rem",
      alignSelf: " center",
      boxShadow: `
      0 0 0.2rem ${raritys[shiprarity] || 'gold'},
      0 0 0.2rem ${raritys[shiprarity] || 'gold'},
      0 0 2rem ${raritys[shiprarity] || 'gold'},
      0 0 0.8rem ${raritys[shiprarity] || 'gold'},
      0 0 2.8rem ${raritys[shiprarity] || 'gold'},
      inset 0 0 1.3rem ${raritys[shiprarity] || 'gold'}
    `
    }
  }), /*#__PURE__*/React.createElement("div", {
    id: "parts"
  }, Array.from({
    length: 12
  }, (_, index) => {
    // Fetch the image URL (replace 'YOUR_API_ENDPOINT' with the actual API endpoint)
    return /*#__PURE__*/React.createElement("div", {
      className: "part3d",
      key: index
    }, /*#__PURE__*/React.createElement("img", {
      id: "part",
      src: `https://ipfs.neftyblocks.io/ipfs/Qmd9vU8GrkhnKJ1cmXejCq8qsm95Bs5CWmFkArPF7w8mPo
`,
      alt: `Part ${index}`
    }));
  }), buttons ? /*#__PURE__*/React.createElement("i", {
    className: "fa-regular fa-circle-xmark part3d",
    "data-tip": "reset selection",
    onMouseEnter: e => handleMouseEnter(e, "remove"),
    onMouseLeave: handleMouseLeave,
    onClick: () => remove(),
    style: {
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
      zIndex: 24
    }
  }) : /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-ellipsis part3d",
    style: {
      boxShadow: `
                0 0 0.2rem lightgray,
                0 0 0.2rem gray,
                0 0 2rem darkgray
              `,
      border: '2px solid #1e3799',
      color: 'grey',
      fontSize: "2rem",
      display: "grid",
      justifyItems: "center"
    }
  }), buttons ? /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-rotate-left part3d",
    "data-tip": "reset selection",
    onMouseEnter: e => handleMouseEnter(e, "undo"),
    onMouseLeave: handleMouseLeave,
    onClick: () => reset(),
    style: {
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
      zIndex: 24
    }
  }) : /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-ellipsis part3d",
    style: {
      boxShadow: `
                0 0 0.2rem lightgray,
                0 0 0.2rem gray,
                0 0 2rem darkgray
              `,
      border: '2px solid #1e3799',
      color: 'grey',
      fontSize: "2rem",
      display: "grid",
      justifyItems: "center"
    }
  }), buttons ? /*#__PURE__*/React.createElement("i", {
    className: "fa-regular fa-circle-check part3d",
    "data-tip": "apply selection",
    onMouseEnter: e => handleMouseEnter(e, "setParts"),
    onMouseLeave: handleMouseLeave,
    onClick: () => apply(),
    style: {
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
      zIndex: 24
    }
  }) : /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-ellipsis part3d",
    style: {
      boxShadow: `
                0 0 0.2rem lightgray,
                0 0 0.2rem gray,
                0 0 2rem darkgray
              `,
      border: '2px solid #1e3799',
      color: 'grey',
      fontSize: "2rem",
      display: "grid",
      justifyItems: "center"
    }
  }), buttons ? /*#__PURE__*/React.createElement("i", {
    className: "fa-regular fa-face-kiss-wink-heart",
    "data-tip": "apply selection",
    onMouseEnter: e => handleMouseEnter(e, "setParts"),
    onMouseLeave: handleMouseLeave,
    onClick: () => selectBest(),
    style: {
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
      zIndex: 24
    }
  }) : /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-ellipsis part3d",
    style: {
      boxShadow: `
                0 0 0.2rem lightgray,
                0 0 0.2rem gray,
                0 0 2rem darkgray
              `,
      border: '2px solid #1e3799',
      color: 'grey',
      fontSize: "2rem",
      display: "grid",
      justifyItems: "center"
    }
  }), station && !traveling ? /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-gas-pump part3d",
    "data-tip": "apply selection",
    onMouseEnter: e => handleMouseEnter(e, "setParts"),
    onMouseLeave: handleMouseLeave,
    onClick: () => apply(),
    style: {
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
      zIndex: 24
    }
  }) : /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-gas-pump part3d",
    style: {
      boxShadow: `
                0 0 0.2rem lightgray,
                0 0 0.2rem gray,
                0 0 2rem darkgray
              `,
      border: '2px solid #1e3799',
      color: 'grey',
      fontSize: "2rem",
      display: "grid",
      justifyItems: "center"
    }
  }), atPlanet && !traveling ? /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-person-walking-arrow-loop-left part3d",
    "data-tip": "apply selection",
    onMouseEnter: e => handleMouseEnter(e, "setParts"),
    onMouseLeave: handleMouseLeave,
    onClick: () => apply(),
    style: {
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
      zIndex: 24
    }
  }) : /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-person-walking-arrow-loop-left part3d",
    style: {
      boxShadow: `
                0 0 0.2rem lightgray,
                0 0 0.2rem gray,
                0 0 2rem darkgray
              `,
      border: '2px solid #1e3799',
      color: 'grey',
      fontSize: "2rem",
      display: "grid",
      justifyItems: "center"
    }
  })), isModalOpen && /*#__PURE__*/React.createElement(Modal, {
    style: {
      zIndex: 27
    },
    isLoading: isLoading // Pass isLoading to Modal
    ,
    allParts: allParts,
    selectedNames: clickedIndex !== null ? [selectedNames[clickedIndex]] : selectedNames,
    onSelect: handlePartSelect,
    selectedPartsInShips: selectedPartsInShips
  }), showTip && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      top: `${mousePosition.y}px`,
      left: `${mousePosition.x}px`,
      backgroundColor: 'lightblue',
      padding: '10px',
      border: '1px solid #ccc',
      zIndex: 25
    }
  }, tooltipText)));
};

var _p;

const Hangar = ({
  id,
  setActions,
  allplanets,
  accapis,
  ahapis,
  images,
  allParts,
  setAllParts
}) => {
  const [selectedPartsInShips, setSelectedPartsInShips] = useState([]);
  const [ships, setShips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(async () => {
    console.log("hey", accapis);
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        var n = Math.floor(Math.random() * accapis.length);
        const response = await fetch(`${accapis[n][1]}/v1/chain/get_table_rows`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: `{
            "json": true,
            "code": "starshipgame",
            "table": "players",
            "scope": "starshipgame",
            "encode_type": "json",
            "upper_bound": "${id}",
            "lower_bound": "${id}",
            "limit": "1"
          }`
        });
        const data = await response.json();
        console.log(data, "aqaaaaaa"); // Check the structure of the response and set the state accordingly

        setShips(data.rows[0].starships || []); // Change 'rows' to the actual property name in the response
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) {
    return _p || (_p = /*#__PURE__*/React.createElement("p", null, "Loading..."));
  }

  return /*#__PURE__*/React.createElement("div", {
    id: "cards"
  }, ships.map(ship => /*#__PURE__*/React.createElement(React.Fragment, {
    key: ship
  }, /*#__PURE__*/React.createElement(Ship, {
    allParts: allParts,
    setAllParts: setAllParts,
    images: images,
    ahapis: ahapis,
    shipKey: ship,
    accapis: accapis,
    selectedPartsInShips: selectedPartsInShips,
    allplanets: allplanets,
    setSelectedPartsInShips: setSelectedPartsInShips,
    id: id,
    setActions: setActions
  }))));
};

const Hangar2 = ({
  id,
  setActions,
  allplanets,
  global,
  accapis,
  ahapis,
  images
}) => {
  const [selectedPartsInShips, setSelectedPartsInShips] = useState([]);
  const [ships, setShips] = useState([]);
  const [ships2, setShips2] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0); // Set the initial page to 0

  useState(false);
  useEffect(async () => {
    const fetchData = async () => {
      try {
        var n = Math.floor(Math.random() * accapis.length);
        const response = await fetch(`${accapis[n][1]}/v1/chain/get_table_rows`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          mode: 'cors',
          body: `{
            "json": true,
            "code": "starshipgame",
            "table": "rentalships",
            "scope": "starshipgame",
            "encode_type": "json",
            "limit": "10000"
          }`
        });
        const data = await response.json();
        const jobber = data.rows.filter(ship => ship.renter_id === "jhysq.wam" && Date.now() / 1000 < ship.rental_end);
        const newArray = jobber.map(item => item.key);
        const jobber2 = data.rows.filter(ship => ship.renter_id !== "jhysq.wam" && Date.now() / 1000 < ship.rental_end);
        const jobber3 = global.filter(ship => ship.rarity > 5);
        const newArray2 = jobber2.map(item => item.key); // Check the structure of the response and set the state accordingly

        setShips(newArray || []);
        setShips2(jobber3 || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]); // Slice the planets

  const slicedPlanets = global.slice(page, page + 25);
  console.log(slicedPlanets);
  return /*#__PURE__*/React.createElement("div", {
    id: "cards"
  }, slicedPlanets.map(ship => /*#__PURE__*/React.createElement(React.Fragment, {
    key: ship.key
  }, /*#__PURE__*/React.createElement(Ship, {
    ahapis: ahapis,
    accapis: accapis,
    shipKey: ship.key,
    selectedPartsInShips: selectedPartsInShips,
    parts: ship.parts,
    allplanets: allplanets,
    setSelectedPartsInShips: setSelectedPartsInShips,
    id: id,
    setActions: setActions,
    images: images
  }))), /*#__PURE__*/React.createElement("div", {
    className: "ship3d",
    style: {
      right: 'your_right_value'
    },
    onClick: () => setPage(page => page + 25)
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-arrow-right"
  }, page + 25)), /*#__PURE__*/React.createElement("div", {
    className: "ship3d",
    style: {
      left: 'your_left_value'
    },
    onClick: () => {
      if (page - 25 >= 0) {
        setPage(page => page - 25);
      }
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-arrow-left"
  }, page - 25)));
};

const identifier = 'DeployStarshipReact';

const Waxa = ({
  justid,
  anchor,
  cloud,
  logout,
  setid,
  isloggedin,
  setisloggedin,
  setfirstrun,
  setwax,
  settopbar,
  setActiveWindow,
  setcloud,
  setanchor,
  setislogina,
  setisloginc
}) => {
  const wax = new waxjs.WaxJS({
    rpcEndpoint: 'https://wax.api.eosnation.io',
    autologin: true
  }); // Auto-login Effect

  useEffect(() => {
    const autoLogin = async () => {
      try {
        const isAutoLoginAvailable = await wax.isAutoLoginAvailable();

        if (isAutoLoginAvailable) {
          const userAccount = wax.userAccount;
          console.log(wax.userAccount);
          setwax(wax);
          setid(userAccount.toString());
          setisloggedin(true);
          setfirstrun(true);
          settopbar(true);
          setActiveWindow({
            type: 'loading'
          });
          setcloud(true);
        }
      } catch (error) {
        console.error('Error during auto-login:', error);
      }
    };

    autoLogin();
  }, [setid, setwax, setisloggedin, setfirstrun, settopbar, setActiveWindow, setcloud]); // Manual Login with Cloud or Anchor

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (cloud === true) {
          setwax(wax);
          const userAccount = await wax.login(identifier);
          setid(userAccount.toString());

          if (!justid) {
            const response = await fetch("https://backend.deploystarship.com/api/v1/accounts", {
              method: 'PUT',
              body: JSON.stringify({
                waxaccount: userAccount
              }),
              headers: {
                'Content-Type': 'text/plain',
                'X-Requested-With': 'JSON'
              }
            });
            const data = await response.json();

            if (data.message !== "ok") {
              throw data.message;
            }

            setisloggedin(true);
            setfirstrun(true);
            settopbar(true);
            setActiveWindow({
              type: 'loading'
            });
          }

          setcloud(true);
        } else if (anchor) {
          const transport = new AnchorLinkBrowserTransport();
          const link = new AnchorLink({
            transport,
            chains: [{
              chainId: '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4',
              nodeUrl: 'https://wax.blokcrafters.io'
            }]
          });
          setwax(link);

          try {
            const result = await link.login(identifier);
            const userAccount = result.session.auth.actor;
            setid(userAccount.toString());

            if (!justid) {
              const response = await fetch("https://backend.deploystarship.com/api/v1/accounts", {
                method: 'PUT',
                body: JSON.stringify({
                  waxaccount: userAccount
                }),
                headers: {
                  'Content-Type': 'text/plain',
                  'X-Requested-With': 'JSON'
                }
              });
              const data = await response.json();

              if (data.message !== "ok") {
                throw data.message;
              }

              setisloggedin(true);
              setfirstrun(true);
              settopbar(true);
              setActiveWindow({
                type: 'loading'
              });
            }

            setanchor(true);
          } catch (err) {
            console.error('Error during login:', err);
            setislogina(false);
            setisloginc(false);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setislogina(false);
        setisloginc(false);
      }
    };

    fetchData();
  }, [anchor, cloud, setfirstrun, setid, setisloggedin]);
  return null;
};

var _h, _div$2;

const Account = ({
  id,
  setid,
  isloggedin,
  setisloggedin,
  setfirstrun,
  firstrun,
  setwax,
  images
}) => {
  useState([]);
  const [isLogina, setlogina] = useState(false);
  const [isLoginc, setloginc] = useState(false);
  const [timeend, settimeend] = useState(Date.now());
  const [timenow, settimenow] = useState(Date.now());
  useEffect(() => {}, []);

  function calculateOpacity(maxpool, pool) {
    const n = pool / maxpool;
    let opacity;

    if (n <= 0) {
      opacity = 0;
    } else if (n >= 10) {
      opacity = 10;
    } else {
      const lowerThreshold = n * 10 / 10;
      const upperThreshold = (n + 1) * maxpool / 10;
      const fraction = (pool - lowerThreshold) / (upperThreshold - lowerThreshold);
      opacity = n + fraction;
    }

    console.log(n, timenow, timeend, timenow - timeend);
    return opacity;
  }

  console.log(firstrun, "hit accounts");

  const handleWindowToggle = window => {
    if (window === "anchor") {
      setlogina(true);
    } else if (window === "cloud") {
      setloginc(true);
    }
  }; // ...


  return /*#__PURE__*/React.createElement("div", {
    id: "cards"
  }, isloggedin ? /*#__PURE__*/React.createElement(React.Fragment, null, " ", /*#__PURE__*/React.createElement("div", {
    className: "battery",
    id: `pool-left-${1}`
  }, "pool: ", timenow, /*#__PURE__*/React.createElement("ul", null, [...Array(10)].map((_, index) => {
    const popacity = calculateOpacity(timenow, timeend);
    let npopacity = 0;

    if (popacity > index) {
      npopacity = popacity;
    } else if (popacity > index - 1) {
      npopacity = 0.2;
    } else {
      npopacity = 0;
    }

    return /*#__PURE__*/React.createElement("li", {
      key: index,
      id: `cell${index + 1}`,
      style: {
        background: timenow === timeend ? `rgba(255,215,0,${npopacity})` : `rgba(117,182,255,${npopacity})`,
        boxShadow: timenow === timeend ? `inset 0px 0px 10px 2px rgba(117,182,255,${npopacity}),
                               0px 0px 20px rgba(248,125,15,${npopacity})` : `inset 0px 0px 10px 2px rgba(117,182,255,${npopacity}),
                               0px 0px 20px rgba(117,182,214,${npopacity})`,
        width: `${95 / 10}vw`,
        padding: "0px",
        margin: "0px",
        top: Math.random() * 50,
        left: Math.random() * 50
      }
    });
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      justifyItems: "center",
      width: "50%"
    }
  }, id), _h || (_h = /*#__PURE__*/React.createElement("h1", null, "\"Smart\" Image Glow Effect")), _div$2 || (_div$2 = /*#__PURE__*/React.createElement("div", {
    id: "maskparent"
  }, /*#__PURE__*/React.createElement("img", {
    src: "https://cdn.discordapp.com/attachments/874775208714702898/1186796957327437845/sspng.png?ex=65948dcc&is=658218cc&hm=a54ff38b2bd4542b276095553e57dfc959ea2f7b0004967c36cd3482e6a24a1c&",
    id: "mask",
    alt: "Majora's Mask with glow"
  }))), images.map((img2, index) => {
    console.log(img2);
    const key = Object.keys(img2)[0];

    if (img2[key].image) {
      return /*#__PURE__*/React.createElement("img", {
        key: index,
        className: "part3d",
        src: img2[key].image,
        alt: "My Image"
      });
    }

    if (img2[key].video) {
      return /*#__PURE__*/React.createElement("video", {
        className: "part3d",
        autoPlay: true,
        loop: true,
        muted: true,
        playsInline: true,
        src: img2[key].video,
        type: "video/mp4"
      });
    }

    return null; // handle the case where neither image nor video is present
  })) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    style: {
      display: "grid",
      justifyItems: "center",
      width: "50%"
    },
    onClick: () => handleWindowToggle('anchor')
  }, "anchor"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      justifyItems: "center",
      width: "70%",
      height: "1rem",
      backgroundColor: "#004"
    }
  }), /*#__PURE__*/React.createElement("button", {
    style: {
      display: "grid",
      justifyItems: "center",
      width: "50%"
    },
    onClick: () => handleWindowToggle('cloud')
  }, "cloud"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      justifyItems: "center",
      width: "70%",
      height: "1rem",
      backgroundColor: "#004"
    }
  }), isLogina && !isloggedin && /*#__PURE__*/React.createElement(Waxa, {
    id: id,
    setwax: setwax,
    anchor: true,
    id: id,
    setid: setid,
    isloggedin: isloggedin,
    setfirstrun: setfirstrun,
    setisloggedin: setisloggedin
  }), isLoginc && !isloggedin && /*#__PURE__*/React.createElement(Waxa, {
    id: id,
    setwax: setwax,
    cloud: true,
    id: id,
    setid: setid,
    isloggedin: isloggedin,
    setfirstrun: setfirstrun,
    setisloggedin: setisloggedin
  })));
};

var _span;

const PlanetCard = ({
  id,
  onClick,
  planets,
  allplanets,
  setActiveWindow,
  activeWindow,
  settopbar,
  setprevpage,
  prevpage
}) => {
  const [mytopbar, setmytopbar] = useState(false);
  const [page, setPage] = useState(false);
  const allianceNames = ["All K-pop", "Pluto Alliance", "Bitboy Crypto", "Starsheep Colony", "CryptoStache", "DrunkenPunkz Cantina", "Funky Monkey Frat House", "The Hive", "Lava Heads", "Animated Punkz", "Celtic Alliance", "Dark Matter", "Elongate", "Beyond FOMO", "Electra Protocol", "TCG World", "Dexter Plays PH", "Non-Fungible Gang", "Temple Fehu", "Galactic Archade", "Halfdeads Valhalla", "Founders Legacy", "JR's Lands", "Starship Gang", "Pawthereum"];
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
    swamp: 121000
  };
  allplanets.filter(planet => planet.owner === id);
  const hasPlanet = planets.length > 0;
  useEffect(() => {
    // Initial data fetch
    setPage(0);
    setmytopbar(true);
  }, []);

  function calculateOpacity(maxpool, pool) {
    const n = Math.floor(pool * 10 / maxpool); // eslint-disable-line react-hooks/exhaustive-deps

    let opacity;

    if (n <= 0) {
      opacity = 0;
    } else if (n >= 10) {
      opacity = 10;
    } else {
      const lowerThreshold = n * maxpool / 10;
      const upperThreshold = (n + 1) * maxpool / 10;
      const fraction = (pool - lowerThreshold) / (upperThreshold - lowerThreshold);
      opacity = n + fraction;
    }

    return opacity;
  }

  const handleWindowToggle = data => {
    setmytopbar(false);
    settopbar(true);
    setActiveWindow(activeWindow === data.type ? null : data.type);
  };

  function onSelect(nftid) {
    console.log(nftid);
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", {
    id: "topbar",
    style: {
      maxHeight: mytopbar ? '100px' : '0',
      margin: mytopbar ? '16px 0' : '0',
      opacity: mytopbar ? 1 : 0,
      display: 'flex',
      justifyContent: 'space-around',
      transition: 'max-height 0.5s ease, opacity 0.5s ease, margin 0.5s ease'
    }
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      fontSize: '1rem'
    },
    className: "fa-solid fa-user",
    "aria-hidden": "true",
    onClick: () => handleWindowToggle({
      type: "account",
      hide: true
    })
  }, ' ', "- Back"), /*#__PURE__*/React.createElement("i", {
    style: {
      fontSize: '1rem'
    },
    className: "fa-solid fa-shuttle-space",
    "aria-hidden": "true",
    onClick: () => handleWindowToggle({
      type: 'rentals',
      hide: false
    })
  }, ' ', "() - Filter"), /*#__PURE__*/React.createElement("i", {
    style: {
      fontSize: '1rem'
    },
    className: "fa-solid fa-earth-americas",
    "aria-hidden": "true",
    onClick: () => handleWindowToggle({
      type: 'planets',
      hide: false
    })
  }, ' ', "( ", planets.length, ") - Upgrade"), /*#__PURE__*/React.createElement("i", {
    style: {
      fontSize: '1rem'
    },
    className: "fa-solid fa-earth-americas",
    "aria-hidden": "true",
    onClick: () => handleWindowToggle({
      type: 'allplanets',
      hide: false
    })
  }, ' ', "( ) - stats")), /*#__PURE__*/React.createElement("div", {
    id: "cards",
    onClick: onClick
  }, hasPlanet ? planets.map(planet => {
    var nft = allplanets.find(p => p.nft === planet.asset_id);
    let upgradeValue;

    if (nft === undefined) {
      nft = {
        pool: 0,
        max_pool: 0
      };
      upgradeValue = upgrades[planet.name];
    } else {
      upgradeValue = upgrades[nft.type];
    }

    const splitp = planet.data.planet_name.split("-");
    return /*#__PURE__*/React.createElement("div", {
      className: "card3d",
      key: planet.id,
      onClick: () => onSelect(planet)
    }, /*#__PURE__*/React.createElement("img", {
      className: "pimage",
      src: `scripts/public/${planet.name}.png`,
      alt: "Planet",
      width: "25%"
    }), /*#__PURE__*/React.createElement("div", {
      id: "data"
    }, /*#__PURE__*/React.createElement("div", null, "station id: ", splitp[0]), /*#__PURE__*/React.createElement("div", null, allianceNames[splitp[0]]), /*#__PURE__*/React.createElement("div", null, "quad: ", splitp[1]), /*#__PURE__*/React.createElement("div", null, "sec: ", splitp[2]), /*#__PURE__*/React.createElement("div", null, "sys: ", splitp[3]), /*#__PURE__*/React.createElement("div", null, "num: ", planet.data.planet_id)), /*#__PURE__*/React.createElement("div", {
      className: "battery",
      id: `pool-max-${planet.type}`
    }, "upgrade: ", `${(parseInt(nft.max_pool).toFixed(4) / parseInt(upgradeValue).toFixed(4)).toFixed(4)}`, /*#__PURE__*/React.createElement("ul", null, [...Array(10)].map((_, index) => {
      const popacity = calculateOpacity(upgradeValue, parseInt(nft.max_pool));
      let npopacity = 0;

      if (popacity > index) {
        npopacity = popacity;
      } else if (popacity > index - 1) {
        npopacity = 0.2;
      } else {
        npopacity = 0;
      }

      return /*#__PURE__*/React.createElement("li", {
        key: index,
        id: `cell${index + 1}`,
        style: {
          background: upgradeValue === parseInt(nft.max_pool) ? `rgba(255,215,0,${npopacity})` : `rgba(117,182,255,${npopacity})`,
          boxShadow: upgradeValue === parseInt(nft.max_pool) ? `inset 0px 0px 10px 2px rgba(117,182,255,${npopacity}),
                               0px 0px 20px rgba(248,125,15,${npopacity})` : `inset 0px 0px 10px 2px rgba(117,182,255,${npopacity}),
                               0px 0px 20px rgba(117,182,214,${npopacity})`
        }
      });
    }))), /*#__PURE__*/React.createElement("div", {
      className: "battery",
      id: `pool-left-${planet.id}`
    }, "pool: ", (parseInt(nft.pool).toFixed(4) / parseInt(nft.max_pool).toFixed(4)).toFixed(4), /*#__PURE__*/React.createElement("ul", null, [...Array(10)].map((_, index) => {
      const popacity = calculateOpacity(parseInt(nft.max_pool), parseInt(nft.pool));
      let npopacity = 0;

      if (popacity > index) {
        npopacity = popacity;
      } else if (popacity > index - 1) {
        npopacity = 0.2;
      } else {
        npopacity = 0;
      }

      return /*#__PURE__*/React.createElement("li", {
        key: index,
        id: `cell${index + 1}`,
        style: {
          background: parseInt(nft.pool) === parseInt(nft.max_pool) ? `rgba(255,215,0,${npopacity})` : `rgba(117,182,255,${npopacity})`,
          boxShadow: parseInt(nft.pool) === parseInt(nft.max_pool) ? `inset 0px 0px 10px 2px rgba(117,182,255,${npopacity}),
                               0px 0px 20px rgba(248,125,15,${npopacity})` : `inset 0px 0px 10px 2px rgba(117,182,255,${npopacity}),
                               0px 0px 20px rgba(117,182,214,${npopacity})`
        }
      });
    }))), /*#__PURE__*/React.createElement("div", {
      className: "battery",
      id: "pool-per-wax"
    }, "pool per wax", /*#__PURE__*/React.createElement("ul", null, [...Array(10)].map((_, index) => /*#__PURE__*/React.createElement("li", {
      key: index,
      id: `cell${index + 1}`
    })))));
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, _span || (_span = /*#__PURE__*/React.createElement("span", null, "You have no planets or still Loading...")))));
};

var _div$1, _div2;

const GlobalCard = ({
  onClick,
  allplanets
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(false);
  const [showTop, setshowtop] = useState(false);
  const [topbar, settopbar] = useState(false);

  function convertToPlanetName(planetID) {
    const maxQuadrantsPerSystem = 4;
    const station = Math.floor(planetID / 16384);
    const sector = Math.floor(planetID % 16384 / 4096);
    const system = Math.floor(planetID % 4096 / 128);
    const quadrant = Math.floor(planetID % 128 / 4);
    const planet = planetID % maxQuadrantsPerSystem;
    return {
      station,
      sector,
      system,
      quadrant,
      planet
    };
  }

  const allianceNames = ['All K-pop', 'Pluto Alliance', 'Bitboy Crypto', 'Starsheep Colony', 'CryptoStache', 'DrunkenPunkz Cantina', 'Funky Monkey Frat House', 'The Hive', 'Lava Heads', 'Animated Punkz', 'Celtic Alliance', 'Dark Matter', 'Elongate', 'Beyond FOMO', 'Electra Protocol', 'TCG World', 'Dexter Plays PH', 'Non-Fungible Gang', 'Temple Fehu', 'Galactic Archade', 'Halfdeads Valhalla', 'Founders Legacy', "JR's Lands", 'Starship Gang', 'Pawthereum'];
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
    swamp: 121000
  };
  const hasPlanet = allplanets.length > 0;
  useEffect(() => {
    // Initial data fetch
    setPage(0);
    settopbar(true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function calculateOpacity(maxpool, pool) {
    const n = Math.floor(pool * 10 / maxpool);
    let opacity;

    if (n <= 0) {
      opacity = 0;
    } else if (n >= 10) {
      opacity = 10;
    } else {
      const lowerThreshold = n * maxpool / 10;
      const upperThreshold = (n + 1) * maxpool / 10;
      const fraction = (pool - lowerThreshold) / (upperThreshold - lowerThreshold);
      opacity = n + fraction;
    }

    return opacity;
  }

  const handleScroll = e => {
    const {
      scrollTop,
      clientHeight,
      scrollHeight
    } = e.currentTarget;

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
    background: 'black'
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
    alignSelf: "center"
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
    alignSelf: "center"
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    id: "cards",
    onClick: onClick,
    onScroll: handleScroll
  }, hasPlanet && (() => {
    // Sort the planets
    const sortedPlanets = allplanets.sort((a, b) => b.pool - a.pool); // Slice the planets

    const slicedPlanets = sortedPlanets.slice(page, page + 50); // Render the planets

    return slicedPlanets.map(planet => {
      console.log(planet);
      const splitp = convertToPlanetName(planet.id);
      const upgradeValue = upgrades[planet.type];
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        className: "card3d",
        key: planet.id,
        onClick: () => onSelect(planet)
      }, /*#__PURE__*/React.createElement("img", {
        className: "pimage",
        src: `scripts/public/${planet.type.charAt(0).toUpperCase() + planet.type.slice(1)}.png`,
        alt: "Planet",
        width: "25%"
      }), /*#__PURE__*/React.createElement("div", {
        id: "data"
      }, /*#__PURE__*/React.createElement("div", null, "station id: ", splitp.station), /*#__PURE__*/React.createElement("div", null, allianceNames[splitp.station]), /*#__PURE__*/React.createElement("div", null, "quad: ", splitp.sector), /*#__PURE__*/React.createElement("div", null, "sec: ", splitp.system), /*#__PURE__*/React.createElement("div", null, "sys: ", splitp.sector), /*#__PURE__*/React.createElement("div", null, "num: ", planet.id), /*#__PURE__*/React.createElement("div", null, "owner: ", planet.owner)), /*#__PURE__*/React.createElement("div", {
        className: "battery",
        id: `pool-max-${planet.type}`
      }, "upgrade: ", `${(parseInt(planet.max_pool).toFixed(4) / parseInt(upgradeValue).toFixed(4)).toFixed(4)}`, /*#__PURE__*/React.createElement("ul", null, [...Array(10)].map((_, index) => {
        const popacity = calculateOpacity(upgradeValue, parseInt(planet.max_pool));
        let npopacity = 0;

        if (popacity > index) {
          npopacity = popacity;
        } else if (popacity > index - 1) {
          npopacity = 0.2;
        } else {
          npopacity = 0;
        }

        return /*#__PURE__*/React.createElement("li", {
          key: index,
          id: `cell${index + 1}`,
          style: {
            background: upgradeValue === parseInt(planet.max_pool) ? `rgba(255,215,0,${npopacity})` : `rgba(117,182,255,${npopacity})`,
            boxShadow: upgradeValue === parseInt(planet.max_pool) ? `inset 0px 0px 10px 2px rgba(117,182,255,${npopacity}),
                               0px 0px 20px rgba(248,125,15,${npopacity})` : `inset 0px 0px 10px 2px rgba(117,182,255,${npopacity}),
                               0px 0px 20px rgba(117,182,214,${npopacity})`
          }
        });
      }))), /*#__PURE__*/React.createElement("div", {
        className: "battery",
        id: `pool-left-${planet.id}`
      }, "pool: ", `${parseFloat(planet.pool).toFixed(4)} / ${parseFloat(planet.max_pool).toFixed(4)}`, /*#__PURE__*/React.createElement("ul", null, [...Array(10)].map((_, index) => {
        const popacity = calculateOpacity(parseInt(planet.max_pool), parseInt(planet.pool));
        let npopacity = 0;

        if (popacity > index) {
          npopacity = popacity;
        } else if (popacity > index - 1) {
          npopacity = 0.2;
        } else {
          npopacity = 0;
        }

        return /*#__PURE__*/React.createElement("li", {
          key: index,
          id: `cell${index + 1}`,
          style: {
            background: parseInt(planet.pool) === parseInt(planet.max_pool) ? `rgba(255,215,0,${npopacity})` : `rgba(117,182,255,${npopacity})`,
            boxShadow: parseInt(planet.pool) === parseInt(planet.max_pool) ? `inset 0px 0px 10px 2px rgba(117,182,255,${npopacity}),
                               0px 0px 20px rgba(248,125,15,${npopacity})` : `inset 0px 0px 10px 2px rgba(117,182,255,${npopacity}),
                               0px 0px 20px rgba(117,182,214,${npopacity})`
          }
        });
      }))), /*#__PURE__*/React.createElement("div", {
        className: "battery",
        id: "pool-per-wax"
      }, "pool per wax", /*#__PURE__*/React.createElement("ul", null, [...Array(10)].map((_, index) => /*#__PURE__*/React.createElement("li", {
        key: index,
        id: `cell${index + 1}`
      }))))));
    });
  })(), isLoading && (_div$1 || (_div$1 = /*#__PURE__*/React.createElement("div", null, "Loading...")))), !showTop ? _div2 || (_div2 = /*#__PURE__*/React.createElement("div", null)) : /*#__PURE__*/React.createElement("div", {
    className: "ship3d",
    style: childDivStyle
  }, "To top"), /*#__PURE__*/React.createElement("div", {
    className: "ship3d",
    style: right,
    onClick: () => setPage(page => page + 50)
  }, /*#__PURE__*/React.createElement("i", {
    class: "fa-solid fa-arrow-right"
  }, formatNumber(page + 51))), /*#__PURE__*/React.createElement("div", {
    className: "ship3d",
    style: left,
    onClick: () => {
      if (page - 50 >= 0) {
        setPage(page => page - 50);
      }
    }
  }, /*#__PURE__*/React.createElement("i", {
    class: "fa-solid fa-arrow-left"
  }, formatNumber(page))));
};

var _div, _i;

const Landing = ({
  setActiveWindow,
  id,
  setid,
  isloggedin,
  setisloggedin,
  setfirstrun,
  firstrun,
  setwax,
  landscape,
  metamaskon,
  metamaskAddress,
  setmetamaskon,
  setmetamaskAddress
}) => {
  const handleClicklog = () => {
    setActiveWindow({
      type: 'login'
    });
  };

  const handleClicksign = () => {
    setActiveWindow({
      type: 'signup'
    });
  };

  return /*#__PURE__*/React.createElement("div", {
    class: "login"
  }, !landscape ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid"
    }
  }, /*#__PURE__*/React.createElement("i", {
    class: "fa-solid fa-group-arrows-rotate login-button rotator txtglow",
    style: {
      fontSize: "8rem"
    }
  }), _div || (_div = /*#__PURE__*/React.createElement("div", {
    class: "login-button loginmsg  txtglow"
  }, "!!!---...ROTATE DEVICE...---!!!")), "   ", /*#__PURE__*/React.createElement("div", {
    class: "login-button loginmsg  txtglow"
  }, navigator.userAgent)) : /*#__PURE__*/React.createElement("div", {
    class: "login"
  }, /*#__PURE__*/React.createElement("div", {
    class: "login-button",
    onClick: handleClicklog
  }, "Login"), _i || (_i = /*#__PURE__*/React.createElement("i", {
    class: "login-img",
    src: "../../public/icon.png"
  })), /*#__PURE__*/React.createElement("div", {
    class: "login-button",
    onClick: handleClicksign,
    metamaskon: metamaskon,
    setmetamaskAddress: setmetamaskAddress,
    setmetamaskon: setmetamaskon,
    metamaskAddress: metamaskAddress
  }, "Sign up  ")));
};

var _a;

const Signup = ({
  id,
  metamaskon,
  metamaskAddress,
  setmetamaskon,
  setmetamaskAddress,
  setwax,
  setanchor,
  setcloud,
  setid
}) => {
  const [isLogina, setlogina] = useState(false);
  const [isLoginc, setloginc] = useState(false);
  const [query, setquery] = useState("?false");
  const [enc, setenc] = useState("false");
  const [errormsg, seterrormsg] = useState("");
  const [fin, setfin] = useState(false);
  const stylemod = ["rainbow", "forest"];

  const handleWindowToggle = async window2 => {
    if (window2 === "anchor") {
      setlogina(true);
    } else if (window2 === "cloud") {
      setloginc(true);
    } else if (window2 === "mm") {
      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [id, metamaskAddress],
        from: metamaskAddress
      }); // Handle the signature as needed

      const signup = await fetch(`https://backend.deploystarship.com/api/v1/accounts`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'JSON'
        },
        body: JSON.stringify({
          waxaccount: id,
          signature: signature,
          wallet: metamaskAddress.toLowerCase()
        })
      });
      const resp = await signup.json();
      console.log(resp);

      if (!signup.ok && !resp.message) {
        seterrormsg(resp.status);
        throw new Error(`HTTP error! Status: ${resp.status}`);
      } else if (!signup.ok && resp.message.details) {
        seterrormsg(resp.message.details[0].message.split(":")[1]);
        throw new Error(`${resp.message.details[0].message.split(":")[1]}`);
      } else {
        seterrormsg(resp.message, "please refresh and try sign in mobile users return back to the main browser and refresh/sign in");
      }
    }
  };

  useState(async () => {
    if (window.ethereum) {
      setmetamaskon(true);
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      setmetamaskAddress(accounts[0]);
    } else {
      console.log("et not found");
    }
  }, []);
  useEffect(() => {
    if (id !== null) {
      const sensitiveData = id;
      const encryptedData = encryptData(sensitiveData);
      const queryString = `?data=${encodeURIComponent(encryptedData)}`;
      setenc(encryptedData);
      setquery(queryString);
    }
  }, [id]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: "100vw",
      height: "95vh",
      display: "grid"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "signup",
    style: {
      height: "95vh",
      display: "grid",
      justifyContent: "center"
    }
  }, id && metamaskAddress !== null && fin ?
  /*#__PURE__*/
  // Welcome message when we have an id and a metamask address
  React.createElement("div", null, "Welcome ", `${id}`) : metamaskon ?
  /*#__PURE__*/
  // Connect Metamask when Metamask is detected
  React.createElement(React.Fragment, null, " ", /*#__PURE__*/React.createElement("div", {
    className: `signup ${stylemod[metamaskAddress !== null ? 1 : 0]}`,
    style: {
      display: "flex",
      justifyContent: "space-around",
      width: "45vw",
      height: "4rem"
    }
  }, "Connect Metamask ", `${metamaskAddress}`, /*#__PURE__*/React.createElement("button", {
    style: {
      display: "grid",
      justifyItems: "center",
      width: "15%",
      height: "2rem"
    },
    onClick: () => handleWindowToggle('cm'),
    disabled: metamaskAddress !== null
  }, "mm")), /*#__PURE__*/React.createElement("div", {
    className: `signup ${stylemod[id ? 1 : 0]}`,
    style: {
      display: "flex",
      justifyContent: "space-around",
      width: "45vw",
      height: "4rem"
    }
  }, "Connect Wax ", `${id}`, /*#__PURE__*/React.createElement("button", {
    style: {
      display: "grid",
      justifyItems: "center",
      width: "15%",
      height: "2rem"
    },
    onClick: () => handleWindowToggle('cloud'),
    disabled: id
  }, "cloud"), /*#__PURE__*/React.createElement("button", {
    style: {
      display: "grid",
      justifyItems: "center",
      width: "15%",
      height: "2rem"
    },
    onClick: () => handleWindowToggle('anchor'),
    disabled: id
  }, "anchor")), /*#__PURE__*/React.createElement("button", {
    style: {
      display: "grid",
      justifyItems: "center",
      width: "15%",
      height: "2rem"
    },
    className: true,
    onClick: () => handleWindowToggle('mm'),
    disabled: !id || metamaskAddress === null
  }, "click to finish signup"), /*#__PURE__*/React.createElement("div", null, errormsg)) :
  /*#__PURE__*/
  // Install Metamask when Metamask is not detected
  React.createElement("div", null, "Install Metamask to your browser / mobile. Use the inbuilt Metamask browser to complete signup.", /*#__PURE__*/React.createElement("button", {
    style: {
      display: "grid",
      justifyItems: "center",
      width: "6rem",
      height: "4rem"
    },
    onClick: () => handleWindowToggle('cloud'),
    disabled: id
  }, "cloud ", id), /*#__PURE__*/React.createElement("button", {
    style: {
      display: "grid",
      justifyItems: "center",
      width: "15%",
      height: "2rem"
    },
    className: true,
    onClick: () => handleWindowToggle('anchor'),
    disabled: id
  }, "anchor"), /*#__PURE__*/React.createElement("a", {
    href: `https://metamask.app.link/dapp/https://000697922.deployed.codepen.website/${query}`
  }, /*#__PURE__*/React.createElement("button", {
    disabled: query === "?false"
  }, "Click me to open MetaMask app ", query)), _a || (_a = /*#__PURE__*/React.createElement("a", {
    href: `https://metamask.io/`
  }, /*#__PURE__*/React.createElement("button", null, "Click me to install MetaMask"))), /*#__PURE__*/React.createElement("button", {
    style: {
      display: "grid",
      justifyItems: "center",
      width: "15%",
      height: "2rem"
    },
    className: true,
    onClick: () => handleWindowToggle('mm'),
    disabled: !id || metamaskAddress === null
  }, "click to finish signup"), /*#__PURE__*/React.createElement("div", null, errormsg))), isLogina && /*#__PURE__*/React.createElement(Waxa, {
    setid: setid,
    justid: true,
    anchor: true,
    setanchor: setanchor,
    setcloud: setcloud,
    setwax: setwax,
    setisloginc: setloginc,
    setislogina: setlogina
  }), isLoginc && /*#__PURE__*/React.createElement(Waxa, {
    setid: setid,
    cloud: true,
    justid: true,
    setanchor: setanchor,
    setcloud: setcloud,
    setwax: setwax,
    setisloginc: setloginc,
    setislogina: setlogina
  }));
};

// Hangar.js

const LoginModal = ({
  id,
  setid,
  isloggedin,
  setisloggedin,
  setfirstrun,
  firstrun,
  setwax,
  settopbar,
  setActiveWindow,
  setanchor,
  setcloud,
  landscape
}) => {
  useState([]);
  const [isLogina, setlogina] = useState(false);
  const [isLoginc, setloginc] = useState(false);

  const handleWindowToggle = window => {
    if (window === "anchor") {
      setlogina(true);
    } else if (window === "cloud") {
      setloginc(true);
    }
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, landscape && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    style: {
      display: "grid",
      justifyItems: "center",
      width: "50%"
    },
    onClick: () => handleWindowToggle('anchor')
  }, "anchor"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      justifyItems: "center",
      width: "70%",
      height: "1rem",
      backgroundColor: "#004"
    }
  }), /*#__PURE__*/React.createElement("button", {
    style: {
      display: "grid",
      justifyItems: "center",
      width: "50%"
    },
    onClick: () => handleWindowToggle('cloud')
  }, "cloud"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      justifyItems: "center",
      width: "70%",
      height: "1rem",
      backgroundColor: "#004"
    }
  }), isLogina && !isloggedin && /*#__PURE__*/React.createElement(Waxa, {
    id: id,
    setwax: setwax,
    anchor: true,
    id: id,
    setid: setid,
    isloggedin: isloggedin,
    setfirstrun: setfirstrun,
    setisloggedin: setisloggedin,
    settopbar: settopbar,
    setActiveWindow: setActiveWindow,
    setanchor: setanchor,
    setcloud: setcloud
  }), isLoginc && !isloggedin && /*#__PURE__*/React.createElement(Waxa, {
    id: id,
    setwax: setwax,
    cloud: true,
    id: id,
    setid: setid,
    isloggedin: isloggedin,
    setfirstrun: setfirstrun,
    setisloggedin: setisloggedin,
    settopbar: settopbar,
    setActiveWindow: setActiveWindow,
    setanchor: setanchor,
    setcloud: setcloud
  })));
};

const Login = ({
  id,
  setplanets,
  setallships,
  setallplanets,
  setfirstrun,
  setimages,
  images
}) => {
  useState(0);
  useState(null);

  async function getimgs(ppage) {
    try {
      // Fetch parts data
      const response = await fetch(`https://aa-wax-public1.neftyblocks.com/atomicassets/v1/templates?collection_name=starshipnfts&schema_name=component&page=1&limit=1000&order=desc&sort=created`);
      const data = await response.json();
      return data;
    } catch (error) {}
  }

  async function go() {
    var data = [];
    data.more = true;

    do {
      const data = await getimgs();
      console.log(data.data.length);

      if (data.data.length < 1000) {
        const newImagesArray = await Promise.all(data.data.map(async item => {
          const n = item.name;
          const i = item.immutable_data.img;
          const v = item.immutable_data.video;
          const r = item.immutable_data.rdata;
          let img;
          let video2;

          if (i !== undefined) {
            img = `https://ipfs.neftyblocks.io/ipfs/${i}`; // Wait for the image to load
          }

          if (v !== undefined) {
            video2 = `https://ipfs.neftyblocks.io/ipfs/${v}`; // Wait for the video to load
          }

          return {
            [n]: {
              image: img,
              rdata: r,
              video: video2
            }
          };
        }));
        setimages(newImagesArray);
        data.more = false;
        break;
      } else {
        const newImagesArray = data.data.map(async item => {
          const n = item.name;
          const i = item.immutable_data.img;
          const v = item.immutable_data.video;
          const r = item.immutable_data.rdata;
          let img;
          let img2;

          if (i !== undefined) {
            img = new Image();
            img.src = `https://ipfs.neftyblocks.io/ipfs/${i}`; // Wait for the image to load

            await new Promise(resolve => {
              img.onload = resolve;
            });
          }

          if (v !== undefined) {
            img2 = new Image();
            img2.src = `https://ipfs.neftyblocks.io/ipfs/${v}`; // Wait for the image to load

            await new Promise(resolve2 => {
              img2.onload = resolve2;
            });
          }

          return {
            [n]: {
              image: img.src,
              rdata: r,
              video: img2.src
            }
          };
        });
        setimages([...newImagesArray]);
      }
    } while (data.more);
  }

  useState(() => {
    go();
  }, []);
  useEffect(() => {
    if (images.length > 0) {
      console.log(images);
    }
  }, [images]);
  return /*#__PURE__*/React.createElement("div", {
    id: "cards"
  }, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", null, images.map((img2, index) => {
    const key = Object.keys(img2)[0];

    if (img2[key].image) {
      return /*#__PURE__*/React.createElement("img", {
        key: index,
        className: "part3d",
        src: img2[key].image,
        alt: "My Image"
      });
    }

    if (img2[key].video) {
      return /*#__PURE__*/React.createElement("video", {
        className: "part3d",
        autoPlay: true,
        loop: true,
        muted: true,
        playsInline: true,
        src: img2[key].video,
        type: "video/mp4"
      });
    }

    return null; // handle the case where neither image nor video is present
  }))) );
};

const Apis = ({
  cloud,
  anchor,
  planets,
  setplanets,
  setallplanets,
  setallships,
  id,
  firstrun,
  actions,
  setActions,
  wax,
  setTopbarText,
  accapis,
  ahapis,
  setAllParts
}) => {
  var [multi, setmulti] = useState(0);
  var [multi2, setmulti2] = useState(0);
  useState([]);
  useState([]);
  useState([]);

  const getPlanet = async () => {
    try {
      var n = Math.floor(Math.random() * accapis.length);
      const response2 = await fetch(`${accapis[n][1]}/v1/chain/get_table_rows`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: `{
          "json": true,
          "code": "starshipgame",
          "table": "planets",
          "scope": "starshipgame",
          "encode_type": "json",
          "upper_bound": "${multi + 999999}",
          "lower_bound": "${multi}",
          "limit": "100000"
        }`
      });
      const data = response2.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getShips = async () => {
    try {
      var n = Math.floor(Math.random() * accapis.length);
      const response2 = await fetch(`${accapis[n][1]}/v1/chain/get_table_rows`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: `{
          "json": true,
          "code": "starshipgame",
          "table": "starshipdata",
          "scope": "starshipgame",
          "encode_type": "json",
          "upper_bound": "${multi2 + 99999}",
          "lower_bound": "${multi2}",
          "limit": "1000"
        }`
      });
      const data = response2.json();
      return data;
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  async function getAllPLanetData() {
    var data = [];
    data.more = true;

    do {
      const data = await getPlanet();
      console.log("hi", data);

      if (!data.more) {
        setallplanets(prevPlanets => [...prevPlanets, ...data.rows]);
        setmulti(oldmulti => multi = 0);
        break;
      } else {
        setallplanets(prevPlanets => [...prevPlanets, ...data.rows]);
        setmulti(oldmulti => multi = parseInt(data.next_key));
        parseInt(data.next_key);
      }
    } while (data.more);

    console.log(planets);
  }

  async function getAllShipData() {
    var data = [];
    data.more = true;

    do {
      const data = await getShips();
      console.log(data);

      if (!data.more) {
        setallships(prevPlanets => [...prevPlanets, ...data.rows]);
        setmulti2(oldmulti2 => multi2 = 0);
        break;
      } else {
        setallships(prevPlanets => [...prevPlanets, ...data.rows]);
        setmulti2(oldmulti2 => multi2 = parseInt(data.next_key));
        parseInt(data.next_key);
      }
    } while (data.more);
  }

  const fetchUserPlanets = async () => {
    var i = 1;

    try {
      var n = Math.floor(Math.random() * ahapis.length);
      const response = await fetch(`${ahapis[n][1]}/atomicassets/v1/assets?owner=${id}&collection_name=starshipnfts&schema_name=planet&page=${i}&limit=1000&order=desc&sort=asset_id`);
      const data = await response.json();
      console.log('data');

      if (!data.success) {} else {
        i++;
        console.log(data);

        if (data.data.length < 1000) {
          setplanets(prevPlanets => [...data.data]);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  var i = 1;

  const fetchUserComponents = async () => {
    console.log("rec");

    try {
      const response = await fetch(`https://aa-wax-public1.neftyblocks.com/atomicassets/v1/assets?collection_name=starshipnfts&schema_name=component&owner=${id}&page=${i}&limit=1000&order=desc`);
      const data = await response.json(); // Fetch installed parts data
      // Set state

      if (data.data.length < 1000) {
        setAllParts(prevPlanets => [...prevPlanets, ...data.data]);
      } else {
        setAllParts(prevPlanets => [...prevPlanets, ...data.data]);
        i++;
        fetchUserComponents();
      }
    } catch (error) {
      fetchUserComponents();
      console.error('Error fetching data:', error);
    }
  };

  useEffect(async () => {
    if (!firstrun) return null;
    getAllPLanetData();
    fetchUserPlanets();
    getAllShipData();
    fetchUserComponents(); // Clean up the timer when the component is unmounted

    return () => {};
  }, [firstrun]);
  useEffect(async () => {
    const hassend = actions.filter(action => action.handler === 'sendAll');
    console.log(hassend);

    if (hassend.length > 0) {
      const filteredActions = actions.filter(action => action.handler !== 'sendAll');
      console.log("sending", filteredActions);
      console.log(anchor, cloud);

      try {
        if (cloud === true) {
          const result = await wax.api.transact({
            actions: filteredActions
          }, {
            blocksBehind: 1,
            expireSeconds: 60
          });
          setActions([]);
          console.log(result);
          setTopbarText(result.transaction_id);
        } else if (anchor) {
          const result = await wax.transact({
            actions: filteredActions
          }, {
            blocksBehind: 1,
            expireSeconds: 60
          });
          setActions([]);
          console.log(result);
          setTopbarText(result.transaction_id);
        }
      } catch (e) {
        console.log(e);
        setTopbarText(e.message);
      }
    }
  }, [actions]);
  return null; // or you can return some loading indicator
};

const App = () => {
  const [metamaskAddress, setmetamaskAddress] = useState(null);
  const [metamaskon, setmetamaskon] = useState(false);
  const [metamaskbrowser, setmetamaskbrowser] = useState(false);
  const [activeWindow, setActiveWindow] = useState({
    type: "landing"
  });
  const [actions, setActions] = useState([]);
  const [topbar, settopbar] = useState(false);
  const [dd, setdd] = useState(false);
  const [isOpen, setisOpen] = useState(false);
  const [ismessage, setismessage] = useState(false);
  useState(false);
  const [isloggedin, setisloggedin] = useState(false);
  useState(false);
  const [allParts, setAllParts] = useState([]);
  const [planets, setplanets] = useState([]);
  const [images, setimages] = useState([]);
  const [global, setallships] = useState([]);
  const [allplanets, setallplanets] = useState([]);
  const [id, setid] = useState(null);
  const [firstrun, setfirstrun] = useState(false);
  const [topbarText, setTopbarText] = useState("");
  useState("a wonderful default message becase one does not exist.. enjoy (whoops)");
  useState(5000);
  const [wax, setwax] = useState(null);
  const [prevpage, setprevpage] = useState("");
  useState("");
  const [anchor, setanchor] = useState(false);
  const [cloud, setcloud] = useState(false);
  const [landscape, setLandscape] = useState(false);
  const [accapis, setaccapis] = useState([]);
  const [ahapis, setahapis] = useState([]);
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchApis = async () => {
      try {
        const pis = await fetch("https://validate.eosnation.io/wax/reports/endpoints.json", {
          signal: controller.signal
        });

        if (!pis.ok) {
          throw new Error(`Failed to fetch endpoints: ${pis.status}`);
        }

        const pis2 = await pis.json();
        const sortedAccapis = [...pis2.report.api_https2].sort((a, b) => a[0].rank > b[0].rank ? -1 : a[0].rank < b[0].rank ? 1 : 0).filter(api => {
          // Exclude problematic URLs
          return !api[1].includes("apiwax.3dkrender.com") && !api[1].includes("wax.greymass.com") && !api[1].includes(" https://api.wax.greeneosio.com");
        });
        const sortedAhapis = [...pis2.report.atomic_https].sort((a, b) => a[0].rank < b[0].rank ? -1 : a[0].rank > b[0].rank ? 1 : 0).filter(api => {
          // Exclude problematic URLs
          return !api[1].includes("apiwax.3dkrender.com") && !api[1].includes("wax.greymass.com") && !api[1].includes(" https://api.wax.greeneosio.com");
        });

        if (isMounted) {
          setaccapis(sortedAccapis);
          setahapis(sortedAhapis);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Failed to load API endpoints.", error);
        }
      }
    };

    fetchApis();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  useEffect(() => {
    const handleResize = () => {
      // Check if the screen width is greater than the screen height
      const isLandscape = window.innerWidth > window.innerHeight;
      setLandscape(isLandscape);
      settopbar(isLandscape);
    }; // Initial check on component mount


    handleResize(); // Add event listener for window resize

    window.addEventListener('resize', handleResize); // Remove event listener on component unmount

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    console.log("message text in");

    if (topbarText != "") {
      setdd(true);
      setTimeout(() => {
        console.log("timeout topbar");
        setdd(false);
        setTopbarText("");
      }, 5000);
    } // settopbar(true);

  }, [topbarText]);
  useEffect(() => {
    if (actions.length > 0) {
      setismessage(true);
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

  const handleWindowToggle = data => {
    if (data.hide) settopbar(false);
    setprevpage(activeWindow);
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

  function dismissAllActions() {
    setActions([]);
  }

  function dispatchAllActions() {
    setActions(oldActions => [...oldActions, {
      handler: "sendAll",
      name: "SENDBATCH"
    }]);
  }

  var hasid = id !== undefined;

  function getColorByActionName(action) {
    console.log("action", action);

    if (action.name === "attachpart") {
      return "green";
    } else if (action.name === "transfer") {
      return "sienna";
    } else if (action.name === "unattachpart") {
      return "red";
    } else if (action.name === "SENDBATCH") {
      action.name;
      return "slategrey";
    }
  }

  useEffect(() => {
    console.log(activeWindow);

    if (navigator.userAgent.includes("MetaMaskMobile")) {
      setLandscape(true);
      setmetamaskbrowser(true);
      if (activeWindow.type !== "signup") setActiveWindow({
        type: 'signup'
      });
      const queryParams = new URLSearchParams(window.location.search);
      const encryptedQueryParam = queryParams.get('data'); // Log the encrypted data to check if it's present in the URL

      console.log('Encrypted Query Param:', encryptedQueryParam);

      if (encryptedQueryParam) {
        const decryptedData = decryptData(decodeURIComponent(encryptedQueryParam)); // Log the decrypted data to check if decryption is successful

        console.log('Decrypted Data:', decryptedData);
        setid(decryptedData);
      }
    }

    console.log(ahapis, accapis);
  }, [activeWindow]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      justifyItems: 'center',
      width: '100vw'
    }
  }, isloggedin && /*#__PURE__*/React.createElement("div", {
    id: "wrapper"
  }, /*#__PURE__*/React.createElement("h1", {
    id: "dropdownmodal",
    style: {
      maxHeight: dd ? '100px' : '0',
      margin: dd ? '16px 0' : '0',
      opacity: dd ? 1 : 0,
      overflow: 'hidden',
      transition: 'max-height 0.5s ease, opacity 0.5s ease, margin 0.5s ease'
    },
    onClick: () => dismisswidget()
  }, topbarText), /*#__PURE__*/React.createElement("h1", {
    id: "topbar",
    style: {
      maxHeight: topbar ? '100px' : '0',
      margin: topbar ? '16px 0' : '0',
      opacity: topbar ? 1 : 0,
      display: 'flex',
      justifyContent: 'space-around',
      transition: 'max-height 0.5s ease, opacity 0.5s ease, margin 0.5s ease'
    }
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      fontSize: '1rem'
    },
    className: "fa-solid fa-user",
    "aria-hidden": "true",
    onClick: () => handleWindowToggle({
      type: 'account',
      hide: false
    })
  }, 'x', "(", allParts.length, ") - account"), /*#__PURE__*/React.createElement("i", {
    style: {
      fontSize: '1rem'
    },
    className: "fa-solid fa-shuttle-space",
    "aria-hidden": "true",
    onClick: () => handleWindowToggle({
      type: 'hangar',
      hide: false
    })
  }, ' ', "(128) - hangar"), /*#__PURE__*/React.createElement("i", {
    style: {
      fontSize: '1rem'
    },
    className: "fa-solid fa-shuttle-space",
    "aria-hidden": "true",
    onClick: () => handleWindowToggle({
      type: 'rentals',
      hide: false
    })
  }, ' ', "(", global.length, ") - global"), /*#__PURE__*/React.createElement("i", {
    style: {
      fontSize: '1rem'
    },
    className: "fa-solid fa-earth-americas",
    "aria-hidden": "true",
    onClick: () => handleWindowToggle({
      type: 'planets',
      hide: true
    })
  }, ' ', "( ", planets.length, ") - planets"), /*#__PURE__*/React.createElement("i", {
    style: {
      fontSize: '1rem'
    },
    className: "fa-solid fa-earth-americas",
    "aria-hidden": "true",
    onClick: () => handleWindowToggle({
      type: 'allplanets',
      hide: false
    })
  }, ' ', "( ", allplanets.length, ") - all planets"))), (activeWindow.type === 'landing' || !landscape) && /*#__PURE__*/React.createElement(Landing, {
    accapis: accapis,
    ahapis: ahapis,
    setActiveWindow: setActiveWindow,
    landscape: landscape,
    setmetamaskon: setmetamaskon,
    setmetamaskAddress: setmetamaskAddress,
    metamaskon: metamaskon,
    setmetamaskAddress: setmetamaskAddress
  }), activeWindow.type === 'login' && landscape && /*#__PURE__*/React.createElement(LoginModal, {
    id: id,
    setwax: setwax,
    setid: setid,
    isloggedin: isloggedin,
    setisloggedin: setisloggedin,
    firstrun: firstrun,
    setfirstrun: setfirstrun,
    prevpage: prevpage,
    setActiveWindow: setActiveWindow,
    settopbar: settopbar,
    setanchor: setanchor,
    setcloud: setcloud,
    landscape: landscape
  }), activeWindow.type === 'signup' && landscape && /*#__PURE__*/React.createElement(Signup, {
    id: id,
    setwax: setwax,
    setActiveWindow: setActiveWindow,
    setmetamaskon: setmetamaskon,
    setmetamaskAddress: setmetamaskAddress,
    setanchor: setanchor,
    setcloud: setcloud,
    metamaskon: metamaskon,
    metamaskAddress: metamaskAddress,
    setid: setid
  }), activeWindow.type === 'loading' && landscape && /*#__PURE__*/React.createElement(Login, {
    images: images,
    setimages: setimages,
    id: id,
    setplanets: setplanets,
    setallships: setallships,
    setallplanets: setallplanets
  }), activeWindow.type === 'hangar' && landscape && hasid && /*#__PURE__*/React.createElement(Hangar, {
    images: images,
    accapis: accapis,
    allParts: allParts,
    setAllParts: setAllParts,
    ahapis: ahapis,
    id: id,
    allplanets: allplanets,
    setActions: setActions,
    prevpage: prevpage,
    setActiveWindow: setActiveWindow
  }), activeWindow.type === 'rentals' && landscape && hasid && /*#__PURE__*/React.createElement(Hangar2, {
    images: images,
    accapis: accapis,
    ahapis: ahapis,
    id: id,
    allplanets: allplanets,
    setActions: setActions,
    global: global,
    prevpage: prevpage,
    setActiveWindow: setActiveWindow
  }), activeWindow.type === 'account' && landscape && /*#__PURE__*/React.createElement(Account, {
    id: id,
    images: images,
    setwax: setwax,
    setid: setid,
    isloggedin: isloggedin,
    setisloggedin: setisloggedin,
    firstrun: firstrun,
    setfirstrun: setfirstrun,
    prevpage: prevpage,
    setActiveWindow: setActiveWindow
  }), /*#__PURE__*/React.createElement(Apis, {
    accapis: accapis,
    setAllParts: setAllParts,
    ahapis: ahapis,
    id: id,
    setallplanets: setallplanets,
    setallships: setallships,
    setplanets: setplanets,
    actions: actions,
    setwax: setwax,
    wax: wax,
    setActions: setActions,
    setid: setid,
    isloggedin: isloggedin,
    setisloggedin: setisloggedin,
    firstrun: firstrun,
    setfirstrun: setfirstrun,
    setTopbarText: setTopbarText,
    cloud: cloud,
    anchor: anchor
  }), activeWindow.type === 'planets' && landscape && hasid && /*#__PURE__*/React.createElement(PlanetCard, {
    id: id,
    planets: planets,
    allplanets: allplanets,
    prevpage: prevpage,
    setActiveWindow: setActiveWindow,
    activeWindow: activeWindow,
    settopbar: settopbar,
    prevpage: prevpage,
    setprevpage: setprevpage
  }), activeWindow.type === 'allplanets' && landscape && hasid && /*#__PURE__*/React.createElement(GlobalCard, {
    allplanets: allplanets,
    prevpage: prevpage,
    setActiveWindow: setActiveWindow
  }), actions.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "ship3d",
    style: {
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
      zIndex: 35
    },
    onClick: () => dismissmessage()
  }, actions.length, actions.length > 0 && isOpen && /*#__PURE__*/React.createElement("ul2", {
    style: {
      position: "absolute",
      listStyle: 'none',
      padding: 0,
      width: "95%",
      justifyContent: "center",
      overflow: "scroll",
      height: "95%"
    }
  }, actions.map((action, index) => /*#__PURE__*/React.createElement("li2", {
    key: index,
    style: {
      display: "grid",
      width: "95%",
      backgroundColor: getColorByActionName(action),
      marginBottom: '0.5rem',
      padding: '0.5rem',
      borderRadius: '0.5rem',
      fontSize: "2rem"
    }
  }, action.name))), actions.length > 0 && isOpen && /*#__PURE__*/React.createElement(React.Fragment, null, " ", /*#__PURE__*/React.createElement("button", {
    style: {
      position: "absolute",
      bottom: "-5%",
      backgroundColor: 'blue',
      // Choose your button color
      color: '#fff',
      padding: '0.5rem',
      borderRadius: '0.5rem',
      marginTop: '0.5rem',
      cursor: 'pointer',
      right: "25%"
    },
    onClick: () => dispatchAllActions()
  }, "Dispatch All"), /*#__PURE__*/React.createElement("button", {
    style: {
      position: "absolute",
      bottom: "-5%",
      backgroundColor: 'blue',
      // Choose your button color
      color: '#fff',
      padding: '0.5rem',
      borderRadius: '0.5rem',
      marginTop: '0.5rem',
      cursor: 'pointer',
      left: "25%"
    },
    onClick: () => dismissAllActions()
  }, "Dssmiss All"))));
};

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('app'));

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').then(registration => {
    console.log('Service Worker registered with scope:', registration.scope);
  }).catch(error => {
    console.error('Error registering Service Worker:', error);
  });
}
