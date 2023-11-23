import React from 'react'

export default function FilterComponent() {
  return (
    <div className="current-filter-container" onClick={() => setName("")}>
      {name} X
    </div>
  );
}
