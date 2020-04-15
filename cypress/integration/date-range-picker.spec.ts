import { DateRange } from '../../projects/uiowa/date-range-picker/src/lib/models/date-range';
import { AppComponent } from '../../src/app/app.component';

describe('date-range-picker tests', () => {
  before(() => {
    cy.visit('');
  });

  it('should show initial state', () => {
    const dateRange = new AppComponent().dateRange1;
    const dateRangeString = `${dateRange.start!.toLocaleDateString()} - ${dateRange.end!.toLocaleDateString()}`;
    cy.get('[data-cy=regular-date-range] input')
      .should('have.value', dateRangeString)
      .should('have.attr', 'readonly');
    cy.get('[data-cy=regular-date-range] pre').then($el => {
      const json = $el[0].textContent || '';
      expect(dateRange.equals(JSON.parse(json))).to.be.true;
    });
    cy.get('ngb-datepicker').should('not.exist');
  });

  it('should show the date picker when click input box', () => {
    cy.get('ngb-datepicker').should('not.exist');
    cy.get('[data-cy=regular-date-range] input').click();
    cy.get('ngb-datepicker').should('have.class', 'show');
    cy.get('.ngb-dp-month').then($el => {
      expect($el.length).to.be.equal(2);
    });
    cy.get('.custom-day.range').then($el => {
      expect($el.length).to.be.equal(15);
    });
    cy.get('.custom-day.range.faded').then($el => {
      expect($el.length).to.be.equal(13);
    });
    cy.get('[data-cy=regular-date-range] input').click();
    cy.get('ngb-datepicker').should('not.exist');
  });
});
