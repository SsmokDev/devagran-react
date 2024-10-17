//criando o componente de para o upload da imagem

import { useEffect, useRef } from "react";

//exportando a função criada
export function UploadImagem({
    className='',
    setImagem,
    imagemPreview,
    imagemPreviewClassName ='',
    aoSetarAReferencia
}){
    //criando uma referencia para disparar sempre que a funcao de abrir o seletor for usada
    const referenciaInput = useRef(null);//usando o 'useRef' do react e passando nada como parametro.

    //criando um metodo para fazer alguma alteração no componente do state usando o 'useeffect'
    useEffect(() => {
        //vamos criar uma checagem , se nao for passado alguma prop dentro do componenet pai.
        if (!aoSetarAReferencia){//se nao passou retorna nada.
            return;
        }

        
        aoSetarAReferencia(referenciaInput?.current);
    }, [referenciaInput?.current]);//este é um segundo parametro, um array
    //resumindo sempre que que for alterado a referencia atual do input, ele ira chamar esse callback passado dentro do array

    //criando uma função para selecionar o arquivo da imagem desejada
    const abrirSeletorDeArquivos = () => {
        referenciaInput?.current?.click();//faz com que sempre que clicado em qualquer lugar da 'div' 
                                          //seja forcado a abrir o seletor de arquivos
    }

    //criando uma função para trocar a imagem
    const aoAlterarImagem = () => {
        //verifica se tem algum arquivo selecionado ao selecionar a imagem
        if (!referenciaInput?.current?.files?.length){//se nao tiver nada dentro da lista de arquivos do input
            return;
        }

        //se tiver alguma coisa
        const arquivo = referenciaInput?.current?.files[0];

        //criando uma const para ler o arquivo para conseguir colocar ele como preview
        const fileReader = new FileReader();//seleciona um objeto chamado 'fileReader' uma classe propria do JS
        fileReader.readAsDataURL(arquivo);//metodo do fileReader que le um arquivo e devolve a sua URl,que te possibilita colocar nos src de alguns componentes do tipo imagem, em seguida passando dentro dele o proprio 'arquivo' como parametro, porem esse metodo e async ele funcioana baseado em eventos
        fileReader.onloadend= () => {//metodo que diz ao fim do carregamento
            setImagem({//metodo do componente pai, que ira guardar o state
                preview: fileReader.result,//para poder visualizar os dadios da imagem
                arquivo
            });
        };                     
    }

    return (
        //criando uma 'div' para encapsular o codigo abaixo
        //sabe-se que 'Conteiner' geralmente sao 'divs' que englobam mais de um elemento
        <div className={`uploadImagemContainer ${className}`} onClick={abrirSeletorDeArquivos}>
            {imagemPreview && (//criando uma condição, se a primeira for true/verdadeiro ai sim ele entra na segunda
                <div className="imagemPreviewContainer">
                    <img 
                        src={imagemPreview}
                        alt='imagem preview'
                        className={imagemPreviewClassName}
                    />
                </div>
            )}
            <input 
                type='file' //esse input que consegui receber um arquivo e a partir de ele mandar para o backend
                className='oculto' //vamos aplicar um estilo para oculta-lo
                accept="image/*"//propriedade que restringi, e vamos dizer para aceitar somente imagens, e usando o '/*' ele vai aceitar qualquer tipo de imagem
                ref={referenciaInput}//usando o atributo 'ref' do proprio elemento, passando dentro dele a proprio referencia dentro do input 
                onChange={aoAlterarImagem}//sempre que for alterar a imagem, o 'onChange' ira chamar essa função 'aoAlterarImagem'
            />
        </div>
        
    );
}