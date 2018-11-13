function crearItem(desc){
	cy.get("a").click();
	cy.get("input").first().type(desc);
	cy.get("button[type='submit']").click();
	cy.url().should("include", "/items");
}
function borrarItem(desc){
	cy.contains(desc).parent().find(".fa-trash-o").click();
	cy.url().should("include", "/items");
}


describe("First functionality to test", function(){

	it("Task one to test", function(){

		var items = []
		cy.server();
		cy.route({
			method: 'POST',
			url: '**/items',
			response: items,
			onRequest: (xhr) => {
				items.push(xhr.request.body);
				Cypress.$("body")[0].ownerDocument.defaultView.console.log(xhr);
				expect(true).to.equal(true);
			}
		});
		cy.route({
			method: 'GET',
			url: '**/items',
			response: items,
			delay: 1000
		});
		cy.route({
			method: 'DELETE',
			url: '**/items/*',
			response: items,
			onRequest: (xhr) => {
				Cypress.$("body")[0].ownerDocument.defaultView.console.log(xhr);
				items = items.filter(obj => obj.name !== xhr.request.body.name);
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
		crearItem("Comprar cuadernos");

		//Crear una nueva tarea llamada “comprar pendrives”
		crearItem("Comprar pendrives");

		//Borrar la tarea “comprar pendrives”
		borrarItem("Comprar cuadernos");

		//Verificar la cantidad de tareas
		cy.wait(2000);
		cy.get('.list-group-item').its('length').should('eq', 1);

	})
});

