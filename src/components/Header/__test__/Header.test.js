import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "../Header"; 


// Mock the SearchBar component to avoid testing its internals here
jest.mock("../../../containers/SearchBar/SearchBar", () => {
    return function MockedSearchBar() {
      return <div data-testid="searchbar-mock">SearchBar Component</div>;
    };
  });
describe("Header component", () => {
  it("renders without crashing", () => {
    render(<Header onSearch={() => {}} />);
  });

  it("renders the logo image correctly", () => {
    render(<Header onSearch={() => {}} />);
    const logoImg = screen.getByAltText("logo");
    expect(logoImg).toBeInTheDocument();
    expect(logoImg.src).toContain("logo.png");
  });

  it("renders the title 'RedditMinimal'", () => {
    render(<Header onSearch={() => {}} />);
    const redditPart = screen.getByText("Reddit");
    const minimalPart = screen.getByText("Minimal");
    expect(redditPart).toBeInTheDocument();
    expect(minimalPart).toBeInTheDocument();
  });

  it("renders the SearchBar component", () => {
    render(<Header onSearch={() => {}} />);
    const searchBar = screen.getByText("SearchBar Component");
    expect(searchBar).toBeInTheDocument();
  });
});