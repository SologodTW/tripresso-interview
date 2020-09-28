import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import axios from 'axios';

const ListItem = (props) =>{
console.log("ListItem -> props", props)
return (
  <div className="box">
  <h2>{props.title}</h2>
<p>{props.agencyy}</p>
</div>
)
}
export default function Home() {

  const [mainData, setMainData] = useState([]);

 const getMainData = (sortType) =>{
 
  axios.get(`http://interview.tripresso.com/tour/search?page=1&row_per_page=5&sort=${sortType}`)
  .then(function (response) {
    if(response.data.status ==="success"){
      setMainData(response.data.data.tour_list)
    }
  })
  .catch(function (error) {
    // handle error
    console.log('ERRORRRR', error);
  })

 }
  useEffect(() => {    
    getMainData('rating_desc');
  },[]);
  

  useEffect(() => {     
    console.log("Home -> mainData", mainData)
  },[mainData]);


  return (
    <>
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        
        <h1 className={styles.title}>
        tripresso
        </h1>

      <div className="main-content">
          {mainData.map((item) => 
          <ListItem 
          title={item.title} 
          agencyy={item.agency}
          />
          )}
          </div>
        <button className="button1" onClick={()=> getMainData('rating_desc', '200')}>Rating</button>
        <button className="button1" onClick={()=> getMainData('price_desc', '100')}>Price </button>
      </main>
      
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
      <style jsx>{`
      .button1{
        font-size:48px;
      }
    `}</style>
    </>
  )
}
