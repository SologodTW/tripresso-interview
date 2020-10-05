/* eslint-disable max-len */
/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import styles from '../../styles/Home.module.css';

const ListItem = (props) => {
  console.log('ListItem -> props', props);
  return (
    <div className={styles.box}>
      <div className={styles.boxImgContainer}><img className={styles.boxImg} src={props.image} alt="destination" /></div>
      <div className={styles.boxInfo}>
        <div className={styles.agencyRating}>
          <p>
            {props.agency}
            {' '}
            {props.rating}
            {' '}
            Stars
          </p>
        </div>
        <div className={styles.boxTitle}><a href={props.tourDetail} target="_blank">{props.title}</a></div>
        <div className={styles.tags}>
          {props.tags.map((item, i) => (<span key={item + i} className={styles.tagsItem}>{item}</span>))}
        </div>
        <div className={styles.boxFooter}>
          <div className={styles.group} />
          <div className={styles.dayPrice}>
            <span>{props.tourDays}</span>
            <p>天</p>
            <span>{props.minPrice}</span>
            <p>元起</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
