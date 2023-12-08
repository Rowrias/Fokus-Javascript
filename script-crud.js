// encontrar o botão adicionar tarefa

const btnAdicionarTarefa = document.querySelector('.app__button--add-task')
const formAdicionarTarefa = document.querySelector('.app__form-add-task')
const textarea = document.querySelector('app__form-textarea')

// tarefa que esta sendo armazenado
const tarefas = []

// adiciona um ouvinte de eventos no botão adicionar tarefas que espera um clique
btnAdicionarTarefa.addEventListener('click', () => {
    // Coloca um alternador no formulario procurando a classe hidden (exibe e esconde o formulario)
    formAdicionarTarefa.classList.toggle('hidden')

})

formAdicionarTarefa.addEventListener('submit', (evento) => {
    evento.preventDefault();
    
    // tarefa que esta sendo preenchida no momento
    const tarefa = {
        descricao: textarea.value
    }
    // armazena a tarefa da vez na lista tarefas
    tarefas.push(tarefa)
    // Pega a lista tarefas transforma em JSON.stringify e envia para o localStorage com a chave tarefas
    localStorage.setItem('tarefas', JSON.stringify(tarefas))

})