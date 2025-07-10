import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Title } from "#/components/title/title.tsx";

describe("title.tsx", () => {
  test("should render the component", () => {
    render(<Title />);

    const title = screen.getByRole("heading");

    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("React TypeScript SPA");
  });
});
