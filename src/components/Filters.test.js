import React from "react";
import { shallow, mount } from "enzyme";
import Filters from "./Filters";
import "../setupTest";

const setUp = (props = {}) => {
  const component = shallow(<Filters {...props} />);
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

  it("It should render 5 input fields", () => {
    const wrapper = component.find("input");
    expect(wrapper.length).toBe(5);
  });

  test("Name Validation should filter correctly", () => {
    const instance = component.instance();
    expect(instance.validateName({ target: { value: "13" } })).toBeFalsy();
  });

  test("Month Validation should filter correctly", () => {
    const instance = component.instance();
    expect(
      instance.validateMonth({ target: { value: "abc", name: "Before" } })
    ).toBe(false);
  });

  test("Year Validation should filter correctly", () => {
    const instance = component.instance();
    expect(
      instance.validateYear({ target: { value: "2000", name: "Before" } })
    ).toBe(true);
  });

  test("user text is echoed", () => {
    const wrapper = mount(<Filters getBeersByName={() => {}} />);
    wrapper.find("input.jestTestName").simulate("change", {
      target: { value: "name" }
    });
    expect(wrapper.state().name).toBe("name");
  });
});
