import { Page, expect } from '@playwright/test';

export class KiwisaverCalculatorPage {
  constructor(private page: Page) {}

  async navigate() {
    console.log('Navigating to calculator...');
    await this.page.goto('/kiwisaver-investments/kiwisaver/kiwisaver-calculators/kiwisaver-calculator/');
  }
  async openCalc() {
    console.log('Opening calculator...');
    const openBtn = this.page.getByRole('button', { name: /Open the calculator/i });
    await openBtn.waitFor({ state: 'visible' });
    await openBtn.click();
 }



  async fillForm() {
    console.log('Filling the form...');
    await this.page.getByLabel('Current age').fill('30');
    await this.page.getByText('Next Question', { exact: true }).nth(0).click();
    await this.page.getByText('First Home', { exact: true }).click();
    await this.page.locator('[aria-labelledby="dropdown-QUESTION_WHEN_TO_BUY_HOME"]').click();
    await this.page.getByRole('option').first().click();
    await this.page.locator('[aria-labelledby="dropdown-QUESTION_EMPLOYMENT_STATUS"]').click();
    await this.page.getByRole('option').first().click();
    await this.page.locator('[placeholder="Enter income"]').click();
    await this.page.locator('[placeholder="Enter income"]').fill("90000");
    await this.page.getByText('Next Question', { exact: true }).nth(1).click();
    await this.page.waitForTimeout(3000); 
    await this.page.locator('[placeholder="Enter balance"]').click();
    await this.page.locator('[placeholder="Enter balance"]').fill("30000");
    await this.page.waitForTimeout(3000); 
    await this.page.getByText('Next Question', { exact: true }).nth(2).click();
    await this.page.locator('[aria-labelledby="dropdown-QUESTION_CONTRIBUTION_PERCENTAGE"]').click();
    await this.page.getByRole('option').nth(4).click();
    await this.page.locator('[aria-labelledby="dropdown-QUESTION_CURRENT_FUND"]').click();
    await this.page.getByRole('option').nth(1).click();
  }

  async validateProjectionText() {
    console.log('validate Projection Text...');
    await expect(this.page.getByRole('heading', { name: 'What will you be using your' })).toBeVisible();
  }
  async validateGraphDisplayed() {
    console.log('validate Graph Displayed...');
    await expect(this.page.getByText('Westpac logoWestpac KiwiSaver Scheme CalculatorExit Calculator01First of all,')).toBeVisible();
  }

 
}
