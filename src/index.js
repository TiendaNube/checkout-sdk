import PubSub from 'pubsub-js'

import { checkObjectWindow, objectHasKeys, checkObjectValuesType } from './utils/helper'

let iframeRef

const sendMessage = (data) => {
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

const setInitialWindowSDK = () => {
  window.SDKCheckout = {
    publishEvent: (event, data) => PubSub.publish(event, data),
    publishEventSync: (event, data) => PubSub.publishSync(event, data),
    subscribeEvent: (event, func) => PubSub.subscribe(event, func),
    setIframeRef: (ref) => iframeRef = ref,
    getPaymentIds: async () => {
      const isReady = await validateReadyState()
    
      if (!isReady || !(iframeRef && iframeRef.current && iframeRef.current.sendMessage)) {
        return false
      }
    
      iframeRef.current.sendMessage({ type: 'PAYMENTS_IDS' })
    },
    changePaymentTitle: async (data) => {
      const isReady = await validateReadyState()
    
      if (!isReady || !objectHasKeys(['id', 'value'], data) || !checkObjectValuesType(data)) {
        return false
      }
    
      sendMessage({ name: 'customTitles', value: { [data.id]: data.value } })
    },
    hidePaymentOptions: async (data) => {
      const isReady = await validateReadyState()
    
      if (!isReady || !Array.isArray(data)) {
        return false
      }
    
      sendMessage({ name: 'hiddenPaymentOptions', value: data })
    },
    changePaymentBenefit: async (data) => {
      const isReady = await validateReadyState()
    
      if (!isReady || !objectHasKeys(['id', 'value'], data) || !checkObjectValuesType(data)) {
        return false
      }
    
      sendMessage({ name: 'customBenefits', value: { [data.id]: data.value } })
    },
    addPaymentContentText: async (data) => {
      const isReady = await validateReadyState()
    
      if (!isReady || !objectHasKeys(['id', 'value'], data) || !checkObjectValuesType(data)) {
        return false
      }

      sendMessage({ name: 'customExternalContent', value: { [data.id]: data.value } })
    },
    hideInstallments: async (data) => {
      const isReady = await validateReadyState()
    
      if (!isReady || !objectHasKeys(['id', 'value'], data) || !Array.isArray(data.value)) {
        return false
      }
    
      sendMessage({ name: 'hiddenInstallments', value: { [data.id]: data.value } })
    }
  }
}

export default setInitialWindowSDK()
