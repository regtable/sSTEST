// ShipSquare.js
import React, { useState, useEffect } from 'https://cdn.skypack.dev/react';
import {ExplorerApi, RpcApi} from "https://esm.sh/atomicassets?bundle"
const api = new ExplorerApi("https://aa-wax-public1.neftyblocks.com", "atomicassets", {fetch});
const ShipSquare = ({ shipKey, squareKey, index, onClick, selectedPart, installedParts,images,accapis,ahapis }) => {
  const raritys = ['silver', 'green', 'blue', 'purple', 'gold', 'red'];
  const srcs = [];
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [rarity, setRarity] = useState(null);
  const [nftid, setnftid] = useState(null);
           const filterImages = (name, rdata) => {
  return images.filter((item) => {
    const key = Object.keys(item)[0]; // Assuming there is only one key in each object
    const currentItem = item[key];
    // Check if the item has the desired name and rdata values
    return key === name && parseInt(rdata)===parseInt(currentItem.rdata);
  });
};
  var is=0

  const fetchData = async (assetId) => {
    if(video||image&&nftid===assetId)
      return;
    
      if(is+1>10){
    is=0
  }
    try {

      const data =  await api.getAsset(`${assetId}`);
      console.log("dataa",data)
is++
// Example usage:
const filteredImages = filterImages( data.name, data.data.rdata);
// Access image and video properties from the first matching item
      if(filteredImages.length> 1)
var firstMatchingItem = filteredImages[1];
      else
        var firstMatchingItem = filteredImages[0];

if (firstMatchingItem) {
  const { image, video } = firstMatchingItem[Object.keys(firstMatchingItem)[0]];
 if(image)
        setImage(image);
if(video)
      setVideo(video)
  setnftid(assetId)
}
     

      setRarity(data.data.rdata); // Adjust this based on your API response structure
    } catch (error) {
      is++
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
    `,
  };

  return (
    <div className="part3d" onClick={onClick}>
      {/* Display selected part or placeholder */}
      {selectedPart || installedParts[index] > 0 ? (
        image ? (
          <img id="part" src={image} alt="Ship" style={boxStyle} />
        ) : (
          <video
            id="part"
            autoPlay
            loop
            muted
            playsInline
            style={boxStyle}
            src={video}
            type="video/mp4"
          ></video>
        )
      ) : (
        <img id="part" src="https://assets.codepen.io/6121774/spanner.png" alt="" />
      )}
    </div>
  );
};

export default ShipSquare;
