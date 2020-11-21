import React, { useState, useEffect } from 'react';
import Map from './components/Map';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import Header from './components/Header';

const App = () => {
  const [eventData, setEventData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(
          'https://eonet.sci.gsfc.nasa.gov/api/v2.1/events'
        );
        const { events } = await res.json();
        setEventData(events);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(true);
      }
    };
    fetchEvents();
  }, []);
  return (
    <>
      <Header />
      {!loading ? (
        <Map eventData={eventData} />
      ) : (
        <div className='loader-container'>
          <Loader type='Grid' color='#e25822' height={80} width={80} />
          {error ? (
            <>
              <p>Something Went Wrong</p>
              <input
                type='button'
                value='Reload Page'
                onClick={() => window.location.reload()}
              />
            </>
          ) : (
            <p>Fetching Data...</p>
          )}
        </div>
      )}
    </>
  );
};

App.propTypes = {};

export default App;
