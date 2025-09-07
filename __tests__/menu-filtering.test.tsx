import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import MenuApp from "@/app/page"
import jest from "jest" // Import jest to fix the undeclared variable error

// Mock Math.random to prevent random API errors in tests
const mockMathRandom = jest.spyOn(Math, "random")

describe("Menu Filtering Logic", () => {
  beforeEach(() => {
    // Mock Math.random to prevent random API errors in tests
    mockMathRandom.mockReturnValue(0.5)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test("filters menu items by search term", async () => {
    render(<MenuApp />)

    // Wait for loading to complete
    await waitFor(
      () => {
        expect(screen.queryByText("Loading Menu")).not.toBeInTheDocument()
      },
      { timeout: 3000 },
    )

    // Check that all items are initially displayed
    expect(screen.getByText("Beef Bulgogi Rice")).toBeInTheDocument()
    expect(screen.getByText("Chicken Teriyaki Bowl")).toBeInTheDocument()
    expect(screen.getByText("Miso Soup")).toBeInTheDocument()

    // Search for "beef"
    const searchInput = screen.getByRole("searchbox", { name: /search menu items/i })
    fireEvent.change(searchInput, { target: { value: "beef" } })

    // Should only show Beef Bulgogi Rice
    await waitFor(() => {
      expect(screen.getByText("Beef Bulgogi Rice")).toBeInTheDocument()
      expect(screen.queryByText("Chicken Teriyaki Bowl")).not.toBeInTheDocument()
      expect(screen.queryByText("Miso Soup")).not.toBeInTheDocument()
    })
  })

  test("filters menu items by category", async () => {
    render(<MenuApp />)

    await waitFor(
      () => {
        expect(screen.queryByText("Loading Menu")).not.toBeInTheDocument()
      },
      { timeout: 3000 },
    )

    // Select "Main" category
    const categorySelect = screen.getByRole("combobox", { name: /select category filter/i })
    fireEvent.click(categorySelect)

    const mainOption = screen.getByText("Main Dishes")
    fireEvent.click(mainOption)

    // Should only show main dishes
    await waitFor(() => {
      expect(screen.getByText("Beef Bulgogi Rice")).toBeInTheDocument()
      expect(screen.getByText("Chicken Teriyaki Bowl")).toBeInTheDocument()
      expect(screen.queryByText("Miso Soup")).not.toBeInTheDocument()
      expect(screen.queryByText("Green Tea")).not.toBeInTheDocument()
    })
  })

  test("filters out unavailable items when toggle is enabled", async () => {
    render(<MenuApp />)

    await waitFor(
      () => {
        expect(screen.queryByText("Loading Menu")).not.toBeInTheDocument()
      },
      { timeout: 3000 },
    )

    // Initially, unavailable items should be visible but disabled
    expect(screen.getByText("Green Tea")).toBeInTheDocument()

    // Toggle "Available only" switch
    const availableOnlySwitch = screen.getByRole("switch", { name: /available only/i })
    fireEvent.click(availableOnlySwitch)

    // Green Tea should be filtered out
    await waitFor(() => {
      expect(screen.queryByText("Green Tea")).not.toBeInTheDocument()
      expect(screen.getByText("Beef Bulgogi Rice")).toBeInTheDocument()
    })
  })

  test("shows no results message when no items match filters", async () => {
    render(<MenuApp />)

    await waitFor(
      () => {
        expect(screen.queryByText("Loading Menu")).not.toBeInTheDocument()
      },
      { timeout: 3000 },
    )

    // Search for something that doesn't exist
    const searchInput = screen.getByRole("searchbox", { name: /search menu items/i })
    fireEvent.change(searchInput, { target: { value: "pizza" } })

    // Should show no results message
    await waitFor(() => {
      expect(screen.getByText("No items found")).toBeInTheDocument()
      expect(screen.getByText("Try adjusting your search or filter criteria")).toBeInTheDocument()
    })
  })
})
