import { render, screen } from "@testing-library/react";
import NotFound from "../NotFound";

describe("NotFound", () => {
  it("should render correctly", () => {
    render(<NotFound />);

    const h1Element = screen.getByText("404");
    const h4Element = screen.getByText("Page not found");
    expect(h1Element ).toBeInTheDocument();
    expect(h4Element ).toBeInTheDocument();
  });

});
