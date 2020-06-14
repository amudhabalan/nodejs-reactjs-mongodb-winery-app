import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WineComponents = ({
  id,
  isLoading,
  setIsLoading,
  lotCode,
  description
}) => {
  const [selectedComponent, setSelectedComponent] = useState('year');
  const [breakDowns, setBreakDowns] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios('/wine/' + id + '/year');
        if (response.status !== 200) {
          console.log(response);
          return;
        }
        setBreakDowns([response.data]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  const exists = type =>
    breakDowns.findIndex(breakDown => breakDown.breakDownType === type) !== -1;

  const changeSelection = type => {
    const fetchData = async () => {
      try {
        const response = await axios('/wine/' + id + '/' + type);
        if (response.status !== 200) {
          console.log(response);
          return;
        }

        const newBreakDowns = [...breakDowns, response.data];
        setBreakDowns(newBreakDowns);
      } catch (error) {
        console.log(error);
      }
    };
    if (!exists(type)) {
      fetchData();
    }
    setSelectedComponent(type);
    return;
  };

  return (
    !isLoading && (
      <div className="components">
        <h3>Lot Code</h3>
        <p>{lotCode}</p>
        <h3>Description</h3>
        <p>{description}</p>
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
            {!isLoading &&
              breakDowns.findIndex(
                breakDown => breakDown.breakDownType === 'year'
              ) !== -1 &&
              breakDowns
                .find(breakDown => breakDown.breakDownType === 'year')
                .breakdown.map((item, index) => (
                  <p key={index}>
                    {item.year} - {item.percentage}%
                  </p>
                ))}
          </div>
          <div className={selectedComponent === 'variety' ? '' : 'hidden'}>
            {!isLoading &&
              breakDowns.findIndex(
                breakDown => breakDown.breakDownType === 'variety'
              ) !== -1 &&
              breakDowns
                .find(breakDown => breakDown.breakDownType === 'variety')
                .breakdown.map((item, index) => (
                  <p key={index}>
                    {item.variety} - {item.percentage}%
                  </p>
                ))}
          </div>
          <div className={selectedComponent === 'region' ? '' : 'hidden'}>
            {!isLoading &&
              breakDowns.findIndex(
                breakDown => breakDown.breakDownType === 'region'
              ) !== -1 &&
              breakDowns
                .find(breakDown => breakDown.breakDownType === 'region')
                .breakdown.map((item, index) => (
                  <p key={index}>
                    {item.region} - {item.percentage}%
                  </p>
                ))}
          </div>
          <div className={selectedComponent === 'yearvariety' ? '' : 'hidden'}>
            {!isLoading &&
              breakDowns.findIndex(
                breakDown => breakDown.breakDownType === 'yearvariety'
              ) !== -1 &&
              breakDowns
                .find(breakDown => breakDown.breakDownType === 'yearvariety')
                .breakdown.map((item, index) => (
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
