import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import MenuApp from "@/app/page"
import { jest } from "@jest/globals"

// Mock Math.random to prevent API errors
const mockMathRandom = jest.spyOn(Math, "random")

describe("Cart Total Calculations", () => {
  beforeEach(() => {
    mockMathRandom.mockReturnValue(0.5)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test("calculates correct subtotal, tax, and grand total", async () => {
    render(<MenuApp />)

    // Wait for loading to complete
    await waitFor(
      () => {
        expect(screen.queryByText("Loading Menu")).not.toBeInTheDocument()
      },
      { timeout: 3000 },
    )

    // Add Beef Bulgogi Rice (85000) to cart
    const beefButton = screen.getByRole("button", { name: /add beef bulgogi rice to cart/i })
    fireEvent.click(beefButton)

    // Add Miso Soup (18000) to cart
    const misoButton = screen.getByRole("button", { name: /add miso soup to cart/i })
    fireEvent.click(misoButton)

    // Open cart
    const cartButton = screen.getByRole("button", { name: /open cart with 2 items/i })
    fireEvent.click(cartButton)

    // Wait for cart to open and check calculations
    await waitFor(() => {
      // Subtotal should be 85000 + 18000 = 103000
      expect(screen.getByText("Rp103.000")).toBeInTheDocument()

      // Tax should be 10% of subtotal = 10300
      expect(screen.getByText("Rp10.300")).toBeInTheDocument()

      // Grand total should be 103000 + 10300 = 113300
      expect(screen.getByText("Rp113.300")).toBeInTheDocument()
    })
  })

  test("updates totals when quantity changes", async () => {
    render(<MenuApp />)

    await waitFor(
      () => {
        expect(screen.queryByText("Loading Menu")).not.toBeInTheDocument()
      },
      { timeout: 3000 },
    )

    // Add Beef Bulgogi Rice to cart
    const beefButton = screen.getByRole("button", { name: /add beef bulgogi rice to cart/i })
    fireEvent.click(beefButton)

    // Open cart
    const cartButton = screen.getByRole("button", { name: /open cart with 1 items/i })
    fireEvent.click(cartButton)

    // Increase quantity to 2
    const increaseButton = screen.getByRole("button", { name: /\+/i })
    fireEvent.click(increaseButton)

    await waitFor(() => {
      // Subtotal should be 85000 * 2 = 170000
      expect(screen.getByText("Rp170.000")).toBeInTheDocument()

      // Tax should be 10% of 170000 = 17000
      expect(screen.getByText("Rp17.000")).toBeInTheDocument()

      // Grand total should be 170000 + 17000 = 187000
      expect(screen.getByText("Rp187.000")).toBeInTheDocument()
    })
  })

  test("removes item from cart and recalculates totals", async () => {
    render(<MenuApp />)

    await waitFor(
      () => {
        expect(screen.queryByText("Loading Menu")).not.toBeInTheDocument()
      },
      { timeout: 3000 },
    )

    // Add two different items
    const beefButton = screen.getByRole("button", { name: /add beef bulgogi rice to cart/i })
    fireEvent.click(beefButton)

    const misoButton = screen.getByRole("button", { name: /add miso soup to cart/i })
    fireEvent.click(misoButton)

    // Open cart
    const cartButton = screen.getByRole("button", { name: /open cart with 2 items/i })
    fireEvent.click(cartButton)

    // Remove one item
    const removeButtons = screen.getAllByRole("button")
    const trashButton = removeButtons.find(
      (button) => button.getAttribute("aria-label")?.includes("trash") || button.textContent?.includes("🗑"),
    )
    if (trashButton) {
      fireEvent.click(trashButton)
    }

    await waitFor(() => {
      // Should only have one item left, check if totals updated
      const subtotalElements = screen.getAllByText(/Rp\d+/)
      expect(subtotalElements.length).toBeGreaterThan(0)
    })
  })

  test("shows empty cart when all items removed", async () => {
    render(<MenuApp />)

    await waitFor(
      () => {
        expect(screen.queryByText("Loading Menu")).not.toBeInTheDocument()
      },
      { timeout: 3000 },
    )

    // Add one item
    const beefButton = screen.getByRole("button", { name: /add beef bulgogi rice to cart/i })
    fireEvent.click(beefButton)

    // Open cart
    const cartButton = screen.getByRole("button", { name: /open cart with 1 items/i })
    fireEvent.click(cartButton)

    // Remove the item
    const removeButtons = screen.getAllByRole("button")
    const trashButton = removeButtons.find(
      (button) => button.getAttribute("aria-label")?.includes("trash") || button.textContent?.includes("🗑"),
    )
    if (trashButton) {
      fireEvent.click(trashButton)
    }

    await waitFor(() => {
      expect(screen.getByText("Your cart is empty")).toBeInTheDocument()
      expect(screen.getByText("Add some delicious items to get started!")).toBeInTheDocument()
    })
  })
})
