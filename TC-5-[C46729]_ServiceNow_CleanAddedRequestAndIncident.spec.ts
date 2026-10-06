import { leapwork } from "./leapwork";

import { ServiceNowLoginToServiceNow } from "@assets/ServiceNow/ServiceNow_LoginLogout/ServiceNow_LoginToServiceNow";
import { filterNavMenuSearch } from "@assets/ServiceNow/Helpers/filterNavMenuSearch";
import { selectDropDownValueByIndex } from "@assets/ServiceNow/Helpers/selectDropDownHelper";
import { ClickDeleteConfirmationButton } from "@assets/ServiceNow/Commons/ClickDeleteConfirmationButton";
import { ServiceNowLogOut } from "@assets/ServiceNow/ServiceNow_LoginLogout/ServiceNow_LogOut";
import { AddRequestedItem } from "@assets/ServiceNow/Commons/AddRequestedItem";

leapwork.variables.set("filter", "Open", leapwork.storage.LOCAL);
const lw__filter = leapwork.variables.get("filter", leapwork.storage.LOCAL) as string;

leapwork.configuration({
  timeoutMs: Number(
    leapwork.team.settings.get("timeoutMs")
    ?? leapwork.workspace.settings.get("timeoutMs")
  ) || 5000,
  enableSelfHeal:
    (leapwork.team.settings.get("enableSelfHeal")
      ?? leapwork.workspace.settings.get("enableSelfHeal")) !== "false",
});

// ai-studio-step-id: 8e7e286b
await leapwork.step("Use test case: ServiceNow_LoginToServiceNow", async () => {
    return await ServiceNowLoginToServiceNow();
}, { action: "asset_reference", linkedAssetType: "test-case" });

// ai-studio-step-id: 7a21c05f
await leapwork.step("Use TypeScript asset: FilterHelper", async () => {
    await filterNavMenuSearch(page,"Requested Items","Self-Service","Requested Items");
    page.waitForTimeout(10000);
}, { action: "asset_reference" });

// ai-studio-step-id: iq57pqnC
await leapwork.step("Validate the ServiceNow page title shows “Requested Items View: Workspace”", async () => {
    // Assert span contains "Requested Items"
    const pageTitle = await page.frameLocator('#gsft_main').locator("//h1 //a[@role='button']/span[1]");
    await expect(pageTitle).toContainText("Requested Items");
}, { action: "validate", relativeXpath: "//*[@id=\"list_nav_sc_req_item\"]/div/div[1]/h1/a/span[1]" });

// ai-studio-step-id: pw3d0l1z00
await leapwork.step("Set \"Select All\" checkbox on Requested Items Page", async () => {
    // Check checkbox "Select All"
    //await page.getByRole('checkbox', { name: 'Select All' }).check();
    page.waitForLoadState('load');
    const noDataFound = await page.frameLocator('#gsft_main').locator('div.list2_empty-state-list');
    const emptyList = await noDataFound.count();
    if(emptyList > 0){
        const noDataText = (await noDataFound.innerText());
        await logInfo(`${noDataText}`);
        for(let i =0; i < 5 ; i++){
         await AddRequestedItem();
    }
        const selectAllCheckbox = await page.frameLocator('#gsft_main').locator('label:has-text("Select All")');
        await selectAllCheckbox.waitFor({state: 'attached'});
        await logInfo(await selectAllCheckbox.check());
        await expect(selectAllCheckbox).toBeChecked();  
        //throw new Error(`Test stopped: ${emptyList}, ${noDataText}`);
    }else{
        const selectAllCheckbox = await page.frameLocator('#gsft_main').locator('label:has-text("Select All")');
        await selectAllCheckbox.waitFor({state: 'attached'});
        await logInfo(await selectAllCheckbox.check());
        await expect(selectAllCheckbox).toBeChecked();  
    }
}, { action: "asset_reference", linkedAssetType: "test-case" });

