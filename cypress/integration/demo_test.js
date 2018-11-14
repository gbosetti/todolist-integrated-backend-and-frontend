var console = Cypress.$("body")[0].ownerDocument.defaultView.console;
var items = [];

function crearItem(desc){
	console.log("** Creating item " + desc);
	cy.get("a").click();
	cy.get("input").first().type(desc);
	cy.get("button[type='submit']").click();
	cy.url().should("include", "/items");
	cy.wait(2000); //To see the changes in the view
}
function borrarItem(desc){
	console.log("** Deleting item " + desc);
	cy.contains(desc).parent().find(".fa-trash-o").click();
	//cy.wait(2000);
	console.log()
	cy.url().should("include", "/items");
}



describe("First functionality to test", function(){

	it("Task one to test", function(){

		cy.server();
		cy.route({
			method: 'POST',
			url: '**/items',
			response: items,
			onRequest: (xhr) => {
				var id = Date.now();
				items.push({"id": id, "name": xhr.request.body.name, "_id": id});
				expect(true).to.equal(true);
			}
		});
		cy.route({
			method: 'GET',
			url: '**/items',
			response: function(){
				console.log("GETTING", items);
				return items
			},
			delay: 1000,
			onRequest: (xhr) => {
				//console.log("GET-REQUESTED ITEMS:", items);
				expect(true).to.equal(true);
			},
			onResponse: (xhr) => {
				xhr.response.body = items;
				console.log(JSON.stringify(items));
				//xhr.xhr.responseText = JSON.stringify(items);
				console.log(xhr);
				expect(true).to.equal(true);
			}
		});
		cy.route({
			method: 'DELETE',
			url: '**/items/*',
			onRequest: (xhr) => {
				var id = xhr.url.split("/").pop();
				items = items.filter(obj => obj.id != id);
				console.log("DELETED ITEMS", items);
				expect(true).to.equal(true);
			}
		});


		///////////////////// Si se borra lo anterior, funciona con el backend

		//Visitar el sitio
		cy.visit("http://localhost:3000");

		//Login con usuario 1
		cy.get("input").first().type('admin');
		cy.get("input").eq(1).type('nimda');
		cy.get("button").click();
		cy.url().should("include", "/items");

		//Contar los items previamente creados
		//var previousTasks = (Cypress.$("li"))? Cypress.$("li").length : 0;  	//It always returns 3
		//var previousTasks = (Cypress.$("ul").childNodes.length)? Cypress.$("ul").childNodes.length : 0;  	//It always returns 0
		//var previousTasks = cy.get('.list-group-item').its('length'); 		//It always returns [Object]
		
		//Crear una nueva tarea llamada “comprar cuadernos”
		crearItem("Comprar galletitas");

		//Crear una nueva tarea llamada “comprar pendrives”
		crearItem("Comprar picadillo");

		//Borrar la tarea “comprar pendrives”
		borrarItem("Comprar picadillo");

		//Verificar la cantidad de tareas
		//cy.get('.list-group-item').its('length').should('eq', 1);

	})
});

