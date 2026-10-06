import { leapwork } from "./leapwork";

import { ServiceNowLoginToServiceNow } from "@assets/ServiceNow/ServiceNow_LoginLogout/ServiceNow_LoginToServiceNow";
import { FilterHelper } from "@assets/ServiceNow/Helpers/FilterHelper";
import { getColumnValue } from "@assets/ServiceNow/Helpers/commonActionsHelper";
import { ServiceNowLogOut } from "@assets/ServiceNow/ServiceNow_LoginLogout/ServiceNow_LogOut";
import { selectDropDownValueByIndex } from "@assets/ServiceNow/Helpers/selectDropDownHelper";
import { ClickDeleteConfirmationButton } from "@assets/ServiceNow/Commons/ClickDeleteConfirmationButton";

const uniqueOrderName = `TestActivateDeactive_${Date.now()}`;

leapwork.variables.set("name", uniqueOrderName, leapwork.storage.LOCAL);
const lw__name = leapwork.variables.get("name", leapwork.storage.LOCAL) as string;

leapwork.variables.set("shortDescription", "This is a test record", leapwork.storage.LOCAL);
const lw__shortDescription = leapwork.variables.get("shortDescription", leapwork.storage.LOCAL) as string;

leapwork.configuration({
  timeoutMs: Number(
    leapwork.team.settings.get("timeoutMs")
    ?? leapwork.workspace.settings.get("timeoutMs")
  ) || 5000,
  enableSelfHeal:
    (leapwork.team.settings.get("enableSelfHeal")
      ?? leapwork.workspace.settings.get("enableSelfHeal")) !== "false",
});

// ai-studio-step-id: c967c530
await leapwork.step("Use test case: ServiceNow_LoginToServiceNow", async () => {
    return await ServiceNowLoginToServiceNow();
}, { action: "asset_reference", linkedAssetType: "test-case" });

// ai-studio-step-id: fb6cb542
await leapwork.step("Use TypeScript asset: FilterHelper", async () => {
    page.waitForTimeout(5000);
    const fh = new FilterHelper(page);
    await fh.searchAndClickFilterResult("Order Guides","Order Guides");
}, { action: "asset_reference" });

// ai-studio-step-id: 8reNRPrb
await leapwork.step("Validate that the ServiceNow page title shows “Order guides”", async () => {
    // Assert span contains "Order guides"
    page.waitForTimeout(10000);
    await expect(page.frameLocator('#gsft_main').getByRole('button', { name: 'Order guides' })).toContainText("Order guides");
}, { action: "validate", relativeXpath: "//*[@id=\"list_nav_sc_cat_item_guide\"]/div/div[1]/h1/a/span[1]" });

// ai-studio-step-id: YcOsrHrA
await leapwork.step("Click the New button on the Order guides list.", async () => {
    // Click button "New"
    await page.waitForTimeout(5000);
    await page.getByRole('button', { name: 'New', exact: true }).click();
}, { action: "click", relativeXpath: "//*[@id=\"sysverb_new\"]" });

// ai-studio-step-id: PYZgIB1a
await leapwork.step("Click the Name field in the Order guides list", async () => {
    // Click textbox "Name"
    await page.getByRole('textbox', { name: 'Name' }).click();
}, { action: "click", relativeXpath: "//*[@id=\"sc_cat_item_guide.name\"]" });

// ai-studio-step-id: OStPQkhC
await leapwork.step(`Fill the Name field with "${lw__name}" on the New Order Guide form`, async () => {
    // Fill textbox "Name"
    await page.getByRole('textbox', { name: 'Name' }).fill(String(lw__name));
}, { action: "input", relativeXpath: "//*[@id=\"sc_cat_item_guide.name\"]" });

// ai-studio-step-id: vKma6Qj0
await leapwork.step("Unset \"Active\" checkbox", async () => {
    // Uncheck checkbox "Active"
    await await page.frameLocator('#gsft_main').getByLabel('Active', { exact: true }).uncheck();
}, { action: "click", relativeXpath: "//*[@id=\"ni.sc_cat_item_guide.active\"]" });

// ai-studio-step-id: pw1n5ytbi0
await leapwork.step("Set \"Cascade Variables\" checkbox", async () => {
    // Check checkbox "Cascade Variables"
    await page.frameLocator('#gsft_main').getByLabel('Cascade Variables').check();
}, { action: "click", relativeXpath: "//*[@id=\"ni.sc_cat_item_guide.cascade\"]" });

// ai-studio-step-id: xbKpmXvf
await leapwork.step("Click the Short description field on the New Record form", async () => {
    // Click textbox "Short description"
    await page.getByRole('textbox', { name: 'Short description' }).click();
}, { action: "click", relativeXpath: "//*[@id=\"sc_cat_item_guide.short_description\"]" });

// ai-studio-step-id: AuN3DHK1
await leapwork.step(`Fill the Short description field with "${lw__shortDescription}" on the New Record page`, async () => {
    // Fill textbox "Short description"
    await page.getByRole('textbox', { name: 'Short description' }).fill(String(lw__shortDescription));
}, { action: "input", relativeXpath: "//*[@id=\"sc_cat_item_guide.short_description\"]" });

// ai-studio-step-id: 6gtyYPsR
await leapwork.step("Press Tab to move focus to the next element on the order guide page", async () => {
    // Press Tab on element
    await page.keyboard.press("Tab");
}, { action: "keydown" });

