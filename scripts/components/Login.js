true// Hangar.js
import React, { useState, useEffect } from 'https://cdn.skypack.dev/react';
import Waxa from './Wax';

const Login = ({ id,setplanets,setallships,setallplanets, setfirstrun,setimages,images }) => {
    var [multi, setmulti] = useState(0);
    var [imga, setimg] = useState(null);
async function getimgs(ppage){

   
          try {
        // Fetch parts data
        const response = await fetch(`https://aa-wax-public1.neftyblocks.com/atomicassets/v1/templates?collection_name=starshipnfts&schema_name=component&page=1&limit=1000&order=desc&sort=created`);
      const data= await response.json()
      return data
      } catch (error) {
        
      } 

   
}

async function go (){
   let ppage = 0;
    var data = [];
    data.more = true;
    var timer = Date.now();

    do {
        timer = Date.now();

        const data = await getimgs(ppage);
console.log(data.data.length)
        if (data.data.length<1000) {
            const newImagesArray = await Promise.all(data.data.map(async (item) => {
  const n = item.name;
  const i = item.immutable_data.img;
  const v = item.immutable_data.video;
  const r = item.immutable_data.rdata;

  let img;
  let video2;

  if (i !== undefined) {
    
    img= `https://ipfs.neftyblocks.io/ipfs/${i}`;
    // Wait for the image to load
   
  }

  if (v !== undefined) {
   
  video2 = `https://ipfs.neftyblocks.io/ipfs/${v}`;
  // Wait for the video to load

  }

  return { [n]: { image: img, rdata: r, video: video2 } };
}));
setimages(newImagesArray);

          data.more=false
          break;
        } else {
          ppage ++;
            const newImagesArray = data.data.map(async(item) => {
  const n = item.name;
  const i = item.immutable_data.img;
  const v = item.immutable_data.video;
  const r = item.immutable_data.rdata;
let img;
  let img2;

  if (i !== undefined) {
    img = new Image();
    img.src = `https://ipfs.neftyblocks.io/ipfs/${i}`;

    // Wait for the image to load
    await new Promise((resolve) => {
      img.onload = resolve;
    });
  }

  if (v !== undefined) {
    img2 = new Image();
    img2.src = `https://ipfs.neftyblocks.io/ipfs/${v}`;

    // Wait for the image to load
    await new Promise((resolve2) => {
      img2.onload = resolve2;
    });
  }

 

  return { [n]: { image: img.src, rdata:r ,video: img2.src } };
});
setimages([...newImagesArray]);
        }
    
    } while (data.more);
}
useState(()=>{   go ()
},[])
  useEffect(()=>{ 
    if(images.length>0){
      console.log(images)

    }
     
},[images])
  return (
    <div id="cards">
      {true ? (
        <>
          <div>
                    {images.map((img2, index) => {
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
 </div>
       </>
      ) : (
        <>
        
          <div>not loggedin</div>

            </>
      )}
    </div>
  );
};

export default Login;
