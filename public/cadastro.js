
function verificarCPF(strCpf) {
    if (!/[0-9]{11}/.test(strCpf)) return false;
    if (strCpf === "00000000000") return false;

    var soma = 0;

    for (var i = 1; i <= 9; i++) {
        soma += parseInt(strCpf.substring(i - 1, i)) * (11 - i);
    }

    var resto = soma % 11;

    if (resto === 10 || resto === 11 || resto < 2) {
        resto = 0;
    } else {
        resto = 11 - resto;
    }

    if (resto !== parseInt(strCpf.substring(9, 10))) {
        return false;
    }

    soma = 0;

    for (var i = 1; i <= 10; i++) {
        soma += parseInt(strCpf.substring(i - 1, i)) * (12 - i);
    }
    resto = soma % 11;

    if (resto === 10 || resto === 11 || resto < 2) {
        resto = 0;
    } else {
        resto = 11 - resto;
    }

    if (resto !== parseInt(strCpf.substring(10, 11))) {
        return false;
    }

    return true;
}
function validateFields() {
    var strCpf = document.getElementById('cpf').value;
    var dataNasc = document.getElementById("nascimento").value;

    var idade = calculaIdade(dataNasc)
    if (idade < 12){
        alert("Usuário não pode ser cadastrado, pois é menor de 12 anos")
    } 
    
    if (!verificarCPF(strCpf)) {
        alert("CPF Inválido")
    }
}

function calculaIdade(dataNasc) {
    

    var dataAtual = new Date()

    var anoAtual = dataAtual.getFullYear()
    var mesAtual = dataAtual.getMonth() + 1
    var diaAtual = dataAtual.getDate() 

    var anoNascParts = dataNasc.split('-')

    var mesNasc = anoNascParts[1]
    var diaNasc = anoNascParts[2]
    var anoNasc = anoNascParts[0]

    var idade = anoAtual - anoNasc
   
    if (mesAtual < mesNasc) {
        idade = idade - 1
    } else {
        if(mesAtual == mesNasc){ 
            if(diaAtual < diaNasc){
                idade = idade - 1 
            }
        }
    }
    return idade
}
