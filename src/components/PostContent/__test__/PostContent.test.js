import { render, screen, fireEvent } from "@testing-library/react";
import PostContent from "../PostContent";
import placeholderImage from "../../../assets/no_media.png";
import { waitFor } from "@testing-library/react";

jest.mock("remark-gfm", () => ({}));
jest.mock("react-markdown", () => jest.fn().mockReturnValue(null));

describe("PostContent", () => {
  // Test Data Setup
  const mockPost = {
    data: {
      title: "<h2>Test Title</h2>",
      selftext: "# This is markdown content",
      is_video: false,
      is_reddit_media_domain: false,
      thumbnail: "self",
      domain: "",
      url: "",
      secure_media: {
        reddit_video: {
          fallback_url: "",
        },
      },
    },
  };

  it("renders the title correctly", () => {
    render(<PostContent post={mockPost} />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("renders video content if post is a video", () => {
    const videoPost = {
      ...mockPost,
      data: {
        ...mockPost.data,
        is_video: true,
        secure_media: {
          reddit_video: {
            fallback_url: "https://testvideo.com/video.mp4",
          },
        },
      },
    };
    render(<PostContent post={videoPost} />);
    const videoElem = screen.getByTestId("video-element");
    expect(videoElem).toBeInTheDocument();
    expect(
      screen.getByText("Your browser does not support the video tag.")
    ).toBeInTheDocument();
  });

  it("renders image post correctly", async () => {
    const imagePost = {
      ...mockPost,
      data: {
        ...mockPost.data,
        is_reddit_media_domain: true,
        thumbnail: "https://testimage.com/thumbnail.jpg",
        url: "https://testimage.com/image.jpg",
      },
    };

    render(<PostContent post={imagePost} />);

    // Waiting for the image to load, considering there might be a delay.
    await waitFor(() => {
      const imgElem = screen.getByRole("img", { name: /post media/i });
      expect(imgElem).toHaveAttribute("src", "https://testimage.com/image.jpg");
    });
  });

  it("renders placeholder if image fails to load", async () => {
    // Mock the post object with faulty image URL
    const postWithFaultyImage = {
      data: {
        title: "Test Title with Faulty Image",
        thumbnail: "this-will-fail-to-load.jpg", // intentional bad URL
        domain: "",
        is_video: false,
        is_reddit_media_domain: true,
        url: "https://testimage.com/faulty-image.jpg", // intentional bad URL
        // include other necessary properties that your component expects
      },
    };

    // Render the component with the mock post object
    render(<PostContent post={postWithFaultyImage} />);

    // Find the image element. Adjust the query as needed.
    const imgElem = screen.getByRole("img", { name: /post media/i });

    // Manually trigger the error handler as if the image failed to load.
    fireEvent.error(imgElem);

    // Assert that the src has been updated to the placeholder image.
    expect(imgElem).toHaveAttribute("src", placeholderImage);
  });
});
