import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';
import styles from '../styles/Home.module.css';

//
export const ListItem = (props) => (
  <div className="box">
    <h2>{props.title}</h2>
    <p>{props.agency}</p>
  </div>
);
const MyComponent = (props) => (<div id={props.id} />);

// create page view
export default function Home() {
  // data ----- callback function = switching between state (pricing and rating)
  const [mainData, setMainData] = useState([]);
  // retrieve data api
  const getMainData = (sortType) => {
    axios.get(`http://interview.tripresso.com/tour/search?page=1&row_per_page=5&sort=${sortType}`)
      .then((response) => {
        if (response.data.status === 'success') {
          setMainData(response.data.data.tour_list);
        }
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  useEffect(() => {
    getMainData('rating_desc');
  }, []);

  useEffect(() => {
    console.log('Home -> mainData', mainData);
  }, [mainData]);

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Tripresso Search Results</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>

          <h1 className={styles.title}>
            tripresso
          </h1>
          <div className="nav">
            <button className="button1" type="submit" onClick={() => getMainData('rating_desc', '200')}>Rating</button>
            <button className="button1" type="submit" onClick={() => getMainData('price_desc', '100')}>Price </button>
          </div>
          <div className="main-content">
            {mainData.map((item) => (
              <ListItem
                title={item.title}
                agency={item.agency}
              />
            ))}
          </div>
        </main>
      </div>
      <style jsx>
        {`
      .button1 {
        font-size:48px;
      }
    `}
      </style>
    </>
  );
}
