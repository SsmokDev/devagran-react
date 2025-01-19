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

        
        // Aqui vamos criar um interceptor de requisição. Interceptores permitem que você modifique ou adicione comportamentos antes que a requisição HTTP seja realmente enviada.

        //então vamos adicionar ao axios(this.axios) um interceptador(.interceptors) para cada requisição(.request) e usando o método(.use()) ele recebe uma função que será executada antes de cada requisição.
        //que nesse caso estamos passando o (config) o config contém as informações da requisição, como o método, URL, cabeçalhos, etc.
        this.axios.interceptors.request.use((config) => {
            //vamos criar um fução(const) chamada (token), essa função tenta receber um token de autenticação(getItem('token)) armazenado no localStorage e o token é recuperado com a chave 'token'.
            //lembrando que o localStorage é uma maneira de armazenar dados no navegador do cliente.
            const token = localStorage.getItem('token');

            //Aqui vamos verificar see(if) temos o (token) de autenticação:
            if(token){
                //se tivermos o token ele será adicionado ao cabeçalho(Authorization) da requisição HTTP.
                //O formato 'Bearer ' + token segue o padrão Bearer Token de autenticação em APIs RESTful, onde o token de autenticação é precedido pela palavra-chave Bearer (separado por um espaço).
                config.headers.Authorization = 'Bearer' + token
            }
        });
    }

    //vamos criar o metodo POST:
    // vamos passar método da classe que envia uma requisição HTTP do tipo POST que tem como parametros  a (url):que é endpoint específico onde a requisição será feita (complementando a baseURL)
    // e a (data): que são os dados que serão enviados no corpo da requisição o (payload)
    post(url, data){
        return this.axios.post(url, data);
        //criamos isso para o caso de trocar essa lib do axios, entao independente da lib que for usado será efetiva esse metodo.
    }

    //vamos criar um método GET:

    //Este método get(url) simplesmente chama o método get da biblioteca axios e retorna a resposta dessa requisição. 
    //Quando o código executa this.axios.get(url), ele faz uma requisição GET para o servidor na URL fornecida. 
    //O que o método faz é envolver a chamada da biblioteca axios em seu próprio método e retornar o resultado.
    get(url) {
        return this.axios.get(url);
    }
}