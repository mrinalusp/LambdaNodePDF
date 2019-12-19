# AWS lambda PDF generator example

The purpose of this repository is to demonstrate a PDF generator inside
AWS lambda with [chrome-aws-lambda](https://www.npmjs.com/package/chrome-aws-lambda), [serverless](https://serverless.com/)

This project is created from https://dev.to/akirautio/generate-a-pdf-in-aws-lambda-with-nodejs-and-puppeteer-2b93 


# Setup

1. Initialize serverless either inside project or globally (after installing package globally) with

```
serverless
```

2. Use the serveless to create a service in Cloud based on key id and access keyid .
3. Run the command serverless deploy -v
4. Open the API URL that contains fully qualified name for the service. 
   Example : https://k26kyvstn2.execute-api.eu-central-1.amazonaws.com/development/pdf/practicepkg
   
5. Ignore the PUG and Knex , this project uses the a hardcoded htmlonly to show a POC.
6. This project is built with node and puppeteer and you need to look into equivalent packages for Python. 
   

Notes : 
1. Lambda’a response limit is 6MB. If we have larger files , we will have to save it to S3 and return the pdf link.



