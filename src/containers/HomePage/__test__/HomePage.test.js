import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import HomePage from "../HomePage";
import "@testing-library/jest-dom/extend-expect";

// Mock the components that HomePage depends on
jest.mock("../../../components/PostContainer/PostContainer", () => {
  return (props) => {
    return (
      <div data-testid="mock-post-container">
        Mocked Post Container - {props.timeSince}
      </div>
    );
  };
});

jest.mock("../../../components/Loading/Loading", () => {
  return () => <div data-testid="loader">Loading...</div>;
});

jest.mock("../../../components/NetworkError/NetworkError", () => {
  return () => <div>Network Error</div>;
});

const mockData = {
  data: {
    children: [
      {
        data: {
          id: "post1",
          author: "Test Author 1",
          // Initially set with some default value that can be overwritten in a specific test
          created_utc: 0,
          num_comments: 5,
          is_reddit_media_domain: false,
          thumbnail: "self",
          is_video: false,
          url: "http://example.com/post1",
          title: "Test Post 1",
          selftext: "",
          domain: "example.com",
          secure_media: {
            reddit_video: {
              fallback_url: "http://example.com/video.mp4",
            },
          },
        },
      },
      // ... other mocked posts if necessary
    ],
  },
};

describe("HomePage", () => {
  // Setup mock for Date.now()
  const mockCurrentTime = new Date("2023-11-06T12:00:00Z").getTime();
  beforeAll(() => {
    jest.spyOn(global.Date, "now").mockImplementation(() => mockCurrentTime);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("calculates time since post correctly", async () => {
    // Set up mock current time
    const mockCurrentTime = new Date("2023-11-06T12:00:00Z").getTime();
    jest.spyOn(global.Date, "now").mockImplementation(() => mockCurrentTime);

    // Calculate one hour and one minute ago in UNIX timestamp (milliseconds)
    const oneHourAndOneMinuteAgo =
      new Date("2023-11-06T10:59:00Z").getTime() / 1000;
    mockData.data.children[0].data.created_utc = oneHourAndOneMinuteAgo;
    // Render the HomePage component with the mock data
    render(
      <Router>
        <HomePage isLoading={false} data={mockData} error={null} />
      </Router>
    );

    // Wait for the async elements of the component to settle
    await waitFor(() => {
      // Check if the mock post container received the correct "time since" prop
      const timeSinceText = screen.getByTestId(
        "mock-post-container"
      ).textContent;
      expect(timeSinceText).toContain("1 hour ago");
    });

    // Clean up mocks
    jest.restoreAllMocks();
  });

  it("renders Loading component when isLoading is true", () => {
    render(
      <Router>
        <HomePage isLoading={true} />
      </Router>
    );
    // Expect the mocked loading component to be in the document
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("renders NetworkError component when there is an error", () => {
    const errorMessage = "Network error";
    render(
      <Router>
        <HomePage error={errorMessage} />
      </Router>
    );
    // Expect the mocked error message to be in the document
    expect(screen.getByText("Network Error")).toBeInTheDocument();
  });

  it("renders Posts components when data is provided", () => {
    render(
      <Router>
        <HomePage data={mockData} />
      </Router>
    );
    // Expect the mocked post container to be in the document
    const postContainerRegex = /Mocked Post Container -/;
    expect(screen.getByText(postContainerRegex)).toBeInTheDocument();
  });
});
