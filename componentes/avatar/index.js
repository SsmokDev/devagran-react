import avatarImg from '../../public/imagens/avatar.svg';//importando o caminho da imagem padrao do boneco

//criando o componente avatar
export default function Avatar({ src }){//recebendo como prop a src da imagem
    //criando uma const para verificar se a pessoa passou uma imagem
    const getAvatar = () =>{
        //se o usuario passou uma imagem, retorna a imagem passada pelo usuario no caso o link 
        if (src && src !== 'undefined'){
            return src;
        }
        //se nao, vamos retornar para o usuario a imagem padrao 'desenho do boneco' 
        return avatarImg.src;

    }
    return (
        <img 
            src={getAvatar()}//chamando o metodo 
            alt='Avatar'//passando um texto alternativo, hmtl semantico
            className='avatar'//baseado nesse className que iremos passar o estilo
        />
    )
}