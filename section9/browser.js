import { browser } from 'k6/browser';
import { check } from 'k6';

export const options = {
    scenarios: {
      ui: {
        executor: 'shared-iterations',
        options: {
          browser: {
                type: 'chromium',
          },
        },
      },
    }
  }

export default async function () {
    const page = await browser.newPage();
    await page.goto('https://test.k6.io/my_messages.php');

    check(page, {
        'check page header': (p) => p.locator('body > h2').textContent() === 'Unauthorized'
    });

    page.locator('input[name="login"]').type('admin');
    page.locator('input[name="password"]').type('123');
    await page.locator('input[type=submit]').click();
    await page.waitForNavigation(); //Wait for a page to load

    page.screenshot({ path: 'screenshots/2-authenticated.png' });

    check(page, {
        'check page header': (p) => p.locator('body > h2').textContent() === 'Welcome, admin!'
    });

}