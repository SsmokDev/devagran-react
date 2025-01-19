import { useEffect, useState } from "react";//importando do próprio react o useEffect e o useState.
import Login from "../componentes/Login";//importando o Login.
import UsuarioServices from "../services/UsuarioServices";//importando o serviço do usuario.

const usuarioService = new UsuarioServices;
export default function Index() {
  //vamos criar um estate;
  const [estaAutenticado, setEstaAutenticado] = useState(false);

  //Agora vamos fazer o seguinte, para sabermos se estamos autenticados(ou temos o token de autorização) sempre que a nossa tela principal(index do cadastro) for recarregada(renderizada), vamos:

  //O useEffect(é um hook usado para executar efeitos colaterais (side effects) em componentes funcionais do React) ele aceita dois parametros:
  //O primeiro parâmetro é uma função que define o efeito que deve ser executado(setEstaAutenticado)
  //O segundo parâmetro é uma lista de dependências (no caso é um array vazio ([]). Isso significa que o efeito será executado apenas uma vez.
  useEffect(() => {
    setEstaAutenticado(
      //aqui vamos chamar esse método (usuarioService.estaAutenticado), ele nos retornara uma resposta  booleana(true/false) se for true(esta autenticado) se for false(não esta autenticado)
      usuarioService.estaAutenticado()
    )
  }, []);
  //Ou seja, quando o componente for montado (após o primeiro render), ele executa a função dentro do useEffect(setEstaAutenticado)
  //Dentro dessa função, ele chama o método (usuario.estaAutenticado()), que atualiza o estado de autenticação do usuário, indicando se ele está autenticado ou não.

  //aqui vamos validar:
  //se(if) esta autenticado retorne para a home(página inicial)
  if (estaAutenticado){
    return<Home/>;
  }
  //estamos passando para o método de login, a propriedade(aposAutenticacao) que será chamada apos o usuário ser autenticado.
  return <Login aposAutenticacao = {() => setEstaAutenticado(true)}/>;
  
}
