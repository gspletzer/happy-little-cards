import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';

// Custom hook for handling input boxes
// saves us from creating onChange handlers for them individually
const useInput = init => {
  const [ value, setValue ] = useState(init);
  const onChange = e => {
    setValue(e.target.value);
  }
  // return the value with the onChange function instead of setValue function
  return [ value, onChange ];
}

const CreateCard = props => {
  const [title, titleOnChange] = useInput('');
  const [image, imageOnChange] = useInput('');
  const [count, countOnChange] = useInput('');
  const [keywords, keywordsOnChange] = useInput('');
  const [titleError, setTitleError] = useState(null);
  const [countError, setCountError] = useState(null);

  const saveCard = () => {
    if (title === '') {
      setTitleError('required');
    } else if (isNaN(count)) {
      setCountError('must be a number');
    } else {
      const body = {
        title,
        image,
        count,
        keywords,
      }
      fetch('/api/add', {
        method: 'POST',
        headers: {
          "Content-Type": "Application/JSON"
        },
        body: JSON.stringify(body)
      })
      .then(resp => resp.json())
      .then(data => {
        props.history.push('/');
      })
      .catch(err => console.log('CreateCard fetch /api/add: ERROR: ', err));
    }
  }

  useEffect(()=>{
    setTitleError(null);
  }, [title]);

  useEffect(()=>{
    setCountError(null);
  }, [count]);

  return (
    <section className="mainSection createCardContainer">
      <header className="pageHeader">
        <h2>Happy New Little Card</h2>
      </header>
      <header className="pageHeader">
      <Link to='/' className="backLink">
          <button type="button" className="btnSecondary">
            Back to Happy Cards Stock
          </button>
        </Link>
      </header>
      <article className="card createCard">
        <h3>Enter card details</h3>
        <div className="createCardFields">
          <label htmlFor="title">Title: </label>
          <input name="title" placeholder="Happy Little Greeting" value={title} onChange={titleOnChange} />
          {titleError ? (<span className="errorMsg">{titleError}</span>) : null}
        </div>
        <div className="createCardFields">
          <label htmlFor="image">Image: </label>
          <input name="image" placeholder="image url" value={image} onChange={imageOnChange} />
        </div>
        <div className="createCardFields">
          <label htmlFor="count">Count: </label>
          <input name="count" placeholder="cuantos?" value={count} onChange={countOnChange} />
          {countError ? (<span className="errorMsg">{countError}</span>) : null}
        </div>
        <div className="createCardFields">
          <label htmlFor="keywords">Keywords: </label>
          <input name="keywords" placeholder="happy, little, trees" value={keywords} onChange={keywordsOnChange} />
        </div>
        <div className="createCardButtonContainer">
          <Link to="/" className="backLink">
            <button type="button" className="btnSecondary">
              Cancel
            </button>
          </Link>
          <button type="button" className="btnMain" onClick={saveCard}>Save</button>
        </div>
      </article>
    </section>
  )
}

export default withRouter(CreateCard);

