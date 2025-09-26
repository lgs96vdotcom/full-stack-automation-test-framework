import { test, expect } from '@playwright/test';
import { LoginPage } from '../lib/pages/login.page';



test.describe("Home Page" , () => {

    test('Verify click on Earn CPE takes us to registration page', async ({ page }) => {
        
        const loginpageobj = new LoginPage(page);
        await loginpageobj.goto();
        await expect(loginpageobj.lnkearncpe).toBeVisible();
        await (loginpageobj.lnkearncpe).click(); 
        await loginpageobj.clickSkilljarGetStarted();
    }); 
    
    test('Flo Academy public login user registration ', async({page}) => {
        await expect(page.getByText('PUBLIC LOGIN', { exact: true })).toBeVisible();
        await expect(page.getByText('New to FloQademy? Create an')).toBeVisible();
        await page.getByRole('link', { name: 'here' }).click();
        await expect(page.getByRole('heading', { name: 'FloQademy Customer & Public' })).toBeVisible();
        await page.getByRole('textbox', { name: 'First Name*' }).fill('Lalit');
        await page.getByRole('textbox', { name: 'Last Name*' }).fill('Sharma');
        await page.getByRole('textbox', { name: 'Business Email*' }).fill('lgs96v@gmail.com');
        await expect(page.getByText('Please enter a different')).toBeVisible();
        await page.getByRole('textbox', { name: 'Company Name*' }).fill('Floqast');
        await page.getByRole('textbox', { name: 'Job Title*' }).fill('Engineer');
        await page.locator('#country-input').selectOption('United States');
        await expect(page.getByRole('button', { name: 'Sign Up' })).toBeVisible();
        await expect(page.getByText('Please complete this required')).toBeVisible();
    });
});

