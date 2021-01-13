/// <reference types="Cypress" />

describe("first test describtion", () => {
  it("various ways of get()", () => {
    //	ask cypress to execute on baseUrl
    cy.visit("/");

    //	ask to cypress to reach destination through events
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    //	DESTINATION
    //	1. select element by ID
    cy.get("#inputEmail1");

    //	2. select element by Class Name
    cy.get(".input-full-width");

    //	3. select element by Multiple Class (Class Value)
    cy.get('[class="input-full-width size-medium shape-rectangle"]');

    //	4. select element by Tag
    cy.get("input");

    //	5. select element by Attribute Name
    cy.get("[placeholder]");

    //	6. select element by Attribute Name & Attribute Value
    cy.get('[placeholder="Email"]');

    //	7. select element by 2 Or More Attributes
    cy.get('[placeholder="Email"][nbinput]');

    //	8. select element by Tag Name & Attribute
    cy.get('input[placeholder="Email"]');

    //	9. select element by Tag Name, Attribute, ID & Class
    cy.get('input[placeholder="Email"]#inputEmail1.input-full-width');

    //	10. select element by Cypress Recommended Way (Custom Attribute)
    cy.get('[data-cy="imputEmail1"]');
  });

  it("finding a parent & child using parents() & find()", () => {
    //	ask cypress to execute on baseUrl
    cy.visit("/");

    //	ask to cypress to reach destination through events
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    //	finding a child from common parent
    cy.get("#inputEmail3").parents("form").find("nb-checkbox").click();

    //	finding a child WITHOUT any Unique key
    cy.contains("nb-card", "Block form").find('input[placeholder="Website"]');
  });

  it.only("Converting Cypress to jQuery & jQuery back to Cypress (wrap()) -> ", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.contains("nb-card", "Using the Grid").then((firstBlock) => {
      //	firstBlock is NOW IN jQUERY Format
      const firstBloackEmail = firstBlock.find('[for="inputEmail1"]').text();
      const firstBloackPassword = firstBlock
        .find('[for="inputPassword2"]')
        .text();

      //	jQuery Assertions are done using Mocha, so using Mocha Style Assertion here
      expect(firstBloackEmail).to.equal("Email");
      expect(firstBloackPassword).to.equal("Password");

      cy.contains("nb-card", "Basic form").then((secondBlock) => {
        //	secondBlock is NOW IN jQUERY Format
        const secondBlockEmail = secondBlock
          .find('[for="exampleInputEmail1"]')
          .text();
        const secondBlockPassword = secondBlock
          .find('[for="exampleInputPassword1"]')
          .text();

        //	jQuery Assertions are done using Mocha, so using Mocha Style Assertion here
        expect(secondBlockEmail).to.equal("Email address");
        expect(secondBlockPassword).to.equal("Password");

        //	Converting jQuery BACK TO Cypress using wrap()
        cy.wrap(firstBloackPassword).should("contain", "Password");
      });
    });
  });
});
