
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
    },
    bindEvents: function () {
        // Bind the events
        // Vincula os eventos
        this.$checkButtons.forEach(button => {
            button.addEventListener('click', this.Events.checkButton_click)
        })

        this.$inputTask.onkeypress = this.Events.inputTask_keypress.bind(this)

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

            const key = event.key
            const value = event.target.value
            if (key === 'Enter') {
                this.$list.innerHTML += `
                    <li>
                        <div class="check"></div>
                        <label class="task">
                        ${value}
                        </label>
                        <button class="remove"></button>
                    </li>
                `

                event.target.value = ''

                this.cacheSelectors()
                this.bindEvents()
                console.log(this.$list)
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
