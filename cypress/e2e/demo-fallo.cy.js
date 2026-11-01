
describe("Demostración de Cypress", () => {

  beforeEach(() => {
    cy.visit("index.html");
  });

  it("PASS - Día 15, recargo del 2%", () => {

    // Esperar antes de comenzar
    cy.wait(1500);

    // Ingresar el día
    cy.get("#dia").type("15", { delay: 500 });

    // Esperar para visualizar el dato ingresado
    cy.wait(1500);

    // Presionar el botón
    cy.get("#calcular").click();

    // Esperar para visualizar el resultado
    cy.wait(2000);

    // Verificar que el resultado sea correcto
    cy.get("#resultado")
      .should("have.text", "Recargo: 2%");

    // Mantener el resultado visible
    cy.wait(2000);

  });

  it("FAIL - Día 15, recargo del 4%", () => {

    cy.wait(1500);

    cy.get("#dia").type("15", { delay: 500 });

    cy.wait(1500);

    cy.get("#calcular").click();

    cy.wait(2000);

    // Resultado incorrecto intencionalmente
    cy.get("#resultado")
      .should("have.text", "Recargo: 4%");

  });

});

