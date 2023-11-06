import { render, screen } from "@testing-library/react";
import Layout from "../Layout";



// Mock the child components
jest.mock("../../Header/Header", () => () => <span>MockedHeader</span>);
jest.mock("../../../containers/SideNavBar/SideNavBar", () => () => <span>MockedSideNavBar</span>);
jest.mock("../../../containers/CommunitesPosts/CommunitesPosts", () => () => <span>MockedCommunitesPosts</span>);

describe("<Layout />", () => {
  it("renders without crashing", () => {
    render(<Layout onSearch={jest.fn()} />);
  });

  it("renders Header, SideNavBar, and CommunitesPosts components", () => {
    render(<Layout onSearch={jest.fn()} />);

    expect(screen.getByText("MockedHeader")).toBeInTheDocument();
    expect(screen.getByText("MockedSideNavBar")).toBeInTheDocument();
    expect(screen.getByText("MockedCommunitesPosts")).toBeInTheDocument();
  });
});
