//criando outro serviço, que serve para requisições http, regras de negocios.

//primeiro importamos tudo oque vamos usar:

import HttpServices from "./HttpServices";//importando o nosso serviço base.

//criando uma função da classe chamada (ApiUsuarioServices) que basicamente é como orientação objeto usando o (extends) 
//que é usado para herdar todos os metodos que foi passado no elemento pai (HttpServices) assim nos podemos reutilizar tudo oque foi passado no elemento pai(HttpServices).
export default class UsuarioServices extends HttpServices {

    //criando um metodo async chamado (login) que será usado para fazer a aplicação no login e passamos dentro dele as credenciais(credenciais).
    async login(credenciais){
        //criamos uma função e passamos a data dentro dela {data} = ( que são os dados que serão enviados no corpo da requisição).
        const { data } = await this.post('/login', credenciais);
        //e essa função ela faz a chamada no backend com o metodo post(this.post) e espera(await) receber a url do login('/login') e as credenciais(login e a senha)
        //para que o backend devolva um token de autorização para que possamos fazer as demais requisições.
        
        //vamos criar uma função(const) chamada usuario, essa função espera(await) receber uma resposta HTTP da requisição(this.get) feita ao servidor pedindo os dados do usuario('/usuario).
        const usuario = await this.get('/usuario');

        localStorage.setItem('id', usuario.data._id);//passando como chave o "id" como identificador, e o valor o usuario.data._id : A expressão usuario.data._id acessa o valor do identificador (_id) do usuário dentro do objeto data.
        //Assim, sempre que o código for executado novamente, ele pode recuperar esse valor armazenado para utilizá-lo mais tarde, como por exemplo, 
        //para manter o usuário logado ou para identificar o usuário em requisições subsequentes.

        //vamos usar o (localStorage) é uma API do navegador que permite armazenar dados de forma persistente no lado do cliente (no navegador) sem que esses dados expirem,
        //enquanto o nosso token estiver valido essa informaçõpes persistiram em uso.
        //e usando o (setItem) que: é um método usado para armazenar um valor associado a uma chave. A chave (key) é o identificador para o dado, e o valor (value) é o conteúdo que você quer armazenar.
        localStorage.setItem("nome", data.nome);//passando como chave o "nome" como identificador, e o valor o data.nome como conteudo que iremos guardar.
        localStorage.setItem("email", data.email);//passando como chave o "email" como identificador, e o valor o data.email como conteudo que iremos guardar.
        localStorage.setItem("token", data.token);//passando como chave o "token" como identificador, e o valor o data.token como conteudo que iremos guardar.

        //vamos fazer uma regrinha aqui, se(if) tiver a imagem do avatar do usuario:
        if(usuario.data.avatar){
            //passando como chave o "avatar" como identificador, e o valor o usuario.data.avatar como conteudo que iremos guardar.
            localStorage.setItem("avatar", usuario.data.avatar);
        }
    }

    //criando um metodo async chamado (cadastro) que será usado na aplicação do cadastro, que recebe dentro dele os dados do usuário(dados).
    async cadastro(dados){
        //executando a chamada para o metodo  post passando a url(/cadastro) e passando os dados do payload.
        return this.post('/cadastro', dados);
    }
    //criando um verificador, esse método chamado (estaAutenticado) retornará do nosso localStorage(armazenamento de dados no navegador) o token(getItem('token')) 
    //e se esse token for diferente(!==) de null(inválido) o usuário está autenticado, se não for diferente(!==) o usuário não está autenticado.
    estaAutenticado() {
        return localStorage.getItem('token')!== null;
    }
}