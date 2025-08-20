## 🚀 Quick Start

## Project Description
- sample project for simple automation framework

### Prerequisites

- **Node.js** (v18 or later)
- **npm** 
- **VsCode** 

### Installation

```bash
# Clone repository
git clone <repository-url>
cd testAuto

# Install dependencies 
npm install

# Install CI
npm ci

# Install Playwright with browser
npx playwright install-deps

```

### Running Tests

```bash

# Run all tests
npm run test


# Run with UI mode (interactive)
npx playwright test --ui

![alt text](image-1.png)

# Run in headed mode (see browser)
npx playwright test --headed ( this will open a browser, but make sure you already installed dependencies)

# Run in VSCode
just click the Testing Icon to Open the Test Explorer

#Run in Github Action
Select Playwright Test Workflow and run it using main Branch
![alt text](image-2.png)

```

### Browser Support

- **Chrome Desktop** (Primary)
- Firefox (Available)
- Safari/WebKit (Available)

## 📁 Project Structure

```
├── fixtures/          # Test fixtures and shared configurations
├── page/             # Page Object Models
│   ├── MainPage.ts
│   ├── ProductDetailsPage.ts
│   └── ShoppingCartPage.ts
├── tests/            # Test files
│   └── addToCartScenario.spec.ts
├── utils/            # Utility functions
│   └── CustomAssertions.ts
└── playwright-report/ # Test execution reports
```

## 📊 Test Reports

After running the tests, you can view the HTML report:

```bash
npx playwright show-report
```

The report includes:
- Test results summary
- Test execution details
- Screenshots (if any)
- Trace viewer for debugging

## 🔍 Debugging Tests

1. Use VS Code Test Explorer:
   - Click on the Testing icon in the sidebar
   - Find your test
   - Click the debug icon next to the test

2. Debug in UI Mode:
   ```bash
   npx playwright test --ui
   ```

## 📝 Writing Tests

Example test structure:
```typescript
test('Add to Cart without Customisation', async ({ page }) => {
    // Test implementation
});
```

For more information, visit [Playwright Documentation](https://playwright.dev/docs/intro)
````
