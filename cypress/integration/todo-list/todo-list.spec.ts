describe('TODO List', () => {
  const createItem = (text: string) => {
    const input = cy.get('[data-cy="input"]');

    input.type(`${text}{enter}`);
    input.should('have.value', '');
  };

  beforeEach(() => {
    cy.visit('/');
  });

  it('should be possible to add a new item', () => {
    createItem('New item');

    const newItem = cy.get('[data-cy="item"]').contains('New item');

    expect(newItem).to.exist;
  });

  it('should be possible to select/unselect an item', () => {
    createItem('New item');

    cy.get('[data-cy="itemCheckbox"]').click();
    cy.get('[data-cy="item"]').should('have.class', 'todoListItem--completed');
    cy.get('[data-cy="itemCheckbox"]').click();
    cy.get('[data-cy="item"]').should(
      'not.have.class',
      'todoListItem--completed'
    );
  });

  it('should be possible to select/unselect all items', () => {
    createItem('First item');
    createItem('Second item');
    createItem('Third item');

    // Select all by clicking on master checkbox
    cy.get('[data-cy="masterCheckbox"]').click();
    cy.get('[data-cy="item"]').should('have.class', 'todoListItem--completed');

    // Unselect all by clicking on master checkbox
    cy.get('[data-cy="masterCheckbox"]').click();
    cy.get('[data-cy="item"]').should(
      'not.have.class',
      'todoListItem--completed'
    );

    // Select each row individually and check that the master checkbox is checked
    cy.get('[data-cy="itemCheckbox"]').click({ multiple: true });
    cy.get('[data-cy="masterCheckbox"]').should(
      'have.attr',
      'ng-reflect-checked',
      'true'
    );

    // Select each row individually and check that the master checkbox is checked
    cy.get('[data-cy="itemCheckbox"]').first().click();
    cy.get('[data-cy="masterCheckbox"]').should(
      'have.attr',
      'ng-reflect-checked',
      'false'
    );
  });

  it('should be possible to remove an item', () => {
    createItem('First item');

    cy.get('[data-cy="item"]').should('contain.text', 'First item');

    cy.get('[data-cy="removeItem"]').click();
    cy.get('[data-cy="item"]').should('not.exist');
  });
});
