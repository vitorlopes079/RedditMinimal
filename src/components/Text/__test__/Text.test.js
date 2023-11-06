import { render, screen, fireEvent } from "@testing-library/react";
import Text from "../Text";

describe("Text", () => {
  it("should display truncated text in case the text.lenght is > 185 and display the Read More button", () => {
    const textForTest =
      "In the heart of the vast expanse of the universe, countless stars twinkled and galaxies swirled in a cosmic dance. Humans, on a tiny blue planet called Earth, gazed up in wonder, forever curious about the mysteries that lay beyond the reaches of their telescopes. With every passing moment, they yearned for answers, seeking to unravel the secrets of existence itself.";
    render(<Text text={textForTest} maxLength={185} />);

    expect(
      screen.getByText(/In the heart of the vast expanse of the universe,.../)
    ).toBeInTheDocument();

    expect(screen.getByText("Read more")).toBeInTheDocument();
  });

  it("should display the full text in case the text.lenght is < 185 and do not display the Reade More button", () => {
    const textForTest =
      "In a quiet village, the laughter of children echoed. Trees swayed gently, and the river flowed with a serene rhythm. Nature's symphony played on.";
    render(<Text text={textForTest} maxLength={185} />);
    expect(
      screen.queryByText(
        "In a quiet village, the laughter of children echoed. Trees swayed gently, and the river flowed with a serene rhythm. Nature's symphony played on."
      )
    ).toBeInTheDocument();
    expect(screen.queryByText("Read more")).not.toBeInTheDocument();
  });

  it("should toggle between truncated and full text when the 'Read more'/'Read less' button is clicked", () => {
    const textForTest =
      "In the heart of the vast expanse of the universe, countless stars twinkled and galaxies swirled in a cosmic dance. Humans, on a tiny blue planet called Earth, gazed up in wonder, forever curious about the mysteries that lay beyond the reaches of their telescopes. With every passing moment, they yearned for answers, seeking to unravel the secrets of existence itself.";
    render(<Text text={textForTest} maxLength={185} />);

    // Check initial state
    expect(screen.getByText("Read more")).toBeInTheDocument();

    // Click the 'Read more' button
    fireEvent.click(screen.getByText("Read more"));

    // Check if full text is displayed and 'Read less' button is present
    expect(screen.getByText(textForTest)).toBeInTheDocument();
    expect(screen.getByText("Read less")).toBeInTheDocument();

    // Click the 'Read less' button
    fireEvent.click(screen.getByText("Read less"));

    // Check if text is truncated again and 'Read more' button is present
    expect(
      screen.getByText(/In the heart of the vast expanse of the universe,.../)
    ).toBeInTheDocument();
    expect(screen.getByText("Read more")).toBeInTheDocument();
  });
});
