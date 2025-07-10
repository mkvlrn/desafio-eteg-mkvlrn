import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Logo } from "#/components/logo/logo.tsx";

describe("logo.tsx", () => {
  test("should render the component", () => {
    render(<Logo />);

    const logo = screen.getByRole("img");

    expect(logo).toBeInTheDocument();
  });
});
