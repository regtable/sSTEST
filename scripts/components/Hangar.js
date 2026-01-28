import React, { useState, useEffect } from 'https://cdn.skypack.dev/react';
import Ship from './Ship';

const Hangar = ({ id, setActions,allplanets,accapis,ahapis,images,allParts,setAllParts}) => {
  
  const [selectedPartsInShips, setSelectedPartsInShips] = useState([]);
  const [ships, setShips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
 


useEffect(async ()=>{

          console.log("hey",accapis)

},[])

  useEffect(() => {
    const fetchData = async () => {
      try {
         var  n=Math.floor(Math.random()*accapis.length)
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
          }`,
        });

        const data = await response.json();
console.log(data,"aqaaaaaa")
        // Check the structure of the response and set the state accordingly
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
    return <p>Loading...</p>;
  }

  return (
    <div id="cards">
      {ships.map((ship) => (
        <React.Fragment key={ship}>
          <Ship  allParts={allParts} setAllParts={setAllParts } images={images} ahapis={ahapis} shipKey={ship} accapis={accapis} selectedPartsInShips={selectedPartsInShips }allplanets={allplanets} setSelectedPartsInShips={setSelectedPartsInShips} id={id} setActions={setActions}/>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Hangar;
