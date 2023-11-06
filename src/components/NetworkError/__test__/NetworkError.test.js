import { render, screen } from "@testing-library/react";
import NetworkError from "../NetworkError";

describe("NetworkError", () => {
  it("should render correctly", () => {
    render(<NetworkError error={"error message"} />);

    const staticContent = screen.getByText("Ops!");
    expect(staticContent).toBeInTheDocument();
  });

  it("should display the error message", () => {
    render(<NetworkError error={"error message"} />);
    const message = screen.getByText("error message");
    expect(message).toBeInTheDocument();
  });
});
