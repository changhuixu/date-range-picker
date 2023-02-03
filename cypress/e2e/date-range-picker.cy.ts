import { DateRange } from '../../projects/uiowa/date-range-picker/src/lib/models/date-range';

describe('date-range-picker tests', () => {
  beforeEach(() => {
    cy.visit('');
  });

  it('should show initial state: 1', () => {
    const dateRange = DateRange.nextTwoWeeks();
    const dateRangeString = `${dateRange.start!.toLocaleDateString()} - ${dateRange.end!.toLocaleDateString()}`;
    cy.get('[data-cy=regular-date-range] input')
      .should('have.value', dateRangeString)
      .should('have.attr', 'readonly');
    cy.get('[data-cy=regular-date-range] pre').then(($el) => {
      const json = $el[0].textContent || '';
      expect(dateRange.equals(JSON.parse(json))).to.be.true;
    });
    cy.get('ngb-datepicker').should('not.exist');
  });

  it('should show the date picker when click input box: 1', () => {
    cy.get('ngb-datepicker').should('not.exist');
    cy.get('[data-cy=regular-date-range] input').click();
    cy.get('ngb-datepicker').should('have.class', 'show');
    cy.get('.ngb-dp-month').then(($el) => {
      expect($el.length).to.be.equal(2);
    });
    cy.get('.custom-day.range').then(($el) => {
      expect($el.length).to.be.equal(15);
    });
    cy.get('.custom-day.range.faded').then(($el) => {
      expect($el.length).to.be.equal(13);
    });
    cy.get('[data-cy=regular-date-range] input').click();
    cy.get('ngb-datepicker').should('not.exist');
  });

  it('should show initial state: 2', () => {
    const dateRange = new DateRange(new Date(2018, 9, 1), new Date(2018, 9, 9));
    const dateRangeString = `${dateRange.start!.toLocaleDateString()} - ${dateRange.end!.toLocaleDateString()}`;
    cy.get('[data-cy=both-dates-not-null] input')
      .should('have.value', dateRangeString)
      .should('have.attr', 'readonly');
    cy.get('[data-cy=both-dates-not-null] pre').then(($el) => {
      const json = $el[0].textContent || '';
      expect(dateRange.equals(JSON.parse(json))).to.be.true;
    });
    cy.get('ngb-datepicker').should('not.exist');
  });

  it('should show the date picker when click input box: 2', () => {
    cy.get('ngb-datepicker').should('not.exist');
    cy.get('[data-cy=both-dates-not-null] input').click();
    cy.get('ngb-datepicker').should('have.class', 'show');
    cy.get('.ngb-dp-month').then(($el) => {
      expect($el.length).to.be.equal(2);
    });
    cy.get('.custom-day.range').then(($el) => {
      expect($el.length).to.be.equal(9);
    });
    cy.get('.custom-day.range.faded').then(($el) => {
      expect($el.length).to.be.equal(7);
    });
    cy.get('[data-cy=both-dates-not-null] input').click();
    cy.get('ngb-datepicker').should('not.exist');
  });

  it('should change dates when click date picker: 1', () => {
    cy.get('ngb-datepicker').should('not.exist');
    cy.get('[data-cy=both-dates-not-null] input').click();
    cy.get('ngb-datepicker').should('have.class', 'show');
    cy.get('[aria-label="Tuesday, October 16, 2018"] > .custom-day').click();
    cy.get('[aria-label="Tuesday, November 6, 2018"] > .custom-day').click();
    cy.get('ngb-datepicker').should('not.exist');
    cy.get('[data-cy=both-dates-not-null] input')
      .should('have.value', '10/16/2018 - 11/6/2018')
      .should('have.attr', 'readonly');
    cy.get('[data-cy=both-dates-not-null] pre').then(($el) => {
      const json = $el[0].textContent || '';
      expect(JSON.parse(json).start).to.be.equal(
        new Date(2018, 9, 16, 12).toISOString()
      );
      expect(JSON.parse(json).end).to.be.equal(
        new Date(2018, 10, 6, 12).toISOString()
      );
    });
  });

  it('should change dates using keyboard', () => {
    cy.get('ngb-datepicker').should('not.exist');
    cy.get('[data-cy=both-dates-not-null] input').click();
    cy.get('ngb-datepicker').should('have.class', 'show');
    cy.get('ngb-datepicker')
      .type('{downArrow}{downArrow} ')
      .type('{pageDown}{rightArrow} ');
    cy.get('ngb-datepicker').should('not.exist');
    cy.get('[data-cy=both-dates-not-null] input')
      .should('have.value', '10/15/2018 - 11/16/2018')
      .should('have.attr', 'readonly');
    cy.get('[data-cy=both-dates-not-null] pre').then(($el) => {
      const json = $el[0].textContent || '';
      expect(JSON.parse(json).start).to.be.equal(
        new Date(2018, 9, 15, 12).toISOString()
      );
      expect(JSON.parse(json).end).to.be.equal(
        new Date(2018, 10, 16, 12).toISOString()
      );
    });
  });

  it('should change dates by clicking a button', () => {
    cy.get('ngb-datepicker').should('not.exist');
    cy.get('[data-cy=change-date-with-button] input')
      .should('have.value', '10/1/2018 - 10/9/2018')
      .should('have.attr', 'readonly');
    cy.get('[data-cy=change-date-with-button] button.btn.btn-primary').click();

    cy.get('ngb-datepicker').should('not.exist');
    cy.get('[data-cy=change-date-with-button] input')
      .should('have.value', '10/1/2018 - 10/19/2018')
      .should('have.attr', 'readonly');
    cy.get('[data-cy=change-date-with-button] pre').then(($el) => {
      const json = $el[0].textContent || '';
      expect(JSON.parse(json).start).to.be.equal(
        new Date(2018, 9, 1).toISOString()
      );
      expect(JSON.parse(json).end).to.be.equal(
        new Date(2018, 9, 19).toISOString()
      );
    });
  });
});