// ai-studio-step-id: pw6zeyiq00
await leapwork.step("Select Delete Action from Actions on selected rows dropdown", async () => {
    // Click combobox "Actions on selected rows"
    await selectDropDownValueByIndex(page, 'select[id*="_labelAction"]', 1,'#gsft_main'); 
    await page.waitForTimeout(5000);
}, { action: "click", relativeXpath: "//*[@id=\"listv2_daf87421c3ea03500e477275e4013190_labelAction\"]" });

// ai-studio-step-id: pw27ifta00
await leapwork.step("Use test case: ClickDeleteConfirmationButton", async () => {
    const confirmationTitle = page.frameLocator('#gsft_main').locator('h2#delete_confirm_list_title');
    await confirmationTitle.waitFor({state: 'visible'});
    const confirmFlag = await confirmationTitle.isVisible();
    await expect(confirmFlag).toBe(true);
    await ClickDeleteConfirmationButton();
}, { action: "asset_reference", linkedAssetType: "test-case" });

// ai-studio-step-id: pwmekwpc00
await leapwork.step("Click the Requested Items filter in the ServiceNow navigation menu", async () => {
    // Click textbox "Enter search term to filter All menu"
    page.waitForTimeout(10000);
    await page.getByRole('textbox', { name: 'Enter search term to filter' }).click();
}, { action: "click", relativeXpath: "//*[@id=\"filter\"]" });

// ai-studio-step-id: pw108tggj0
await leapwork.step("Click the All menu search field. - remove old input", async () => {
    // Click div
    await page.locator('div').filter({ hasText: /^Enter search term to filter All menu$/ }).click();
}, { action: "click", relativeXpath: ".//nav/div[@aria-label=\"All menu\"]/div[1]/div[1]" });

// ai-studio-step-id: pwx3ohzw00
await leapwork.step("Click the Filter search box in the ServiceNow navigation menu", async () => {
    // Click textbox "Enter search term to filter All menu"
    await page.getByRole('textbox', { name: 'Enter search term to filter' }).click();
}, { action: "click", relativeXpath: "//*[@id=\"filter\"]" });

// ai-studio-step-id: pw5h09qx00
await leapwork.step(`Fill the All menu filter with "${lw__filter}"`, async () => {
    // Fill textbox "Enter search term to filter All menu"
    await page.getByRole('textbox', { name: 'Enter search term to filter' }).fill(String(lw__filter));
}, { action: "input", relativeXpath: "//*[@id=\"filter\"]" });

// ai-studio-step-id: pw10090hp0
await leapwork.step("Click the Open incident list link in the ServiceNow Requested Items view", async () => {
    // Click mark
    await page.locator('sn-collapsible-list').filter({ hasText: 'IncidentEdit' }).getByLabel('Open 1 of').click();
}, { action: "click", relativeXpath: "//*[@id=\"b55fbec4c0a800090088e83d7ff500de\"]/span/span/mark" });

// ai-studio-step-id: pwpv911w00
await leapwork.step("Set \"Select All\" checkbox", async () => {
    // Check checkbox "Select All"
    const selectAllCheckbox = await page.frameLocator('#gsft_main').locator('label:has-text("Select All")');
    await logInfo(await selectAllCheckbox.check());
    
}, { action: "click", relativeXpath: "//*[@id=\"allcheck_incident\"]" });

// ai-studio-step-id: pw15j5dw10
await leapwork.step("Select \"Actions on selected rows...\" from Actions on selected rows", async () => {
    // Click combobox "Actions on selected rows"
    await selectDropDownValueByIndex(page, 'select[id*="_labelAction"]', 2,'#gsft_main'); 
    await page.waitForTimeout(5000);
}, { action: "click", relativeXpath: "//*[@id=\"listv2_daf87421c3ea03500e477275e4013190_labelAction\"]" });

// ai-studio-step-id: pw1sacqza0
await leapwork.step("Use test case: ClickDeleteConfirmationButton", async () => {
    return await ClickDeleteConfirmationButton();
}, { action: "asset_reference", linkedAssetType: "test-case" });

// ai-studio-step-id: pwog92x000
await leapwork.step("Use test case: ServiceNow_LogOut", async () => {
    return await ServiceNowLogOut();
}, { action: "asset_reference", linkedAssetType: "test-case" });