//criando um componente
export default function Botao({
    type = 'button',
    texto,
    cor = 'primaria', //cor de fundo do 'botao' , que por padrao sera como primaria
    desabilitado = false,
    manipularClique
}) {
    return (
        <button
            type={type}
            className={`btn ${cor}`}
            disabled={desabilitado}
            onClick={manipularClique}
        >
            {texto}
        </button>
    )
}