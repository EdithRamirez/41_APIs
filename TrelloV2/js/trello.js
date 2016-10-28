//guarda en variable lo que se obtiene del input que esta en html
var btnAgregar = document.getElementById("btnAgregar");
//manda a llamar el evento
btnAgregar.addEventListener("click",agregarLista);
var lista = document.getElementById("lista");
//el boton input es el 0 por eso comenzamos en 1
var contador = 1;

//llama a la funcion agregarLista cuando se da click en el boton
function agregarLista(){
	//Crea el elemento input con sus atributos
	var inputNombre = document.createElement("input");
	inputNombre.setAttribute("placeholder","Añadir lista...");
	inputNombre.focus(); ///no funciona
	//Crea el elemento boton con sus atributos
	var btnEnviar = document.createElement("button");
	btnEnviar.setAttribute("type","button");
	btnEnviar.setAttribute("class","btn btn-success");
	btnEnviar.textContent = "Guardar";
	//Se crea la caja que contendra el nombre de lista, textarea y botones
	var divCaja = document.createElement("div");
	divCaja.setAttribute("class","caja");
	divCaja.appendChild(inputNombre);
	divCaja.appendChild(btnEnviar);

	//eventos que pertenecen al padre
	divCaja.addEventListener("drop", soltar);
	divCaja.addEventListener("dragover", arrastrarSobre);
	divCaja.addEventListener("dragleave", dejarArrastrar);

	lista.insertBefore(divCaja,btnAgregar);
	//llama a la funcion agregarTarjeta cuando se da click en el boton
	btnEnviar.addEventListener("click",agregarTarjeta);
	function agregarTarjeta(){
		//comprueba si el input esta vacio
		if(inputNombre.value == "" || inputNombre.value == null){
			alert("Debe ingresar un titulo");
		}else{
			//elimina el input y el boton
			inputNombre.parentNode.removeChild(inputNombre);
			btnEnviar.parentNode.removeChild(btnEnviar);
			//Guarda el valor del input en un h4
			var titulo = document.createElement("h4");
			titulo.innerHTML = inputNombre.value;
			divCaja.appendChild(titulo);
			//crea el elemento input de boton para añadir la tarjeta
			var btnTarjeta = document.createElement("input");
			btnTarjeta.setAttribute("type","button");
			btnTarjeta.setAttribute("class","btn btn-opaco");
			btnTarjeta.setAttribute("value","Añadir tarjeta...");
			divCaja.appendChild(btnTarjeta);
			//llama a la funcion crearTarjeta cuando se da click en el boton
			btnTarjeta.addEventListener("click",crearTarjeta);
			function crearTarjeta(){
				//crea el elemento textarea para añadir la tarjeta
				var txtTarjeta = document.createElement("textarea");
				txtTarjeta.setAttribute("placeholder","Añadir tarjeta...");
				txtTarjeta.setAttribute("class","tarjeta");
				txtTarjeta.setAttribute("draggable","true");
				//crear id a cada textarea
				txtTarjeta.setAttribute("id","tarjeta.1" + contador);

				//evento que inicializa el moviento del textarea
				txtTarjeta.addEventListener("dragstart", arrastrar);
				//finaliza el moviento del textarea
				txtTarjeta.addEventListener("dragend", terminaArrastrar);
				contador++;
				//crea el elemento input de boton para guardar la tarjeta
				var btnAnadir = document.createElement("button");
				btnAnadir.setAttribute("type","button");
				btnAnadir.setAttribute("class","btn btn-success");
				btnAnadir.textContent = "Añadir";	
				divCaja.insertBefore(txtTarjeta,btnTarjeta);
				divCaja.insertBefore(btnAnadir,btnTarjeta);
				//aqui debe guardar la tarjeta
				btnAnadir.addEventListener("click",anadirTarjeta);
				function anadirTarjeta(){	
					if(txtTarjeta.value == "" || txtTarjeta.value == null){
						alert("Debe ingresar el nombre de la tarjeta");
					} else {
						// var divTarjeta = document.createElement("div");
						// divTarjeta.setAttribute("class","caja");
						// divTarjeta.appendChild(inputNombre);
						// divTarjeta.appendChild(btnEnviar);
						btnAnadir.parentNode.removeChild(btnAnadir);
					}
				}
			}
		}
	}
	//funcion llama al evento de arrastrar del textarea 
	function arrastrar(e){ 
		//defino el tipo de dato que se esta transfiriendo del id seleccionado
		e.dataTransfer.setData("text",this.id);
	}
	//funcion llama al evento de arrastrar del divCaja 
	function arrastrarSobre(e){
		//dice al navegador que acepte lo que se va a mover
		e.preventDefault();
	}
	//funcion llama al evento de arrastrar del divCaja  
	function soltar(e){
		//el nodo que se movera
		var idTrasferido = e.dataTransfer.getData("text");
		var elementoTransferido = document.getElementById(idTrasferido);
		//inserte abajo el boton
		this.insertBefore(elementoTransferido,this.childNodes[1]);
	}
	//funcion llama al evento de arrastrar del textarea 
	function terminaArrastrar(e){
		e.target.style.backgroundColor = "#D467EF";
	}
	//funcion llama al evento de arrastrar del divCaja  
	function dejarArrastrar(e){
		e.target.style.backgroundColor = "red";

		e.target.style.borderColor = "#A6D2EB";
		e.target.style.borderStyle = "dashed";
		e.target.style.border = "dashed";
	}

}

// document.addEventListener("dragstart", function(ev) {

//     ev.preventDefault();
// }