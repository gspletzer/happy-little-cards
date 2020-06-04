import React from 'react';
import { Link } from 'react-router-dom';

const srcIsExternal = src => src.slice(0, 4) === 'http';
const getImgSrc = src => (srcIsExternal(src) ? src : require(`../assets/image-not-available.jpg`));

const CardBox = ({info}) => {
  const {
    title,
    image,
    count,
    keywords,
  } = info;

  return (
    <article className="card cardBox">
      <div className="cardBoxContainer">
        <h3 className="cardTitle">{title}</h3>
      </div>
      {image
      && <figure className="cardImage">
          <img src={getImgSrc(image)}/>
        </figure>}
      <ul className="cardDetailsList">
        <li className="cardDetail">Current Stock: {count}</li>
      </ul>
    </article>
  )
}

export default CardBox;


//can add in later
//<li className="cardDetail">Applicable For: {keywords}</li>
//consider adding tags using for loop before returning
