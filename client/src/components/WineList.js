import React, { Fragment, useState, useEffect } from 'react';
import wineImage from './img/wine.jpg';
import axios from 'axios';
import loader from './img/loader.gif';
import { Link } from 'react-router-dom';

const WineList = () => {
  const [wines, setWines] = useState([]);
  const [filteredWineList, setFilteredWineList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios('/wine');
        if (response.status !== 200) {
          console.log(response);
          return;
        }
        setWines(response.data);
        setFilteredWineList(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const search = keyword => {
    if (!keyword) {
      setFilteredWineList(wines);
      return;
    }
    setFilteredWineList(
      wines.filter(wine => {
        return (
          (wine.lotCode !== null &&
            wine.lotCode.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) ||
          (wine.description !== null &&
            wine.description.toLowerCase().indexOf(keyword.toLowerCase()) !==
              -1)
        );
      })
    );
  };

  return (
    <Fragment>
      <div className="form-group">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search..."
          onChange={e => search(e.target.value)}
        />
      </div>
      {isLoading && <img src={loader} alt="loading"></img>}
      <section className="wines">
        {filteredWineList.map((wine, index) => (
          <div className="wine" key={index}>
            <Link to={'/wine/' + wine._id}>
              <div className="image">
                <img src={wineImage} alt="Wine" />
              </div>
              <div className="details">
                <p>{wine.lotCode}</p>
                <p>{wine.description}</p>
              </div>
            </Link>
          </div>
        ))}
      </section>
    </Fragment>
  );
};

export default WineList;
