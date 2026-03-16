# Flockjay E2E Test Automation – Playwright

## Overview

This repository contains end-to-end automated tests for critical user flows in the Flockjay staging environment.

The goal of this test suite is to validate core functionality of the application by simulating real user behavior through automated browser testing using Playwright. The tests focus on high-value workflows such as authentication and asset creation, which are essential to the user experience.

---

## Application Under Test

| Property    | Details                           |
| ----------- | --------------------------------- |
| Environment | Staging                           |
| URL         | https://staging.flockjay.com/feed |

---

## Technology Stack

| Component    | Choice                  |
| ------------ | ----------------------- |
| Framework    | Playwright              |
| Language     | TypeScript              |
| Browser      | Chromium,firefox,webkit |
| Test Pattern | Page Object Model (POM) |

**Why Playwright?**

- Reliable cross-browser automation
- Fast execution with built-in test runner
- Automatic waiting and retry mechanisms
- Excellent debugging support (trace viewer, videos, screenshots)

---

## Automated Test Coverage

The automated tests cover critical user flows that have high user impact and are stable enough for automation.

### 1. User Authentication

**Objective:** Verify that a user can successfully log in to the application.

**Flow:**

1. Navigate to login page
2. Enter valid credentials
3. Click login
4. Verify user is redirected to `/feed`

> This test also generates a persistent authentication state (`storageState.json`) which is reused across tests to avoid repeated login.

---

### 2. Create Asset Modal Access

**Objective:** Verify that the user can open and create the Asset modal.

**Flow:**

1. Navigate to `/feed`
2. Verify Create button is visible
3. Hover over the Create button
4. Click **Create Asset**
5. Verify the Create Asset modal appears
6. Verify user is able to create asset(Upload,Link,Content)

> This ensures that the primary content creation entry point is functional.

---

## Test Design Strategy

### Authentication via Setup Project

To ensure efficient and scalable test execution, the authentication flow was implemented using Playwright's **setup project and dependency mechanism**.

A dedicated authentication setup test logs into the application once and stores the authenticated session in a `storageState.json` file. This setup project is configured as a dependency for the main browser project in `playwright.config.ts`.

**This approach was chosen because:**

- It prevents repeating the login process in every test
- It significantly reduces test execution time
- It improves test stability
- It keeps individual test cases focused on the functionality being tested rather than authentication

Once the authentication state is generated, all other tests reuse this session automatically.

---

### Page Object Model (POM)

To maintain scalability and readability, the **Page Object Model** pattern was used.

Example: `tests/pages/createAsset.page.ts`

Page objects contain:

- UI locators
- Reusable actions
- Business logic for that page

**Benefits:**

- Cleaner test files
- Reduced duplication
- Easier maintenance

---

### Reliable Selectors

Selectors were chosen based on stability:

| Preferred          | Avoided                    |
| ------------------ | -------------------------- |
| `getByRole`        | Brittle CSS selectors      |
| `getByText`        | Auto-generated class names |
| `getByPlaceholder` |                            |

This ensures tests remain stable even if styling changes.

---

## Project Structure

```
flockjay-e2e-tests
│
├── tests
│   ├── setup
│   │   └── auth.setup.spec.ts        # Authentication setup
│   │
│   ├── assets
│   │   └── create-asset-upload.spec.ts  # Asset creation tests
│   │
│   └── pages
│       └── createAsset.page.ts       # Page Object for Create Asset
│
├── fixtures
│   └── sample_asset.pdf              # Test file used for upload
│
├── playwright.config.ts
├── storageState.json                 # Saved login session
└── README.md
```

---

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Install Playwright Browsers

```bash
npx playwright install
```

### 3. Run All Tests

```bash
npm run automation
```

### 4. View HTML Report

After tests run:

```bash
npm run test:report
```

This provides:

- Test results
- Screenshots
- Execution timeline
- Failure debugging

---

## Test Reliability Practices

The following Playwright best practices were followed:

- Auto waiting instead of manual waits
- Assertions for UI state
- Avoiding fragile selectors
- Reusable page objects
- Authentication reuse
- Minimal test coupling

These practices help ensure the test suite remains **stable, maintainable, and scalable**.

---

## Scalability

Although the current implementation focuses on end-to-end testing of the **Create Asset** feature, the framework and test structure were designed to be easily scalable.

The project structure, authentication setup, and Page Object Model pattern make it straightforward to add additional test coverage in the future for features such as:

- Trigger management
- AI chatbot interactions
- Task management
- Settings and configuration modules

Because the authentication state and reusable page objects are already implemented, new tests can be added with **minimal setup and without duplicating logic**. This ensures the test suite can grow efficiently as the application evolves.

---

## Manual Testing & Bug Reports

Alongside automation, exploratory testing was performed to identify potential issues and UX improvements.

**Areas explored:**

- Asset creation flows
- Trigger creation
- Chatbot interaction
- Mobile responsiveness
- Task management usability

**Issues documented:**

- Thumbnail upload error without user message
- Trigger rule validation issue
- Rubric deletion returning server error
- AI chatbot returning repeated responses
- Mobile chatbot unusable
- Missing task filtering options

These findings were documented using structured bug reports and UX improvement reports.

---

## Future Improvements

Potential enhancements for the automation suite:

- Add Link Asset and Content Asset automated tests
- Integrate tests with CI/CD pipeline
- Add visual regression tests
- Add mobile viewport testing
- Add API-level validation

---

## Conclusion

This automation
suite validates critical workflows within the Flockjay platform and demonstrates a structured approach to QA automation.

The combination of:

- Targeted E2E tests
- Exploratory testing
- Structured bug reporting

ensures both **functional correctness** and **usability insights** are captured during testing.
