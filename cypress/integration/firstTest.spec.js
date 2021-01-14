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

  it("Converting Cypress to jQuery & jQuery back to Cypress (wrap()) -> ", () => {
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

  it("invoke() example -> ", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    //	get text of firstBlock using invoke method
    cy.contains("nb-card", "Using the Grid")
      .find('[for="inputEmail1"]')
      .invoke("text")
      .should("equal", "Email");

    //	get value using attribute & invoke method
    cy.contains("nb-card", "Using the Grid")
      .find("#inputEmail1")
      .invoke("attr", '[placeholder="Email"]')
      .should("equal", undefined);

    //	Advanced invoke using calendar
    cy.contains("Datepicker").click();

    cy.contains("nb-card", "Common Datepicker")
      .find("input")
      .then((input) => {
        cy.wrap(input).click();

        cy.get("nb-calendar-day-picker")
          .contains("nb-calendar-day-cell", "14")
          .click();

        cy.wrap(input).invoke("prop", "value").should("equal", "Jan 14, 2021");
      });
  });

  it("radiobuttons examples", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.contains("nb-card", "Using the Grid")
      .find('[type="radio"]')
      .then((radioButtons) => {
        cy.wrap(radioButtons)
          .first()
          .check({ force: true })
          .should("be.checked");

        //	tap second radio button
        cy.wrap(radioButtons).eq(1).check({ force: true }).should("be.checked");
        cy.wrap(radioButtons).eq(0).should("not.be.checked");

        //	third radio button should be disabled
        cy.wrap(radioButtons).eq(2).should("be.disabled");
      });
  });

  it("checkboxes example", () => {
    cy.visit("/");
    cy.contains("Modal & Overlays").click();
    cy.contains("Toastr").click();

    cy.get('[type="checkbox"]').first().uncheck({ force: true });
    cy.get('[type="checkbox"]').eq(1).check({ force: true });
    cy.get('[type="checkbox"]').eq(2).check({ force: true });
  });

  it("Datatables Examples", () => {
    cy.visit("/");
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    //	Adding a New Record / Row
    cy.get("thead").find(".nb-plus").click();

    cy.get("thead")
      .find("tr")
      .find("td")
      .then((tableData) => {
        const firstNameData = cy.wrap(tableData).eq(2).find("input");
        firstNameData.clear().type("John");
        const lastNameData = cy.wrap(tableData).eq(3).find("input");
        lastNameData.clear().type("Doe");

        cy.wrap(tableData).eq(0).find(".nb-checkmark").click();

        //	Assertion Pending
      });
  });

  it("Tooltip Examples", () => {
    cy.visit("/");
    cy.contains("Modal & Overlays").click();
    cy.contains("Tooltip").click();

    cy.contains("nb-card", "Tooltip With Icon")
      .find('button[nbtooltip="This is a tooltip"]')
      .click();

    cy.get("nb-tooltip")
      .find("span.ng-tns-c21-23.ng-star-inserted")
      .invoke("prop", "innerText")
      .should("equal", "This is a tooltip");
  });
});

it.only("Dialog Box Example", () => {
  cy.visit("/");
  cy.contains("Modal & Overlays").click();
  cy.contains("Dialog").click();

  cy.contains("nb-card", "Open Dialog").find("button").first().click();

  cy.get("nb-dialog-container").find("button").click();
});

//	System / Window Alert
