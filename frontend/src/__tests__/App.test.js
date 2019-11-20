import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, cleanup } from "@testing-library/react";
import App from "../App";

afterEach(cleanup);

it("renders without crashing", () => {
  const app = render(<App />);
  expect(app).toBeDefined();
});
