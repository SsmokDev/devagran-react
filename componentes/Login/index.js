import InputPublico from "../inputPublico";
import Botao from "../botao";
import imagemEnvelope from "../../public/imagens/envelope.svg";
import imagemChave from "../../public/imagens/key.svg";
import imagemLogo from "../../public/imagens/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { validarEmail, validarSenha} from "../../utils/validadores"//importando os validadores.
import UsuarioServices from "../../services/UsuarioServices";//importando o serviço do usuario.

//vamos criar uma função(const) chamada usuarioServiçes e passamos dentro dela o new UsuarioServices(). 
//ou seja criamos a  instancia da classe do usuarioServices aqui fora para ele não ser chamado sempre que for renderizado o componente
const usuarioServices = new UsuarioServices();

//criando a função a ser exportada:
export default function Login() {

    //vamos criando uma o local onde sera salvo a setagem do email e a senha
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [estaSubmetendo, setEstaSubmetendo] = useState(false);

    //vamos criar uma função para validar o formulario do login
    const validarFormularioLogin = () => {
        return(
            validarEmail(email)//passando a função de validação do email
            && validarSenha(senha) //passando a função de validação da senha
        );
    }

    //vamos criar um metodo usado sempre que o usuario clicar no botao de Login
    const aoSubmeter = async (e) => {
        e.preventDefault();//esse metodo serve para evitar que a pagina seja recarregada
        //passando se o formulario de login nao estiver valido ele nao prossegui-rá adiante
        if(!validarFormularioLogin()){
            return;
        }

        //vamos setar a função estasubmetendo/ para evitar que o usuario de varios clicks no botao gerendo varias requisições
        setEstaSubmetendo(true);

        //vamos usar o try catch para tratar algums possiveis erros
        try {
            //vamos preparar o payload do login/ passando suas credenciais
           await usuarioServices.login({
            login: email,
            senha
           });

        } catch (error) {
            //passando uma mensagem de alerta se caso o cadastro do usuario nao estiver correto
            alert("Erro ao  realizar o login do usuario." + error?.response?.data?.erro);//se esse erro tiver uma dessas propriedades(response, data e erro)ai a mensagem sera contatenada
        }

        setEstaSubmetendo(false);
    }

    return (
        //vamos criar uma section que sera um container, que ficara encapsulado todo o codigo

        //vamos criar uma div extra , no caso de querer diferenciar passando um estilo exclusivo para a tela de login. 
        //utilizando no sass o seletor usando as duas classes tanto na paginaLogin quanto a paginaPublica 
        <section className={`paginaLogin paginaPublica`}>
            
            <div className="logoContainer">
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
                    <InputPublico // criando o campo da senha, passando suas propriedades
                        imagem={imagemEnvelope} //imagem usada como icone
                        texto="E-mail"// informando para o usuario oque sera passado dentro do campo
                        tipo="email" //o tipo do atributo passado dentro do campo
                        aoAlterarValor={e => setEmail(e.target.value)}//sempre que o campo for preenchido, o estado do (const [email, setEmail]=useState) sera setado, passando um objeto evento,
                        //usando o ("e.target": = referencia do meu objeto javascript correspondente ao meu input) setando o valor(valeu) = ("e.target.value").
                        valor={email}//passsando o valor que sera alterado, para que o HTML renderize e mostre ao usuario oque esta sendo realizado
                        mensagemValidacao="O endereço informando é invalido!"//passando uma mensagem para o usuario
                        exibirMensagemValidacao={email && !validarEmail(email)}//sera exibido a mensagem de validação somente quando for passado um email(alguma coisa dentro do campo) e o email nao for valido
                    />

                    <InputPublico //criando o campo da senha, passando suas propriedades
                        imagem={imagemChave}//imagem a ser usada como icone
                        texto="Senha"// imformando ao usuario oque sera passado dentro do campo
                        tipo="password"//o tipo do atributo passado dentro do campo inclusive esse atributo deixa oculto sempre que digitado
                        aoAlterarValor={e => setSenha(e.target.value)}//sempre que o campo for preenchido, o estado (const [senha, setSenha]=useState) sera setado, passando u objeto evento,
                        //usando o ("e.target" : que é a referencia do meu objeto jv correspondente ao meu input), setando o valor(value) = ("e.target.value").
                        valor={senha}//passando o valor que sera alterado, para que o HTML renderize e mostre ao usuario a açõa que  esta sendo realizada
                        mensagemValidacao="Precisa ter no minimo 3 caracteres!"//passando uma mensagem ao usuario quando o campo da senha for preenchido
                        exibirMensagemValidacao={senha && !validarSenha(senha)}//sera exibidoa mensagem de validação somente quando for passado um senha(alguma coisa dentro do campo) e a senha naoo for valida!
                    />

                    <Botao //estilizando o elemento 'botao'
                        texto="Login"//informando para o usuario ao que se refere o atributo
                        tipo="submit"//
                        desabilitado={!validarFormularioLogin() || estaSubmetendo}//passando que o botão ficara desabilitado caso o formulario nao esteja preenchido e se o formulario for preenchido incorretamente
                    />
                </form>
                
                <div className="rodapePaginaPublica">
                    <p>Não possui uma conta?</p>
                    <Link href="/cadastro">Faça seu cadastro agora!</Link>
                </div>

            </div>

        </section>
    )
}