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
	//para que funcione debe ir al final el focus
	inputNombre.focus(); 
	function agregarTarjeta(){
		//comprueba si el input esta vacio
		if(inputNombre.value == "" || inputNombre.value == null){
			alert("Debe ingresar un titulo");
		}else{
			//elimina el input y el boton
			inputNombre.parentNode.removeChild(inputNombre);
			btnEnviar.parentNode.removeChild(btnEnviar);
			//Guarda el valor del input en un h3
			var titulo = document.createElement("h3");
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
				txtTarjeta.setAttribute("class","tarjeta form-control");
				//crea el elemento input de boton para guardar la tarjeta
				var btnAnadir = document.createElement("button");
				btnAnadir.setAttribute("type","button");
				btnAnadir.setAttribute("class","btn btn-success");
				btnAnadir.textContent = "Añadir";	
				//inserta antes el textarea y el boton añadir
				divCaja.insertBefore(txtTarjeta,btnTarjeta);
				divCaja.insertBefore(btnAnadir,btnTarjeta);
				//aqui debe guardar la tarjeta
				btnAnadir.addEventListener("click",anadirTarjeta);
				//funciona focus
				txtTarjeta.focus();
				function anadirTarjeta(){	
					if(txtTarjeta.value == "" || txtTarjeta.value == null){
						alert("Debe ingresar el nombre de la tarjeta");
					} else {
						txtTarjeta.parentNode.removeChild(txtTarjeta);
						btnAnadir.parentNode.removeChild(btnAnadir);
						//crea una etiqueta p y guarda lo q se ingreso en textarea
						var divTarjeta = document.createElement("p");
						divTarjeta.setAttribute("class","tarjeta form-control");
						divTarjeta.setAttribute("draggable","true");
						divTarjeta.innerHTML = txtTarjeta.value	;
						divCaja.insertBefore(divTarjeta,btnTarjeta);
						//crear id a cada tarjeta ingresada
						divTarjeta.setAttribute("id","tarjeta" + contador);
						//evento que inicializa el moviento de la tarjeta
						divTarjeta.addEventListener("dragstart", arrastrar);
						//finaliza el moviento de la tarjeta
						divTarjeta.addEventListener("dragend", terminaArrastrar);
						//contador para aumentar id creado
						contador++;
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
		divCaja.style.background = "#A23E5A";//color del div cuando se arrastra etiqueta p
		divCaja.classList.add("rotate");	
	}
	//funcion llama al evento de arrastrar del divCaja  
	function soltar(e){
		//el nodo que se movera
		var idTrasferido = e.dataTransfer.getData("text");
		var elementoTransferido = document.getElementById(idTrasferido);
		//inserte abajo el boton
		this.insertBefore(elementoTransferido,this.childNodes[1]);
		divCaja.style.background = "#E2E4E6";
	}
	//funcion llama al evento de arrastrar del textarea 
	function terminaArrastrar(e){
		e.target.style.backgroundColor = "rgba(19,124,143,.5)"; //cambia de color de la <p> al ser arrastrado
		e.target.style.color = "#fff";
		divCaja.style.background = "#E2E4E6";
		e.target.style.transform = "skewX(20deg)";//transicion cuando la etiqueta p se dejo de arrastar
		e.target.style.transition = "all 3s";
	}
	//funcion llama al evento de arrastrar del divCaja  
	function dejarArrastrar(e){
		divCaja.style.background = "#E2E4E6";//color de fondo div
		e.target.style.color = "#711F7D";
		e.target.style.fontWeight = "bold";
		divCaja.style.transform = "none";
		divCaja.classList.remove("rotate");
	}
}