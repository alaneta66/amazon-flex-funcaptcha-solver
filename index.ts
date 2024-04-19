import NextCaptcha from "nextcaptcha-ts";
import puppeteer from "puppeteer";
import qs from "qs";

const url = "https://www.amazon.com/aaut/verify/flex-offers/challenge?challengeType=ARKOSE_LEVEL_5&externalId=1d88d4361469956553c5fe8b7254a767525f20157c340357bbc429accd7cbc8f&returnTo=https://www.amazon.com&headerFooter=false";

const clientKey = process.env.NEXTCAPTCHA_KEY || '';
const client = new NextCaptcha(clientKey);

function main() {
  puppeteer.launch({
    headless: true,
  }).then(async browser => {
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    let captchaConfig = {
      "type":"FunCaptchaTaskProxyless",
      "websiteURL":url,
      "websitePublicKey": "",
      "data": ""
    };
    page.on('request', async interceptedRequest => {

      if ( interceptedRequest.url().includes('/fc/gt2/public_key')) {
        const formData = qs.parse(interceptedRequest.postData() || "");
        captchaConfig.data = JSON.stringify(formData.data);
        captchaConfig.websitePublicKey = formData.public_key as string;
        await solverCaptcha(captchaConfig);
        await interceptedRequest.continue();
      } else {
        await interceptedRequest.continue();
      }
    });
    await page.goto(url, {
      waitUntil: 'networkidle0'
    })

  }).catch(err => {
    // console.log(err);
  })
}

async function solverCaptcha(captchaConfig: any) {
  const token = await client.funcaptcha(captchaConfig);
  console.log(token.solution.token)
  process.exit(0);
}

main()