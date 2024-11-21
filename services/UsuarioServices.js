//criando outro serviço, serve para requisições http, regras de negocios

import HttpServices from "./HttpServices";

//criando uma função  basicamente como orientação objeto usando o (extends) que é usado para herdar todos os metodos que foi passado no elemento pai (HttpServices) para poder reutilizar
export default class ApiUsuarioServices extends HttpServices {
    //criando um metodo async de login
    async login(usuario, senha){//recebendo o usuario e a senha
        return this.post('')//executando a chamada 
    }

    //criando um metodo async de cadastro
    async cadastro(dados){ //recebendo os dados do usuario
        return this.post('/cadastro', dados);//executando a chama da requisição do post passando a url(/cadastro) e passando os dados do upload
    }
}