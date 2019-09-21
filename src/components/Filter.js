import React from "react";

class Filter extends React.Component {
  constructor(props) {
    super(props);
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
    if (!value.match(/(^[12][0-9]{3}$)/) && value !== "") {
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
          <h1>Filter your List</h1>
          {/* Beer Filter */}
          <div className="filter">
            <h2>Beer Name</h2>
            <input
              placeholder="Enter the name of your Beer"
              name="name"
              onChange={e => {
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
              maxLength="2"
              onChange={e => {
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
              maxLength="4"
              onChange={e => {
                if (this.validateYear(e)) {
                  this.setState({ year: e.target.value });
                }
              }}
            />
            <button
              onClick={e => {
                e.preventDefault();
                this.props.getBeersByBrewDate(
                  this.state.month,
                  this.state.year,
                  "before"
                );
              }}
            >
              Before this date
            </button>
            <button
              onClick={e => {
                e.preventDefault();
                this.props.getBeersByBrewDate(
                  this.state.month,
                  this.state.year,
                  "after"
                );
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
        </div>
      </React.Fragment>
    );
  }
}

export default Filter;
