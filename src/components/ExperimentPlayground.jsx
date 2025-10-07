import React, { useState, useCallback } from 'react';
import { applyFilter } from '../services/mockApi';
import BeforeAfterViewer from './BeforeAfterViewer';

const ExperimentPlayground = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [editedImage, setEditedImage] = useState(null);
  const [filters, setFilters] = useState([]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setOriginalImage(event.target.result);
        setEditedImage(event.target.result);
        setFilters([]);
      };
      reader.readAsDataURL(file);
    }
  };

  const addFilter = (filterName) => {
    let newFilter;
    if (filterName === 'hsl') {
      newFilter = {
        type: 'ADJUSTMENT',
        name: 'hsl',
        value: { h: 0, s: 0, l: 0 },
      };
    } else {
      newFilter = {
        type: 'ADJUSTMENT',
        name: filterName,
        value: 0,
      };
    }
    setFilters([...filters, newFilter]);
  };

  const updateFilterValue = (index, value, subValue) => {
    const newFilters = [...filters];
    if (subValue) {
      newFilters[index].value[subValue] = value;
    } else {
      newFilters[index].value = value;
    }
    setFilters(newFilters);
  };

  const applyAllFilters = useCallback(async () => {
    if (!originalImage) return;

    let currentImage = originalImage;
    for (const filter of filters) {
      currentImage = await applyFilter(currentImage, filter);
    }
    setEditedImage(currentImage);
  }, [originalImage, filters]);

  const handleExport = (format) => {
    if (!editedImage) return;
    const link = document.createElement('a');
    link.href = editedImage;
    link.download = `edited-image.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <div className="experiment-playground">
      <h2>Experiment Playground</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} />

      <div className="actions">
        <button onClick={() => addFilter('brightness')}>Add Brightness</button>
        <button onClick={() => addFilter('contrast')}>Add Contrast</button>
        <button onClick={() => addFilter('sharpness')}>Add Sharpness</button>
        <button onClick={() => addFilter('hsl')}>Add HSL</button>
        <button onClick={() => addFilter('vignette')}>Add Vignette</button>
        <button onClick={() => addFilter('grain')}>Add Grain</button>
        <button onClick={applyAllFilters}>Apply Filters</button>
        <button onClick={() => handleExport('jpeg')}>Export as JPG</button>
        <button onClick={() => handleExport('png')}>Export as PNG</button>
      </div>

      <div className="filters">
        {filters.map((filter, index) => (
          <div key={index} className="filter">
            <span>{filter.name}</span>
            {filter.name === 'hsl' ? (
              <div className="hsl-sliders">
                <label>H</label>
                <input
                  type="range" min="-180" max="180" value={filter.value.h}
                  onChange={(e) => updateFilterValue(index, parseInt(e.target.value), 'h')}
                />
                <label>S</label>
                <input
                  type="range" min="-100" max="100" value={filter.value.s}
                  onChange={(e) => updateFilterValue(index, parseInt(e.target.value), 's')}
                />
                <label>L</label>
                <input
                  type="range" min="-100" max="100" value={filter.value.l}
                  onChange={(e) => updateFilterValue(index, parseInt(e.target.value), 'l')}
                />
              </div>
            ) : (
              <input
                type="range"
                min="-100"
                max="100"
                value={filter.value}
                onChange={(e) => updateFilterValue(index, parseInt(e.target.value))}
              />
            )}
          </div>
        ))}
      </div>

      <BeforeAfterViewer original={originalImage} edited={editedImage} />
    </div>
  );
};

export default ExperimentPlayground;