import { leapwork } from "./leapwork";

leapwork.configuration({
  timeoutMs: Number(
    leapwork.team.settings.get("timeoutMs")
    ?? leapwork.workspace.settings.get("timeoutMs")
  ) || 5000,
  enableSelfHeal:
    (leapwork.team.settings.get("enableSelfHeal")
      ?? leapwork.workspace.settings.get("enableSelfHeal")) !== "false",
});

// ai-studio-step-id: QJpdxbKq
await leapwork.step("Click New to create a requested item.", async () => {
    // Click button "New"
    await page.getByRole('button', { name: 'New' }).click();
}, { action: "click", relativeXpath: "//*[@id=\"sysverb_new\"]" });

// ai-studio-step-id: Nn2jrb80
await leapwork.step("Click the Item field's lookup button on the Create Requested Item form", async () => {
    // Click span
    await page.getByRole('button', { name: 'Look up value for field: Item' }).click();
}, { action: "click", relativeXpath: "//*[@id=\"lookup.sc_req_item.cat_item\"]/span" });

// ai-studio-step-id: Kj2BuVcI
await leapwork.step("Click the Acrobat item in the catalog list", async () => {
    // Click button "Acrobat"
    const catalogItemPopup = await page.locator('a.list_action.list_top_title').filter({hasText: 'Catalog Items'});
    const isVisibleFlag = await catalogItemPopup.isVisible();
    await logInfo(`Is Popup Visible: ${isVisibleFlag}`);
    await expect(isVisibleFlag).toBe(true);
    await page.getByRole('button', { name: 'Acrobat', exact: true }).click();
}, { action: "click", relativeXpath: "//*[@id=\"row_sc_cat_item_7198552237b1300054b6a3549dbe5dea\"]/td[3]/a" });

// ai-studio-step-id: pw1hkqqv50
await leapwork.step("Click the Request field lookup button on the Create Requested Item form", async () => {
    // Click span
    await page.getByRole('button', { name: 'Look up value for field: Request', exact: true }).click();
}, { action: "click", relativeXpath: "//*[@id=\"lookup.sc_req_item.request\"]/span" });

// ai-studio-step-id: pws5zomw00
await leapwork.step("Click the REQ request link.", async () => {
    // Click button "REQ0010152"
    const requestsPopup = await await page.locator('a.list_action.list_top_title').filter({hasText: 'Requests'});
    const isVisibleFlag = await requestsPopup.isVisible();
    await logInfo(`Is Popup Visible: ${isVisibleFlag}`);
    await expect(isVisibleFlag).toBe(true);
    const findAllReqs = page.locator('tbody.list2_body tr.list_row a.glide_ref_item_link');
    const reqCount = await findAllReqs.count();
    await logInfo(`Total record Count is : ${reqCount}`);
    const firstLink = findAllReqs.first();
    await logInfo(`First REQ: ${await firstLink.innerText()}`);
    await firstLink.click();
    //await page.getByRole('button', { name: 'REQ0010152' }).click();
}, { action: "click", relativeXpath: "(//tbody[contains(@class,'list2_body')]//tr[contains(@class,'list_row')]//a[contains(@class,'glide_ref_item_link')])[1]" });

// ai-studio-step-id: pw119vvh50
await leapwork.step("Click the Select Due date date and time button for RITM0010638", async () => {
    // Click span
    await page.getByRole('button', { name: 'Select Due date date and time' }).click();
}, { action: "click", relativeXpath: "//*[@id=\"sc_req_item.due_date.ui_policy_sensitive\"]/span" });

// ai-studio-step-id: pwd6cwdn00
await leapwork.step(`Click the selected date in the time picker`, async () => {
    // Click button "Tuesday, August 11, 2026 selected."
    const dateTime = new Date();
    const monthName = dateTime.toLocaleString('en-US', { month: 'long' });
    const dayName = dateTime.toLocaleString('en-US', { weekday: 'long' });
    const todayDate = dateTime.getDate();   
    const year = dateTime.getFullYear();
    
    const dateButton = `${dayName}, ${monthName} ${todayDate}, ${year}`;
    await logInfo(`Selecting date: ${dateButton}`);
    await page.getByRole('button', { name: dateButton}).click();
    //await page.getByRole('button', { name: 'Tuesday, August 11, 2026' }).click();
}, /*{ action: "click", relativeXpath: "//*[@id=\"GwtDateTimePicker_day16\"]" }*/);

// ai-studio-step-id: pw14hi3ax0
await leapwork.step("Click Save to create the requested item RITM0010638", async () => {
    // Click button "Save (Enter)"
    await page.getByRole('button', { name: 'Save (Enter)' }).click();
}, { action: "click", relativeXpath: "//*[@id=\"GwtDateTimePicker_ok\"]" });

// ai-studio-step-id: pw1jy4gdi0
await leapwork.step("Click the Configuration item lookup button on the requested item form", async () => {
    // Click span
    await page.getByRole('button', { name: 'Look up value for field: Configuration item' }).click();
}, { action: "click", relativeXpath: "//*[@id=\"lookup.sc_req_item.configuration_item\"]/span" });

// ai-studio-step-id: pwazoytd00
await leapwork.step("Click the 4300-071302 configuration item link 񟿿", async () => {
    // Click button "4300-071302"
    const configItemsPopup = await page.locator('a.list_action.list_top_title').filter({hasText: 'Configuration Items'});
    const isVisibleFlag = await configItemsPopup.isVisible();
    await logInfo(`Is Popup Visible: ${isVisibleFlag}`);
    await expect(isVisibleFlag).toBe(true);
    await page.getByRole('button', { name: '-071302' }).click();
}, { action: "click", relativeXpath: "//*[@id=\"row_cmdb_ci_46b6e9b1a9fe198100abe515a5dbaba1\"]/td[3]/a" });

// ai-studio-step-id: pw1k74h0r0
await leapwork.step("Click the Submit button for requested item RITM0010619", async () => {
    // Click button "Submit"
    await page.locator('#sysverb_insert_bottom').click();
    await page.waitForTimeout(10000);
}, { action: "click", relativeXpath: "//*[@id=\"sysverb_insert_bottom\"]" });