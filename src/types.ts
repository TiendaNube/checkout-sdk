declare global {
  interface Window { SDKCheckout: SDKCheckoutLoaded | SDKCheckoutQueue }
}

export type IframeRef ={
  current: {
    sendMessage: (message: {
      type: string
      data?: { success?: boolean, closeModal?: boolean }
    }) => void
  }
}

export type SDKCheckoutQueue = {
  publishEvent: (event: PubSubJS.Message, data: any) => void
  publishEventSync: (event: PubSubJS.Message, data: any) => void
  subscribeEvent: (event: PubSubJS.Message, func: PubSubJS.SubscriptionListener<any>) => void
  setIframeRef: (ref: IframeRef) => void
  getPaymentIds: () => void
  changePaymentTitle: (data: { id: any; value: any; }) => void
  hidePaymentOptions: (data: any) => void
  changePaymentBenefit: (data: any) => void
  addPaymentContentText: (data: any) => void
  hideInstallments: (data: any) => void
  queue: [keyof SDKCheckoutLoaded, ...any[]][]
}

export type SDKCheckoutLoaded = {
  publishEvent: (event: PubSubJS.Message, data: any) => boolean
  publishEventSync: (event: PubSubJS.Message, data: any) => boolean
  subscribeEvent: (event: PubSubJS.Message, func: PubSubJS.SubscriptionListener<any>) => string
  setIframeRef: (ref: IframeRef) => IframeRef
  getPaymentIds: () => Promise<false | undefined>
  changePaymentTitle: (data: { id: any; value: any; }) => Promise<false | undefined>
  hidePaymentOptions: (data: any) => Promise<false | undefined>
  changePaymentBenefit: (data: any) => Promise<false | undefined>
  addPaymentContentText: (data: any) => Promise<false | undefined>
  hideInstallments: (data: any) => Promise<false | undefined>
}