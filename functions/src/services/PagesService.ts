export default class PagesService {
  static paymentSuccess (trxId:string):string {
    return `
      <html>
        <body>
          Transaction successfully completed with reference: ${trxId}
        </body>
      </html>
    `
  }
  static paymentFailed ():string {
    return `
      <html>
        <body>
          Transaction failed. Please try again.
        </body>
      </html>
    `
  }
  static paymentProcessing ():string {
    return `
      <html>
        <body>
          Transaction is being processed. Please wait...
          You will receive an alert once your request has been processed.
        </body>
      </html>
    `
  }
}