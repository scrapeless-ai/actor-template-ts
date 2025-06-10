import puppeteer from "puppeteer-core";

// Scrapeless SDK - toolkit for building Scrapeless Actors.
import { Actor, Scrapeless, log } from "@scrapeless-ai/sdk";

interface HeadingItems {
  level: string;
  text: string;
}

interface ActorInput {
  url: string;
}

const Log = log.withPrefix("Heading Extractor");

async function extract() {
  const client = new Scrapeless();
  const actor = new Actor();

  // Structure of input is defined in input_schema.json
  const input = await actor.input<ActorInput>();
  const { url } = input;

  // Connect to Scrapeless browser using Puppeteer.
  const { browserWSEndpoint } = client.browser.create({
    session_name: "scrapeless",
    session_ttl: 180,
    proxy_country: "ANY", // Use ANY for no specific country, or specify a country code
    session_recording: false,
  });

  Log.info("Browser WebSocket Endpoint:", browserWSEndpoint);

  Log.info("Connecting to Scrapeless browser...");

  const browser = await puppeteer.connect({
    browserWSEndpoint,
    defaultViewport: null,
  });
  const page = await browser.newPage();

  // Go to the target URL.
  await page.goto(url, { timeout: 60000 });

  // Extract all headings from the page (tag name and text).
  Log.info("Extracted headings...");
  const headings: HeadingItems[] = await page.evaluate(() => {
    const elements = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    return Array.from(elements).map((element) => ({
      level: element.tagName.toLowerCase(),
      text: element.textContent || "",
    }));
  });

  // Save headings to Dataset - a table-like storage.
  await actor.addItems<HeadingItems>(headings);
  Log.info("Headings saved to dataset.");

  await browser.disconnect();
}

extract().catch((e) => {
  Log.error("Error:", e);
  process.exit(1);
});