// ai-studio-step-id: gcM3SDZF
await leapwork.step("Click the Submit button on the New Record order guide form", async () => {
    // Click button "Submit"
    await page.locator('#sysverb_insert_bottom').click();
}, { action: "click", relativeXpath: "//*[@id=\"sysverb_insert_bottom\"]" });

// ai-studio-step-id: q6TKhQqW
await leapwork.step(`Validate the Order Guides list shows ${lw__name} as an open record`, async () => {
    // Assert link "Open record: TestActivateDeactive_1785905681485" contains "TestActivateDeactive_1785905681485"
    const frame = page.frameLocator('#gsft_main');
    await expect(frame.getByRole('link', { name: `Open record: ${lw__name}` })).toContainText(lw__name);
}, { action: "validate", relativeXpath: `//*[@aria-label='Open record: ${lw__name}']` });

// ai-studio-step-id: ZOrVu5OZ
await leapwork.step(`Validate the Order guides record ${lw__name} shows “false”`, async () => {
    // Assert gridcell "false" contains "false"
    page.waitForTimeout(20000);
    const activeValue = await getColumnValue(page, lw__name, "Active");
    await logInfo(activeValue);
});

// ai-studio-step-id: xkFKqe5M
await leapwork.step(`Set Select record for action: ${lw__name} checkbox`, async () => {
    // Check checkbox "Select record for action: TestActivateDeactive_1785919888386"
    //await page.getByRole('checkbox', { name: `Select record for action: ${lw__name}` }).check();
    const frame = page.frameLocator('#gsft_main')
    await frame.locator(`//*[@aria-label='Open record: ${lw__name}']/parent::td/preceding-sibling::td/span`).click();
}, { action: "click", relativeXpath: "//*[@id=\"check_sc_cat_item_guide_59ef0a81c3aa8f100e477275e401315e\"]" });

// ai-studio-step-id: ePtZd9Dc
await leapwork.step("Click the Activate button for the selected order guide.", async () => {
    // Click button "Activate"
    await page.getByRole('button', { name: 'Activate', exact: true }).click();
}, { action: "click", relativeXpath: "//*[@id=\"sc_cat_item_activate\"]" });

// ai-studio-step-id: pw2pru5x00
await leapwork.step(`Validate the Order guides record ${lw__name} shows true`, async () => {
  // Step implementation
    const activeValue = await getColumnValue(page, lw__name, "Active");
});

// ai-studio-step-id: pwyy5d4u00
await leapwork.step(`Set Select record for action: ${lw__name} checkbox`, async () => {
    // Check checkbox "Select record for action: TestActivateDeactive_1785919888386"
    //await page.getByRole('checkbox', { name: `Select record for action: ${lw__name}` }).check();
    const frame = page.frameLocator('#gsft_main')
    await frame.locator(`//*[@aria-label='Open record: ${lw__name}']/parent::td/preceding-sibling::td/span`).click();
});

// ai-studio-step-id: 4NAXjjz8
await leapwork.step("Click the Deactivate button for the selected order guide row", async () => {
    // Click button "Deactivate"
    await page.getByRole('button', { name: 'Deactivate' }).click();
}, { action: "click", relativeXpath: "//*[@id=\"sc_cat_item_deactivate\"]" });

// ai-studio-step-id: pw1i1630y0
await leapwork.step(`Validate the Order guides record ${lw__name} shows true`, async () => {
  // Step implementation
    const activeValue = await getColumnValue(page, lw__name, "Active");
});

// ai-studio-step-id: pwff3q0c00
await leapwork.step(`Set Select record for action: ${lw__name} checkbox`, async () => {
    // Check checkbox "Select record for action: TestActivateDeactive_1785919888386"
    //await page.getByRole('checkbox', { name: `Select record for action: ${lw__name}` }).check();
    const frame = page.frameLocator('#gsft_main')
    await frame.locator(`//*[@aria-label='Open record: ${lw__name}']/parent::td/preceding-sibling::td/span`).click();
});

// ai-studio-step-id: yZ3QMgGe
await leapwork.step("Select \"Actions on selected rows...\" from Actions on selected rows", async () => {
    // Click combobox "Actions on selected rows"
    //const actionDropdown = frame.getByLabel('Actions on selected rows');
    //await actionDropdown.selectOption({label: 'Delete'});
 
    //Check for the dropdown options 
    /*const option = dropdown.locator('option');
    const count = await option.count();
    await logInfo(count);
    
    for(let i =0; i<count; i++){
        const text =(await option.nth(i).textContent())?.trim();
        const value = (await option.nth(i).getAttribute('value'));
        await logInfo(`Option-${i}:Text-${text}:Value-${value}`);
    }*/
    
    // const frame = page.frameLocator('#gsft_main')
    // const dropdown = frame.locator('select[id*="_labelAction"]');
    // await dropdown.selectOption({index: 1});
    // const selectedValue = await dropdown.inputValue();
    // await logInfo(`Selected value: ${selectedValue}`);
    
    await selectDropDownValueByIndex(page, 'select[id*="_labelAction"]', 1,'#gsft_main'); 
});

// ai-studio-step-id: 0dcbb1c6
await leapwork.step("Use test case: ClickDeleteConfirmationButton", async () => {
    return await ClickDeleteConfirmationButton();
}, { action: "asset_reference", linkedAssetType: "test-case" });

// ai-studio-step-id: 158ec9ae
await leapwork.step("Use test case: ServiceNow_LogOut", async () => {
    return await ServiceNowLogOut();
}, { action: "asset_reference", linkedAssetType: "test-case" });