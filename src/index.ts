import PubSub from 'pubsub-js'

import { checkObjectWindow, objectHasKeys, checkObjectValuesType } from './utils/helper'
import { IframeRef, SDKCheckoutLoaded, SDKCheckoutQueue } from './types'

let iframeRef: IframeRef

const sendMessage = (data: any) => {
  if (iframeRef && iframeRef.current && iframeRef.current.sendMessage) {
    iframeRef.current.sendMessage({ type: 'PARTNERS_CUSTOMIZATION', data })
  }
}

const validateReadyState = async () => {
  if (window.location.href.indexOf('next') === -1) {
    return false
  }

  return await checkObjectWindow('paymentIframeLoaded', 60)
}

const isQueue = (value: unknown): value is SDKCheckoutQueue => {
  return Boolean(value) && Array.isArray((value as SDKCheckoutQueue).queue)
}

const createSDKCheckout = (): SDKCheckoutLoaded => ({
  publishEvent: (event: PubSubJS.Message, data: any) => PubSub.publish(event, data),
  publishEventSync: (event: PubSubJS.Message, data: any) => PubSub.publishSync(event, data),
  subscribeEvent: (event: PubSubJS.Message, func: PubSubJS.SubscriptionListener<any>) => PubSub.subscribe(event, func),
  setIframeRef: (ref: IframeRef) => iframeRef = ref,
  getPaymentIds: async () => {
    const isReady = await validateReadyState()
  
    if (!isReady || !(iframeRef && iframeRef.current && iframeRef.current.sendMessage)) {
      return false
    }
  
    iframeRef.current.sendMessage({ type: 'PAYMENTS_IDS' })
  },
  changePaymentTitle: async (data: { id: any, value: any }) => {
    const isReady = await validateReadyState()
  
    if (!isReady || !objectHasKeys(['id', 'value'], data) || !checkObjectValuesType(data)) {
      return false
    }
  
    sendMessage({ name: 'customTitles', value: { [data.id]: data.value } })
  },
  hidePaymentOptions: async (data: any) => {
    const isReady = await validateReadyState()
  
    if (!isReady || !Array.isArray(data)) {
      return false
    }
  
    sendMessage({ name: 'hiddenPaymentOptions', value: data })
  },
  changePaymentBenefit: async (data: any) => {
    const isReady = await validateReadyState()
  
    if (!isReady || !objectHasKeys(['id', 'value'], data) || !checkObjectValuesType(data)) {
      return false
    }
  
    sendMessage({ name: 'customBenefits', value: { [data.id]: data.value } })
  },
  addPaymentContentText: async (data: any) => {
    const isReady = await validateReadyState()
  
    if (!isReady || !objectHasKeys(['id', 'value'], data) || !checkObjectValuesType(data)) {
      return false
    }

    sendMessage({ name: 'customExternalContent', value: { [data.id]: data.value } })
  },
  hideInstallments: async (data: any) => {
    const isReady = await validateReadyState()
  
    if (!isReady || !objectHasKeys(['id', 'value'], data) || !Array.isArray(data.value)) {
      return false
    }
  
    sendMessage({ name: 'hiddenInstallments', value: { [data.id]: data.value } })
  }
})

const initialize = () => {
  const sdk = createSDKCheckout()

  if(isQueue(window.SDKCheckout)) {
    const { queue } = window.SDKCheckout
    queue.forEach(([method, ...args]) => {
      if(typeof sdk[method] === 'function') {
        Reflect.apply(sdk[method], sdk, args)
      }
    })
  }
  
  window.SDKCheckout = sdk
}

initialize()
