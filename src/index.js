import PubSub from 'pubsub-js'

console.log('start Checkout SDK')
const setInitialWindowSDK = () => {
  console.log('window=>', window)
  window.SDKCheckout = {
    publishEvent: (event, data) => PubSub.publish(event, data),
    publishEventSync: (event, data) => PubSub.publishSync(event, data),
    subscribeEvent: (event, func) => PubSub.subscribe(event, func)
  }
}

export default setInitialWindowSDK()