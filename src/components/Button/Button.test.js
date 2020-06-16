import React from "react";
import renderer from "react-test-renderer";

import { BasicButton } from "./BasicButton.js";

test( "StyledButton render correctly", () => {
  const tree = renderer.create( <BasicButton/> ).toJSON();
  expect( tree ).toMatchSnapshot();
} );

