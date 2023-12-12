
// Aqui começamos por selecionar os elementos que vamos precisar interagir no nosso código.
// Esta linha pega o botão de adicionar tarefa baseado na classe CSS.
const btnAdicionarTarefa = document.querySelector('.app__button--add-task')
// Da mesma forma, esta linha seleciona nosso formulário de adicionar tarefa.
const formAdicionarTarefa = document.querySelector('.app__form-add-task')
// Selecione o botão de Cancelar que adicionamos ao formulário
const btnCancelar = document.querySelector('.app__form-footer__button--cancel')
// E aqui, pegamos a área de texto onde o usuário digita a descrição da tarefa.
const textarea = document.querySelector('.app__form-textarea')
//
const ulTarefas = document.querySelector('.app__section-task-list')
const paragrafoDescricaoTarefa = document.querySelector('.app__section-active-task-description')

// Pega a lista de tarefas do localStorage se não houver cria uma lista vazai.
const tarefas = JSON.parse(localStorage.getItem('tarefas')) || []
let tarefaSelecionada = null
let liTarefaSelecionada = null

// função que monta a estrutura html que vai ser mostrado na pagina
function criarElementoTarefa(tarefa) {
    const li = document.createElement('li')
    li.classList.add('app__section-task-list-item')

    // svg
    const svg = document.createElement('svg')
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
        <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
        fill="#01080E"></path>
        </svg>
    `
    // paragrafo
    const paragrafo = document.createElement('p')
    paragrafo.classList.add('app__section-task-list-item-description')
    paragrafo.textContent = tarefa.descricao

    // editar
    const botao = document.createElement('button')
    botao.classList.add('app_button-edit')
    botao.onclick = () => {
        const novaDescricao = prompt("Qual é o novo nome da tarefa?")
        // se houver qlqr coisa escrita é "true", null ou vazia retorna "falso"
        if (novaDescricao) {
            // atualiza o objeto visualmente
            paragrafo.textContent = novaDescricao
            // atualiza o objeto localStorage
            tarefa.descricao = novaDescricao
            atualizarTarefas()
        }
    }
    const imagemBotao = document.createElement('img')
    imagemBotao.setAttribute('src', '/imagens/edit.png')
    botao.append(imagemBotao)

    li.append(svg)
    li.append(paragrafo)
    li.append(botao)

    li.onclick = () => {
        paragrafoDescricaoTarefa.textContent = tarefa.descricao
        document.querySelectorAll('.app__section-task-list-item-active')
            .forEach(elemento => {
                elemento.classList.remove('app__section-task-list-item-active')
            })
        if (tarefaSelecionada == tarefa) {
            paragrafoDescricaoTarefa.textContent = ''
            tarefaSelecionada = null
            liTarefaSelecionada = null
            return
        }
        tarefaSelecionada = tarefa
        liTarefaSelecionada = li
        paragrafoDescricaoTarefa.textContent = tarefa.descricao
        
        li.classList.add('app__section-task-list-item-active')
    }

    return li
}

// Agora, adicionamos um ouvinte de eventos ao botão. Quando o botão for clicado, esta função será executada.
btnAdicionarTarefa.addEventListener('click', () => {
    // Esta linha vai alternar a visibilidade do nosso formulário. Lembra da classe 'hidden' que esconde elementos?
    formAdicionarTarefa.classList.toggle('hidden')
})

// Aqui, estamos ouvindo o evento de 'submit' do nosso formulário. 
// Esse evento ocorre quando tentamos enviar o formulário (geralmente, apertando o botão 'Enter' ou clicando em um botão de submit).
formAdicionarTarefa.addEventListener('submit', (evento) => {
    // Esta linha evita que a página recarregue (comportamento padrão de um formulário). Nós não queremos isso!
    evento.preventDefault();
    
    // Aqui, criamos um objeto tarefa com a descrição vinda da nossa textarea.
    const tarefa = {
        descricao: textarea.value
    }

    // Depois, adicionamos essa tarefa ao nosso array de tarefas.
    tarefas.push(tarefa)

    // E, finalmente, armazenamos nossa lista de tarefas no localStorage. 
    // Convertendo o array para uma string em formato JSON para poder armazenar.
    localStorage.setItem('tarefas', JSON.stringify(tarefas))


    // Executa a função que mostra na pagina uma lista de tarefas
    const elementoTarefa = criarElementoTarefa(tarefa)
    // Coloca a tarefa no fim da tela
    ulTarefas.append(elementoTarefa)

    // E, finalmente, armazenamos nossa lista de tarefas no localStorage. 
    // Convertendo o array para uma string em formato JSON para poder armazenar.
    atualizarTarefas()
    // Apaga o texto
    textarea.value = ''
    // Esconde o formulario
    formAdicionarTarefa.classList.add('hidden')
})

// Para cada tarefa. A cada função criarElementoTarefa adicione no ultimo da fila.
tarefas.forEach(tarefa => {
    const elementoTarefa = criarElementoTarefa(tarefa)
    ulTarefas.append(elementoTarefa)
});

document.addEventListener('FocoFinalizado', () => {
    if (tarefaSelecionada && liTarefaSelecionada) {
        liTarefaSelecionada.classList.remove(app__section-task-list-item-active)
        liTarefaSelecionada.classList.add('app__section-task-list-item-complete')
        liTarefaSelecionada.querySelector('button').setAttribute('disabled', 'disabled')
    }
})
