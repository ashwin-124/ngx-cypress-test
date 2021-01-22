const selectGroupMenu = (type, title) => {
  cy.contains(type, title).then(menu => {
    cy.wrap(menu).find('nb-icon.expand-state').find('g').last().invoke('attr', 'data-name').then(iconType => {
      if(iconType.includes('left')) {
        cy.wrap(menu).click();
      }
    })
  })
}

class NavigationPage {

  formLayoutPage() {
    selectGroupMenu('a', 'Forms');
    
    // cy.contains("Form Layouts").click();
  }

  datePickerPage() {
    // cy.contains("Forms").click();
    // cy.contains("Datepicker").click();
  }
}

export const navgiationPage = new NavigationPage()