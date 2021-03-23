// to run this test: npx taiko doctorAccessUserPageEndToEndTest.js --observe
const {openBrowser, goto, click, below, textBox, into, write, closeBrowser, scrollDown, scrollUp, goBack} = require('taiko');
(async () => {
    try {
        await openBrowser();
        await goto("http://localhost:3000/");
        await click("Login");
        await write("doctor1", into(textBox(below("Username"))));
        await write("1234", into(textBox(below("Password"))));
        await click("Login");
        await scrollDown();
        await goto("http://localhost:3000/userPage");
        await click("Home");
        await goto("http://localhost:3000/invalidPage123");
        await click("Home");
    } catch (error) {
        console.error(error);
    } finally {
        await closeBrowser();
    }
})();