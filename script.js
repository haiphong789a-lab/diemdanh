let list = [];

function checkIn() {
    let name = document.getElementById("name").value;

    if (name === "") {
        alert("Vui lòng nhập tên!");
        return;
    }

    let time = new Date().toLocaleTimeString();

    let record = name + " - " + time;
    list.push(record);

    displayList();
}

function displayList() {
    let ul = document.getElementById("list");
    ul.innerHTML = "";

    list.forEach(item => {
        let li = document.createElement("li");
        li.textContent = item;
        ul.appendChild(li);
    });
}
