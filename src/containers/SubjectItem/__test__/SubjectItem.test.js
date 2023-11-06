// Import necessary methods and components from React Testing Library and React itself
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import SubjectItem from "../SubjectItem"; // Update the import path as necessary
import { faCoffee } from "@fortawesome/free-solid-svg-icons"; // Just an example icon for testing

describe("SubjectItem", () => {
  // Mock the props
  
  const mockOnSubjectClick = jest.fn();
  const mockOnToggleSubject = jest.fn();
  const subjectProps = {
    icon: faCoffee,
    title: "Test Title",
    subjects: ["Subtopic 1", "Subtopic 2", "Subtopic 3"],
    onSubjectClick: mockOnSubjectClick,
    onToggleSubject: mockOnToggleSubject,
    isExpanded: false,
  };

  it("renders correctly", () => {
    render(<SubjectItem {...subjectProps} />);
    // Check if the title is present
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("expands/collapses subjects when the title is clicked", () => {
    render(<SubjectItem {...subjectProps} />);
    // Find title element and click it
    fireEvent.click(screen.getByText("Test Title"));
    // onToggleSubject function should be called
    expect(mockOnToggleSubject).toHaveBeenCalledWith("Test Title");
  });

  it("calls onSubjectClick when a subject is clicked", () => {
    // Render with isExpanded to true to show the subjects
    render(<SubjectItem {...subjectProps} isExpanded={true} />);
    // Click on the first subject
    fireEvent.click(screen.getByText("Subtopic 1"));
    // onSubjectClick function should be called with the subject's text
    expect(mockOnSubjectClick).toHaveBeenCalledWith("Subtopic 1");
  });

  it("does not show subjects when isExpanded is false", () => {
    render(<SubjectItem {...subjectProps} isExpanded={false} />);

    expect(screen.queryByText("Subtopic 1")).not.toBeVisible();
  });

  it("shows subjects when isExpanded is true", () => {
    render(<SubjectItem {...subjectProps} isExpanded={true} />);
    // Subjects should be in the document because isExpanded is true
    expect(screen.getByText("Subtopic 1")).toBeInTheDocument();
  });
});
