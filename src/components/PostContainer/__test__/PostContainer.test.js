import { render, screen, fireEvent } from "@testing-library/react";
import PostContainer from "../PostContainer";
import placeholderImage from "../../../assets/no_media.png";
import { waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock("remark-gfm", () => ({}));
jest.mock("react-markdown", () => jest.fn().mockReturnValue(null));

describe("PostContainer", () => {
  // Test Data Setup
  const baseProps = {
    title: "<h2>Test Title</h2>",
    selftext: "# This is markdown content",
    is_video: false,
    imageUrl: "",
    videoUrl: "",
    author: "test_author",
    timeSince: "3 hours ago",
    numComments: 10,
    postId: "test123",
  };

  it("renders the title correctly", () => {
    render(
      <Router>
        <PostContainer {...baseProps} />
      </Router>
    );
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("renders video content if post is a video", () => {
    const videoProps = {
      ...baseProps,
      is_video: true,
      videoUrl: "https://testvideo.com/video.mp4",
    };
    render(
      <Router>
        <PostContainer {...videoProps} />
      </Router>
    );
    const videoElem = screen.getByTestId("video-element");
    expect(videoElem).toBeInTheDocument();
    expect(
      screen.getByText("Your browser does not support the video tag.")
    ).toBeInTheDocument();
  });

  it("renders image post correctly", async () => {
    const imageProps = {
      ...baseProps,
      isImagePost: true,
      imageUrl: "https://testimage.com/image.jpg",
    };

    render(
      <Router>
        <PostContainer {...imageProps} />
      </Router>
    );

    const imgElem = screen.getByRole("img", { name: /post media/i });
    expect(imgElem).toHaveAttribute("src", "https://testimage.com/image.jpg");
  });

  it("renders placeholder if image fails to load", async () => {
    const imageProps = {
      ...baseProps,
      isImagePost: true,
      imageUrl: "https://testimage.com/faulty-image.jpg", // intentional bad URL
    };

    render(
      <Router>
        <PostContainer {...imageProps} />
      </Router>
    );

    const imgElem = screen.getByRole("img", { name: /post media/i });

    // Simulate the image load failure
    fireEvent.error(imgElem);

    await waitFor(() => {
      // Assert that the src has been updated to the placeholder image.
      expect(imgElem).toHaveAttribute("src", placeholderImage);
    });
  });

 
});