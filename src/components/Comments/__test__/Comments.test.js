import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Comments from "../Comments";


describe("Comments", () => {
  const sampleComments = [
    {
      data: {
        id: "1",
        author: "Author1",
        body: "Comment 1",
        replies: {
          data: {
            children: [
              {
                data: {
                  id: "1.1",
                  author: "ReplyAuthor1.1",
                  body: "Reply 1 to Comment 1",
                  replies: null,
                },
              },
            ],
          },
        },
      },
    },
    {
      data: {
        id: "2",
        author: "Author2",
        body: "Comment 2",
        replies: null,
      },
    },
    {
      data: {
        id: "3",
        author: "Author3",
        body: "Comment 3",
        replies: null,
      },
    },
  ];

  it("renders the comments passed as a prop", () => {
    render(<Comments comments={sampleComments} numCommentsToShow={2} />);

    expect(screen.getByText("Comment 1")).toBeInTheDocument();
    expect(screen.getByText("Comment 2")).toBeInTheDocument();
    expect(screen.queryByText("Comment 3")).toBeNull(); // It shouldn't appear because we're only showing 2 out of 3 comments
  });

  it("displays the 'Show more comments' button when there are more comments", () => {
    render(<Comments comments={sampleComments} numCommentsToShow={2} />);

    expect(screen.getByText("Show more comments")).toBeInTheDocument();
  });

  it("doesn't display the 'Show more comments' button when there aren't more comments to show", () => {
    render(<Comments comments={sampleComments} numCommentsToShow={3} />); // Now we're showing all 3 comments

    expect(screen.queryByText("Show more comments")).toBeNull(); // Button should not appear
  });

  
  it("calls addMoreComments when 'Show more comments' button is clicked", () => {
    const addMoreCommentsMock = jest.fn(); // Create a mock function
    render(
      <Comments
        comments={sampleComments}
        numCommentsToShow={2}
        addMoreComments={addMoreCommentsMock}
      />
    );

    userEvent.click(screen.getByText("Show more comments")); // Simulate button click
    expect(addMoreCommentsMock).toHaveBeenCalledTimes(1); // Check if the function was called
  });
});
