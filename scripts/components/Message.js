{hasPlanet && (() => {
  // Sort the planets
  const sortedPlanets = allplanets
    .sort((a, b) => parseInt(b.pool).toFixed(4) > parseInt(a.pool).toFixed(4));

  // Slice the planets
  const slicedPlanets = sortedPlanets.slice(page, page + 50);

  // Render the planets
  return slicedPlanets.map((planet) => {
    const splitp = convertToPlanetName(planet.id);
    const upgradeValue = upgrades[planet.type];

    return (
      <div className="card3d" key={planet.id} onClick={() => onSelect(planet)}>
        {/* Rest of your JSX */}
      </div>
    );
  });
})()}