import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SideNavBar from "../SideNavBar";
import { BrowserRouter } from "react-router-dom";
import {
  subjectsData,
  additionalSubjectsData,
} from "../../../assets/subjectsData";

// Mock navigate
const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("SideNavBar", () => {
  const mockOnClick = jest.fn();
  const setup = () =>
    render(
      <BrowserRouter>
        <SideNavBar onClick={mockOnClick} />
      </BrowserRouter>
    );

  it("expands the subject item to show more topics when clicked", () => {
    setup();

    const subjectItem = screen.getByText(subjectsData[0].title);
    fireEvent.click(subjectItem);

    const additionalTopic = subjectsData[0].topics[0];
    expect(screen.getByText(additionalTopic)).toBeInTheDocument();
  });

  it('renders additional subjects correctly when "see more" is clicked', () => {
    setup();
    const button = screen.getByRole("button", { name: /see more/i });
    fireEvent.click(button); // Show additional topics
    additionalSubjectsData.forEach((subject) => {
      expect(screen.getByText(subject.title)).toBeInTheDocument();
    });
  });

  it("handles click on subtopic correctly", () => {
    setup();

    // Find a subject with subtopics
    const subjectWithSubtopics = subjectsData.find(
      (subject) => subject.topics && subject.topics.length > 0
    );
    const subjectItem = screen.getByText(subjectWithSubtopics.title);

    // Click on the subject to expand the subtopics list
    fireEvent.click(subjectItem);

    // Wait for subtopics to appear before clicking
    const subtopicItem = screen.getByText(subjectWithSubtopics.topics[0]);
    expect(subtopicItem).toBeInTheDocument(); // Ensure the subtopic is now visible

    // Now click on the first subtopic

    fireEvent.click(subtopicItem);

    expect(mockOnClick).toHaveBeenCalledWith(subjectWithSubtopics.topics[0]);
    expect(mockedNavigate).toHaveBeenCalledWith("/");
  });

  it("handles click on see more button to see other topics and then click in a topic that has no subtopics", () => {
    setup();

    // find the see more button
    const buttonItem = screen.getByTestId("buttonItem");
    fireEvent.click(buttonItem);

    // Find the topics
    const subjectItem = screen.getByText(additionalSubjectsData[0].title);

    // Now click on the topic
    fireEvent.click(subjectItem);

    expect(mockOnClick).toHaveBeenCalledWith(additionalSubjectsData[0].title);
    expect(mockedNavigate).toHaveBeenCalledWith("/");
  });

  it("handle ckick on Popular correctly", () => {
    setup();

    // Find the pouplar button
    const popularItem = screen.getByTestId("popularItem");

    // Now click on the topic
    fireEvent.click(popularItem);

    expect(mockOnClick).toHaveBeenCalledWith("Popular");
    expect(mockedNavigate).toHaveBeenCalledWith("/");
  });
});
