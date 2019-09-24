import React from "react";

let initialState = {
  monthBefore: "",
  yearBefore: "",
  monthAfter: "",
  yearAfter: "",
  monthAfterError: false,
  monthBeforeError: false,
  yearAfterError: false,
  yearBeforeError: false,
  nameError: false
};

class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.name = React.createRef();
    this.monthBefore = React.createRef();
    this.yearBefore = React.createRef();
    this.monthAfter = React.createRef();
    this.yearAfter = React.createRef();
    this.state = {
      monthBefore: "",
      yearBefore: "",
      monthAfter: "",
      yearAfter: "",
      nameError: false
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
  validateMonth = ({ target }) => {
    let error = target.name + "Error";
    if (
      !target.value.match(/(^0?[1-9]$)|(^1[0-2]$)/) &&
      target.value.length > 1
    ) {
      this.setState({ [error]: true });
      return false;
    } else {
      this.setState({ [error]: false });
      return true;
    }
  };

  // Validates the year and returns true or false
  validateYear = ({ target }) => {
    let error = target.name + "Error";
    if (!target.value.match(/(^[12][0-9]{3}$)/) && target.value.length > 3) {
      this.setState({ [error]: true });
      return false;
    } else {
      this.setState({ [error]: false });
      return true;
    }
  };

  // Handle the change of the inputs
  handlechange = e => {
    if (e.target.id === "month") {
      if (this.validateMonth(e)) {
        if (e.target.value.length === 1) {
          this.setState({ [e.target.name]: 0 + e.target.value });
        } else this.setState({ [e.target.name]: e.target.value });
      }
    } else {
      if (this.validateYear(e)) {
        this.setState({ [e.target.name]: e.target.value });
      }
    }
  };

  render() {
    return (
      <div className="filters" data-test="filters">
        <h2>Filter your List</h2>
        {/* Name Filter */}
        <div className="filter">
          <h2>Beer Name</h2>
          <input
            placeholder="Enter the name of your Beer"
            name="name"
            ref={this.name}
            onChange={e => {
              this.monthBefore.current.value = "";
              this.yearBefore.current.value = "";
              this.monthAfter.current.value = "";
              this.yearAfter.current.value = "";
              if (this.validateName(e)) {
                this.setState({ ...initialState, name: e.target.value });
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
          <p>Between</p>
          <input
            placeholder="MM"
            name="monthAfter"
            id="month"
            ref={this.monthBefore}
            maxLength="2"
            onChange={this.handlechange}
          />
          <input
            placeholder="YYYY"
            name="yearAfter"
            id="year"
            ref={this.yearBefore}
            maxLength="4"
            onChange={this.handlechange}
          />
          <p>And</p>
          <input
            placeholder="MM"
            name="monthBefore"
            id="month"
            ref={this.monthAfter}
            maxLength="2"
            onChange={this.handlechange}
          />
          <input
            placeholder="YYYY"
            name="yearBefore"
            id="year"
            ref={this.yearAfter}
            maxLength="4"
            onChange={this.handlechange}
          />
          <button
            onClick={e => {
              e.preventDefault();
              if (
                this.state.monthBeforeError ||
                this.state.yearBeroreError ||
                this.state.yearAfterError ||
                this.state.yearAfterError ||
                (this.state.yearAfter === "" && this.state.yearBefore === "")
              ) {
                return;
              } else {
                this.props.getBeersByBrewDate(
                  this.state.monthBefore || "01",
                  this.state.yearBefore,
                  this.state.monthAfter || "01",
                  this.state.yearAfter,
                  this.state.name
                );
              }
            }}
          >
            Apply Filter
          </button>
          {this.state.monthBeforeError || this.state.monthAfterError ? (
            <p style={{ color: "red" }}>Please insert a valid Month</p>
          ) : null}
          {this.state.yearBeforeError || this.state.yearAfterError ? (
            <p style={{ color: "red" }}>Please insert a valid Year</p>
          ) : null}
        </div>
        {/* Reset Button */}
        <div>
          <button
            onClick={e => {
              e.preventDefault();
              this.name.current.value = "";
              this.monthBefore.current.value = "";
              this.yearBefore.current.value = "";
              this.monthAfter.current.value = "";
              this.yearAfter.current.value = "";
              this.props.resetResults();
              this.props.getTenBeersByPage(this.props.currentPage);
              this.setState(initialState);
            }}
          >
            Reset Filters
          </button>
        </div>
      </div>
    );
  }
}

export default Filters;
