var addTarefa = function(){
    var tarefa = document.getElementById('tarefa').value

    var tarefas = getTarefas();

    if(tarefa) {
        tarefas.push(tarefa)
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
        document.getElementById('tarefa').value ='';
    }
    document.location.reload(true);
}

var getTarefas = function() {
    var tarefas = []
    var tarefas_string = localStorage.getItem('tarefas');

    if(tarefas_string != null) {
        return JSON.parse(tarefas_string);
    }
}

var showTarefas = function() {
    var tarefas = getTarefas()
    var html = '<ul>';

    tarefas.forEach(function(elemento, index){ 
        html += '<li> 📌 ' + elemento + '<button class="remove" id="'+ index +'">Remover</button></li>';
    });
    html += '</ul>';

    document.getElementById('tarefas').innerHTML = html

    var buttons = document.getElementsByClassName('remove');

    for (var i=0; i < buttons.length; i++){
        buttons[i].addEventListener('click', removeTodo);
    };
}

var removeTarefa = function(){
    var id = this.getAttribute('id')
    var tarefas = getTodos();
    tarefas.splice(id, 1)
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    document.location.reload(true);
}

var hasTarefa = function(){
    var tarefas = getTarefas();
    if(tarefas == ''){
        text = '<h2>Não há tarefas cadastradas!</h2>';
        document.getElementById('msg').innerHTML = text;
    } else {
        text = '<h2>Suas tarefas pendentes:</h2>';
        document.getElementById('msg').innerHTML = text;
    }
}

document.getElementById('add').addEventListener('click', addTarefa);
window.addEventListener('keydown', function(event){ 
    if(event.keyCode == 13){
        addTarefa();
    };
}); 

hasTarefa();
showTodos();