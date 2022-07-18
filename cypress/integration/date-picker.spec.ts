describe('date-picker tests', () => {
  before(() => {
    cy.visit('');
  });

  it('should show initial state', () => {
    cy.get('#date-picker8')
      .should('have.value', '01/24/2018')
      .should('have.attr', 'readonly');
    cy.get('#date8').should('have.text', JSON.stringify(new Date(2018, 0, 24)));
    cy.get('date-picker ngb-datepicker').should('not.exist');
  });

  it('should click input and open', () => {
    cy.get('#date-picker8').click();
    cy.get('date-picker ngb-datepicker').should('have.class', 'show');
    cy.get('#date-picker8').click();
    cy.get('date-picker ngb-datepicker').should('not.exist');
  });

  it('should click icon and open', () => {
    cy.get('#date-picker > date-picker > .input-group > .btn').click();
    cy.get('date-picker ngb-datepicker').should('have.class', 'show');
    cy.get('#date-picker > date-picker > .input-group > .btn').click();
    cy.get('date-picker ngb-datepicker').should('not.exist');
  });

  it('should click outside and close', () => {
    cy.get('#date-picker8').click();
    cy.get('date-picker ngb-datepicker').should('have.class', 'show');
    cy.get('#date8').click({force: true});
    cy.get('date-picker ngb-datepicker').should('not.exist');
  });

  it('should change date when click on Jan 18', () => {
    cy.get('#date-picker8').click();
    cy.get('date-picker ngb-datepicker').should('have.class', 'show');
    cy.get('date-picker .custom-day').then((days) => {
      // should show correct number of days
      expect(days.length).to.be.equal(42);

      // should have correct styles
      expect(days[0])
        .to.contain('31')
        .to.have.class('outside')
        .to.have.class('weekend')
        .to.have.class('custom-day');
      expect(days[1]).to.contain('1').to.have.class('custom-day');
      expect(days[6])
        .to.contain('6')
        .to.have.class('weekend')
        .to.have.class('custom-day');
      expect(days[31].innerText).to.be.equal('31');
      expect(days[31]).to.have.class('custom-day');
      expect(days[32])
        .to.contain('1')
        .to.have.class('outside')
        .to.have.class('custom-day');
      expect(days[41])
        .to.contain('10')
        .to.have.class('outside')
        .to.have.class('weekend')
        .to.have.class('custom-day');
    });

    // pick another day
    cy.get('[aria-label="Thursday, January 18, 2018"] > .custom-day').click();
    cy.get('#date-picker8')
      .should('have.value', '01/18/2018')
      .should('have.attr', 'readonly');
    cy.get('#date8').should(
      'have.text',
      JSON.stringify(new Date(2018, 0, 18, 12))
    );

    // should close calendar after picking a date
    cy.get('date-picker ngb-datepicker').should('not.exist');
  });
});
