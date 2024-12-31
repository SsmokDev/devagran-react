//vamos criar um serviço que sera uma classe base para receber os demais serviços da API:

//primeiro importamos tudo oque vamos utilizar:

import axios from "axios"; //importando o axios que sera responsavel pela requisição 

//Define e exporta(export) uma classe(class) chamada (HttpServices) como exportação padrão(default). Isso significa que quando outro arquivo importar este módulo, essa classe será a referência principal.
//Isso nos permite encapsular funcionalidades relacionadas a requisições HTTP em uma única classe reutilizável.
export default class HttpServices{
    //(constructor)Um método especial da classe que é executado automaticamente quando uma instância da classe é criada ou seja 
    //ele configura o objeto axios, que é uma biblioteca popular para realizar requisições HTTP.
    constructor() {
        //(this.axios = axios.create) ele cria uma instância personalizada de axios com configurações predefinidas.
        this.axios = axios.create({
            //A baseURL é obtida a partir de uma variável de ambiente chamada (NEXT_PUBLIC_API_URL) e complementada com o caminho (/api).
            baseURL: process.env.NEXT_PUBLIC_API_URL + '/api' 
        });
        //em resumo isso Facilita o uso de URLs dinâmicas (com base no ambiente: desenvolvimento, produção, etc.), mantendo o código mais limpo.
    }

    //vamos criar o metodo POST:
    // vamos passar método da classe que envia uma requisição HTTP do tipo POST que tem como parametros  a (url):que é endpoint específico onde a requisição será feita (complementando a baseURL)
    // e a (data): que são os dados que serão enviados no corpo da requisição o (payload)
    post(url, data){
        return this.axios.post(url, data);
        //criamos isso para o caso de trocar essa lib do axios, entao independente da lib que for usado será efetiva esse metodo.
    }
}