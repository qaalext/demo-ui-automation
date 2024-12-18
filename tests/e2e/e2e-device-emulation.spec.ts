import test, { devices, expect } from "@playwright/test";


// emulating a device and perform testing
// use webkit for IOS
// use chrome for ANDROID

test.use({
    ...devices['iPhone 11'],
  });
  
  test.describe('Device Emulation Test Suite', () => {
    test('Device Emulation Test on Wikipedia', async ({ page }) => {
      await page.goto('http://zero.webappsecurity.com/login.html');
      console.log(await page.title());
      await page.waitForTimeout(3000);
      expect(await page.title()).toContain("Zero - Log in")
    });
  });