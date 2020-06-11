import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WineComponents = ({ id, isLoading, setIsLoading }) => {
  const [selectedComponent, setSelectedComponent] = useState('year');
  const [breakDown, setBreakDown] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios('/wine/' + id + '/year');
        if (response.status !== 200) {
          console.log(response);
          return;
        }
        setBreakDown(response.data.breakdown);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  const changeSelection = type => {
    const fetchData = async () => {
      try {
        const response = await axios('/wine/' + id + '/' + type);
        if (response.status !== 200) {
          console.log(response);
          return;
        }
        setBreakDown(response.data.breakdown);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    setSelectedComponent(type);
    return;
  };

  return (
    !isLoading && (
      <div className="components">
        <h3>Components</h3>
        <div className="component-types">
          <ul>
            <li>
              <button
                className={selectedComponent === 'year' ? 'selected' : ''}
                onClick={() => changeSelection('year')}
              >
                Year
              </button>
            </li>
            <li>
              <button
                className={selectedComponent === 'variety' ? 'selected' : ''}
                onClick={() => changeSelection('variety')}
              >
                Variety
              </button>
            </li>
            <li>
              <button
                className={selectedComponent === 'region' ? 'selected' : ''}
                onClick={() => changeSelection('region')}
              >
                Region
              </button>
            </li>
            <li>
              <button
                className={
                  selectedComponent === 'yearvariety' ? 'selected' : ''
                }
                onClick={() => changeSelection('yearvariety')}
              >
                Year/Variety
              </button>
            </li>
          </ul>
        </div>
        <div className="component-details">
          <div className={selectedComponent === 'year' ? '' : 'hidden'}>
            {breakDown.map((item, index) => (
              <p key={index}>
                {item.year} - {item.percentage}%
              </p>
            ))}
          </div>
          <div className={selectedComponent === 'variety' ? '' : 'hidden'}>
            {breakDown.map((item, index) => (
              <p key={index}>
                {item.variety} - {item.percentage}%
              </p>
            ))}
          </div>
          <div className={selectedComponent === 'region' ? '' : 'hidden'}>
            {breakDown.map((item, index) => (
              <p key={index}>
                {item.region} - {item.percentage}%
              </p>
            ))}
          </div>
          <div className={selectedComponent === 'yearvariety' ? '' : 'hidden'}>
            {breakDown.map((item, index) => (
              <p key={index}>
                {item.year} {item.variety} - {item.percentage}%
              </p>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default WineComponents;
