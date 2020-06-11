import React, { Fragment, useState, useEffect } from 'react';
import wineImage from './img/wine.jpg';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import WineComponents from './WineComponents';

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

  return (
    <section className="wine-details">
      {!isLoading && (
        <Fragment>
          <Link to="/">Back</Link>
          <div className="details">
            <img src={wineImage} className="wine-image" alt="Wine" />
            <WineComponents
              id={id}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
            <div className="others">
              <p>Lot Code : {wineDetails.lotCode}</p>
              <p>Volume : {wineDetails.volume}</p>
              <p>Description : {wineDetails.description}</p>
              <p>Tank Code : {wineDetails.tankCode}</p>
              <p>Product State : {wineDetails.productState}</p>
              <p>Owner Name : {wineDetails.ownerName}</p>
            </div>
          </div>
        </Fragment>
      )}
    </section>
  );
};

export default WineDetails;
