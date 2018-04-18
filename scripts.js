/**
 * CRUD Teste para Essentia Pharma
 *
 * @category    CRUD
 * @package     crud
 * @copyright  Copyright (c) 2018 Mario SAM (http://www.mariosam.com.br)
 * @license    http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */

//*****************************************************************************
// Metodo que inclui/altera acoes de elementos da pagina depois que a pagina foi carregada
//
window.onload = function() {
	//script para mostrar um preview da imagem do upload
	document.getElementById("foto").onchange = function () {
		var reader = new FileReader();

		reader.onload = function (e) {
			document.getElementById("image").src = e.target.result; //obtem info do campo foto
		};
		//carrega a imagem na tela
		reader.readAsDataURL(this.files[0]);
	};

	//prepara botao Limpar na acao de Editar cliente
	document.getElementById("btnLimpar").onclick = function () {
		restauraForm();
	};
}

function restauraForm() {
	//limpa quadro preview imagem
	document.getElementById('image').src 		= '';
	//limpa os campos id e nomeFoto usados no update
	document.getElementById('id').value  		= "-1";
	document.getElementById('nomeFoto').value  	= "";
	//retorna o label original dos botoes
	document.getElementById('btnLimpar').value 	= "Limpar";
	document.getElementById('btnSalvar').value 	= "Salvar";
}

//*****************************************************************************
// Metodo que altera a cor do input quando recebe o foco
//
function inputOn( obj ) {
	obj.style.backgroundColor = "#ffffff";
}

//*****************************************************************************
// Metodo que altera a cor do input quando perde o foco
//
function inputOff( obj ) {
	obj.style.backgroundColor = "#7e83a2";
}

//*****************************************************************************
// Metodo que carrega lista de clientes cadastrados
//
function carregarLista() {
	var xhttp;
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
      		document.getElementById('lista').innerHTML = this.responseText;
    	} else {
    		document.getElementById('lista').innerHTML = "Erro na execucao do Ajax";
    	}
  	};
  	xhttp.open("POST", "crud.php", true);
  	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  	xhttp.send("action=lista");
}

//*****************************************************************************
// Metodo que carrega lista de clientes cadastrados
//
function carregarCliente( obj ) {
	var xhttp;
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
      		var resultado = JSON.parse( this.responseText );
      		//preenche form com dados do cliente para alteracao
      		document.getElementById('id').value 		= resultado[0].id;
      		document.getElementById('nome').value 		= resultado[0].nome;
      		document.getElementById('email').value 		= resultado[0].email;
      		document.getElementById('telefone').value 	= resultado[0].telefone;
      		document.getElementById('image').src 		= "/crud/imagens/"+resultado[0].foto;
      		document.getElementById('nomeFoto').value 	= resultado[0].foto;
      		//deixa o foco no campo nome para edicao
      		document.getElementById('nome').focus();
      		//modifica acao do botao limpar para voltar
      		document.getElementById('btnLimpar').value 	 = "Voltar";
      		//modifica acao do botao salvar para atualizar
      		document.getElementById('btnSalvar').value 	 = "Atualizar";
    	} else {
    		document.getElementById('msg-php').innerHTML = "Erro na execucao do Ajax";
    	}
  	};
  	xhttp.open("POST", "crud.php", true);
  	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  	xhttp.send("action=buscar&id="+obj);
}

//*****************************************************************************
// Metodo que carrega lista de clientes cadastrados
//
function excluirRegistro( obj ) {
	if ( confirm("Clique em OK para confirmar a operação.") ) {
		var xhttp;
		xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
	    	if (this.readyState == 4 && this.status == 200) {
	      		//exibe mensagem de sucesso na tela por alguns segundos
	      		document.getElementById('msg-php').innerHTML = this.responseText;
	      		document.getElementById('msg-php').classList.remove("no-display");
	      		document.getElementById('msg-php').classList.add("msg-php");
	      		hideMsg();
	  			//atualiza lista de clientes
	  			carregarLista();
	    	} else {
	    		document.getElementById('msg-php').innerHTML = "Erro na execucao do Ajax";
	    	}
	  	};
	  	xhttp.open("POST", "crud.php", true);
	  	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	  	xhttp.send("action=excluir&id="+obj);
  	}
}

//*****************************************************************************
// Metodo que salva (ou atualiza) form de cadastro do cliente
//
function salvarForm() {
	var xhttp;
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
    		//limpa o formulario
    		restauraForm();
    		document.getElementById('frmCrud').reset();
    		//exibe mensagem de sucesso na tela por alguns segundos
      		document.getElementById('msg-php').innerHTML = this.responseText;
      		document.getElementById('msg-php').classList.remove("no-display");
      		document.getElementById('msg-php').classList.add("msg-php");
      		hideMsg();
  			//atualiza lista de clientes
  			carregarLista();
    	} else {
    		document.getElementById('msg-php').innerHTML = "Erro na execucao do Ajax";
    	}
  	};
  	//recupera valores do form para enviar via ajax
  	var formData = new FormData();
  	formData.append("id", document.getElementById("id").value);
  	formData.append("nome", document.getElementById("nome").value);
  	formData.append("email", document.getElementById("email").value);
  	formData.append("telefone", document.getElementById("telefone").value);
  	formData.append("foto", document.getElementById("foto").files[0]);
  	formData.append("nomeFoto", document.getElementById("nomeFoto").value);
  	//submete para server-side
  	//xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  	xhttp.open("POST", "crud.php?action=salvar", true);
  	xhttp.send( formData );
}

//*****************************************************************************
// Metodo que oculta as mensagens de alerta na tela
//
function hideMsg() {
	setTimeout(function() {
      	document.getElementById('msg-php').classList.add("no-display"); 
    }, 5000);
}



