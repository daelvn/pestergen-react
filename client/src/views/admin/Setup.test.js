import { render, screen } from "@testing-library/react";
import Setup from "./Setup";

test("renders learn react link", () => {
  render(<Setup />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
