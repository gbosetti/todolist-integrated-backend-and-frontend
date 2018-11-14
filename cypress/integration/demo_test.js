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
	cy.wait(2000);
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
			response: items
		});
		cy.route({
			method: 'DELETE',
			url: '**/items/*',
			onRequest: (xhr) => {
				var id = xhr.url.split("/").pop();

				for (var i = items.length - 1; i >= 0; i--) {
					if(items[i].id == id){
						items.splice(i, 1);
						break;
					}
				}
				//items = items.filter(obj => obj.id != id);
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

		//Crear una nueva tarea llamada “comprar cuadernos”
		crearItem("Comprar galletitas");

		//Crear una nueva tarea llamada “comprar pendrives”
		crearItem("Comprar picadillo");

		//Borrar la tarea “comprar pendrives”
		borrarItem("Comprar picadillo");

		//Verificar la cantidad de tareas
		//cy.get('.list-group-item').its('length').should('eq', 1);
		cy.get('.list-group-item').should('have.length', 1);
	})
});

