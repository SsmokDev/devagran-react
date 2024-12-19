//Aqui vamos criar os validadores:


//criando uma validacão para o nome:
//criamos uma função(const) chamada validarNome que recebe dentro dela o nome(nome)
const validarNome = (nome) => {
    return nome?.toString().length > 2;//retornamos(return) se existe um nome(nome?) e se esse nome é do tipo string e se tem no minimo 02 caracteres(toString().length > 2).
}

//criando uma validação para o email:
//criamos uma função(const) chamada validarEmail e passamos o email(email) dentro dela.
const validarEmail = (email) => {
    //criamos dentro dela uma outra função(const) chamada emailStr, que ela espera receber se existe algum email(email?) e se esse email é do tipo string(toString())
    const emailStr = email?.toString();
    return emailStr.length >= 5 && emailStr.includes('@') && emailStr.includes('.');//se tem um email e se o email é do tipo string: retornaremos se o email tem no minimo '5' caracteres, 
    //se entre esses caracteres tem '@' e se tem '.'
}

//criando uma const para a senha:
//criamos uma função(const) chamada validarSenha e que recebe dentro dela a senha(senha)
const validarSenha = (senha) =>{
    return senha?.toString().length > 3;//retornmaos se existe uma senha(senha?), se essa senha é do tipo string(toString) e se a senha tem no minimo 3 caracteres(length > 3).
}

//criando uma const para validar a confirmação da senha:
//criamos uma função(const) chamada validarConfirmacaoDeSenha que recebe dentro de si a (senha e a confirmação)
const validarConfirmacaoDeSenha = (senha, confirmacao) => {
    return validarSenha(senha) && senha === confirmacao;//retornamos a função validarSenha(senha) que no caso é a função que diz se esta tudo certo na criação da senha,
    //e dizemos que a senha tem que ser igual e equivalente a confirmação da senha(senha === confirmação).
}

//agora vamos exportar as validações criadas:
export {
    validarNome,
    validarEmail,
    validarSenha,
    validarConfirmacaoDeSenha
}