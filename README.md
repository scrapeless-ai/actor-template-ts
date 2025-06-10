## Scrape single-page in TypeScript template

A template for scraping data from a single web page in TypeScript (Node.js). The URL of the web page is passed in via input, which is defined by the [input_schema.json].

The scraped data in this template are page headings but you can easily edit the code to scrape whatever you want from the page.

## Included features

- **[Scrapeless SDK](https://docs.scrapeless.com/en/sdk/node-sdk)** - toolkit for building Actors
- **[Puppeteer](https://pptr.dev/)** - a Node.js library that controls Chrome or Chromium browsers programmatically

## How it works

1. `actor.input()` gets the input where the page URL is defined
2. `client.browser.create()` get the browser websocket endpoint
3. `page.goto(url)` goto the target website
4. `actor.addItems()` save the crawled data to dateset

## Getting started

fork or clone the repository to your github, link your github repository to Scrapeless Actor. Then:

1. Build the Actor
2. Run the Actor
