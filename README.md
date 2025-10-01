# DESAFIO FINAL - APRENDIZAGEM DE MÁQUINA

Este projeto é destinado apenas para fins educacionais. Os dados exibidos são apenas ilustrativos e podem não corresponder a situações reais.

---

# IA Ambiental - Previsão de Qualidade do Ar

Este projeto consiste em uma aplicação web que utiliza um modelo de Machine Learning para prever a qualidade do ar com base em dados ambientais. A solução possui duas formas de interação: fornecendo os dados manualmente ou informando uma localidade para que os dados sejam coletados em tempo real de uma API externa.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://ia-ambiental.vercel.app/solucao)
[![API on Railway](https://img.shields.io/badge/API%20on-Railway-blueviolet?style=for-the-badge&logo=railway)](https://web-production-b320.up.railway.app/docs)
[![OpenWeatherMap](https://img.shields.io/badge/API-OpenWeatherMap-orange?style=for-the-badge&logo=openweathermap)](https://openweathermap.org/api)

---

## Arquitetura e Fluxos

A aplicação é composta por um frontend (IA Ambiental) que consome uma API de predição. Essa API, por sua vez, pode interagir com uma API externa (OpenWeatherMap) para obter dados meteorológicos e de poluentes de uma localidade específica.

O diagrama abaixo ilustra o fluxo de dados e as interações entre os componentes:

![Diagrama da Arquitetura](public/images/Arq.jpg)

**Detalhes dos Fluxos:**

1.  **Predição por Variáveis (Fluxo 1):**
    * O usuário preenche um formulário no frontend da IA Ambiental com valores específicos para `Temperatura`, `Umidade`, `CO2`, `CO`, `Pressao_Atm`, `NO2`, `SO2` e `O3`.
    * Esses dados são enviados como uma requisição `POST` para o endpoint `/predict/variaveis` da API de Predição.
    * A API de Predição processa esses dados utilizando seu modelo de Machine Learning e retorna o resultado da "Qualidade do ar" e as "Probabilidades de Fenômeno" para o frontend.

2.  **Predição por Localidade (Fluxo 2):**
    * O usuário preenche um formulário no frontend da IA Ambiental com a `Cidade` e o `País` desejados.
    * Esses dados são enviados como uma requisição `GET` para o endpoint `/predict/local` da API de Predição.
    * A API de Predição, então, faz uma requisição para a API Externa (OpenWeatherMap) usando a cidade e o país fornecidos para obter os dados ambientais em tempo real (temperatura, umidade, pressão atmosférica e poluentes).
    * Com os dados obtidos da API externa, a API de Predição utiliza seu modelo de Machine Learning para calcular a "Qualidade do ar" e as "Probabilidades de Fenômeno", retornando o resultado para o frontend.

---

## Links Úteis

* **Aplicação em Produção**: [https://ia-ambiental.vercel.app/solucao](https://ia-ambiental.vercel.app/solucao)
* **Documentação da API (Swagger)**: [https://web-production-b320.up.railway.app/docs](https://web-production-b320.up.railway.app/docs)
* **API Externa Utilizada**: [https://openweathermap.org/](https://openweathermap.org/)

---

## Como Começar (Executando Localmente)

Siga os passos abaixo para clonar, instalar as dependências e executar o projeto da API de predição em sua máquina local.

### Pré-requisitos

* [Git](https://git-scm.com/)
* [NodeJS](https://nodejs.org/)

### Instalação e Execução Local

1.  **Clone o repositório:**
    ```bash
    [git clone https://github.com/emanoelsp/desfinal-aprendizagemdemaquina.git](https://github.com/emanoelsp/ia-ambiental.git)
    ```

2.  **Navegue até o diretório do projeto:**
    ```bash
    cd desfinal-aprendizagemdemaquina
    ```

3.  **Instale as dependências:**
      ```bash
      npm install
      ```

5.  **Executar o projeto localmente:**
    ```bash
    npm run dev
    ```
 O servidor será iniciado, e a aplicação estará pronta para enviar as requisições.
 
6.  **Acessar a aplicação:**
    ```bash
    https://localhost:3000
    ```
---

## Testando a API de Predição

Abaixo estão exemplos de como interagir com os principais endpoints da API usando uma ferramenta como o [Insomnia](https://insomnia.rest/), [Postman](https://www.postman.com/) ou `curl`.

#### Endereço da api:
https://web-production-b320.up.railway.app/

---

### Endpoint: `GET /`

Este é o endpoint raiz da API. Ele serve como um "health check" para verificar o status da aplicação, confirmando que ela está online, que o modelo de Machine Learning foi carregado corretamente e qual a versão atual.

**Exemplo de Requisição:**

```json
GET https://web-production-b320.up.railway.app/
 ```

### Endpoint: `POST /predict/variaveis`

Este endpoint realiza a predição da qualidade do ar com base em um conjunto de variáveis ambientais fornecidas diretamente no corpo da requisição. É o método utilizado quando o usuário insere os dados manualmente no formulário.

**Corpo da Requisição (Body - JSON):**
É necessário enviar um objeto JSON com as seguintes chaves e valores numéricos:

```json

POST https://web-production-b320.up.railway.app/predict/variaveis

{
    "Temperatura": 10, "Umidade": 10, "CO2": 0, "CO": 0,
    "Pressao_Atm": 10, "NO2": 10, "SO2": 10, "O3": 10
}
```

### Endpoint: `POST /predict/local`

Este endpoint realiza a predição da qualidade do ar com base em uma localidade (cidade e país). Ele consulta a API externa (OpenWeatherMap) para obter os dados ambientais daquele local em tempo real e, em seguida, utiliza o modelo de Machine Learning para fazer a previsão.

**Corpo da Requisição (Body - JSON):**
É necessário enviar um objeto JSON com o nome da cidade e do país.

```json

POST https://web-production-b320.up.railway.app/predict/local

{
  "cidade": "Gaspar",
  "pais": "BRASIL"
}
```
