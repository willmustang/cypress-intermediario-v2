// Descreve o conjunto de testes com o nome 'Loggout'
describe('Loggout', () => {
    // Define um teste individual que será executado
    it('successfully', () => {
        cy.visit('/') // Visita a URL base definida na configuração do Cypress
        cy.get('#user_login').type(Cypress.env('user_name')) // Digita o nome de usuário obtido das variáveis de ambiente do Cypress
        cy.get('#user_password').type(Cypress.env('user_password')) // Digita a senha obtida das variáveis de ambiente do Cypress
        cy.get('#new_user > .submit-container > .btn').click() // Clica no botão de login
        cy.logout() // Executa o comando personalizado de logout
    })
})