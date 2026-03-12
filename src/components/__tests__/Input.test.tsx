import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Input, Textarea } from "@/components/ui/Input";

describe("Input", () => {
  it("should render as an input element", () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("should render with label", () => {
    render(<Input label="Email" />);
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("should generate id from label", () => {
    render(<Input label="Full Name" />);
    const input = screen.getByLabelText("Full Name");
    expect(input.id).toBe("full-name");
  });

  it("should use provided id over generated id", () => {
    render(<Input label="Email" id="custom-id" />);
    const input = screen.getByLabelText("Email");
    expect(input.id).toBe("custom-id");
  });

  it("should display error message", () => {
    render(<Input error="This field is required" />);
    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  it("should apply error styles when error prop is set", () => {
    render(<Input error="Error" />);
    const input = screen.getByRole("textbox");
    expect(input.className).toContain("border-error");
  });

  it("should display helper text", () => {
    render(<Input helperText="We'll never share your email" />);
    expect(screen.getByText("We'll never share your email")).toBeInTheDocument();
  });

  it("should not display helper text when error is present", () => {
    render(<Input helperText="Helper" error="Error!" />);
    expect(screen.queryByText("Helper")).not.toBeInTheDocument();
    expect(screen.getByText("Error!")).toBeInTheDocument();
  });

  it("should handle value changes", () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "hello" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("should pass through extra className", () => {
    render(<Input className="extra" />);
    const input = screen.getByRole("textbox");
    expect(input.className).toContain("extra");
  });

  it("should forward HTML attributes", () => {
    render(<Input type="email" required data-testid="email-input" />);
    const input = screen.getByTestId("email-input");
    expect(input).toHaveAttribute("type", "email");
    expect(input).toBeRequired();
  });
});

describe("Textarea", () => {
  it("should render as a textarea element", () => {
    render(<Textarea placeholder="Enter description" />);
    expect(screen.getByPlaceholderText("Enter description")).toBeInTheDocument();
  });

  it("should render with label", () => {
    render(<Textarea label="Description" />);
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
  });

  it("should display error message", () => {
    render(<Textarea error="Required" />);
    expect(screen.getByText("Required")).toBeInTheDocument();
  });

  it("should apply error styles when error is set", () => {
    render(<Textarea error="Error" />);
    const textarea = screen.getByRole("textbox");
    expect(textarea.className).toContain("border-error");
  });

  it("should generate id from label", () => {
    render(<Textarea label="Bio Text" />);
    const textarea = screen.getByLabelText("Bio Text");
    expect(textarea.id).toBe("bio-text");
  });

  it("should pass through extra className", () => {
    render(<Textarea className="custom" />);
    const textarea = screen.getByRole("textbox");
    expect(textarea.className).toContain("custom");
  });
});
