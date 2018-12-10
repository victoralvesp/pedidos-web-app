# Pedidos Web App
Web app em angular que disponibiliza interface para emissão de pedidos

## Dependencias
Este aplicativo web utiliza um servidor REST que tem os seguintes recursos disponíveis:
* *POST* em `./pedidos/`
* *PUT* e *GET* em `./pedidos/{id}`
* `./pedidos/rentabilidade?precoSugerido={preco}&precoUnitario={preco}`
* *GET* em `./produtos/`
* *GET* em `./clientes/`

## Instalação para desenvolvimento
Instale os seguintes:
1. node.js
1. git
1. Clone este repositorio: `git clone https://github.com/victoralvesp/pedidos-web-app` 
1. CD para a pasta clonada `cd NOME_DA_PASTA`
1. `npm install` para instalar as dependencias
1. `ng serve` para executar o servidor

## Instalação em servidores
1. Execute `ng build --prod`
1. Comprima os arquivos de `./dist` 
1. Descompacte e execute em seu servidor favorito.
