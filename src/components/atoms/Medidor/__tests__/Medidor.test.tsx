import { render, screen } from "@testing-library/react";
import Medidor from "../Medidor"; 
import { describe, it } from "vitest";

describe("Medidor", () => {
  it("When rendered with valid value and max, then displays correct gauge text", () => {
    // Arrange
    const value = 60;
    const max = 100;

    // Act
    render(<Medidor value={value} max={max} />);

    // Assert
    expect(screen.getByText(`${value} / ${max}`)).toBeInTheDocument();
  });

  it("When rendered with value equal to max, then displays full gauge correctly", () => {
    // Arrange
    const value = 100;
    const max = 100;

    // Act
    render(<Medidor value={value} max={max} />);

    // Assert
    expect(screen.getByText("100 / 100")).toBeInTheDocument();
  });

  it("When rendered with value 0, then displays empty gauge correctly", () => {
    // Arrange
    const value = 0;
    const max = 100;

    // Act
    render(<Medidor value={value} max={max} />);

    // Assert
    expect(screen.getByText("0 / 100")).toBeInTheDocument();
  });

  it("When value exceeds max, then still displays value / max text", () => {
    // Arrange
    const value = 120;
    const max = 100;

    // Act
    render(<Medidor value={value} max={max} />);

    // Assert
    expect(screen.getByText("120 / 100")).toBeInTheDocument();
  });
});
