import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { App } from "#/app/app.tsx";

describe("app.tsx", () => {
  test("should render the component", () => {
    render(<App />);

    const app = screen.getByRole("main");

    expect(app).toBeInTheDocument();
    expect(app).toHaveTextContent("React TypeScript SPA");
    expect(app).toHaveTextContent(
      "An opinionated template for SPA React projects built with Vite.",
    );
  });
});
