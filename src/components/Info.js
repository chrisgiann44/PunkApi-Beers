import React from "react";

class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="popUpWindow">
        {/* Close[X] */}
        <div
          className="closeX"
          onClick={() => {
            this.props.toggle();
          }}
        >
          Close[X]
        </div>
        {/* Info of the selected Beer */}
        <div className="maincontainer">
          <img
            src={this.props.beer[0].image_url || "./beer_logo.jpg"}
            alt="Logo"
          ></img>
          <div className="infocontainer">
            <h2 className="item">Name:</h2>
            <h3 className="item">{this.props.beer[0].name}</h3>
            <h2 className="item">Ph:</h2>
            <h3 className="item">{this.props.beer[0].ph}</h3>
            <h2 className="item">SRM:</h2>
            <h3 className="item">{this.props.beer[0].srm}</h3>
            <h2 className="item">Brewers Tips:</h2>
            <h3 className="item">{this.props.beer[0].brewers_tips}</h3>
            <h2 className="item">Can be combined with:</h2>
            <div className="item">
              {this.props.beer[0].food_pairing.map(food => (
                <h3 key={food.id}>{food}</h3>
              ))}
            </div>
            <h2 className="item">Description:</h2>
            <h3 className="item">{this.props.beer[0].description}</h3>
          </div>
        </div>
        {/* Arrows */}
        <div className="arrowscontainer">
          <img
            className="arrow"
            onClick={() => {
              this.props.showNextBeerLeftOnPopup();
            }}
            src="leftarrow.png"
            alt="Arrow"
          />
          <img
            onClick={() => {
              this.props.showNextBeerRightOnPopup();
            }}
            className="arrow"
            src="rightarrow.png"
            alt="Arrow"
          />
        </div>
      </div>
    );
  }
}

export default Info;
