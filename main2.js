const buttao = document.querySelector("#BotaoSubmit");
const inputizin = document.querySelector("#inputzin");
const listinha = document.querySelector("#list");
const conteudo = document.createElement("li");
let buttonzinho2 = document.querySelectorAll(".remove");
const li2 = listinha.children;

async function main(event) {
  event.preventDefault();
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/");
  const data = await response.json();
  let text = data.filter((item) => item.userId == inputizin.value);

  const li = listinha.children;
  //   console.log(li);
  for (let i = 0; i < text.length; i++) {
    listinha.innerHTML += `<li>
        <div class="check"></div>
        <label class="task">
        ${`ID ${text[i].id} - ${text[i].title}`}
        </label>
        <button onclick=testinho(event) class="remove"></button>
        </li>`;
  }

  for (let i = 0; i < text.length; i++) {
    if (text[i].completed == true) {
      li[i].classList.add("done");
    } else {
      li[i].classList.add("notdone");
    }
  }
}
buttao.addEventListener("click", main);

function testinho(event) {
  console.log(event.target.parentElement);

  // li2.classList.add("hidden");
  event.target.parentElement.classList.add("removed");
  setTimeout(() => {
    event.target.parentElement.classList.add("hidden");
  }, 300);
}

buttonzinho2.forEach((element) => {
  element.addEventListener("click", testinho);
});
