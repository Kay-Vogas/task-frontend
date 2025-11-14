
const API_URL = 'http://localhost:8080/task';

// Mapa de Prioridade para Ordenação
const priorityOrder = {
    'URGENTE': 4,
    'ALTA': 3,
    'MEDIA': 2,
    'BAIXA': 1
};


const taskList = document.getElementById('task-list');
const taskForm = document.getElementById('form-task');
const inputNome = document.getElementById('input-nome');
const inputDesc = document.getElementById('input-desc');
const selectPrioridade = document.getElementById('select-prioridade');


const modalBackdrop = document.getElementById('modal-backdrop');
const modalForm = document.getElementById('form-edit-task');
const btnCloseModal = document.getElementById('btn-close-modal');
const btnCancel = document.getElementById('btn-cancel');


const editId = document.getElementById('edit-id');
const editNome = document.getElementById('edit-nome');
const editDesc = document.getElementById('edit-desc');
const editPrioridade = document.getElementById('edit-prioridade');
const editStatus = document.getElementById('edit-status');


async function carregarTasks() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Erro ao buscar tarefas');
        }
        let tasks = await response.json();

        // Ordenação por Prioridade
        tasks.sort((a, b) => {
            return (priorityOrder[b.prioridade] || 0) - (priorityOrder[a.prioridade] || 0);
        });

        taskList.innerHTML = ''; 

        tasks.forEach(task => {
            const li = document.createElement('li');
            if (task.status) {
                li.classList.add('status-true');
            }

            const taskText = document.createElement('span');
            taskText.textContent = `${task.nome} (Prioridade: ${task.prioridade})`;
            li.appendChild(taskText);

            
            const taskActions = document.createElement('div');
            taskActions.classList.add('task-actions');

            
            const toggleButton = document.createElement('button');
            toggleButton.classList.add('btn-toggle');
            if (task.status) {
                toggleButton.textContent = 'Desmarcar';
                toggleButton.classList.add('status-true'); // Para estilizar (amarelo)
            } else {
                toggleButton.textContent = 'Concluir';
                toggleButton.classList.add('status-false'); // Para estilizar (verde)
            }
            // Chama a nova função de toggle
            toggleButton.onclick = () => handleToggleStatus(task);
            taskActions.appendChild(toggleButton);
            // --- Fim do Novo Botão ---

            // Botão de Editar
            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.classList.add('btn-edit');
            editButton.onclick = () => openEditModal(task);
            taskActions.appendChild(editButton);

            // Botão de Deletar
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Deletar';
            deleteButton.classList.add('btn-delete');
            deleteButton.onclick = () => handleDeletarTask(task.id);
            taskActions.appendChild(deleteButton);

            li.appendChild(taskActions);
            taskList.appendChild(li);
        });

    } catch (error) {
        console.error('Erro ao carregar tasks:', error);
        taskList.innerHTML = '<li>Falha ao carregar tarefas.</li>';
    }
}



async function handleCriarTask(event) {
    event.preventDefault();

    const novaTask = {
        nome: inputNome.value,
        descricao: inputDesc.value,
        prioridade: selectPrioridade.value,
        status: false
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novaTask)
        });

        if (!response.ok) {
            throw new Error('Erro ao criar tarefa');
        }

        taskForm.reset();
        selectPrioridade.value = "";
        carregarTasks();

    } catch (error) {
        console.error('Erro ao criar task:', error);
    }
}


async function handleDeletarTask(id) {
    if (!confirm('Tem certeza que deseja deletar esta tarefa?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Erro ao deletar tarefa');
        }
        carregarTasks();

    } catch (error) {
        console.error('Erro ao deletar task:', error);
    }
}

/**
 * Inverte o status de uma tarefa (concluída/pendente)
 * @param {object} 
 */
async function handleToggleStatus(task) {
    const taskAtualizada = {
        ...task, 
        status: !task.status 
    };

    try {
        const response = await fetch(`${API_URL}/${task.id}`, {
            method: 'PUT', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskAtualizada)
        });

        if (!response.ok) {
            throw new Error('Erro ao atualizar status da tarefa');
        }

     
        carregarTasks();

    } catch (error) {
        console.error('Erro ao alternar status:', error);
    }
}




function openEditModal(task) {
    editId.value = task.id;
    editNome.value = task.nome;
    editDesc.value = task.descricao;
    editPrioridade.value = task.prioridade;
    editStatus.checked = task.status;
    modalBackdrop.classList.add('show');
}

function closeEditModal() {
    modalBackdrop.classList.remove('show');
}

async function handleEditTask(event) {
    event.preventDefault();
    const id = editId.value;

    const taskAtualizada = {
        nome: editNome.value,
        descricao: editDesc.value,
        prioridade: editPrioridade.value,
        status: editStatus.checked
    };

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskAtualizada)
        });

        if (!response.ok) {
            throw new Error('Erro ao atualizar tarefa');
        }
        
        closeEditModal();
        carregarTasks();

    } catch (error) {
        console.error('Erro ao atualizar task:', error);
    }
}


taskForm.addEventListener('submit', handleCriarTask);
modalForm.addEventListener('submit', handleEditTask);
btnCancel.addEventListener('click', closeEditModal);
btnCloseModal.addEventListener('click', closeEditModal);

modalBackdrop.addEventListener('click', (event) => {
    if (event.target === modalBackdrop) {
        closeEditModal();
    }
});

carregarTasks();