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
let currentLevels = [];

 // ===== ORDENAR LOS ARCHIVOS =====
 // Opción 1: Orden alfabético simple
 // files.sort((a, b) => a.file.localeCompare(b.file));
 
 // Opción 2: Orden natural (numérico y alfabético)
 files.sort((a, b) => {
     return a.file.localeCompare(b.file, undefined, {
         numeric: true,
         sensitivity: 'base'
     });
 });
 
 // Opción 3: Orden personalizado para tu estructura
 // Esta es la que necesitas basado en tu descripción
 const customOrder = (file) => {
     const order = [
         'guia1', 'guia2', 'unidad5', 
         'jaimito', 'pruebaparaandroid'
     ];
     const lowerFile = file.toLowerCase();
     
     for (let i = 0; i < order.length; i++) {
         if (lowerFile.includes(order[i])) {
             return i;
         }
     }
     return order.length; // los demás al final
 };
 
 // Aplicar orden personalizado
 files.sort((a, b) => {
     const orderA = customOrder(a.file);
     const orderB = customOrder(b.file);
     
     if (orderA !== orderB) {
         return orderA - orderB;
     }
     
     // Si mismo grupo, orden alfabético natural
     return a.file.localeCompare(b.file, undefined, {
         numeric: true,
         sensitivity: 'base'
     });
 });

files.forEach(f => {
  // separar jerarquía de carpetas y archivo
  const parts = f.file.replace('html/', '').replace('.html', '').split('/');
  const capitulo = parts.pop();  // último elemento siempre es el botón

  // agregar títulos según la jerarquía de carpetas
  parts.forEach((level, idx) => {
    if (currentLevels[idx] !== level) {
      // determinar el tipo de título h2, h3, etc.
      const hTag = idx === 0 ? 'h2' : 'h3';
      const h = document.createElement(hTag);
      h.textContent = level.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      container.appendChild(h);
      currentLevels[idx] = level;
      // limpiar niveles más profundos si cambiaron
      currentLevels = currentLevels.slice(0, idx + 1);
    }
  });

  // crear el botón
  const btn = document.createElement('a');
  btn.href = f.file;
  btn.textContent = capitulo.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  btn.className = 'nav-btn';
  container.appendChild(btn);
});

});

