import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCommentAlt } from "@fortawesome/free-solid-svg-icons";
import PostFooter from "../PostFooter";

// Add FontAwesome icons to the library for the test
library.add(faCommentAlt);

describe("PostFooter", () => {
  const author = "TestAuthor";
  const timeSince = "1 hour ago";
  const numComments = "15 comments";

  beforeEach(() => {
    render(
      <PostFooter
        author={author}
        timeSince={timeSince}
        numComments={numComments}
      />
    );
  });

  it("renders PostFooter component", () => {
    const footerElement = screen.getByTestId("post-footer");
    expect(footerElement).toBeInTheDocument();
  });

  it("displays the author", () => {
    const authorElement = screen.getByText("TestAuthor");
    expect(authorElement).toBeInTheDocument();
  });

  it("displays time since posted", () => {
    const timeSinceElement = screen.getByText(new RegExp(timeSince, "i"));
    expect(timeSinceElement).toBeInTheDocument();
  });

  it("displays number of comments", () => {
    const commentsElement = screen.getByText(new RegExp(numComments, "i"));
    expect(commentsElement).toBeInTheDocument();
  });

  it("displays the comment icon", () => {
       const commentIcon = screen.getByTestId("comment-icon");
      expect(commentIcon).toBeInTheDocument();
     });
});
