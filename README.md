# Checkout SDK

O objetivo desse projeto é facilitar e padronizar a integração de parceiros com o checkout.

Abaixo terão instruções de como implementar essa comunicação com seu APP e quais os eventos você consegue observar e executar alguma ação quando ele for disparado.

Utilizamos o pattern pub-sub utilziando a lib [PubSubJS](https://github.com/mroderick/PubSubJS), para conhecer mais sobre, acesse [esse post](https://blog.matheuscastiglioni.com.br/trabalhando-com-eventos-no-javascript/).

## Dependencias
Você precisará utilizar a lib [PubSubJS](https://github.com/mroderick/PubSubJS) para implementar seus subscribes.

Abaixo temos exemplo de como utilizá-lo.

## Instalação

```bash
yarn add -D __________
```

## Subscribe
```javascript
import PubSub from 'pubsub-js'

var mySubscriber = function (msg, data) {
  // put here your code
};

PubSub.subscribe('NAME_EVENT', mySubscriber);
```

## Publish
```javascript
import PubSub from 'pubsub-js'

data = {}
window.SDKCheckout.publishEvent('NAME_EVENT', data)
```

## Name Events to register
```javascript
"TEST_GET_EMAIL"
```