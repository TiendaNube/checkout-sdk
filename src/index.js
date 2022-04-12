import PubSub from 'pubsub-js'

const setInitialWindowSDK = () => {
  window.SDKCheckout = {
    publishEvent: (event, data) => PubSub.publish(event, data),
    publishEventSync: (event, data) => PubSub.publishSync(event, data),
    subscribeEvent: (event, func) => PubSub.subscribe(event, func)
  }
}

export default setInitialWindowSDK()