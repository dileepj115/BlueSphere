import React, { useState } from 'react';

// Accept photos as props
interface PortfolioProps {
  cmsPhotos: any[];
}

const Portfolio: React.FC<PortfolioProps> = ({ cmsPhotos }) => {
  const [filter, setFilter] = useState("All");
  
  // Use the CMS photos passed from Astro
  const filteredPhotos = filter === "All" 
    ? cmsPhotos 
    : cmsPhotos.filter(p => p.category === filter);

  // render the UI and map over 'filteredPhotos'
  return (
    <div>
      <div>
        <label>
          Filter:
          <select value={filter} onChange={e => setFilter(e.target.value)}>
            <option>All</option>
            {Array.from(new Set(cmsPhotos.map(p => p.category))).map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        {filteredPhotos.map((photo, idx) => (
          <img
            key={photo.id ?? idx}
            src={photo.url ?? photo.src}
            alt={photo.alt ?? `photo-${idx}`}
          />
        ))}
      </div>
    </div>
  );
};
export default Portfolio;