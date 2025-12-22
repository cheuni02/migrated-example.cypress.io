import {expect, test} from '@playwright/test'
import {ActionsPage} from "../../../pages/actions.page";

test.describe('Actions Page Demo', () => {
  let actionPage: ActionsPage;
  test.beforeEach(async ({page}) => {
    actionPage = new ActionsPage(page);
    await actionPage.goto();
    await actionPage.refresh();
  });

  test('.type() - type into a DOM element', async () => {
    /*
      cy.get('.action-email').type('fake@email.com')
      cy.get('.action-email').should('have.value', 'fake@email.com')
     */
    await actionPage.scrollToHeader('type');
    await actionPage.fillEmail1Field('fake@email.com');
    const whatsFilled = await actionPage.typeEmail1Field.inputValue();
    expect(whatsFilled).toBe('fake@email.com');
  });

  test('.focus() - focus on a DOM element', async () => {
    /*
      // https://on.cypress.io/focus
      cy.get('.action-focus').focus()
      cy.get('.action-focus').should('have.class', 'focus')
          .prev().should('have.attr', 'style', 'color: orange;')
     */
    const input = actionPage.actionFocusField;
    await actionPage.scrollToHeader('focus');
    await input.focus();
    await expect(input).toBeFocused();
  });

  test('.clear() - clears an input or textarea element', async () => {
    /*
      // https://on.cypress.io/clear
      cy.get('.action-clear').type('Clear this text')
      cy.get('.action-clear').should('have.value', 'Clear this text')
      cy.get('.action-clear').clear()
      cy.get('.action-clear').should('have.value', '')
    */
    const testCopy = 'Clear this text';
    const description =  actionPage.descriptionField;
    await actionPage.scrollToHeader('clear');
    await description.fill(testCopy);
    expect(description).toHaveValue(testCopy);
    await description.clear();
    expect(description).toHaveValue('');
  });

  test('.click() - click on a DOM element', async () => {
    /*
      // https://on.cypress.io/click
      cy.get('.action-btn').click()

      // You can click on 9 specific positions of an element:
      //  -----------------------------------
      // | topLeft        top       topRight |
      // |                                   |
      // |                                   |
      // |                                   |
      // | left          center        right |
      // |                                   |
      // |                                   |
      // |                                   |
      // | bottomLeft   bottom   bottomRight |
      //  -----------------------------------

      // clicking in the center of the element is the default
      cy.get('#action-canvas').click()

      cy.get('#action-canvas').click('topLeft')
      cy.get('#action-canvas').click('top')
      cy.get('#action-canvas').click('topRight')
      cy.get('#action-canvas').click('left')
      cy.get('#action-canvas').click('right')
      cy.get('#action-canvas').click('bottomLeft')
      cy.get('#action-canvas').click('bottom')
      cy.get('#action-canvas').click('bottomRight')

      // .click() accepts an x and y coordinate
      // that controls where the click occurs :)

      cy.get('#action-canvas')
      cy.get('#action-canvas').click(80, 75) // click 80px on x coord and 75px on y coord
      cy.get('#action-canvas').click(170, 75)
      cy.get('#action-canvas').click(80, 165)
      cy.get('#action-canvas').click(100, 185)
      cy.get('#action-canvas').click(125, 190)
      cy.get('#action-canvas').click(150, 185)
      cy.get('#action-canvas').click(170, 165)

      // click multiple elements by passing multiple: true
      cy.get('.action-labels>.label').click({ multiple: true })

      // Ignore error checking prior to clicking
      cy.get('.action-opacity>.btn').click({ force: true })
    */
    await actionPage.scrollToHeader('click');
    await actionPage.actionBtn.click();

    const canvas = actionPage.actionCanvas;
    const box = await canvas.boundingBox();
    const inset = 5;
    if (!box) throw new Error('Canvas not visible');

    await canvas.click({ position: { x: inset, y: inset } });                     // topLeft
    await canvas.click({ position: { x: box.width / 2, y: inset } });         // top
    await canvas.click({ position: { x: box.width - inset, y: inset } });             // topRight

    await canvas.click({ position: { x: inset, y: box.height - inset / 2 } });         // left
    await canvas.click({ position: { x: box.width - inset, y: box.height / 2 } }); // right

    await canvas.click({ position: { x: 0, y: box.height - inset } });             // bottomLeft
    await canvas.click({ position: { x: box.width / 2, y: box.height - inset } }); // bottom
    await canvas.click({ position: { x: box.width - inset, y: box.height - inset } });     // bottomRight
  });

});