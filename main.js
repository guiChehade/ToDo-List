
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
        this.$BotaoSubmit.onclick = this.Events.inputTask_keypress.bind(this)
        
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

        inputTask_keypress: function (event) {
            // this.validacao.validarinput();
            
            const key = event.key
            console.log(event)
            const value = event.target.value
            if (this.$inputTask.value == "" || this.$inputTask.value.length < 11) {
                alert("Por favor, preencha o campo de tarefa e insira mais que onze caracteres");}
                else if (this.$dataInput2.value == "") {
                alert("Por favor, preencha o campo de data");

            } else {            
            if (event.type === 'click') {
                this.$list.innerHTML += `
                    <li>
                        <div class="check"></div>
                        <label class="task">
                        Data de criação: ${this.$dataAtual}, Data Limite: ${this.$dataInput2.value}, Tarefa: ${this.$inputTask.value}
                        </label>
                        <button class="remove"></button>
                    </li>
                `

                this.$inputTask.value = ""

                this.cacheSelectors()
                this.bindEvents()
                console.log(this.$list)
            }
        }
        },

        removeButton_click: function (event) {
            let li = event.target.parentElement

            li.classList.add('removed')
            setTimeout(() => {
                li.classList.add('hidden')
            }, 300)
        }
    }
}

Main.init();
