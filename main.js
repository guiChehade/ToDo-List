
const Main = {
    init: function () { 
        // Initialize the todo list
        // Inicializa a lista de tarefas
        this.cacheSelectors();
        this.bindEvents();
    },
    cacheSelectors: function () {
        // Create variables to hold the selectors
        // Cria variáveis para selecionar os elementos
        this.$checkButtons = document.querySelectorAll('.check')
        this.$inputTask = document.querySelector('#inputTask')
        this.$list = document.querySelector('#list')
        this.$removeButtons = document.querySelectorAll('.remove')
        this.$BotaoSubmit = document.querySelector('#BotaoSubmit')
        this.$dataInput = document.querySelector('#data1')
        this.$dataInput2 = document.querySelector('#data2')
        const data = new Date();
        const dia = data.getDate();
        const mes = data.getMonth() + 1;
        const ano = data.getFullYear();
        this.$dataAtual = `${ano}-${mes}-${dia}`;
        this.$dataInput.value = this.$dataAtual;
    },   
    
    
    bindEvents: function () {
        // Bind the events
        // Vincula os eventos
        this.$checkButtons.forEach(button => {
            button.addEventListener('click', this.Events.checkButton_click)
        })

        // this.$inputTask.onkeyup = this.Events.inputTask_keypress.bind(this)
        this.$BotaoSubmit.onclick = this.Events.inputTask_click.bind(this)
        
        this.$removeButtons.forEach(button => {
            button.addEventListener('click', this.Events.removeButton_click)
        })
    },
    Events: {
        checkButton_click: function (event) {
            const li = event.target.parentElement
            const isDone = li.classList.contains('done')

            if (!isDone) {
                return li.classList.add('done')
            }
            li.classList.remove('done')
        },

        inputTask_click: function (event) {
            // this.validacao.validarinput();
            console.log(event)
            if (this.$inputTask.value.length < 11) {
                alert("Por favor, a tarefa deve ter mais que dez caracteres");
            } else if (this.$dataInput2.value < this.$dataInput.value) {
                alert("Por favor, a data limite não pode ser anterior à data de criação");
            } else {            
                this.$list.innerHTML += `
                    <li>
                        <div class="check"></div>
                        <label class="task">
                        Criado em: ${this.$dataAtual}, Limite: ${this.$dataInput2.value}, ${this.$inputTask.value}
                        </label>
                        <button class="remove"></button>
                    </li>
                `

                this.$inputTask.value = ""
                this.cacheSelectors()
                this.bindEvents()
            }
        },

        removeButton_click: function (event) {
            let li = event.target.parentElement

            if (confirm('Tem certeza que deseja remover esta tarefa?')) {
                li.classList.add('removed')
                setTimeout(() => {
                li.classList.add('hidden')
            }, 300)
            }
        }
    }
}

Main.init();
