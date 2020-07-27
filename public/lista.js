var addTarefa = function () {
    var tarefa = document.getElementById('tarefa').value
    var data_entrega = document.getElementById('entrega').value
    var data_conclusao = document.getElementById('conclusao').value

    var entrega_Parts = data_entrega.split('-')

    var dia_entrega = entrega_Parts[2]
    var mes_entrega = entrega_Parts[1]
    var ano_entrega = entrega_Parts[0]

    var entrega_formatada = `${dia_entrega}/ ${mes_entrega}/ ${ano_entrega}`

    var conclusao_Parts = data_conclusao.split('-')

    var dia_conclusao = conclusao_Parts[2]
    var mes_conclusao = conclusao_Parts[1]
    var ano_conclusao = conclusao_Parts[0]

    var conclusao_formatada = `${dia_conclusao}/ ${mes_conclusao}/ ${ano_conclusao}`


    var tarefas = getTarefas()

    if (tarefa) {
        tarefas.push({ tarefa: tarefa, entrega: entrega_formatada, conclusao: conclusao_formatada })
        localStorage.setItem('tarefas', JSON.stringify(tarefas))
        document.getElementById('tarefa').value = ''
    }
    document.location.reload(true)
}

var getTarefas = function () {
    var tarefas = []
    var tarefas_string = localStorage.getItem('tarefas')

    if (tarefas_string != null) {
        return JSON.parse(tarefas_string)
    }
    return tarefas
}

var showTarefas = function () {
    var tarefas = getTarefas()
    var html = '<ul>';
    if (tarefas != null) {
        tarefas.forEach(function (elemento, index) {
            html += '<li class="lista"> <i class="material-icons">arrow_forward</i> ' + ' Tarefa: ' + elemento.tarefa + ' Entrega: ' + elemento.entrega + ' Conclusão:' + elemento.conclusao + 
                '<i class="material-icons" id=' + index + ' name="remove">delete</i>' +
                '<i class="material-icons" id=' + index + ' name="preview">zoom_in</i>' +
                '<i class="material-icons" id=' + index + ' name="remove">done</i>' +
                '<i class="material-icons" id=' + index + ' name="edit">edit</i> </li>';
        });
    }
    html += '</ul>';

    document.getElementById('tarefas').innerHTML = html

    var remove_tarefa = document.getElementsByName('remove')

    for (var i = 0; i < remove_tarefa.length; i++) {
        remove_tarefa[i].addEventListener('click', removeTarefa)
    }

    var modal_tarefa = document.getElementsByName('preview')

    for (var i = 0; i < modal_tarefa.length; i++) {
        modal_tarefa[i].addEventListener('click', modalTarefa)
    }
}

var removeTarefa = function () {
    var id = this.getAttribute('id')
    var tarefas = getTarefas()
    tarefas.splice(id, 1)
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
    document.location.reload(true)
}

var modalTarefa = function () {
    var id = this.getAttribute('id')
    var tarefas = getTarefas()
   
    tarefa = tarefas[id]
   
    var modalOverlay = document.querySelector('.modal-overlay')
    modalOverlay.classList.add('active')
    modalOverlay.querySelector("p.tarefa").innerText = tarefa.tarefa
    modalOverlay.querySelector("p.entrega").innerHTML = tarefa.entrega_formatada
    modalOverlay.querySelector("p.conclusao").innerHTML = tarefa.conclusao_formatada
    
}


var hasTarefa = function () {
    var tarefas = getTarefas()
    if (tarefas == '') {
        text = '<h2 class="mensagem"> Você não tem nenhuma tarefa pendente!</h2>';
        document.getElementById('msg').innerHTML = text
    } else {
        text = '<h2 class="mensagem"> Tarefas pendentes:</h2>';
        document.getElementById('msg').innerHTML = text
    }
}


document.getElementById('add').addEventListener('click', addTarefa)
window.addEventListener('keydown', function (event) {
    if (event.keyCode == 13) {
        addTarefa();
    }
})

hasTarefa()
showTarefas()

