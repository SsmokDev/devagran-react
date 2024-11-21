import Image from "next/image";

export default function InputPublico({//vamos receber a imagem como prop do componente inputpublico
    imagem,
    tipo,
    texto,
    valor = "",
    exibirMensagemValidacao = false,
    mensagemValidacao = "",
    aoAlterarValor
}){
    return(
        //vamos criar algumas  divs para  a seção do logo e outra para a parte do input mesmo

        //criamos duas divs porque uma para a imagem(Image) e o campo(input)
        // e outra para exibir embaixo do campo alguma validação em caso de erro
        <div className="inputPublicoContainer">
            
            <div className="inputPublico">
                <Image //para importar as propiedades 
                    src={imagem} //passando a imagem a ser usada
                    alt="imagem do campo" //texto alternativo, no caso de nao carregar a imagem, essa frase ira aparecer
                    className="iconeInputPublico"
                    width={20} //largura fixa
                    heght={20} //altura fixa
                />

                <input
                    type={tipo}
                    placeholder={texto}
                    value={valor}
                    onChange={aoAlterarValor}
                />
            </div>
            
            {exibirMensagemValidacao && <p className="mensagemValidacao">{mensagemValidacao}</p>}

        </div>
    );
}