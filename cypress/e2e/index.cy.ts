export {}; // Next.js requires --isolatedModules in tsconfig to be true. Feel free to remove this if you have an import

describe('home page', () => {
    it('should render', () => {
        cy.visit('/', { timeout: 5000 });

        cy.get('.pokemon_item').should('exist').and('be.visible');
    });

    it('go to detail page', () => {
        cy.visit('/', { timeout: 5000 });

        cy.get('.detail_button').first().should('exist').and('be.visible').click({ timeout: 3000 });

        cy.url().should('include', '/detail');

        cy.findByText('Pokemon detail').should('exist').and('be.visible');
    });
});
