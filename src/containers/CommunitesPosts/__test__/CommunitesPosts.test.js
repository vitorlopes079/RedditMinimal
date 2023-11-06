import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils"; // Correct import for act
import "@testing-library/jest-dom";
import CommunitesPosts from "../CommunitesPosts";
import { useNavigate } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // import and spread all the actual exported members
  useNavigate: jest.fn(),
}));

const mockFetch = (ok, payload) => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: ok,
      json: () => Promise.resolve(payload),
    })
  );
};

describe("CommunitesPosts", () => {
  beforeEach(() => {
    mockFetch(true, {
      data: {
        children: [
          {
            data: {
              id: "1",
              display_name: "testCommunity",
              subscribers: 123456,
            },
          },
        ],
      },
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("displays communities after successful fetch", async () => {
    render(<CommunitesPosts onClick={jest.fn()} />);
    await waitFor(() => expect(screen.getByText("testCommunity")).toBeInTheDocument());
    expect(screen.getByText(/123,456 members/i)).toBeInTheDocument();
  });

  it("handles click on community", async () => {
    const navigate = jest.fn();
    useNavigate.mockImplementation(() => navigate);

    render(<CommunitesPosts onClick={jest.fn()} />);

    await waitFor(() =>
      expect(screen.getByText(/testCommunity/i)).toBeInTheDocument()
    );

    // Wrap the user event in act
    await act(async () => {
      userEvent.click(screen.getByText(/testCommunity/i));
    });

    expect(navigate).toHaveBeenCalledWith("/"); // Check if navigation was called
  });

  it("displays an error message when the fetch fails", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.reject(new Error("Network Error"))
    );
    render(<CommunitesPosts onClick={jest.fn()} />);
    await waitFor(() => expect(screen.getByText(/error/i)).toBeInTheDocument());
  });
});
