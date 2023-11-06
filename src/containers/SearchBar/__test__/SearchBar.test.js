import { fireEvent, render, screen } from '@testing-library/react';
import SearchBar from '../SearchBar';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock the navigate function from useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('SearchBar', () => {
  // Clear all mocks before each test
  beforeEach(() => jest.clearAllMocks());

  test('renders the search input and button', () => {
    render(
      <Router>
        <SearchBar onSearch={jest.fn()} />
      </Router>
    );
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('updates the query state on input change', () => {
    render(
      <Router>
        <SearchBar onSearch={jest.fn()} />
      </Router>
    );
    const inputElement = screen.getByPlaceholderText('Search...');
    fireEvent.change(inputElement, { target: { value: 'new query' } });
    expect(inputElement.value).toBe('new query');
  });

  test('calls onSearch and navigate when the form is submitted', () => {
    const mockOnSearch = jest.fn();
    render(
      <Router>
        <SearchBar onSearch={mockOnSearch} />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText('Search...'), {
      target: { value: 'test' },
    });
    fireEvent.submit(screen.getByRole('button'));

    expect(mockOnSearch).toHaveBeenCalledWith('test');
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

 
});