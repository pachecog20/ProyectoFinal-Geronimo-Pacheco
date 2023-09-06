function iniciarTienda() {
    let productos = [
      { id: "1", nombre: "Auriculares", marca: "Sony", precio: 24000, stock: 10, imagen: "auriculares.jpg" },
      { id: "2", nombre: "Mouse", marca: "Corsair", precio: 13000, stock: 20, imagen: "mouse.jpg" },
      { id: "3", nombre: "Teclado", marca: "Corsair", precio: 20000, stock: 15, imagen: "teclado.jpg" },
      { id: "4", nombre: "MousePad", marca: "SteelSeries", precio: 15000, stock: 30, imagen: "mousepad.jpg" },
      { id: "5", nombre: "Monitor", marca: "Samsung", precio: 35000, stock: 8, imagen: "monitor.jpg" },
      { id: "6", nombre: "Impresora", marca: "HP", precio: 18000, stock: 12, imagen: "impresora.jpg" },
      { id: "7", nombre: "Altavoces", marca: "Sony", precio: 28000, stock: 6, imagen: "altavoces.jpg" },
      { id: "8", nombre: "Webcam", marca: "Logitech", precio: 9000, stock: 18, imagen: "webcam.jpg" }
    ]
  
    let inputBusqueda = document.getElementById("buscador")
    let botonBuscar = document.getElementById("buscar")
    botonBuscar.addEventListener("click", () => filtrarProductos(productos, inputBusqueda, "nombre"))
  
    let filtrosMarca = document.querySelectorAll(".filtroMarca")
    filtrosMarca.forEach((filtroMarca) => {
      filtroMarca.addEventListener("click", () => filtrarProductos(productos, filtroMarca, "marca"))
    })
  
    let botonFinalizarCompra = document.getElementById("finalizarCompra")
    botonFinalizarCompra.addEventListener("click", finalizarCompra)
  
    renderizarCarrito()
    renderizarTarjetas(productos)
  }
  
  function finalizarCompra() {
    let carrito = obtenerCarrito()
    if (carrito.length > 0) {
      localStorage.removeItem("carrito")
      renderizarCarrito()
      alert("¡Gracias por su compra!")
    } else {
      alert("No tiene productos en su carrito")
    }
  }
  
  function filtrarProductos(productos, elementoFiltro, propiedad) {
    let productosFiltrados = productos.filter((producto) => producto[propiedad].toLowerCase().includes(elementoFiltro.value.toLowerCase()))
    renderizarTarjetas(productosFiltrados)
  }
  
  function renderizarTarjetas(productos) {
    let contenedor = document.getElementById("productos")
    contenedor.innerHTML = ""
    productos.forEach((producto) => {
      let tarjetaProducto = document.createElement("div")
      tarjetaProducto.classList.add("tarjetaProducto")
      tarjetaProducto.innerHTML = `
        <h3>${producto.nombre}</h3>
        <p>${producto.marca}</p>
        <p>${producto.precio}</p>
        <p>${producto.stock} en stock</p>
        <div class=imagen style="background-image: url(./images/${producto.imagen})"></div>
        <button id=${producto.id}>Agregar al carrito</button>
      `
      contenedor.appendChild(tarjetaProducto)
  
      let botonAgregarAlCarrito = document.getElementById(producto.id)
      botonAgregarAlCarrito.addEventListener("click", (e) => agregarProductoAlCarrito(productos, e))
    })
  }
  
  function agregarProductoAlCarrito(productos, evento) {
    let carrito = obtenerCarrito()
    let productoSeleccionado = productos.find((producto) => producto.id === evento.target.id)
    let productoEnCarrito = carrito.find((producto) => producto.id === productoSeleccionado.id)
  
    if (productoSeleccionado.stock > 0) {
      alert("Se agregó el producto al carrito")
      productoSeleccionado.stock--
  
      if (productoEnCarrito) {
        productoEnCarrito.unidades++
        productoEnCarrito.subtotal = productoEnCarrito.precioUnitario * productoEnCarrito.unidades
      } else {
        carrito.push({
          id: productoSeleccionado.id,
          nombre: productoSeleccionado.nombre,
          precioUnitario: productoSeleccionado.precio,
          subtotal: productoSeleccionado.precio,
          unidades: 1
        })
      }
    } else {
      alert("Ya no quedan unidades disponibles")
    }
  
    localStorage.setItem("carrito", JSON.stringify(carrito))
    renderizarCarrito()
  }
  
  function renderizarCarrito() {
    let contenedor = document.getElementById("carrito")
    contenedor.innerHTML = ""
    let carrito = obtenerCarrito()
  
    carrito.forEach((producto) => {
      let tarjetaProducto = document.createElement("div")
      tarjetaProducto.innerHTML = `
        <p>${producto.nombre}</p>
        <p>${producto.precioUnitario}</p>
        <p>${producto.unidades}</p>
        <p>${producto.subtotal}</p>
      `
      contenedor.appendChild(tarjetaProducto)
    })
  }
  
  function obtenerCarrito() {
    return localStorage.getItem("carrito") ? JSON.parse(localStorage.getItem("carrito")) : []
  }
  
  // Llamar a la función principal para iniciar la tienda
  iniciarTienda()
  