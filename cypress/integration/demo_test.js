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
			response: function(params){
				Cypress.$("body")[0].ownerDocument.defaultView.console.log("*****");
				Cypress.$("body")[0].ownerDocument.defaultView.console.log(params.item); //UNDEFINED
				items.push(params);
				return items;
			}
		});
		cy.route({
			method: 'GET',
			url: '**/items',
			response: items,
			delay: 1000
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
		cy.wait(1000);
		var previousTasks = (Cypress.$("li"))? Cypress.$("li").length : 0;  	//It always returns 3
		//var previousTasks = (Cypress.$("ul").childNodes.length)? Cypress.$("ul").childNodes.length : 0;  	//It always returns 0
		//var previousTasks = cy.get('.list-group-item').its('length'); 		//It always returns [Object]
		
		cy.log("Previous number of tasks: " + previousTasks);
		cy.wait(1000);

		//Crear una nueva tarea llamada “comprar cuadernos”
		crearItem("Comprar cuadernos");

		//Crear una nueva tarea llamada “comprar pendrives”
		crearItem("Comprar pendrives");

		//Borrar la tarea “comprar pendrives”
		borrarItem("Comprar cuadernos");

		//Verificar la cantidad de tareas
		cy.wait(1000);
		cy.get('.list-group-item').its('length').should('eq', (previousTasks + 1));

	})
});

