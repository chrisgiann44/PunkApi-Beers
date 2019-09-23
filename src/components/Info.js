import React from "react";

class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "95%" }}>
        {/* Close[X] */}
        <div
          onClick={() => {
            this.props.toggle();
          }}
          style={{
            marginTop: "1%",
            cursor: "pointer",
            width: "15%",
            alignSelf: "flex-end"
          }}
        >
          Close[X]
        </div>
        {/* Info of the selected Beer */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            margin: "2%",
            height: "85%",
            justifyContent: "space-around",
            paddingTop: "1%"
          }}
        >
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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around"
          }}
        >
          <img
            onClick={() => {
              this.props.showNextBeerLeftOnPopup();
            }}
            style={{
              borderRadius: "25px",
              width: "60px",
              cursor: "pointer",
              height: "60px"
            }}
            src="leftarrow.png"
            alt="Arrow"
          />
          <img
            onClick={() => {
              this.props.showNextBeerRightOnPopup();
            }}
            style={{
              borderRadius: "25px",
              width: "60px",
              cursor: "pointer",
              height: "60px"
            }}
            src="rightarrow.png"
            alt="Arrow"
          />
        </div>
      </div>
    );
  }
}

export default Info;
