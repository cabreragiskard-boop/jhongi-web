document.addEventListener("DOMContentLoaded", () => {

  const contenedor_carrito = document.getElementById('contenedor-carrito');
  const carrito_count = document.getElementsByClassName('carrito-count')[0];
  const carrito = document.querySelector('.carrito');

  let count = 0;
  let Totalcarrito = [];

  const carritoWrapper = document.querySelector('.carrito-wrapper');

  carritoWrapper.addEventListener('mouseover', () => {
    if (Totalcarrito.length > 0) {
      contenedor_carrito.style.display = "block";
    }
  });

  carritoWrapper.addEventListener('mouseout', () => {
    contenedor_carrito.style.display = "none";
  });

  // Botones agregar al carrito
  const buttons = document.querySelectorAll('.agregar-carrito');

  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();

      count++;
      carrito_count.textContent = count;

      button.textContent = "¡Agregado!";
      button.classList.remove('btn-primary');
      button.classList.add('btn-success');

      const data = e.target.closest('.Producto');
      leerDatos(data);

      setTimeout(() => {
        button.textContent = "Agregar al carrito";
        button.classList.remove('btn-success');
        button.classList.add('btn-primary');
      }, 1000);
    });
  });

  function leerDatos(producto) {
    const infoProducto = {
      id: producto.querySelector('a').getAttribute('data-id'),
      img: producto.querySelector('img').src,
      titulo: producto.querySelector('h5').textContent,
      precio: producto.querySelector('p').textContent.trim(),
      precioNum: parseInt(producto.querySelector('p').textContent.replace(/\./g, '').replace('$', '')),
      cantidad: 1
    };

    const existe = Totalcarrito.some(p => p.id === infoProducto.id);

    if (existe) {
      Totalcarrito = Totalcarrito.map(p => {
        if (p.id === infoProducto.id) {
          p.cantidad++;
        }
        return p;
      });
    } else {
      Totalcarrito.push(infoProducto);
    }

    mostrarCarrito();
  }

  function mostrarCarrito() {
    const tbody = document.querySelector('#lista-carrito tbody');
    const total_el = document.querySelector('#total-carrito');
    let sumatotal = 0;

    tbody.innerHTML = "";

    Totalcarrito.forEach(producto => {
      const row = document.createElement('tr');
      const totalProducto = producto.precioNum * producto.cantidad;
      sumatotal += totalProducto;

      row.innerHTML = `
        <td><img src="${producto.img}" width="50" alt="${producto.titulo}"></td>
        <td>${producto.titulo}</td>
        <td>${producto.precio}</td>
        <td>${producto.cantidad}</td>
        <td>$${totalProducto.toLocaleString('es-CO')}</td>
        <td><a href="#" class="eliminar" data-id="${producto.id}">✕</a></td>
      `;

      const eliminar = row.querySelector('.eliminar');
      eliminar.addEventListener('click', (e) => {
        e.preventDefault();
        EliminarDelCarrito(e.target.getAttribute('data-id'));
      });

      tbody.appendChild(row);
    });

    total_el.textContent = `Total: $${sumatotal.toLocaleString('es-CO')}`;

    if (Totalcarrito.length > 0) {
      contenedor_carrito.style.display = "block";
    } else {
      contenedor_carrito.style.display = "none";
    }
  }

  function EliminarDelCarrito(id) {
    Totalcarrito = Totalcarrito.map(p => {
      if (p.id === id) p.cantidad--;
      return p;
    }).filter(p => p.cantidad > 0);

    count = Totalcarrito.reduce((acc, p) => acc + p.cantidad, 0);
    carrito_count.textContent = count;

    mostrarCarrito();
  }

});
