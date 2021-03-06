
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
        this.$data = data
        const dia = data.getDate().toString().padStart(2, '0')
        const mes = (data.getMonth()+1).toString().padStart(2, '0')
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

            if (this.$inputTask.value.length < 11) {
                Swal.fire({
                    icon: 'error',
                    title: 'Tarefa Inválida',	
                    text: 'Favor digitar uma tarefa com mais de 10 caracteres',
                  })
            } else if (this.$dataInput2.value < this.$dataInput.value) {
                Swal.fire({
                    icon: 'error',
                    title: 'Data Inválida',	
                    text: 'Por favor, a data limite não pode ser anterior à data atual'
                  })
            } else {
                this.$list.innerHTML += `
                    <li>
                        <div class="check"></div>
                        <label class="task">
                        Criado em: ${this.$data.toLocaleDateString("pt-BR")}, Limite: ${new Date(this.$dataInput2.value).toLocaleDateString("pt-BR", {timeZone: 'UTC'})}, ${this.$inputTask.value}
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

        Swal.fire({
            title: 'Tem certeza que deseja excluir?',
            text: "Essa ação é irreversível!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, quero deletar!',
            cancelButtonText: 'Não, me enganei!'
        }).then((result) => {
            if (result.isConfirmed) {
                li.classList.add('removed')
                setTimeout(() => {
                    li.classList.add('hidden')
                }, 300)
            }
        })
        }
    }
}

Main.init();