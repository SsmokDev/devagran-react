//criando outro serviço, que serve para requisições http, regras de negocios.

//primeiro importamos tudo oque vamos usar:

import HttpServices from "./HttpServices";//importando o nosso serviço base.

//criando uma função da classe chamada (ApiUsuarioServices) que basicamente é como orientação objeto usando o (extends) 
//que é usado para herdar todos os metodos que foi passado no elemento pai (HttpServices) assim nos podemos reutilizar tudo oque foi passado no elemento pai(HttpServices).
export default class ApiUsuarioServices extends HttpServices {

    //criando um metodo async chamado (login) que será usado para fazer a aplicação no login e passamos dentro dele as credenciais(credenciais).
    async login(credenciais){
        //criamos uma função e passamos a data dentro dela {data} = ( que são os dados que serão enviados no corpo da requisição).
        const { data } = await this.post('/login', credenciais);
        //e essa função ela faz a chamada no backend com o metodo post(this.post) e espera(await) receber a url do login('/login') e as credenciais(login e a senha)
        //para que o backend devolva um token de autorização para que possamos fazer as demais requisições.
        
        

        //vamos usar o (localStorage) que seria o nosso "banco de dados" do noss navegador, ou seja ele mantem persistindo todas essas informações mesmo que fechemos ou reabrirmos o site, enquanto o nosso token estiver valido essa informaçõpes persistiram em uso.
        //e usando o (setItem) podemos escrever algo ou algumas informações no nosso banquinho de dados:
        localStorage.setItem("nome", data.nome);//passando dentro do setItem o nome e o data.nome
        localStorage.setItem("email", data.email);//passando dentro do setItem o email e o data.email
        localStorage.setItem("token", data.token);//passando dentro do setItem o token e o data.token

        //vamos fazer uma regrinha aqui, se(if) tiver a imagem do avatar:
        if(data.avatar){
            //setamos a imagem do avatar na mensagem.
            localStorage.setItem("avatar", data.avatar);
        }
    }

    //criando um metodo async chamado (cadastro) que será usado na aplicação do cadastro, que recebe dentro dele os dados do usuário(dados).
    async cadastro(dados){
        //executando a chamada para o metodo  post passando a url(/cadastro) e passando os dados do payload.
        return this.post('/cadastro', dados);
    }
}