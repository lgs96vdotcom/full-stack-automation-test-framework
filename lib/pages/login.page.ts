import { expect, type Locator, type Page } from "@playwright/test";

export class LoginPage{
 readonly page:Page;
 readonly lnkearncpe: Locator;
 readonly skilljarbox: Locator;
 readonly lnkgetstarted: Locator;
 readonly skilljarGetStartedLink: Locator;
 

 constructor (page: Page){
    this.page = page;
    this.lnkearncpe = page.getByRole('link', { name: 'Earn CPE' });
    this.lnkgetstarted = page.getByRole('link', { name: 'Get Started' });
    this.skilljarbox = page.locator('#skilljar-content')
    this.skilljarGetStartedLink = this.skilljarbox.getByRole('link', { name: 'Get Started' });
  
 }

 async goto(){
    await this.page.goto("https://www.floqast.com/");
 }

 async clickSkilljarGetStarted() {
    await expect(this.skilljarGetStartedLink).toBeVisible();
    await this.skilljarGetStartedLink.click();
 }
 
} //class