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
        {/* INFO OF THE BEER */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            margin: "1%",
            height: "85%"
          }}
        >
          <img
            src={this.props.beer[0].image_url || "./beer_logo.jpg"}
            alt="Logo"
          ></img>
          <div
            style={{
              textAlign: "left",
              borderRadius: "25px",
              paddingLeft: "2%",
              marginLeft: "2%",
              backgroundColor: "white",
              width: "70%"
            }}
          >
            <h2>
              Name:<br></br> {this.props.beer[0].name}
            </h2>
            <h2>
              Brewers Tips:<br></br> {this.props.beer[0].brewers_tips}
            </h2>
            <h2>
              Ph:<br></br> {this.props.beer[0].ph}
            </h2>
            <h2>
              SRM: <br></br>
              {this.props.beer[0].srm}
            </h2>
            <h2>Can be combined with:</h2>
            {this.props.beer[0].food_pairing.map(food => (
              <ul>
                <li key={food.id}>{food}</li>
              </ul>
            ))}
            <h2>
              Description:
              <br></br>
              {this.props.beer[0].description}}
            </h2>
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
