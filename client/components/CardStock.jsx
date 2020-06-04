import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom'
import CardBox from './CardBox'

//DON'T NEED BECAUSE INITIAL STATE SHOULD COME FROM API REQUEST

class CardStock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedCards: false,
      cardList:[],
    };
  }

  componentDidMount() {
    fetch('/api/')
      .then((res) => res.json())
      .then((cardList) => {
        if (!Array.isArray(cardList)) cardList = [];
        return this.setState({
          cardList,
          fetchedCards: true,
        });
      })
      .catch((err) => 
        console.log('CardStock.componentDidMount: get cardList: ERROR: ',
        err))
  }
  

  render() {
    if (!this.state.fetchedCards)
      return (
        <div>
          <h1>Loading data, please wait...</h1>
        </div>
      );
    
    const { cardList } = this.state;

    if (!cardList) return null;

    if (!cardList.length) return <div>Sorry, no cards found.</div>;

    const cardInfo = cardList.map((card, i) => {
      return <CardBox key={i} info={card} />;
    });

    return (
      <section className="mainSection">
        <header className="pageHeader">
          <h1>~Happy Little Cards~</h1>
        </header>
        <header className="pageHeader">
        <Link to={`/add`}>
            <button type="button" className="btnSecondary">
              Add Card
            </button>
          </Link>
        </header>
        <div className="cardContainer">
          {cardInfo}
        </div>
      </section>
    );
  }
}


export default CardStock
