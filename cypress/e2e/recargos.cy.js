
describe("Pruebas de recargos escolares", () => {

  beforeEach(() => {
    cy.visit("index.html");
  });

  // 1. PRUEBAS POR TABLA DE DECISIÓN

  describe("Tabla de decisión", () => {

    const casos = [
      { dia: "5", esperado: "Recargo: 0%" },
      { dia: "15", esperado: "Recargo: 2%" },
      { dia: "25", esperado: "Recargo: 4%" },
      { dia: "35", esperado: "Día inválido" }
    ];

    casos.forEach(({ dia, esperado }) => {

      it(`Día ${dia} → ${esperado}`, () => {
        cy.get("#dia").type(dia);
        cy.get("#calcular").click();

        cy.get("#resultado")
          .should("have.text", esperado);
      });

    });

  });

  // 2. PRUEBAS POR VALORES LÍMITE

  describe("Valores límite", () => {

    const casos = [
      { dia: 0, esperado: "Día inválido" },
      { dia: 1, esperado: "Recargo: 0%" },
      { dia: 2, esperado: "Recargo: 0%" },
      { dia: 9, esperado: "Recargo: 0%" },
      { dia: 10, esperado: "Recargo: 0%" },
      { dia: 11, esperado: "Recargo: 2%" },
      { dia: 19, esperado: "Recargo: 2%" },
      { dia: 20, esperado: "Recargo: 2%" },
      { dia: 21, esperado: "Recargo: 4%" },
      { dia: 30, esperado: "Recargo: 4%" },
      { dia: 31, esperado: "Recargo: 4%" },
      { dia: 32, esperado: "Día inválido" }
    ];

    casos.forEach(({ dia, esperado }) => {

      it(`Verifica día ${dia}`, () => {
        cy.get("#dia").type(dia.toString());
        cy.get("#calcular").click();

        cy.get("#resultado")
          .should("have.text", esperado);
      });

    });

  });

  // 3. PRUEBAS POR CLASES DE EQUIVALENCIA

  describe("Clases de equivalencia", () => {

    const casos = [
      { dia: "-5", esperado: "Día inválido" },
      { dia: "5", esperado: "Recargo: 0%" },
      { dia: "15", esperado: "Recargo: 2%" },
      { dia: "25", esperado: "Recargo: 4%" },
      { dia: "40", esperado: "Día inválido" },
      { dia: "abc", esperado: "Día inválido" },
      { dia: "10.5", esperado: "Día inválido" },
      { dia: "", esperado: "Día inválido" }
    ];

    casos.forEach(({ dia, esperado }) => {

      it(`Verifica entrada "${dia}"`, () => {

        if (dia !== "") {
          cy.get("#dia").type(dia);
        }

        cy.get("#calcular").click();

        cy.get("#resultado")
          .should("have.text", esperado);
      });

    });

  });

});
