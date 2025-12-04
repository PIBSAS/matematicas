fetch("list.json")
    .then(r => r.json())
    .then(data => {
        const cont = document.querySelector(".html-container");

        data.forEach(item => {
            const a = document.createElement("a");
            a.textContent = item.pretty;
            a.href = item.file;
            cont.appendChild(a);
        });
    });
