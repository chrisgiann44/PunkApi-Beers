import React from "react";
import { shallow, mount } from "enzyme";
import App from "./App";
import "./setupTest";

const setUp = (props = {}) => {
  const component = shallow(<App {...props} />);
  return component;
};

describe("App Component", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("It should render without errors", () => {
    const wrapper = component.find(`[data-test='container']`);
    expect(wrapper.length).toBe(1);
  });

  it("Reset Button deletes the results and returns to page 1", () => {
    const expected = [];
    const secondComponent = mount(<App />);
    const btn = secondComponent.find("button.resetButton");
    btn.simulate("click");
    expect(secondComponent.state().currentPage).toBe(1);
    expect(secondComponent.state().beersFromSearchResults).toEqual(
      expect.arrayContaining(expected)
    );
  });
});
