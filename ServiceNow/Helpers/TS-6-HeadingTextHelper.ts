export async function assertHeadingInPages(page: Page, frameSelector: string, headingText: string){
    const frame = page.frameLocator(frameSelector);
    
    await expect(frame.getByRole('heading', {name: headingText, exact:true})).toHaveText(headingText);
}