// Descreve o conjunto de testes com o nome 'Delete Project'
describe('Delete Project', () => {
    // Define o número de repetições para os testes
    const numeroDeRepeticoes = 0;

    // Loop para criar múltiplas iterações do teste
    for (let i = 0; i < numeroDeRepeticoes; i++) {
        // Descreve um conjunto de testes para cada iteração
        describe(`Iteration ${i + 1}`, () => {
            // Executa antes de cada teste dentro deste conjunto
            beforeEach(() => {
                cy.login() // Executa o comando personalizado de login
                cy.visit('/dashboard/projects') // Visita a página de projetos no dashboard
            })
            
            // Define um teste individual que será executado
            it('successfully', () => {
                // Clica no primeiro projeto da lista
                cy.get(':nth-child(1) > .project-details > .flex-wrapper > .align-items-center > .d-flex > .text-plain > .project-full-name > .namespace-name').click()
                
                // Obtém o texto do título do projeto
                cy.get('.home-panel-title').invoke('text').then((texto) => {
                    // Clica na opção de configurações avançadas do projeto
                    cy.get(':nth-child(9) > .shortcuts-tree').click()
                    cy.get('#js-project-advanced-settings').click()
                    cy.get(':nth-child(6) > form > .btn').click()
                    
                    // Digita o nome do projeto no campo de confirmação para deletar
                    cy.get('#confirm_name_input').type(texto, { force: true })
                    
                    // Clica no botão de confirmação para deletar o projeto
                    cy.get('.form-actions > .btn').click()
                })
            })
        })
    }
})
