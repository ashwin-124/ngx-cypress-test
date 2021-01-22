import { navgiationPage } from '../support/page_objects/navigationPage'

describe('Page Object Tests', () => {
  beforeEach('Open Home Page', () => {
    cy.visit('/')
  })

  it('Check Navigation Drawer / Sidemenu', () => {
    navgiationPage.formLayoutPage()
    navgiationPage.datePickerPage()
  })
})