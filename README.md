# How to install

**After installing Cookiebot on your website, following [these instructions](https://www.cookiebot.com/en/help/), you can install this repo following these steps:**

Because Cookiebot doesn't support new CSS properties, you will manually need to include the css file in your project.

```bash
npm install Huddly/cookiebot-popup --save
```

Then import the following styling in your project:

```javascript
import '@huddly/cookiebot-popup/dist/popup.css';
```

In the same `@huddly/cookiebot-popup/dist/` folder you will find the following files:

-   `popup.html`
-   `popup.js`

Paste the content of these into your cookiebot popup setting fields after selecting the "Custom popup" option.

After this, your Cookiebot popup should look like this:

![Huddly version of the Cookiebot popup](https://user-images.githubusercontent.com/25268506/196160795-22576a0e-61df-42da-9f40-ea156da5f057.png)
