# Case Study for Microfrontends with SingleSpa

## Dependencies

- Lerna
- SingleSpa
- React
- Parcel-bundler

## Available Scripts

No diretório do projeto, você pode rodar:

### `npm start` or `yarn`

Para baixar todas as dependencias dos projeto e dos filhos

### `npm start` or `yarn start`

Para rodar a aplicação inteira, projeto root com projetos filhos

## Criar um novo app filho

- Criar um novo projeto na pasta `packages`
- Com react pode utilizar o create-react-app `npm init react-app novo-app`
- Instalar o single-spa-react no novo-app
- No novo projeto cria o arquivo de lifecycle do single-spa `src/singleSPA.js`
- Instalar o parcel-bundler
- Adicionar os scripts no `package.json`
- Adicionar proxy no projeto root 
- Registrar o novo-app no root
- Adicionar a div onde o novo-app será renderizado

### Criar o arquivo de lifecycle

https://single-spa.js.org/docs/migrating-react-tutorial.html#step-three-setup-lifecycle-functions

Exemplo:

```js 
import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import App from './App.js';

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: App,
  domElementGetter,
});

export const bootstrap = [reactLifecycles.bootstrap];

export const mount = [reactLifecycles.mount];

export const unmount = [reactLifecycles.unmount];

function domElementGetter() {
  return document.getElementById('novo-app');
}

```

### Instalar o parcel-bundler

`npm install -D parcel-bundler` or `yarn add -D parcel-bundler`

### Package.json

Adiciona os scripts no `package.json`

```json
"scripts": {
	"start": "react-scripts start",
	"start:single-spa": "parcel src/singleSPA.js --port <PORT>",
	"build": "parcel build src/singleSPA.js",
	"test": "react-scripts test"
},
```

### Adicionar proxy no root

Altere o arquivo `src/setupProxy.js` para adicionar um proxy para a aplicação com a PORT definida acima


### Registrar o app no root

Altere o arquivo `src/index.js` registrando o novo app no singleSpa

Ex:

```js
registerApplication(NOME_APP, IMPORT_SYSTEMJS, FUNCION_HAS_RENDER);
```

NOME_APP

Nome que será registrado no singleSpa

IMPORT_SYSTEMJS

Função para fazer o import com o SystemJS utilize o proxy ex: `() => SystemJS.import('/novo-app/singleSPA.js')`

FUNCTION_HAS_RENDER

Função para informar se o singleSpa deve renderizar o app deve retornar um boolean

### Adicionar a div onde o novo-app será renderizado

Adicionar no app root a div com o id utilizado `<div id="novo-app" />` no arquivo de lifecycle do singleSpa

```js
function domElementGetter() {
  return document.getElementById('novo-app');
}
```

Agora basta rodar a aplicação novamente `yarn start`

## TODO

- [x] Criar estrutura para carregamento de css dos apps filhos
- [ ] Criar estrutura de comunicação entre apps com Redux de forma lazy
- [ ] Teste com react-router para mudar div dos apps filhos

