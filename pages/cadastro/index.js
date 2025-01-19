import Image from "next/image";//importando o componente de imagem
import Link from "next/link";//importando o componente do link, que retornará para a tela de login
import Botao from "../../componentes/botao";//importando o componente do Botão
import InputPublico from "../../componentes/inputPublico";//importanto o componente do Input
import UploadImagem from "../../componentes/uploadImagem";//importanto o componente do upload do preview da imagem do usuario
import { useState } from "react";
import { validarNome, validarEmail, validarSenha, validarConfirmacaoDeSenha } from "../../utils/validadores";//importando os validadores a serem usados 
import UsuarioServices from "../../services/UsuarioServices";//importando o serviço do usuario.

import imagemLogo from "../../public/imagens/logo.svg";//importanto o icone do logo
import imagemUsuarioAtivo from "../../public/imagens/usuarioAtivo.svg";//importanto o icone do boneco
import imagemEnvelope from "../../public/imagens/envelope.svg";//importanto o icone do envelope usado no email
import imagemChave from "../../public/imagens/key.svg";//importanto o icone da chave
import imagemAvatar from "../../public/imagens/avatar.svg";//importanto o icone do usuario sem imagem
import { useRouter } from "next/router";

//vamos criar a instancia da classe do usuarioServices aqui fora para ele nao ser chamado sempre que for renderizado o componente
const usuarioServices = new UsuarioServices();

