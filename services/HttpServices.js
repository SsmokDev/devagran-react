import axios from "axios"; //importando o axios que sera responsavel pela requisição 

//criando uma classe base para receber os demais serviços da API
export default class HttpServices{
    constructor() {
        this.axios = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL + '/api'
        });//usando algumas instancias do axios, como o (create) passando a baseURL para nao precisar chamar a UrL da env.local sempre que preciso e contatenando o ('/api') que e sempre usado quando fazemos uma chamada
    }

    //vamos criar o metodo POST
    //passando a url ou seja o pef de onde sera feito a requisição e um data que sera o upload
    post(url, data){
        return this.axios,post(url, data);//criamos isso para o caso de trocar essa lib do axios, entao independente da lib que for usado sera efetiva esse metodo
    }
}