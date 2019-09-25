import React from "react";
import { shallow, mount, render } from "enzyme";
import App from "./App";
import "./setupTest";

describe("App Component", () => {
  it("It should render without errors", () => {
    const shallowComponent = shallow(<App />);
    const wrapper = shallowComponent.find(`[data-test='container']`);
    expect(wrapper.length).toBe(1);
    expect(wrapper.exists()).toBe(true);
  });

  it("renders the component", () => {
    const container = shallow(<App />);
    expect(container).toMatchSnapshot();
  });

  it("renders the component", () => {
    const container = shallow(<App />);
    expect(container).toMatchSnapshot();
  });

  it("renders Error Message when beers[] is empty", () => {
    const container = shallow(<App />);
    container.setState({ beers: [], numberOfPages: 32 });
    expect(container.find(`[data-test='error']`).length).toEqual(1);
  });

  it("renders 0 results div when beers[] is empty and no pagination", () => {
    const container = shallow(<App />);
    container.setState({ beers: [], numberOfPages: 32 });
    expect(container.find(`[data-test='results']`).length).toEqual(0);
    expect(container.find(`[data-test='pagination']`).length).toEqual(0);
  });

  it("renders popUp when a beer is selected", () => {
    let obj = {
      abv: 4.5,
      description:
        "A light, crisp and bitter IPA brewed with English and American hops. A small batch brewed only once.",
      first_brewed: "09/2007",
      food_pairing: [
        ("Spicy chicken tikka masala",
        "Grilled chicken quesadilla",
        "Caramel toffee cake")
      ],
      ibu: 60,
      id: 1,
      image_url: "https://images.punkapi.com/v2/keg.png",
      name: "Buzz",
      ph: 4.4,
      srm: 10
    };
    const container = mount(<App />);
    expect(container.find(".moreInfo").length).toBe(0);
    container.setState({ beers: [obj], beerToShow: obj });
    container.find(".beername").simulate("click");
    expect(container.find(".moreInfo").length).toBe(1);
  });
});
