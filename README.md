# F&B Menu & Cart Application

A modern, responsive React application for food and beverage ordering with cart functionality, built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Menu Display**: Browse food items with search and category filtering
- **Cart Management**: Add items, update quantities, and remove items
- **Checkout Process**: Complete order form with customer information and payment options
- **Responsive Design**: Optimized for mobile (375px+) and desktop
- **Accessibility**: Full keyboard navigation and screen reader support
- **Mock API**: Simulated REST API with loading and error states

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with custom design tokens
- **UI Components**: Radix UI primitives with shadcn/ui
- **Testing**: Jest + React Testing Library
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd fnb-menu-cart-app
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run lint` - Run ESLint

## Testing

The application includes comprehensive tests covering:

### Test Coverage

1. **Menu Filtering Logic** (`__tests__/menu-filtering.test.tsx`)
   - Search functionality by item name
   - Category filtering (Main, Side, Beverage, Dessert)
   - Availability toggle filtering
   - No results state handling

2. **Cart Calculations** (`__tests__/cart-calculations.test.tsx`)
   - Subtotal calculation accuracy
   - 10% tax calculation
   - Grand total computation
   - Quantity updates and recalculation
   - Item removal and total updates
   - Empty cart state

### Running Tests

\`\`\`bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
\`\`\`

## Project Structure

\`\`\`
├── app/
│   ├── globals.css          # Global styles and design tokens
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main application component
├── components/
│   ├── ui/                  # Reusable UI components (shadcn/ui)
│   ├── cart-panel.tsx       # Shopping cart sidebar
│   ├── checkout-modal.tsx   # Checkout form and summary
│   ├── menu-list.tsx        # Menu items grid display
│   ├── search-and-filter.tsx # Search and filtering controls
│   ├── loading-state.tsx    # Loading spinner component
│   └── error-state.tsx      # Error handling component
├── __tests__/               # Test files
├── lib/
│   └── utils.ts             # Utility functions
└── public/                  # Static assets
\`\`\`

## Design Decisions & Trade-offs

### Architecture Choices

1. **State Management**: Used React's built-in `useState` and `useEffect` for simplicity
   - **Trade-off**: For larger applications, consider Redux Toolkit or Zustand
   - **Rationale**: Keeps the codebase simple and reduces bundle size

2. **Component Structure**: Separated concerns with dedicated components
   - **Benefits**: Reusable, testable, and maintainable code
   - **Trade-off**: More files to manage

3. **Styling Approach**: Tailwind CSS with custom design tokens
   - **Benefits**: Consistent theming, responsive design, small bundle size
   - **Trade-off**: Learning curve for developers unfamiliar with utility classes

### API Design

1. **Mock Implementation**: Simulated REST API with `setTimeout`
   - **Benefits**: Realistic loading states and error handling
   - **Trade-off**: Not production-ready, needs real backend integration

2. **Error Simulation**: 10% random error rate for testing
   - **Benefits**: Tests error handling UX
   - **Trade-off**: Can be annoying during development

### Accessibility Considerations

1. **ARIA Labels**: Comprehensive labeling for screen readers
2. **Keyboard Navigation**: Full keyboard support for all interactions
3. **Semantic HTML**: Proper use of headings, sections, and landmarks
4. **Focus Management**: Clear focus indicators and logical tab order

## What Would Be Done Next

### With More Time (Priority Order)

1. **Backend Integration**
   - Real REST API endpoints
   - Database integration (PostgreSQL/MongoDB)
   - User authentication and sessions
   - Order management system

2. **Enhanced Features**
   - User accounts and order history
   - Real-time inventory updates
   - Payment gateway integration (Stripe/PayPal)
   - Email confirmations and notifications

3. **Performance Optimizations**
   - Image optimization and lazy loading
   - Code splitting and bundle optimization
   - Caching strategies (React Query/SWR)
   - Progressive Web App (PWA) features

4. **Advanced Testing**
   - End-to-end tests with Playwright/Cypress
   - Visual regression testing
   - Performance testing
   - Accessibility testing automation

5. **DevOps & Monitoring**
   - CI/CD pipeline setup
   - Error tracking (Sentry)
   - Analytics integration
   - Performance monitoring

6. **UI/UX Enhancements**
   - Advanced animations and micro-interactions
   - Dark mode support
   - Multi-language support (i18n)
   - Advanced filtering (price range, dietary restrictions)

### Technical Debt & Improvements

1. **Type Safety**: Stricter TypeScript configuration
2. **Error Boundaries**: React error boundaries for better error handling
3. **Form Validation**: Enhanced form validation with Zod schemas
4. **State Management**: Consider Redux Toolkit for complex state
5. **Testing**: Increase test coverage to 90%+

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
