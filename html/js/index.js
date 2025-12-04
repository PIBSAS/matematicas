///fetch("list.json")
   // .then(r => r.json())
    //.then(data => {
        //const cont = document.querySelector(".html-container");

       // data.forEach(item => {
          //  const a = document.createElement("a");
        //    a.textContent = item.pretty;
      //      a.href = item.file;
    //        cont.appendChild(a);
  //      });
//    });

// js/index.js
const container = document.querySelector('.html-container');

fetch('list.json')
  .then(res => res.json())
  .then(files => {
    let currentGuia = '';
    let currentUnidad = '';

    files.forEach(f => {
      const parts = f.file.replace('html/', '').replace('.html', '').split('/');
      const [guia, unidad, capitulo] = parts;

      if (guia !== currentGuia) {
        const h2 = document.createElement('h2');
        h2.textContent = guia.toUpperCase();
        container.appendChild(h2);
        currentGuia = guia;
        currentUnidad = ''; // reset unidad
      }

      if (unidad !== currentUnidad) {
        const h3 = document.createElement('h3');
        h3.textContent = unidad.replace(/u/, 'Unidad ').toUpperCase();
        container.appendChild(h3);
        currentUnidad = unidad;
      }

      const btn = document.createElement('a');
      btn.href = f.file;
      btn.textContent = capitulo.replace(/u/, 'U').replace(/cap/, ' Capítulo ');
      btn.className = 'nav-btn';
      container.appendChild(btn);
    });
  });

