import React, { useState, useEffect } from 'https://cdn.skypack.dev/react';
import Account from './Account';

const Apis = ({cloud,anchor, planets, setplanets, setallplanets,setallships, id, firstrun,actions,setActions,wax,setTopbarText ,accapis
,ahapis,setAllParts}) => {
  let j;
  var [multi, setmulti] = useState(0);
  var [multi2, setmulti2] = useState(0);
  var [endpoints, setendpoints] = useState([]);
  var [assetendpoints, setassetendpoints] = useState([]);
  var [ind, setind] = useState([]);

const getPlanet = async () => {
    try {
       var  n=Math.floor(Math.random()*accapis.length)
     
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
        }`,
      });

      const data = response2.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
    const getShips = async () => {
    try {
     var  n=Math.floor(Math.random()*accapis.length)
     
      const response2 = await fetch(`${accapis[n][1]}/v1/chain/get_table_rows`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          
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
        }`,
      });

      const data = response2.json();
      return data;
      console.log(data)
    }catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  async function getAllPLanetData() {
    let ppage = 0;
    var data = [];
    data.more = true;
    var timer = Date.now();

    do {
        timer = Date.now();

        const data = await getPlanet(ppage);
console.log("hi",data)
        if (!data.more) {
          setallplanets((prevPlanets) => [...prevPlanets, ...data.rows]);
          setmulti((oldmulti) => multi = 0);
          break;
        } else {
          setallplanets((prevPlanets) => [...prevPlanets, ...data.rows]);
          setmulti((oldmulti) => multi =  parseInt(data.next_key));
          ppage =  parseInt(data.next_key);
        }
      
    } while (data.more);

    console.log(planets);
  }

  async function getAllShipData() {
    let ppage2 = 0;
    var data = [];
    data.more = true;

    do {
      

        const data = await getShips(ppage2);

    console.log(data)

        if (!data.more) {
          setallships((prevPlanets) => [...prevPlanets, ...data.rows]);
          setmulti2((oldmulti2) => multi2 = 0);
          break;
        } else {
          setallships((prevPlanets) => [...prevPlanets, ...data.rows]);
          setmulti2((oldmulti2) => multi2 = parseInt(data.next_key));
          ppage2 =  parseInt(data.next_key);
        }
      
    } while (data.more);

  }

  const fetchUserPlanets = async () => {
    var i = 1;

    try { 
      var  n=Math.floor(Math.random()*ahapis.length)
      const response = await fetch(`${ahapis[n][1]}/atomicassets/v1/assets?owner=${id}&collection_name=starshipnfts&schema_name=planet&page=${i}&limit=1000&order=desc&sort=asset_id`);
      const data = await response.json();

      console.log('data');
      if (!data.success) {
      } else {
        i++;
        console.log(data);

        if (data.data.length < 1000) {
          setplanets((prevPlanets) => [...data.data]);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  var i = 1;
const fetchUserComponents = async () => {
console.log("rec")
    try {
       const response = await fetch(`https://aa-wax-public1.neftyblocks.com/atomicassets/v1/assets?collection_name=starshipnfts&schema_name=component&owner=${id}&page=${i}&limit=1000&order=desc`);
        const data = await response.json();

        // Fetch installed parts data
       

       // Set state

 


        if (data.data.length < 1000) {
          setAllParts((prevPlanets) => [...prevPlanets,...data.data]);
        }else{
                    setAllParts((prevPlanets) => [...prevPlanets,...data.data]);
           i++;

          fetchUserComponents()
        }
      
    } catch (error) {
                      fetchUserComponents()
      console.error('Error fetching data:', error);
    }
  };
  useEffect(async () => {
    if (!firstrun) return null;


    getAllPLanetData();
    fetchUserPlanets();
    getAllShipData()
fetchUserComponents()
    // Clean up the timer when the component is unmounted
    return () => {};
  }, [firstrun]);
  
  useEffect(async () => {
        const hassend = actions.filter(action => action.handler === 'sendAll');
    console.log(hassend)
    if(hassend.length>0){
      const filteredActions = actions.filter(action => action.handler !== 'sendAll');
   console.log("sending",filteredActions) 
      console.log(anchor,cloud)
    try{
         if (cloud === true) {
      const result = await wax.api.transact({
        actions: filteredActions
        }, {
     blocksBehind: 1,
        expireSeconds: 60
           });
        setActions([])
     
            console.log(result)
setTopbarText(result.transaction_id)
        } else if (anchor) {
 const result = await wax.transact({
        actions: filteredActions
        }, {
     blocksBehind: 1,
        expireSeconds: 60
           });
            setActions([])
     
            console.log(result)
setTopbarText(result.transaction_id)
        }

      

    }catch(e){
      console.log(e)
setTopbarText(e.message)

    }

    }else{
      
    }

    
  }, [actions]);
  return null; // or you can return some loading indicator
};

export default Apis;
