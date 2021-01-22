const selectGroupMenu = (type = 'a', title) => {
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
    selectGroupMenu('Forms');
    cy.contains("Form Layouts").click();
  }

  datePickerPage() {
    selectGroupMenu('Forms');
    cy.contains("Datepicker").click();
  }

  toasterPage() {
    selectGroupMenu('Modal & Overlays')
    cy.contains("Toastr").click();
  }

  smartTablePage() {
    selectGroupMenu("Tables & Data")
    cy.contains("Smart Table").click();
  }

  toolTipPage() {
    selectGroupMenu("Modal & Overlays")
    cy.contains("Dialog").click();
    cy.contains("Tooltip").click();
  } 
}

export const navgiationPage = new NavigationPage()