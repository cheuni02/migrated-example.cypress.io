import {expect, Locator, test} from '@playwright/test'
import {ActionsPage} from "../../../pages/actions.page";

test.describe('Actions Page Demo', () => {
  let actionPage: ActionsPage;
  let underTest: Locator;

  test.beforeEach(async ({page}) => {
    actionPage = new ActionsPage(page);
    await actionPage.goto();
  });

  test('.type() - type into a DOM element', async () => {
    /*
      cy.get('.action-email').type('fake@email.com')
      cy.get('.action-email').should('have.value', 'fake@email.com')
     */
    underTest = actionPage.typeEmail1Field;
    await underTest.scrollIntoViewIfNeeded();
    await underTest.fill('fake@email.com');
    const whatsFilled = await underTest.inputValue();
    expect(whatsFilled).toBe('fake@email.com');
  });

  test('.focus() - focus on a DOM element', async () => {
    /*
      // https://on.cypress.io/focus
      cy.get('.action-focus').focus()
      cy.get('.action-focus').should('have.class', 'focus')
          .prev().should('have.attr', 'style', 'color: orange;')
     */
    underTest = actionPage.actionFocusField;
    await underTest.scrollIntoViewIfNeeded();
    await underTest.focus();
    await expect(underTest).toBeFocused();
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
    underTest =  actionPage.descriptionField;
    await underTest.scrollIntoViewIfNeeded();
    await underTest.fill(testCopy);
    expect(underTest).toHaveValue(testCopy);
    await underTest.clear();
    expect(underTest).toHaveValue('');
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
    underTest = actionPage.actionBtn;
    await actionPage.scrollToHeader('click');
    await underTest.click();

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

    await canvas.click({ position: { x: 80, y: 75 } }); //80, 75
    await canvas.click({ position: { x: 170, y: 75 } }); //170, 75
    await canvas.click({ position: { x: 80, y: 165 } }); //80, 165
    await canvas.click({ position: { x: 100, y: 185 } }); //100, 185
    await canvas.click({ position: { x: 125, y: 190 } }); //125, 190
    await canvas.click({ position: { x: 150, y: 185 } }); //150, 185
    await canvas.click({ position: { x: 170, y: 165 } }); //150, 185

  });

  test('.rightclick() - right click on a DOM element', async () => {
    /*
    it('.rightclick() - right click on a DOM element', () => {
    // https://on.cypress.io/rightclick

    // Our app has a listener on 'contextmenu' event in our 'scripts.js'
    // that hides the div and shows an input on right click
    cy.get('.rightclick-action-div').rightclick()
    cy.get('.rightclick-action-div').should('not.be.visible')
    cy.get('.rightclick-action-input-hidden').should('be.visible')
    })
     */
    underTest = actionPage.toBeRightClickedOn;
    await underTest.scrollIntoViewIfNeeded();
    await underTest.click({ button: 'right'});
    await expect(underTest).not.toBeVisible();
  });
});