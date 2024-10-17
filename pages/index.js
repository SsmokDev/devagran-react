import Head from 'next/head'
import Image from 'next/image'
import Botao from '../componentes/botao'
import Avatar from '../componentes/avatar'
import { UploadImagem } from '../componentes/uploadImagem'
import { useRef, useState } from 'react'

export default function Home() {

  //criando um state
  const [imagem, setImagem] = useState(null);
  const  referenciaInput = useRef(null);

  console.log(imagem);

  return (
    <>
      <h1>Ola Mundo!</h1>
      <button onClick={() => referenciaInput?.current?.click()}>abrir seletor de arquivo</button>
      <UploadImagem 
        setImagem={setImagem} 
        imagemPreview={imagem?.preview}
        aoSetaraReferencia = {(ref) => referenciaInput.current = ref}
      />

      <div style={{width: 200}}>
        <Avatar/>
        <Botao texto={'Login'} cor= 'primaria' manipularClique={() => console.log('Botao clicado')} />
      </div>
    </>
  )
}
