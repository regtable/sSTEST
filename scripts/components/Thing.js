import React, { useState, useEffect } from 'https://cdn.skypack.dev/react';


const Thing = () => {
  const [position, setPosition] = useState({ x: Math.random() * 25 + 500, y: Math.random() * 25 + 500 });
  const [velocity, setVelocity] = useState({ x: Math.random() * .5, y: Math.random() * .5 });
  const [buoyancy, setBuoyancy] = useState(Math.random()); 
  const [hit, sethit] = useState(true);
  const gravity = 0.001;
  const boundary = 10;
  const maxX = 750 - boundary;
  const maxY = 750 - boundary;

  const animate = () => {
    setVelocity((prevVelocity) => ({
      x: prevVelocity.x,
      y: prevVelocity.y + gravity,
    }));

    // Update position
    setPosition((prevPosition) => ({
      x: prevPosition.x + velocity.x,
      y: prevPosition.y + velocity.y,
    }));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      animate();
sethit(false)
      // Check and handle boundary collisions
      if (position.x < boundary) {
        setPosition({ ...position, x: boundary });
        setVelocity((prevVelocity) => ({ ...prevVelocity, x: -prevVelocity.x }));
      } else if (position.x > maxX) {
        setPosition({ ...position, x: maxX });
        setVelocity((prevVelocity) => ({ ...prevVelocity, x: -prevVelocity.x }));
      }

      if (position.y < boundary&&!hit) {
        setPosition({ ...position, y: boundary });
        setVelocity((prevVelocity) => ({ ...prevVelocity, y: -prevVelocity.y + buoyancy }));
sethit(true)
      } else if (position.y > maxY &&!hit) {
        setPosition({ ...position, y: maxY });
        setVelocity((prevVelocity) => ({ ...prevVelocity, y: -prevVelocity.y + buoyancy }));
sethit(true)
      }

      console.log(position); // Log the updated position
    }, 5);

    return () => clearInterval(intervalId); // Clear the interval when the component is unmounted
  }, [position, maxY, boundary, buoyancy]);


  return (
    <div
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: 'red',
      }}
    />
  );
};

export default Thing;
