let productos = "./js/items.json";
let carrito = []; 
let total = 0;

fetch(productos)
    .then(response => response.json()) 
    .then(data => {
        let items = data;
        const cards = document.querySelectorAll(".itemCard");

        cards.forEach((card, index) => {
            const imagen = card.querySelector(".itemImagen");
            const titulo = card.querySelector(".itemTitulo");
            const precio = card.querySelector(".itemPrecio");
            const boton = card.querySelector(".itemAgregar");

            imagen.src = items[index].imagen;
            imagen.alt = items[index].titulo;
            titulo.textContent = items[index].titulo;
            precio.textContent = `$${items[index].precio}`;

            boton.addEventListener("click", () => {
                const articulo = {
                    imagen: items[index].imagen,
                    nombre: items[index].titulo,
                    precio: items[index].precio
                };

                carrito.push(articulo); 
                total += articulo.precio;

                actualizarTotalDOM();

                console.log(carrito);
                console.log(total);

                actualizarCarritoDOM();
            });
        });
    })

    .catch(error => {
        console.log('Error:', error);
    });

function actualizarCarritoDOM() {
    const carritoContainer = document.getElementById('sideCarrito');
    carritoContainer.innerHTML = ''; 
    
        
    carrito.forEach((item) => {
            
        const itemContainer = document.createElement('div');
        const imagen = document.createElement('img');
        const nombre = document.createElement('p');
        const precio = document.createElement('p');
    
    
            
        itemContainer.classList.add('itemsCarrito');
        imagen.classList.add('carrito-imagen');
        nombre.classList.add('carrito-nombre');
        precio.classList.add('carrito-precio');
    
    
            
        imagen.src = item.imagen;
        imagen.alt = item.nombre;
        nombre.textContent = item.nombre;
        precio.textContent = `$${item.precio}`;
    
    
    
    
            
        itemContainer.appendChild(imagen);
        itemContainer.appendChild(nombre);
        itemContainer.appendChild(precio);
        carritoContainer.appendChild(itemContainer);
    });
    
    const botonCompraContainer = document.createElement('div');
    const botonCompra = document.createElement('button');
    
    botonCompraContainer.id = 'botonCompraContainer';
    botonCompra.classList.add('botonCompra');
    botonCompra.textContent = 'Realizar compra';
    botonCompra.addEventListener('click', realizarCompra);
    
    botonCompraContainer.appendChild(botonCompra);
    carritoContainer.appendChild(botonCompraContainer);
}

function realizarCompra() {

    Swal.fire({
        title: 'Compra realizada!!',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    })

    .then(() => {
        carrito = [];
        total = 0;
        actualizarCarritoDOM();
        actualizarTotalDOM();


        location.reload();
    });
}

function actualizarTotalDOM() {
    const totalContainer = document.getElementById('total-container');
    totalContainer.textContent = `Total: $${total}`;
}

const btnCambiarTema = document.querySelector("#btnDark");
const body = document.body;

btnCambiarTema.addEventListener("click", cambiarTema);

function cambiarTema() {
    body.classList.toggle("temaOscuro");

    if (body.classList.contains("temaOscuro"))
        btnCambiarTema.innerText = ("Tema Claro");
    else {
        btnCambiarTema.innerText = ("Tema Oscuro");
    }
}

const formulario = document.querySelector('form');

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const bienvenido = document.querySelector('h2');

    const agregarUsuario = {
        nombre,
        email,
    };

    let usuarios = [];

    if (localStorage.getItem('usuarios')) {
        usuarios = JSON.parse(localStorage.getItem('usuarios'));
    }

    usuarios.push(agregarUsuario);

    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    bienvenido.textContent = "Bienvenid@ " + nombre;

    console.log('Usuario agregado correctamente');

    formulario.reset();
});

const botonCompraContainer = document.createElement('div');
const botonCompra = document.createElement('button');

botonCompraContainer.id = 'botonCompraContainer';
botonCompra.classList.add('botonCompra');
botonCompra.textContent = 'Realizar compra';
botonCompra.addEventListener('click', realizarCompra);

botonCompraContainer.appendChild(botonCompra);
carritoContainer.appendChild(botonCompraContainer);

