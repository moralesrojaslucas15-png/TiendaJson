let todosLosProductos = [];
let carrito = []; 

const productHolder = document.getElementById('products');

fetch('productos.json')
    .then(response => response.json())
    .then(productos => {
        todosLosProductos = productos;
        pintarProductos(todosLosProductos); 
    });

function pintarProductos(arrayA_Pintar) {
    productHolder.innerHTML = ""; 

    arrayA_Pintar.forEach(product => {
        
        if (product.stock === 0) {
            return; 
        }

        const productDiv = document.createElement('div');
        productDiv.className = "tarjeta-producto";

        const imagenElement = document.createElement('img');
        imagenElement.src = product.imagen; 
        imagenElement.className = "foto-producto";

        const nameElement = document.createElement('h3');
        nameElement.innerText = product.name;

        const priceElement = document.createElement('p');
        priceElement.innerText = "Precio: " + product.price;

        const botonComprar = document.createElement('button');
        botonComprar.innerText = "Añadir a la cesta";
        botonComprar.className = "boton-comprar";
        
        botonComprar.onclick = function() {
            meterAlCarrito(product.id);
        };

        
        productDiv.appendChild(imagenElement);
        productDiv.appendChild(nameElement);
        productDiv.appendChild(priceElement);
        productDiv.appendChild(botonComprar);
        
        productHolder.appendChild(productDiv);
    });
}

function filtrar(categoria) {
    if (categoria === 'Todo') {
        pintarProductos(todosLosProductos);
    } else {
        let filtrados = [];
        todosLosProductos.forEach(product => {
            if (product.category === categoria) {
                filtrados.push(product);
            }
        });
        pintarProductos(filtrados);
    }
}

function meterAlCarrito(id) {
    carrito.push(id); 
    alert("Producto añadido");
}

function verCesta() {
    document.getElementById('cesta').style.display = 'block';

    fetch('userData.json')
        .then(response => response.json())
        .then(usuario => {
            document.getElementById('datosUsuario').innerText = 
                "Enviando pedido a: " + usuario.name + ", " + usuario.address;
        });

    const lista = document.getElementById('listaCesta');
    lista.innerHTML = ""; 
    let total = 0;

    carrito.forEach(idGuardado => {
        todosLosProductos.forEach(product => {
            if (product.id === idGuardado) {
                const li = document.createElement('li');
                li.innerText = product.name + " (" + product.price + ")";
                lista.appendChild(li);
                
                total = total + parseFloat(product.price); 
            }
        });
    });

    document.getElementById('precioTotal').innerText = total.toFixed(2);
}

function cerrarCesta() {
    document.getElementById('cesta').style.display = 'none';
}

function finalizarCompra() {
    if (carrito.length === 0) {
        alert("La cesta está vacía");
    } else {
        alert("Compra finalizada");
        carrito = []; 
        cerrarCesta();
    }
}