
//criando uma validacao para o nome
const validarNome = (nome) => {
    return nome?.toString().length > 2;//se o nome for maior que 2 letras retorna true
}
//criando uma const para o email
const validarEmail = (email) =>{
    const emailStr = email?.toString();
    return emailStr.length >= 5 && emailStr.includes('@') && emailStr.includes('.');//verifica se tem mais de '5' caracteres, se tem '@' e se tem '.'
}

//criando uma const para a senha
const validarSenha = (senha) =>{
    return senha?.toString().length > 3;//validando se tem pelo menos '3' caracteres
}

//criando uma const para validar a senha
const validarConfirmacaoDeSenha = (senha, confirmacao) => {
    return validarSenha(senha) && senha === confirmacao;
}

//agora vamos exportar as validacoes criadas
export {
    validarNome,
    validarEmail,
    validarSenha,
    validarConfirmacaoDeSenha
}