import PubSub from 'pubsub-js'


// ON_MAIL_FILLED
window.SDKCheckout = {
  publishEvent: (event, data) => PubSub.publish(event, data)
}