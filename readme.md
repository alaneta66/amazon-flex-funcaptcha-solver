Amazon-flex-funCaptcha-solver

TIPS:

1. find the websitePublicKey of funCaptcha

    - it could find in `fc/gt2/public_key/{PublicKey}` request
    
2. get the `data` value

3. build the solver request

    - get the solver [client key](https://dashboard.nextcaptcha.com)
    
    - set the environment variables of `NEXTCAPTCHA_KEY`
      
    - ```json
          {
                "clientKey":"api key",
                "task": {
                    "type":"FunCaptchaTaskProxyless",
                    "websiteURL":"https://example.com",
                    "websitePublicKey":"1321AA23-3128-1B8A-9AA2-A25A21123A34",
                    "data": "{\"blob\": \"lkjas13jasf23.azoiu21klzcasd12UaoSsf....\"}"
                }
            }
      ```
    
4. get and submit the token

DISCLAIMERS:

This tool is not affiliated, associated, or partnered with AmazonFlex in any way. We are not authorized, endorsed, or sponsored by AmazonFlex. All AmazonFlex trademarks remain the property of Fenix International Limited.
This is a theoritical program only and is for educational purposes. If you choose to use it then it may or may not work. You solely accept full responsability and indemnify the creator, hostors, contributors and all other involved persons from any any all responsability.
