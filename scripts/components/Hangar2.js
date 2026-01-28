import React, { useState, useEffect } from 'https://cdn.skypack.dev/react';

import Ship from './Ship';

const Hangar2 = ({ id, setActions, allplanets, global,accapis,ahapis, images }) => {
  const [selectedPartsInShips, setSelectedPartsInShips] = useState([]);
  const [ships, setShips] = useState([]);
  const [ships2, setShips2] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0); // Set the initial page to 0
  const [showTop, setshowtop] = useState(false);




  useEffect(async () => {
        
    const fetchData = async () => {
      try {
         var  n=Math.floor(Math.random()*accapis.length)
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
          }`,
        });

        const data = await response.json();
        const jobber = data.rows.filter((ship) => ship.renter_id === "jhysq.wam" && Date.now() / 1000 < ship.rental_end);
        const newArray = jobber.map(item => item.key);
        const jobber2 = data.rows.filter((ship) => ship.renter_id !== "jhysq.wam" && Date.now() / 1000 < ship.rental_end);
        const jobber3 = global.filter((ship) => ship.rarity >5 );
        const newArray2 = jobber2.map(item => item.key);

        // Check the structure of the response and set the state accordingly
        setShips(newArray || []);
        setShips2(jobber3 || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Slice the planets
  const slicedPlanets = global.slice(page, page + 25);

  console.log(slicedPlanets);

  return (
    <div id="cards">
      {slicedPlanets.map((ship) => (
        <React.Fragment key={ship.key}>
          <Ship ahapis={ahapis}accapis={accapis}shipKey={ship.key} selectedPartsInShips={selectedPartsInShips} parts={ship.parts} allplanets={allplanets} setSelectedPartsInShips={setSelectedPartsInShips} id={id} setActions={setActions} images={images}/>
        </React.Fragment>
      ))}
      <div className="ship3d" style={{ right: 'your_right_value' }} onClick={() => setPage((page) => page + 25)}>
        <i className="fa-solid fa-arrow-right">{page + 25}</i>
      </div>
      <div className="ship3d" style={{ left: 'your_left_value' }} onClick={() => { if (page - 25 >= 0) { setPage((page) => page - 25) } }}>
        <i className="fa-solid fa-arrow-left">{page -25}</i>
      </div>
    </div>
  );
};

export default Hangar2;