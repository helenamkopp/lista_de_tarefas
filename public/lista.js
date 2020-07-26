var addTarefa = function () {
    var tarefa = document.getElementById('tarefa').value
    var entrega = document.getElementById('entrega').value
    var conclusao = document.getElementById('conclusao').value

    var tarefas = getTarefas();

    if (tarefa) {
        tarefas.push({ tarefa: tarefa, entrega: entrega, conclusao: conclusao })
        console.log(tarefas)
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
        document.getElementById('tarefa').value = '';
    }
    document.location.reload(true);
}

var getTarefas = function () {
    var tarefas = []
    var tarefas_string = localStorage.getItem('tarefas');

    if (tarefas_string != null) {
        return JSON.parse(tarefas_string);
    }
    return tarefas
}

var showTarefas = function () {
    var tarefas = getTarefas()
    var html = '<ul>';
    if (tarefas != null) {
        tarefas.forEach(function (elemento, index) {
            console.log(elemento)
            html += '<li> 📌 ' + elemento.tarefa + '\n ' + elemento.entrega + '\n ' + elemento.conclusao + ' <button class="remove" id="' + index + '">Remover</button></li>';
        });
    }
    html += '</ul>';

    document.getElementById('tarefas').innerHTML = html

    var buttons = document.getElementsByClassName('remove');

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', removeTarefa);
    };
}

var removeTarefa = function () {
    var id = this.getAttribute('id')
    var tarefas = getTarefas();
    tarefas.splice(id, 1)
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    document.location.reload(true);
}

var hasTarefa = function () {
    var tarefas = getTarefas();
    if (tarefas == '') {
        text = '<h2>Não há tarefas cadastradas!</h2>';
        document.getElementById('msg').innerHTML = text;
    } else {
        text = '<h2>Suas tarefas pendentes:</h2>';
        document.getElementById('msg').innerHTML = text;
    }
}

document.getElementById('add').addEventListener('click', addTarefa);
window.addEventListener('keydown', function (event) {
    if (event.keyCode == 13) {
        addTarefa();
    };
});

hasTarefa();
showTarefas();