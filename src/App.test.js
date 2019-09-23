import React from "react";
import { shallow } from "enzyme";
import App from "./App";
import "./setupTest";

const setUp = (props = {}) => {
  const component = shallow(<App {...props} />);
  return component;
};

describe("Filter Component", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("It should render without errors", () => {
    const wrapper = component.find(`[data-test='filters']`);
    expect(wrapper.length).toBe(1);
  });

  test("Year Validation should filter correctly", () => {
    const instance = component.instance();
    expect(
      instance.validateYear({ target: { value: "2000", name: "Before" } })
    ).toBe(true);
  });
});
