import React from "react";

class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.name = React.createRef();
    this.month = React.createRef();
    this.year = React.createRef();
    this.state = {
      month: 0,
      year: 0,
      nameError: false,
      monthError: false,
      yearError: false
    };
  }

  // Validates the name and returns true or false
  validateName = ({ target: { value } }) => {
    if (!value.match(/^[a-zA-Z]+$/) && value !== "") {
      this.setState({ nameError: true });
      return false;
    } else {
      this.setState({ nameError: false });
      return true;
    }
  };

  // Validates the month and returns true or false
  validateMonth = ({ target: { value } }) => {
    if (!value.match(/(^0?[1-9]$)|(^1[0-2]$)/) && value !== "") {
      this.setState({ monthError: true });
      return false;
    } else {
      this.setState({ monthError: false });
      return true;
    }
  };

  // Validates the year and returns true or false
  validateYear = ({ target: { value } }) => {
    if (!value.match(/(^[12][0-9]{3}$)/) && value !== "" && value.length > 3) {
      this.setState({ yearError: true });
      return false;
    } else {
      this.setState({ yearError: false });
      return true;
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="filters">
          <h2>Filter your List</h2>
          {/* Beer Filter */}
          <div className="filter">
            <h2>Beer Name</h2>
            <input
              placeholder="Enter the name of your Beer"
              name="name"
              ref={this.name}
              onChange={e => {
                this.month.current.value = "";
                this.year.current.value = "";
                if (this.validateName(e)) {
                  this.props.getBeersByName(e.target.value);
                }
              }}
            />
            {this.state.nameError && (
              <p style={{ color: "red" }}>Please insert a valid Name</p>
            )}
          </div>
          {/* Date Filter */}
          <div className="filter">
            <h2>Brew Date</h2>
            <input
              placeholder="MM"
              name="month"
              ref={this.month}
              maxLength="2"
              onChange={e => {
                this.name.current.value = "";
                if (this.validateMonth(e)) {
                  if (e.target.value.length === 1) {
                    this.setState({ month: 0 + e.target.value });
                  } else this.setState({ month: e.target.value });
                }
              }}
            />
            <input
              placeholder="YYYY"
              name="year"
              ref={this.year}
              maxLength="4"
              onChange={e => {
                this.name.current.value = "";
                if (this.validateYear(e)) {
                  this.setState({ year: e.target.value });
                }
              }}
            />
            <button
              onClick={e => {
                e.preventDefault();
                if (this.state.monthError || this.state.yearError) {
                  return;
                } else {
                  this.props.getBeersByBrewDate(
                    this.state.month,
                    this.state.year,
                    "before"
                  );
                }
              }}
            >
              Before this date
            </button>
            <button
              onClick={e => {
                e.preventDefault();
                if (this.state.monthError || this.state.yearError) {
                  return;
                } else {
                  this.props.getBeersByBrewDate(
                    this.state.month,
                    this.state.year,
                    "after"
                  );
                }
              }}
            >
              After this date
            </button>
            {this.state.monthError && (
              <p style={{ color: "red" }}>Please insert a valid Month</p>
            )}
            {this.state.yearError && (
              <p style={{ color: "red" }}>Please insert a valid Year</p>
            )}
          </div>
          {/* Reset Button */}
          <div>
            <button
              onClick={e => {
                e.preventDefault();
                this.name.current.value = "";
                this.month.current.value = "";
                this.year.current.value = "";
                this.props.getTenBeersByPage(this.props.currentPage);
                this.setState({ monthError: false, yearError: false });
              }}
            >
              Reset Filters
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Filters;
