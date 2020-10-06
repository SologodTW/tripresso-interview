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

// create page view
export default function Home() {
  // data ----- callback function = switching between state (pricing and rating)
  const [mainData, setMainData] = useState([]);
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [listSortType, setListSortType] = useState();
  const [priceType, setPriceType] = useState('價格');

  // retrieve data from API
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

  const getMainData = () => {
    axios.get(`http://interview.tripresso.com/tour/search?page=1&row_per_page=10&sort=${listSortType}`)
      .then((response) => {
        if (response.data.status === 'success') {
          setMainData(response.data.data.tour_list);
        }
      })
      .catch((error) => {
        error();
      });
  };

  useEffect(() => {
    getMainData(listSortType);
  }, []);

  // scroll to top when select pricing
  const onClickNextPageMainData = (pageNum) => {
    getNextPageMainData(pageNum);
    window.scrollTo(0, 0);
  };

  // pricing dropdown function
  const openDropdown = () => {
    setDropdownIsOpen(!dropdownIsOpen);
  };

  // Get data when click on rating sort
  const onClickGetMainData = (sortType) => {
    if (dropdownIsOpen === true) {
      setDropdownIsOpen(false);
    }
    setListSortType(sortType);
    console.log("onClickGetMainData -> setListSortType(sortType);", setListSortType(sortType));

    getMainData(sortType);
  };
  // Get data when click on pricing sort
  const onClickGetPriceData = (sortType) => {
    setListSortType(sortType);
    setPriceType(sortType === 'price_desc' ? '價格高到低' : '價格低到高');
    getMainData(sortType);
    setDropdownIsOpen(false);
  };

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

          <div className={styles.nav}>
            <p className={styles.navTitle}>排序方式</p>
            <ul className={styles.buttonGroup}>
              <li
                className={styles.button}
                onClick={() => onClickGetMainData('rating_desc')}
              >
                <div className={styles.buttonName}>精選評分</div>
              </li>
              <li className={styles.button}>
                <div className={styles.buttonName} onClick={() => openDropdown()}>
                  {priceType}
                  {' '}
                  <>&#9662;</>
                </div>

                <ul className={clsx(styles.dropdown, { isOpen: dropdownIsOpen })}>
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
          {mainData ? mainData.map((item) => (
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
          ))
            : <div>...Loading</div>}

          <ul className={styles.pagination}>
            <li className={styles.pageNum} onClick={() => onClickNextPageMainData(1)}>1</li>
            <li className={styles.pageNum} onClick={() => onClickNextPageMainData(2)}>2</li>
            <li className={styles.pageNum} onClick={() => onClickNextPageMainData(3)}>3</li>
            <li className={styles.pageNum} onClick={() => onClickNextPageMainData(3)}>4</li>
          </ul>
        </main>
      </div>

      <style jsx>
        {`
          .isOpen {
            opacity: 1;
            pointer-events: auto;
          }
        

      `}
      </style>
    </>
  );
}
