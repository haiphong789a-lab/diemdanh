let list = JSON.parse(localStorage.getItem("attendance")) || [];

function saveData() {
    localStorage.setItem("attendance", JSON.stringify(list));
}

function checkIn() {
    let name = document.getElementById("name").value.trim();
    let status = document.getElementById("status").value;
    let reason = document.getElementById("reason").value.trim();

    if (name === "") {
        alert("Nhập tên!");
        return;
    }

    let today = new Date().toLocaleDateString();

    // ❌ chống trùng trong ngày
    let exists = list.find(item => item.name === name && item.date === today);
    if (exists) {
        alert("Nhân viên này đã điểm danh hôm nay!");
        return;
    }

    if (status === "absent" && reason === "") {
        alert("Nhập lý do vắng!");
        return;
    }

    let record = {
        name: name,
        status: status,
        reason: status === "absent" ? reason : "",
        time: new Date().toLocaleTimeString(),
        date: today
    };

    list.push(record);
    saveData();
    displayList();
}

function displayList() {
    let ul = document.getElementById("list");
    ul.innerHTML = "";

    list.forEach(item => {
        let li = document.createElement("li");

        if (item.status === "present") {
            li.style.background = "#c8f7c5";
            li.textContent = `${item.name} - Có mặt - ${item.time}`;
        } else {
            li.style.background = "#f7c5c5";
            li.textContent = `${item.name} - Vắng (${item.reason})`;
        }

        ul.appendChild(li);
    });
}

function clearAll() {
    if (confirm("Xoá hết dữ liệu?")) {
        list = [];
        saveData();
        displayList();
    }
}

// load khi mở trang
displayList();
