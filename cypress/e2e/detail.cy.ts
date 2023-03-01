export {}; // Next.js requires --isolatedModules in tsconfig to be true. Feel free to remove this if you have an import

describe('detail page', () => {
    it('go to detail page', () => {
        cy.visit('/detail/1', { timeout: 3000 });

        cy.findByText('Pokemon detail').should('exist').and('be.visible');
    });

    it('try catch button', () => {
        cy.visit('/detail/1', { timeout: 3000 });

        cy.get('.release_button').should('exist').and('be.visible').click({ timeout: 1000 });
        cy.get('.not_caught_img').should('exist');
    });

    it('try release button', () => {
        cy.visit('/detail/1', { timeout: 3000 });

        cy.get('.catch_button').should('exist').and('be.visible').click({ timeout: 1000 });
        cy.get('.caught_img').should('exist');
    });
});
