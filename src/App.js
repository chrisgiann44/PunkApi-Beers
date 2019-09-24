import React from "react";
import axios from "axios";
import Info from "./components/Info";
import Filters from "./components/Filters";
import { CSSTransition } from "react-transition-group";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      beers: [],
      visible: false,
      beerToShow: {},
      currentPage: 1,
      numberOfPages: 33,
      numberOfResults: 325,
      beersFromSearchResults: [],
      bringElements: false
    };
  }

  // Set the selected Beer on the Popup window
  setBeerToShow = e => {
    this.setState({
      beerToShow: this.state.beers.filter(
        beer => beer.id === parseInt(e.target.id)
      )
    });
    this.toggleInfo();
  };

  // Toogles Popup window
  toggleInfo = () => {
    if (this.state.visible) {
      this.setState({ visible: false });
    } else {
      this.setState({ visible: true });
    }
  };

  // Brings the next beer (right) on the popup window
  showNextBeerRightOnPopup = () => {
    let allBeers = this.state.beers;
    let beerToShow = this.state.beerToShow;
    if (allBeers.indexOf(beerToShow[0]) === allBeers.length - 1) {
      return;
    }
    this.setState({
      beerToShow: allBeers.filter(
        beer => allBeers.indexOf(beer) === allBeers.indexOf(beerToShow[0]) + 1
      )
    });
  };

  // Brings the previous beer (left) on the popup window
  showNextBeerLeftOnPopup = () => {
    let allBeers = this.state.beers;
    let beerToShow = this.state.beerToShow;
    if (allBeers.indexOf(beerToShow[0]) === 0) {
      return;
    }
    this.setState({
      beerToShow: allBeers.filter(
        beer => allBeers.indexOf(beer) === allBeers.indexOf(beerToShow[0]) - 1
      )
    });
  };

  // Get results of beers based on the name
  getBeersByName = name => {
    if (name.length > 2) {
      axios
        .get(
          `https://api.punkapi.com/v2/beers?beer_name=${name}&page=1&per_page=80`
        )
        .then(res => {
          this.setState({
            beers: res.data.slice(0, 10),
            beersFromSearchResults: res.data,
            numberOfPages: Math.ceil(res.data.length / 10),
            numberOfResults: res.data.length,
            currentPage: 1
          });
        })
        .catch(err => console.log(err));
    } else {
      this.getTenBeersByPage(1);
      this.setState({
        beersFromSearchResults: [],
        currentPage: 1,
        sortProperty: ""
      });
    }
  };

  // Get results of beers based on the Brew Date
  getBeersByBrewDate = (
    monthBefore,
    yearBefore,
    monthAfter,
    yearAfter,
    name
  ) => {
    let lastPartOfUrl = "";
    if (yearBefore && !yearAfter) {
      lastPartOfUrl = "brewed_before=" + monthBefore + "-" + yearBefore;
    } else if (!yearBefore && yearAfter) {
      lastPartOfUrl = "brewed_after=" + monthAfter + "-" + yearAfter;
    } else {
      lastPartOfUrl =
        "brewed_before=" +
        monthBefore +
        "-" +
        yearBefore +
        "&brewed_after=" +
        monthAfter +
        "-" +
        yearAfter;
    }
    let finalUrl = name ? lastPartOfUrl + "&beer_name=" + name : lastPartOfUrl;
    axios
      .get(`https://api.punkapi.com/v2/beers?page=1&per_page=80&${finalUrl}`)
      .then(res => {
        this.setState({
          beers: res.data.slice(0, 10),
          beersFromSearchResults: res.data,
          numberOfPages: Math.ceil(res.data.length / 10),
          numberOfResults: res.data.length,
          sortProperty: ""
        });
      })
      .catch(err => console.log(err));
  };

  // Sort Results Function
  sortResults = sortProperty => {
    let sorted = [];
    let results = this.state.beersFromSearchResults;
    let stateProperty = this.state.sortProperty;
    if (sortProperty === "id") {
      if (stateProperty === "id") {
        sorted = results.reverse();
      } else {
        sorted = results.sort((a, b) =>
          a.id < b.id ? -1 : a.id > b.id ? 1 : 0
        );
      }
    }
    if (sortProperty === "name") {
      if (stateProperty === "name") {
        sorted = results.reverse();
      } else {
        sorted = results.sort((a, b) =>
          a.name < b.name ? -1 : a.name > b.name ? 1 : 0
        );
      }
    }
    if (sortProperty === "first_brewed") {
      if (stateProperty === "first_brewed") {
        sorted = results.reverse();
      } else {
        sorted = results.sort((a, b) =>
          a.id < b.id ? -1 : a.id > b.id ? 1 : 0
        );
        sorted = results.sort(
          (a, b) =>
            parseInt(
              a.first_brewed.substr(a.first_brewed.length - 4) +
                (a.first_brewed.slice(0, -5)
                  ? a.first_brewed.slice(0, -5)
                  : "01")
            ) -
            parseInt(
              b.first_brewed.substr(a.first_brewed.length - 4) +
                (b.first_brewed.slice(0, -5)
                  ? b.first_brewed.slice(0, -5)
                  : "01")
            )
        );
      }
    }
    if (sortProperty === "abv") {
      if (stateProperty === "abv") {
        sorted = results.reverse();
      } else {
        sorted = results.sort((a, b) =>
          a.abv < b.abv ? -1 : a.abv > b.abv ? 1 : 0
        );
      }
    }
    if (sortProperty === "ibu") {
      if (stateProperty === "ibu") {
        sorted = results.reverse();
      } else {
        sorted = results.sort((a, b) =>
          a.ibu < b.ibu ? -1 : a.ibu > b.ibu ? 1 : 0
        );
      }
    }
    this.setState({
      beers: sorted.slice(0, 10),
      beersFromSearchResults: sorted,
      sortProperty: sortProperty,
      currentPage: 1
    });
  };

  // Reset Results on Reset Button
  resetResults = () => {
    this.setState({ beersFromSearchResults: [] });
  };

  // Gets the next page of the resuls (right)
  paginateRight = () => {
    let currPag = this.state.currentPage;
    let numOfPag = this.state.numberOfPages;
    let res = this.state.beersFromSearchResults;
    if (currPag === numOfPag) {
      return;
    } else {
      if (!res.length) {
        this.getTenBeersByPage(currPag + 1);
        this.setState({
          currentPage: currPag + 1
        });
      } else {
        const startSliceFrom = res.indexOf(
          this.state.beers[this.state.beers.length - 1]
        );
        this.setState({
          currentPage: currPag + 1,
          beers: res.slice(startSliceFrom + 1, startSliceFrom + 11)
        });
      }
    }
  };

  // Gets the previous page of the resuls (left)
  paginateLeft = () => {
    let currPag = this.state.currentPage;
    let res = this.state.beersFromSearchResults;
    if (currPag === 1) {
      return;
    } else {
      if (!res.length) {
        this.getTenBeersByPage(currPag - 1);
        this.setState({
          currentPage: currPag - 1
        });
      } else {
        const startSliceFrom = res.indexOf(this.state.beers[0]);
        this.setState({
          currentPage: currPag - 1,
          beers: this.state.beersFromSearchResults.slice(
            startSliceFrom - 10,
            startSliceFrom
          )
        });
      }
    }
  };

  // Get results of beers unfiltered
  getTenBeersByPage = pageNum => {
    if (pageNum < 1 || pageNum > 33) {
      return;
    } else {
      axios
        .get(`https://api.punkapi.com/v2/beers?page=${pageNum}&per_page=10`)
        .then(res => {
          this.setState({
            beers: res.data,
            numberOfPages: 33,
            numberOfResults: 325
          });
        });
    }
  };

  componentDidMount() {
    this.getTenBeersByPage(1);
    this.setState({ bringElements: true });
  }

  render() {
    return (
      <React.Fragment>
        <div className="container">
          {/* Filter Component on the left */}
          <CSSTransition
            in={this.state.bringElements}
            timeout={1000}
            classNames="filters"
            mountOnEnter
            appear
            unmountOnExit
          >
            <Filters
              currentPage={this.state.currentPage}
              getBeersByName={this.getBeersByName}
              resetResults={this.resetResults}
              getBeersByBrewDate={this.getBeersByBrewDate}
              getTenBeersByPage={this.getTenBeersByPage}
            />
          </CSSTransition>
          {/* Results on the display right */}
          <CSSTransition
            in={this.state.bringElements}
            timeout={1000}
            classNames="display"
            mountOnEnter
            appear
            unmountOnExit
          >
            <div className="display">
              <div className="results">
                {/* Header */}
                <div className=" header">
                  <div>
                    {!!this.state.beersFromSearchResults.length && (
                      <img
                        onClick={e => this.sortResults(e.target.name)}
                        id="sort"
                        name="id"
                        src="./sorticon.png"
                        alt="foto"
                      />
                    )}
                    Id
                  </div>
                  <div>
                    {!!this.state.beersFromSearchResults.length && (
                      <img
                        onClick={e => this.sortResults(e.target.name)}
                        id="sort"
                        name="name"
                        src="./sorticon.png"
                        alt="foto"
                      />
                    )}
                    Name
                  </div>
                  <div>
                    {!!this.state.beersFromSearchResults.length && (
                      <img
                        onClick={e => this.sortResults(e.target.name)}
                        id="sort"
                        name="first_brewed"
                        src="./sorticon.png"
                        alt="foto"
                      />
                    )}
                    First Brewed
                  </div>
                  <div>
                    {!!this.state.beersFromSearchResults.length && (
                      <img
                        onClick={e => this.sortResults(e.target.name)}
                        id="sort"
                        name="abv"
                        src="./sorticon.png"
                        alt="foto"
                      />
                    )}
                    ABV
                  </div>
                  <div>
                    {!!this.state.beersFromSearchResults.length && (
                      <img
                        onClick={e => this.sortResults(e.target.name)}
                        id="sort"
                        name="ibu"
                        src="./sorticon.png"
                        alt="foto"
                      />
                    )}
                    IBU
                  </div>
                </div>
                {/* Results */}
                {!(
                  this.state.beers.length || this.state.numberOfPages === 33
                ) && (
                  <h1 style={{ color: "red" }}>
                    No Beers for you mate!Sorry! try again
                  </h1>
                )}
                {this.state.beers.map(beer => (
                  <div
                    className="result"
                    id={beer.id}
                    key={beer.id}
                    onClick={this.setBeerToShow}
                  >
                    <div id={beer.id}>{beer.id}</div>
                    <div id={beer.id}>{beer.name}</div>
                    <div id={beer.id}>{beer.first_brewed}</div>
                    <div id={beer.id}>{beer.abv}</div>
                    <div id={beer.id}>{beer.ibu}</div>
                  </div>
                ))}
              </div>
              {/* Pagination */}
              {!!this.state.beers.length && (
                <div className="pagination">
                  <h4 onClick={this.paginateLeft}>{"<<"} Prev</h4>
                  <p>{this.state.currentPage}</p>
                  {this.state.numberOfPages !== 0 && (
                    <p>
                      of {this.state.numberOfPages} Pages and{" "}
                      {this.state.numberOfResults} Beers
                    </p>
                  )}
                  <h4 onClick={this.paginateRight}>Next {">>"}</h4>
                </div>
              )}
            </div>
          </CSSTransition>
          {/* Popup Window */}
          <CSSTransition
            in={this.state.visible}
            timeout={1000}
            classNames="moreInfo"
            mountOnEnter
            appear
            unmountOnExit
          >
            <div className="moreInfo">
              <Info
                beer={this.state.beerToShow}
                toggle={this.toggleInfo}
                showNextBeerRightOnPopup={this.showNextBeerRightOnPopup}
                showNextBeerLeftOnPopup={this.showNextBeerLeftOnPopup}
              />
            </div>
          </CSSTransition>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
