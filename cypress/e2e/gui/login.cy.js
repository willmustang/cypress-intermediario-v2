// Descreve o conjunto de testes com o nome 'Login'
describe('Login', () => {
  // Define um teste individual que será executado
  it('successfully', () => {
    // Obtém o nome de usuário das variáveis de ambiente do Cypress
    const user = Cypress.env('user_name')
    // Obtém a senha das variáveis de ambiente do Cypress
    const password = Cypress.env('user_password')
    // Define as opções para o comando de login, desativando o cache da sessão
    const options = { cacheSession: false }

    // Executa o comando personalizado de login com os parâmetros user, password e options
    cy.login(user, password, options)

    // Verifica se o avatar do usuário está visível, indicando que o login foi bem-sucedido
    cy.get('.qa-user-avatar').should('be.visible')
  })
})