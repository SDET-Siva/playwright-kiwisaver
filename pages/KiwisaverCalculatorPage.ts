import { Page, Locator, expect } from '@playwright/test';

export class KiwisaverCalculatorPage {
  readonly page: Page;

  // 🔍 Locators (similar to @FindBy)
  readonly openCalculatorButton: Locator;
  readonly currentAgeInput: Locator;
  readonly nextQuestionButtons: Locator;
  readonly firstHomeOption: Locator;
  readonly homeBuyDropdown: Locator;
  readonly employmentDropdown: Locator;
  readonly incomeInput: Locator;
  readonly balanceInput: Locator;
  readonly contributionDropdown: Locator;
  readonly fundDropdown: Locator;
  readonly headingProjection: Locator;
  readonly graphText: Locator;

  constructor(page: Page) {
    this.page = page;

    // ✅ Locator Initializations
    this.openCalculatorButton = page.getByRole('button', { name: /Open the calculator/i });
    this.currentAgeInput = page.getByLabel('Current age');
    this.nextQuestionButtons = page.getByText('Next Question', { exact: true });
    this.firstHomeOption = page.getByText('First Home', { exact: true });
    this.homeBuyDropdown = page.locator('[aria-labelledby="dropdown-QUESTION_WHEN_TO_BUY_HOME"]');
    this.employmentDropdown = page.locator('[aria-labelledby="dropdown-QUESTION_EMPLOYMENT_STATUS"]');
    this.incomeInput = page.locator('[placeholder="Enter income"]');
    this.balanceInput = page.locator('[placeholder="Enter balance"]');
    this.contributionDropdown = page.locator('[aria-labelledby="dropdown-QUESTION_CONTRIBUTION_PERCENTAGE"]');
    this.fundDropdown = page.locator('[aria-labelledby="dropdown-QUESTION_CURRENT_FUND"]');
    this.headingProjection = page.getByRole('heading', { name: 'What will you be using your' });
    this.graphText = page.getByText('Westpac logoWestpac KiwiSaver Scheme CalculatorExit Calculator01First of all,');
  }

  async navigate() {
    console.log('Navigating to calculator...');
    await this.page.goto('/kiwisaver-investments/kiwisaver/kiwisaver-calculators/kiwisaver-calculator/');
  }

  async openCalc() {
    console.log('Opening calculator...');
    await this.openCalculatorButton.waitFor({ state: 'visible' });
    await this.openCalculatorButton.click();
  }

  async fillForm() {
    console.log('Filling the form...');
    await this.currentAgeInput.fill('30');
    await this.nextQuestionButtons.nth(0).click();
    await this.firstHomeOption.click();
    await this.homeBuyDropdown.click();
    await this.page.getByRole('option').first().click();
    await this.employmentDropdown.click();
    await this.page.getByRole('option').first().click();
    await this.incomeInput.click();
    await this.incomeInput.fill('90000');
    await this.nextQuestionButtons.nth(1).click();
    await this.page.waitForTimeout(3000);
    await this.balanceInput.click();
    await this.balanceInput.fill('30000');
    await this.page.waitForTimeout(3000);
    await this.nextQuestionButtons.nth(2).click();
    await this.contributionDropdown.click();
    await this.page.getByRole('option').nth(4).click();
    await this.fundDropdown.click();
    await this.page.getByRole('option').nth(1).click();
  }

  async validateProjectionText() {
    console.log('Validating projection heading...');
    await expect(this.headingProjection).toBeVisible();
  }

  async validateGraphDisplayed() {
    console.log('Validating graph text...');
    await expect(this.graphText).toBeVisible();
  }
}
