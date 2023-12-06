// encontrar o botão adicionar tarefa

const btnAdicionarTarefa = document.querySelector('.app__button--add-task')
const formAdicionarTarefa = document.querySelector('.app__form-add-task')

// adiciona um ouvinte de eventos no botão adicionar tarefas que espera um clique
btnAdicionarTarefa.addEventListener('click', () => {
    // Coloca um alternador no formulario procurando a classe hidden (exibe e esconde o formulario)
    formAdicionarTarefa.classList.toggle('hidden')

})