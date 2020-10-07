/* eslint-disable quotes */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';
import clsx from 'clsx';
import styles from '../styles/Home.module.css';
import ListItem from './components/ListItem';

// Create page view
export default function Home() {
  // default data/value ----- callback function = switching between state (i.e. pricing, sort types)
  const [mainData, setMainData] = useState([]);
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [listSortType, setListSortType] = useState();
  const [priceType, setPriceType] = useState('價格');
  const [isLoading, setIsLoading] = useState(false);
  // Retrieve data from API when switching pages
  const getNextPageMainData = (pageNum) => {
    axios.get(`http://interview.tripresso.com/tour/search?page=${pageNum}&row_per_page=10&sort=${listSortType}`)
      .then((response) => {
        if (response.data.status === 'success') {
          setMainData(response.data.data.tour_list);
        }
      })
      .catch((error) => {
        error();
      });
  };
  // Retrieve data from API
  const getMainData = (listType) => {
    setIsLoading(true);
    setTimeout(() => {
      axios.get(`http://interview.tripresso.com/tour/search?page=1&row_per_page=10&sort=${listType}`)
        .then((response) => {
          if (response.data.status === 'success') {
            setMainData(response.data.data.tour_list);
          }
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          error();
        });
    }, 800);
  };

  useEffect(() => {
    getMainData('rating_desc');
  }, []);

  // Scroll to top when select pricing
  const onClickNextPageMainData = (pageNum) => {
    getNextPageMainData(pageNum);
    window.scrollTo(0, 0);
  };

  // Pricing dropdown function
  const openDropdown = () => {
    setDropdownIsOpen(!dropdownIsOpen);
  };

  // Get data when click on rating sort
  const onClickGetRateData = (sortType) => {
    if (dropdownIsOpen === true) {
      setDropdownIsOpen(false);
    }
    setListSortType(sortType);
    getMainData('rating_desc');
  };
  // Get data when click on pricing sort
  const onClickGetPriceData = (sortType) => {
    setDropdownIsOpen(false);
    if (listSortType === sortType) return;
    getMainData(sortType);
    setPriceType(sortType === 'price_desc' ? '價格：高到低' : '價格：低到高');
    setListSortType(sortType);
  };

  // Main content starts here
  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Tripresso Search Results</title>
        </Head>

        <main className={styles.main}>

          <div className={styles.title}>
            <h1>tripresso 旅遊咖</h1>
          </div>

          <div className={`nav ${styles.nav}`}>
            <p className={styles.navTitle}>排序方式</p>
            <ul className={styles.buttonGroup}>
              <li
                className={styles.button}
                onClick={() => onClickGetRateData()}
              >
                <div className={styles.buttonName}>精選評分</div>
              </li>
              <li className={styles.button}>
                <div className={styles.buttonName} onClick={() => openDropdown()}>
                  {priceType}
                  {' '}
                  <>&#9662;</>
                </div>

                <ul className={clsx('dropdown', styles.dropdown, { isOpen: dropdownIsOpen })}>
                  <li
                    className={styles.dropdownItem}
                    onClick={() => onClickGetPriceData('price_asc')}
                  >
                    價格：低到高
                  </li>
                  <li
                    className={styles.dropdownItem}
                    onClick={() => onClickGetPriceData('price_desc')}
                  >
                    價格：高到低

                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="main-content">
            {isLoading || !mainData
              ? (
                <div className="loading-s1">
                  <p>...Loading</p>
                </div>
              )
              : mainData.map((item) => (
                <ListItem
                  title={item.title}
                  rating={item.rating}
                  agency={item.agency}
                  tourDays={item.tour_days}
                  minPrice={item.min_price}
                  tags={item.tags}
                  group={item.group}
                  image={item.image_url}
                  tourDetail={item.tour_detail_url}
                />
              ))}
          </div>
          {mainData
          && (
          <ul className={styles.pagination}>
            <li className={styles.pageNum} onClick={() => onClickNextPageMainData(1)}>1</li>
            <li className={styles.pageNum} onClick={() => onClickNextPageMainData(2)}>2</li>
            <li className={styles.pageNum} onClick={() => onClickNextPageMainData(3)}>3</li>
            <li className={styles.pageNum} onClick={() => onClickNextPageMainData(3)}>4</li>
          </ul>
          )}
        </main>
      </div>

      <style jsx>
        {`
        .nav, 
        .dropdown{
          z-index:101;
        }
        .main-content{
          position:relative;
          display: block;
          width: 100%;
          height: 100%;
        }
        .loading-s1{
          display:flex;
          justify-content:center;
          align-items:center;          
          height:100%;
          width: 100%;
        }
        .loading-s1 p{
          font-size:36px;
          font-weight:500;
        }
          
        .isOpen {
          opacity: 1;
          pointer-events: auto;
        }
      `}
      </style>
    </>
  );
}
