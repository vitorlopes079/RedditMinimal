// The App component serves as the root of our application and is inherently coupled with various child components and their respective behaviors. Due to this interdependency, unit testing the App component in isolation presents limited value and can be challenging. It is more practical and beneficial to validate the integrated functioning of the App component along with its child components through end-to-end testing. This approach ensures that we test the application as a whole, reflecting real-world user interactions and flows. Consequently, our focus on unit tests will be directed towards individual, isolated components, whereas the broader application behavior will be assessed via comprehensive end-to-end tests.

jest.mock("remark-gfm", () => ({
  __esModule: true,
  default: () => {},
}));

jest.mock("react-markdown", () => {
  return ({ children }) => <div>{children}</div>;
});

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

describe("App Component", () => {
  // Mocking fetch before each test
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks to reset any previous state
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            // Mocking the data structure returned by Reddit API
            data: {
              children: [
                {
                  data: {
                    title: "Test Post",
                    subscribers: 12345,
                    // ... other post data
                  },
                },
                // ... other posts
              ],
            },
          }),
        ok: true,
      })
    );
    window.gtag = jest.fn();
  });

  it("renders HomePage component on base route", async () => {
    render(<App />);
    const homePageElement = await screen.findByText(/loading/i);
    expect(homePageElement).toBeInTheDocument();
  });

  it("renders NotFound component for unknown route", async () => {
    window.history.pushState({}, "", "/some/bad/route");
    render(<App />);
    const notFoundText = await screen.findByText(/not found/i);
    expect(notFoundText).toBeInTheDocument();
  });

  it("fetches data and displays loading state", async () => {
    render(<App />);

    // This will wait for the `fetch` to be called at least once.
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    // This will check for the loading text in the document.
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // This will wait for the loading text to disappear, which should happen after the fetch is complete.
    await waitFor(() => expect(screen.queryByText(/loading/i)).toBeNull());
  });
});
