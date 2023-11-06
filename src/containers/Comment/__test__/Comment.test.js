import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Comment from "../Comment";

// Mock data for a comment with two replies
const mockCommentWithTwoReplies = {
  data: {
    author: 'testAuthor',
    body: 'This is a test comment',
    replies: {
      data: {
        children: [
          { data: { id: 'reply1', author: 'replyAuthor1', body: 'This is reply 1' } },
          { data: { id: 'reply2', author: 'replyAuthor2', body: 'This is reply 2' } },
        ],
      },
    },
  },
};

// Mock data for a comment with more than two replies
const mockCommentWithMoreReplies = {
  ...mockCommentWithTwoReplies,
  data: {
    ...mockCommentWithTwoReplies.data,
    replies: {
      data: {
        children: [
          ...mockCommentWithTwoReplies.data.replies.data.children,
          { data: { id: 'reply3', author: 'replyAuthor3', body: 'This is reply 3' } },
          // Add more replies if needed for other tests
        ],
      },
    },
  },
};

describe('Comment component', () => {
  test('renders comment author and body', () => {
    render(<Comment comment={mockCommentWithTwoReplies} />);
    const authorElement = screen.getByText(mockCommentWithTwoReplies.data.author);
    const bodyElement = screen.getByText(mockCommentWithTwoReplies.data.body);

    expect(authorElement).toBeInTheDocument();
    expect(bodyElement).toBeInTheDocument();
  });

  test('initially does not show replies', () => {
    render(<Comment comment={mockCommentWithTwoReplies} />);
    const seeAnswersButton = screen.getByText('See Answers');
    
    expect(seeAnswersButton).toBeInTheDocument();
    expect(screen.queryByText('This is reply 1')).not.toBeInTheDocument();
  });

  test('shows replies when "See Answers" is clicked', () => {
    render(<Comment comment={mockCommentWithTwoReplies} />);
    const seeAnswersButton = screen.getByText('See Answers');
    fireEvent.click(seeAnswersButton);

    expect(screen.getByText('This is reply 1')).toBeInTheDocument();
    expect(screen.getByText('This is reply 2')).toBeInTheDocument();
  });

  // We are not clicking "Show More" here since we're only testing the initial state
  test('does not show "Show More" when there are only two replies', () => {
    render(<Comment comment={mockCommentWithTwoReplies} />);
    const seeAnswersButton = screen.getByText('See Answers');
    fireEvent.click(seeAnswersButton);
    
    const showMoreButton = screen.queryByText('Show More');
    expect(showMoreButton).not.toBeInTheDocument();
  });

  test('shows "Show More" when there are more than two replies', () => {
    render(<Comment comment={mockCommentWithMoreReplies} />);
    const seeAnswersButton = screen.getByText('See Answers');
    fireEvent.click(seeAnswersButton);

    const showMoreButton = screen.getByText('Show More');
    expect(showMoreButton).toBeInTheDocument();

    fireEvent.click(showMoreButton);
    expect(screen.getByText('This is reply 3')).toBeInTheDocument();
  });

  
});