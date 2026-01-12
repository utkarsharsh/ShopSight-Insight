// Import puppeteer
import puppeteer from "puppeteer";

export const scrapeMyntra = async (url) => {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-http2",
      "--disable-blink-features=AutomationControlled"
    ]
  });

  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
  );

  await page.setExtraHTTPHeaders({
    "accept-language": "en-US,en;q=0.9"
  });

  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, "webdriver", {
      get: () => false,
    });
  });

  await page.goto(url, {
    waitUntil: "domcontentloaded",
    timeout: 0
  });
    // Extract product details
    const productData = await page.evaluate(() => {
        const title = document.querySelector('h1.pdp-title')?.innerText || '';
        const price = document.querySelector('span.pdp-price')?.innerText || '';
       const images = Array.from(
        document.querySelectorAll(".image-grid-image")
         ).map(el => {
        const bg = window.getComputedStyle(el).backgroundImage;

      if (!bg || bg === "none") return null;

  // extract URL from: url("...")
       return bg.match(/url\(["']?(.*?)["']?\)/)?.[1];
      }).filter(Boolean);
        const description = document.querySelectorAll('.pdp-product-description-content li');
        const descArray = [];
        description.forEach((desc) => {
            descArray.push(desc.innerText);
        }); 
        return { title, price, images, description: descArray };
    });

    // Close the browser
    await browser.close();

    return productData;
}