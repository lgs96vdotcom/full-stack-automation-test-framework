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
   
});

