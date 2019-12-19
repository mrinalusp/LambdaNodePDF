'use strict'
const chromium = require('chrome-aws-lambda')
const pug = require('pug')
const fs = require('fs')
const path = require('path')

const knex = require('./src/db')

module.exports.pdf = async (event, context) => {
  const yearMonth = ((event || {}).pathParameters || {}).yearMonth || ''
  const year = yearMonth.length == 7 && yearMonth.substring(0, 4)
  const month = yearMonth.length == 7 && yearMonth.substring(5, 6)

  // Select a date
  const selDate = new Date(year, month)
  const filter = {
    month: selDate.toLocaleString('en', { month: 'long' }),
    year: selDate.getFullYear()
  }

  // Fetch data with knex
  
 // TODO - Template File
 // const template = pug.compileFile('./src/template.pug')
  const html = '<!DOCTYPEhtml><html><head><style>table{font-family:arial,sans-serif;border-collapse:collapse;width:100%;}td,th{border:1pxsolid#dddddd;text-align:left;padding:8px;}tr:nth-child(even){background-color:#dddddd;}</style></head><body><h2>PracticePackageReport</h2><table><tr><th>Groups</th><th>CCD</th><th>#Episodes</th></tr><tr><td>Harvard</td><td>IN</td><td>23</td></tr><tr><td>Boston</td><td>OUT</td><td>23</td></tr><tr><td>Yale</td><td>IN</td><td>23</td></tr><tr><td>Harvard</td><td>IN</td><td>34</td></tr><tr><td>UConn</td><td>IN</td><td>13</td></tr><tr><td>StFrancis</td><td>OUT</td><td>90</td></tr></table></body></html>'
    
  let browser = null
  try {
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless
    })

    const page = await browser.newPage()
    page.setContent(html)
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '1cm' }
    })

    // TODO: Response with PDF (or error if something went wrong )
    const response = {
      headers: {
        'Content-type': 'application/pdf',
        'content-disposition': 'attachment; filename=package.pdf'
      },
      statusCode: 200,
      body: pdf.toString('base64'),
      isBase64Encoded: true
    }
    context.succeed(response)
  } catch (error) {
    return context.fail(error)
  } finally {
    if (browser !== null) {
      await browser.close()
    }
  }
}
