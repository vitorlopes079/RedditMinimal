import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter for providing router context
import HomePage from "../HomePage";
import "@testing-library/jest-dom/extend-expect";

describe("HomePage", () => {
  const mockData = {
    data: {
      children: [
        {
          data: {
            domain: "example.com",
            id: "post1",
            title: "Test Post 1",
            author: "Test Author 1",
            created_utc: Math.floor(Date.now() / 1000) - 60, // 1 minute ago
            num_comments: 5,
            is_reddit_media_domain: false,
            thumbnail: "self",
            is_video: false,
          },
        },
      ],
    },
  };

  it("renders Loading component when isLoading is true", () => {
    render(
      <Router>
        <HomePage isLoading={true} />
      </Router>
    );
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("renders NetworkError component when there is an error", () => {
    const errorMessage = "Network error";
    render(
      <Router>
        <HomePage error={errorMessage} />
      </Router>
    );
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("renders Posts components when data is provided", () => {
    render(
      <Router>
        <HomePage data={mockData} />
      </Router>
    );
    expect(screen.getByText("Test Post 1")).toBeInTheDocument();
    expect(screen.getByText("Test Author 1")).toBeInTheDocument();
    expect(screen.getByText("1 minute ago")).toBeInTheDocument();
  });

  it("calculates time since post correctly", () => {
    // Mock Date.now before rendering the component
    const originalDateNow = Date.now;
    const mockedDate = Math.floor(Date.now() / 1000) - 60 * 60; // 1 hour ago
    global.Date.now = jest.fn(() => mockedDate * 1000);
  
    render(
      <Router>
        <HomePage data={mockData} />
      </Router>
    );
  
    
    expect(screen.getByText("-59 minutes ago")).toBeInTheDocument()
  
    // Reset Date.now after the test
    global.Date.now = originalDateNow;
  });
  
});
