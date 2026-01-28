import React, { useState, useEffect } from 'https://cdn.skypack.dev/react';

const Overlay = () => {
  const [position, setPosition] = useState({ top: 50, left: 50 , z:0 });
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const handleKeyPress = (event) => {
      const speed = 5; // Adjust the speed as needed

      switch (event.key) {
        case 'w':
          setPosition((prevPosition) => ({ ...prevPosition, top: prevPosition.top - speed }));
          break;
        case 'a':
          setPosition((prevPosition) => ({ ...prevPosition, left: prevPosition.left - speed }));
          break;
        case 's':
          setPosition((prevPosition) => ({ ...prevPosition, top: prevPosition.top + speed }));
          break;
        case 'd':
          setPosition((prevPosition) => ({ ...prevPosition, left: prevPosition.left + speed }));
          break;
        default:
          break;
      }
    };
addEventListener("wheel", (event) => {});

onwheel = (event) => {
  setPosition((prevPosition) => ({ ...prevPosition, z: prevPosition.z=event.deltaY<0? position.z+=33:position.z-=33}))
};

    const handleMouseMove = (event) => {
      // Calculate the rotation angle towards the mouse position
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      const circleX = position.left + 333; // Adjust based on the circle's size
      const circleY = position.top + 333; // Adjust based on the circle's size

      const deltaX = mouseX - circleX;
      const deltaY = mouseY - circleY;

      const angle = Math.atan2(deltaY, deltaX);
      const degrees = (angle * 180) / Math.PI;

      setRotation(degrees);
    };

    // Attach event listeners
    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [position]);

  return (
    <>
      {[...Array(25)].map((_, index) => (
        <div
          key={index}
          id={`cell${index + 1}`}
          style={{
            position: 'fixed',
            top: `${position.top}vh`,
            left: `${position.left}vw`,
            width: `${position.z * index + 1}px`, // Adjust the circle size as needed
            height: `${position.z * index + 1}px`, // Adjust the circle size as needed
            borderRadius: '50%', // Make it a circle
            transform: `translate(-50%, -50%) rotate(${rotation}deg)`, // Rotate based on the calculated angle
            border: '2px solid skyblue', // Neon green outer border
            backgroundColor: 'rgba(0, 0, 0, 0.0)', // Opaque internals
          }}
        ></div>
        
      ))}
      {[...Array(25)].map((_, index) => (
        <div
          key={index}
          id={`cell${index + 1}`}
          style={{
            position: 'fixed',
            top: `${position.top}vh`,
            left: `${position.left}vw`,
            width: `$02}px`, // Adjust the circle size as needed
            height: `${position.z * 25 + 1}px`, // Adjust the circle size as needed
            borderRadius:  '0 0  575%  10% 20%', // Make it a circle
            transform: `translate(-50%, -50%) rotate(${index*(360/25)}deg)`, // Rotate based on the calculated angle
            border: '2px solid skyblue', // Neon green outer border
            backgroundColor: 'rgba(0, 0, 0, 0.0)', // Opaque internals
          }}
        ></div>
        
      ))}
    </>
  );
};

export default Overlay;