//criando a pagina de Cadastro
export default function Cadastro (){

    //vamos criar os states para seta-los
    const [imagem, setImagem] = useState(null);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmacaoSenha, setConfirmacaoSenha] = useState("");
    const [estaSubmetendo, setEstaSubmetendo] = useState(false);//criando um state extra que sera usado para controlar a submissão do formulario para o backend
    const router = useRouter();//criamos uma função(const) chamada router que dentro dela sera passado um rook do next, chamado useRouter
    //( utilizado para interagir com as rotas da aplicação, realizar navegação programática e acessar informações sobre a rota atual, como parâmetros de URL, caminhos e consulta de dados)

    //criando uma função(const) chamada (validarFormularioCadastro) para validar o formulario do cadastro:
    const validarFormularioCadastro = () => {
        //e essa função espera receber esses dados para poder validar o formulario:
        return(
            validarNome(nome)
            && validarEmail(email)
            && validarSenha(senha)
            && validarConfirmacaoDeSenha(senha, confirmacaoSenha)
        )
    }

    //vamos criar um metodo que sera usado toda vez que o usuario clicar no submit do botao:
    //criamos uma função(const) chamada (aoSubmeter) dizemos que ela é async() e essa funçao sera um evento(e).
    const aoSubmeter = async (e) => {
        e.preventDefault();//como essa função é um evento como padrão sempre que um evento é acionado a pagina ela é recarregada 
                          //porém quando passamos (e.prevent) esse metodo serve para evitar que a pagina seja recarregada.
        //por segurança vamos fazer uma checagem:
        //se(if) o formulario de cadastro não estiver válido(!validarFormularioCadastro) ele nao prossegui-rá adiante.
        if(!validarFormularioCadastro()){
            return;
        }

        //agora se o formulario estiver válidado:

        //vamos setar a função (estasubmetendo) para controlar o click do usuario isso evita que o usuario de varios clicks no botao gerendo varias requisições:
        setEstaSubmetendo(true);

        //vamos usar o try catch para tratar algums possiveis erros:
        try {
            //vamos preparar o payload para a requisição:
            //vamos criar uma função(const) chamada (corpoReqCadastro) passando o new FormData(Um objeto usado para compor e enviar dados no formato multipart/form-data, como aqrivos, imagens etc).
            //ou seja vamos usar o (FormData) e não um json direto pois estamos enviando um arquivo/imagem, por isso se usa o FormData pois ele aceita arquivo backEnd/ se fosse um json teriamos que converter o arquivo.
           const corpoReqCadastro = new FormData();
           //dentro do corpo da requisição(corpoReqCadastro) vamos adicionar(append) a chave que será usada no corpo da requisição para identificar o dado("nome") e o valor correspondente à chave(nome).
           //ou seja são os atributos que ele espera receber:
           corpoReqCadastro.append("nome", nome);
           corpoReqCadastro.append("email", email);
           corpoReqCadastro.append("senha", senha);

           //vamos colocar uma condição:
           //se(if) tiver uma imagem(imagem?) e dentro dessa imagem tiver um arquivo:
           if (imagem?.arquivo){
                //vamos adicionar(append) no corpo da requisição(corpoReqCadastro) a condição "FILE" e o arquivo dentro dela(imagem.arquivo).
                corpoReqCadastro.append("file", imagem.arquivo);
            }

            //vamos aguardar(await) os dados do cadastro(usuarioServices.cadastro(corpoReqCadastro) irem até o backend para termos o resultado.
            await usuarioServices.cadastro(corpoReqCadastro);
            //se deu tudo certo esse alerta enviará uma mensagem para sabermos se deu tudo certo.
            alert("Sucesso!");

            router.push('/');

        } catch (error) {
            //passando uma mensagem de alerta se caso o cadastro do usuario nao estiver correto:
            //e tambem vamos passar e conjunto qual é o tipo desse erro, se encontrarmos esse erro(error?) e se esse erro tiver um
            //response(response?) e esse response tiver uma data(data?) e se essa data tiver um erro(erro) ai a mensagem sera contatenada.
            alert("Erro ao cadastrar usuario." + error?.response?.data?.erro);
        }

        //vamos setar a função (estasubmetendo) como (false) quando o usuário ja estiver terminado de preenher todo o formulário corretamente.
        setEstaSubmetendo(false);
    }
    
    //return serve para mostrar tudo oque sera retornado na tela para o usuario
    return (
        //vamos criar uma section que sera um container, que ficara encapsulado todo o codigo
        //e vamos criar uma div extra , no caso de querer diferenciar passando um estilo exclusivo para a tela de cadastro. 
        //utilizando no sass o seletor usando as duas classes tanto na paginaCadastro quanto a paginaPublica
        <section className={`paginaCadastro paginaPublica`}>
            
            <div className="logoContainer desktop">
                <Image //para importar as propriedades
                    src={imagemLogo} //passando a propria imagem do logo
                    alt="Logotipo" //passando um texto alternativo, serve no caso de nao carregar  aimagem, essa frase ira aparecer
                    layout="fill" //'fill' serve para alterar o seu tamanho de acordo com a altura da div superior
                    /*se quisermos aplicar um estilo exclusivo para o imagem, usa-se (classname='logo' e passe o elemento*/
                    className="logo"
                />
            </div>
        
            <div className="conteudoPaginaPublica">
                <form onSubmit={aoSubmeter}>
                    
                    <UploadImagem
                        imagemPreviewClassName ="avatar avatarPreview"//passando a classes que iremos estilizar 
                        imagemPreview={imagem?.preview || imagemAvatar.src}//passando a imagem a ser usada, obs: se nao for passado nenhuma imagem o segundo atributo sera usado (imagemAvatar)
                        setImagem={setImagem}//passando o nosso estado
                    />

                    <InputPublico //criando o campo da senha, passando suas propriedades
                        imagem={imagemUsuarioAtivo}//imagem a ser usada como icone
                        texto="Nome Completo"// imformando ao usuario oque sera passado dentro do campo
                        tipo="text"//o tipo do atributo passado dentro do campo
                        aoAlterarValor={e => setNome(e.target.value)}//sempre que o campo for preenchido, o estado (const [nome, setNome]=useState) sera setado, passando u objeto evento,
                        //usando o ("e.target" : que é a referencia do meu objeto jv correspondente ao meu input), setando o valor(value) = ("e.target.value").
                        valor={nome}//passando o valor que sera alterado, para que o HTML renderize e mostre ao usuario a açõa que  esta sendo realizada
                        mensagemValidacao="O nome precisa ter no minimo 2 caracteres!"//passando uma mensagem ao usuario dos termos para preencher o campo
                        exibirMensagemValidacao={nome && !validarNome(nome)}//sera exibida somente quando o campo for preenchido e quando o nome estiver invalido/fora das normas de preenchimento
                    />

                    <InputPublico
                        imagem={imagemEnvelope}//imagem a ser usada como icone
                        texto="E-mail"//informando ao usuario oque sera passado dentro do elemento
                        tipo="email"//tipo do atributo passado dentro do campo
                        aoAlterarValor={e => setEmail(e.target.value)}//sempre que o campo for preenchido, o estado do (const [email, setEmail]=useState) sera setado, passando um objeto evento,
                        //usando o ("e.target": = referencia do meu objeto javascript correspondente ao meu input) setando o valor(valeu) = ("e.target.value").
                        valor={email}//passando o valor que sera alterado, para que o HTML renderize e mostre ao usuario a açõa que  esta sendo realizada
                        mensagemValidacao="O email informado não é valido!"//passando uma mesnagem ao usuario
                        exibirMensagemValidacao={email && !validarEmail(email)}//sera exibida somente quando for passado algo dentro do campo e o email estiiver incorreto/invalido
                    />

                    <InputPublico //criando o campo da senha, passando suas propriedades
                        imagem={imagemChave}//imagem a ser usada como icone
                        texto="Senha"// imformando ao usuario oque sera passado dentro do campo
                        tipo="password"//o tipo do atributo passado dentro do campo inclusive esse atributo deixa oculto sempre que digitado
                        aoAlterarValor={e => setSenha(e.target.value)}//sempre que o campo for preenchido, o estado (const [senha, setSenha]=useState) sera setado, passando u objeto evento,
                        //usando o ("e.target" : que é a referencia do meu objeto jv correspondente ao meu input), setando o valor(value) = ("e.target.value").
                        valor={senha}//passando o valor que sera alterado, para que o HTML renderize e mostre ao usuario a açõa que  esta sendo realizada
                        mensagemValidacao="A senha deve conter no minimo 3 caracteres"//passando uma mensagem ao usuario sobre os termos de preenchimento do campo de senha
                        exibirMensagemValidacao={senha && !validarSenha(senha)}//sera exibida somente quando for passado algo dentro do campo e se a senha estiver fora dos termos de preenchimento/incorreta/ invalida
                    />

                    <InputPublico //criando o campo da senha, passando suas propriedades
                        imagem={imagemChave}//imagem a ser usada como icone
                        texto="Confirmar Senha"// imformando ao usuario oque sera passado dentro do campo
                        tipo="password"////o tipo do atributo passado dentro do campo inclusive esse atributo deixa oculto sempre que digitado
                        aoAlterarValor={e => setConfirmacaoSenha(e.target.value)}//sempre que o campo for preenchido, o estado (const [confirmaSenha, setConfirmaSenha]=useState) sera setado, passando u objeto evento,
                        //usando o ("e.target" : que é a referencia do meu objeto jv correspondente ao meu input), setando o valor(value) = ("e.target.value").
                        valor={confirmacaoSenha}//passando o valor que sera alterado, para que o HTML renderize e mostre ao usuario a açõa que  esta sendo realizada
                        mensagemValidacao="A senha informada não confere com a senha acima!"//passando ao usuario uma mensagem de valiação
                        exibirMensagemValidacao={confirmacaoSenha && !validarConfirmacaoDeSenha(senha, confirmacaoSenha)}//sera exibida quando for passado algo dentro do campo e quando a senha de confirmação inserida noa for compativel com a senha acima
                    />

                    <Botao //estilizando o elemento 'botao'
                        texto="Cadastrar"//informando para o usuario ao que se refere o atributo
                        tipo="submit"//ou seja de preenchimento.
                        desabilitado={!validarFormularioCadastro() || estaSubmetendo}//o botao ficara desabilitado se caso o campo do formulario não for preenchido ,se o campo do formulario for preenchido de forma incorreta e quando (estaSubmetendo) for true
                    />
                </form>
            
                <div className="rodapePaginaPublica">
                    <p>Já possui uma conta?</p>
                    <Link href="/">Faça seu login agora!</Link>
                </div>
            </div>
        </section>
    );
}