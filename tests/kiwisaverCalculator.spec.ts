import { test } from '@playwright/test';
import { KiwisaverCalculatorPage } from '../pages/KiwisaverCalculatorPage';

test('E2E KiwiSaver Calculator Test', async ({ page }) => {
  const calculator = new KiwisaverCalculatorPage(page);

  console.log('Executing the test...');
  await calculator.navigate();
  await calculator.openCalc();
  await calculator.fillForm();
  await calculator.validateProjectionText();
  await calculator.validateGraphDisplayed();
  console.log('Test Ended...');

});
