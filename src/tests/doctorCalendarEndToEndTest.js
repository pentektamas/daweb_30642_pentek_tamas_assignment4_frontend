// to run this test: npx taiko doctorCalendarEndToEndTest.js --observe
const {openBrowser, goto, click, below, textBox, into, write, closeBrowser, scrollDown, scrollUp} = require('taiko');
(async () => {
    try {
        await openBrowser();
        await goto("http://localhost:3000/");
        await click("Login");
        await write("doctor1", into(textBox(below("Username"))));
        await write("1234", into(textBox(below("Password"))));
        await click("Login");
        await scrollDown();
        await click("Agenda");
        await click("Back");
        await click("Back");
        await click("Today");
        await click("Month");
        await click("Logout");
        await scrollUp();
    } catch (error) {
        console.error(error);
    } finally {
        await closeBrowser();
    }
})();