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
Subcribers
"VER_EMAIL_FILLED" - data: {

}

Published
"ON_EMAIL_FILLED_RETURN" - data: {
  success: true/false -> required
  error: string -> optional
}
```

## Checkout Payment Customization Methods

Renderiza no console a lista dos ids dos gateways ativos na loja.
Estes ids podem ser utilizados no métodos abaixo para customização dos mesmos

```javascript
window.SDKCheckout.getPaymentIds()
```

Altera o título da opção de pagamento

```javascript
window.SDKCheckout.changePaymentTitle({ id: 'gateway_redirect', value: 'Novo Título' })
```

Esconde as opções de pagamento

```javascript
window.SDKCheckout.hidePaymentOptions(['gateway_redirect', 'gateway_credit_card'])
```

Altera ou troca as informações de desconto e parcelamento de um gateway

```javascript
window.SDKCheckout.changePaymentBenefit({ id: 'gateway_credit_card', value: '12x sem juros' })
```

Adiciona informação extra ao conteúdo do meio de pagamento externo/redirect

```javascript
window.SDKCheckout.addPaymentContentText({ id: 'gateway_redirect', value: 'lorem ipsum dolor sit amet' })
```

Esconde as parcelas da lista de seleção do usuário
Funciona apenas com gateways de cartão de crédito transparente
No exemplo serão escondidas as parcelas de 3 e 6 vezes, se a compra permitir parcelamento de até 6 vezes, serão exibidas apenas as parcelas 1, 2, 4 e  5

```javascript
window.SDKCheckout.hideInstallments({ id: 'gateway_credit_card', value: [3, 6] })
```
