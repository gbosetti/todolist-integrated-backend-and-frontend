describe("Verificación de la administración de items", function(){

	it("should log in", function(){

		cy.visit("localhost:3000");
		cy.get("input").first().type("admin");
		cy.get("input").last().type("nimda");
		cy.get("button").click();
		cy.url().should("include", "/items");

	});

	it("should create two items", function(){

		//cy.get(".list-group-item", {timeout: 1}).its("length").then(count => { initialElems = count });
		var initialElems = Cypress.$(".list-group-item").length;

		createItem("comprar carne");
		createItem("comprar verdura");

		cy.get(".list-group-item").its("length").should("eq", initialElems+2);
	});

	it("should delete one item", function(){

		var initialElems = Cypress.$(".list-group-item").length;

		deleteItem("comprar carne");

		cy.get(".list-group-item").its("length").should("eq", initialElems-1);
	})

})

function createItem(desc){
	cy.get("a").click();
	cy.url().should("include", "/new-item");
	cy.get("input").type(desc);
	cy.get("button").click();
	cy.url().should("include", "/items");
}

function deleteItem(desc){
	cy.contains(desc).parent().find(".btn-danger").click();
	cy.wait(2000);
}