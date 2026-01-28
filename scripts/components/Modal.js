// Modal.js
import React from "https://esm.sh/react@18.2.0";

const Modal = ({ isLoading, allParts, selectedNames, onSelect, selectedPartsInShips }) => {
  // Filter and sort parts based on selected names and rarity
  const filteredParts = allParts
    .filter((part) => selectedNames.includes(part.data.name) && !selectedPartsInShips.includes(part.asset_id))
    .sort((a, b) => b.data.rdata - a.data.rdata);

  console.log(selectedPartsInShips);

  return (
    <div style={modalStyle}>
      {/* Display available ship components */}
      <div style={contentStyle}>
        {isLoading ? (
          <div style={loadingStyle}>Loading...</div>
        ) : (
          filteredParts.map((part) => (
            <div style={{ maxWidth: "49%" }} key={part.id} onClick={() => onSelect(part)}>
              {part.data.img ? (
                <img
                  src={`https://ipfs.neftyblocks.io/ipfs/${part.data.img}`}
                  alt="Ship"
                  style={{ maxWidth: "100%", maxHeight: "100%", width: "auto", height: "auto" }}
                />
              ) : (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{ maxWidth: "100%", maxHeight: "100%", width: "auto", height: "auto" }}
                >
                  <source src={`https://ipfs.neftyblocks.io/ipfs/${part.data.video}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
              <p>id: {part.asset_id}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
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
  alignItems: "center",
};

const contentStyle = {
  display: "inline-flex",
  flexWrap: "wrap", /* Allow items to wrap to the next line */
  width: "50%", // Adjust this value based on your preference
  maxHeight: "100vh", // 100% of the viewport height
  overflowY: "auto", // Enable vertical scrolling if necessary
  padding: "20px",
  backgroundColor: "#fff", // Adjust background color as needed
  borderRadius: "8px", // Add border radius for a rounded appearance
};

const loadingStyle = {
  color: "#000",
  fontSize: "20px",
};

export default Modal;