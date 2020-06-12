import React, { useState, useEffect } from 'react';
import wineImage from './img/wine.jpg';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import WineComponents from './WineComponents';
import loader from './img/loader.gif';

const WineDetails = () => {
  const [wineDetails, setWineDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios('/wine/' + id);
        if (response.status !== 200) {
          console.log(response);
          return;
        }
        setWineDetails(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  return !isLoading ? (
    <section className="wine-details">
      <Link to="/">Back</Link>
      <div className="details">
        <img src={wineImage} className="wine-image" alt="Wine" />
        <WineComponents
          id={id}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          lotCode={wineDetails.lotCode !== null ? wineDetails.lotCode : 'NA'}
          description={
            wineDetails.description !== null ? wineDetails.description : 'NA'
          }
        />
        <div className="others">
          <p>
            Volume : {wineDetails.volume !== null ? wineDetails.volume : 'NA'}
          </p>
          <p>
            Tank Code :{' '}
            {wineDetails.tankCode !== null ? wineDetails.tankCode : 'NA'}
          </p>
          <p>
            State :{' '}
            {wineDetails.productState !== null
              ? wineDetails.productState
              : 'NA'}
          </p>
          <p>
            Owner :{' '}
            {wineDetails.ownerName !== null ? wineDetails.ownerName : 'NA'}
          </p>
        </div>
      </div>
    </section>
  ) : (
    <img src={loader} alt="loading"></img>
  );
};

export default WineDetails;
