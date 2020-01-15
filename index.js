import puppeteer from 'puppeteer'
import { LINKS } from './links.js'
import { promises } from 'fs'

// we're using async/await - so we need an async function, that we can run
const run = async () => {
  // open the browser and prepare a page
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  // set the size of the viewport, so our screenshot will have the desired size
  await page.setViewport({
    width: 3840,
    height: 2160
  })

  for (let link of LINKS) {
    await page.goto(link, { waitUntil: 'networkidle0' })
    await page.pdf({ format: 'A4', printBackground: true, path: `${link.split('/')[4]}.pdf` });
    await page.screenshot({
      path: `${link.split('/')[4]}.png`,
      fullPage: true
    })
  }
  // close the browser
  await browser.close()
}

// run the async function
run()
