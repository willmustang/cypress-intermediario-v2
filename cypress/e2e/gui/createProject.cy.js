// Importa a biblioteca faker para gerar dados falsos
import { faker } from '@faker-js/faker'
// Define propriedade de captura sempre que há falha na execução
const options = { env:{ snapshotOnly: true }}
// Define o número de repetições para os testes
const numeroDeRepeticoes = 1;

// Descreve o conjunto de testes com o nome 'Create Project'
describe('Create Project', options, () => {
  // Executa antes de cada teste dentro deste conjunto
  beforeEach(() => {
    cy.api_deleteProjects()
    cy.login() // Executa o comando personalizado de login
  })

  // Loop para criar múltiplas iterações do teste
  for (let i = 0; i < numeroDeRepeticoes; i++) {
    // Define um teste individual que será executado
    it(`successfully - Iteration ${i + 1}`, () => {
      // Gera dados falsos para o projeto usando a biblioteca faker
      const project = {
        name: `project-${faker.string.uuid()}`, // Gera um UUID único para o nome do projeto
        description: faker.lorem.words(5) // Gera uma descrição com 5 palavras
      }

      // Executa o comando personalizado para criar um projeto
      cy.gui_createProject(project)

      // Verifica se a URL atual é igual à URL esperada do projeto criado
      cy.url().should('be.equal', `${Cypress.config('baseUrl')}/${Cypress.env('user_name')}/${project.name}`)
      // Verifica se o nome do projeto está visível na página
      cy.contains(project.name).should('be.visible')
      // Verifica se a descrição do projeto está visível na página
      cy.contains(project.description).should('be.visible')
    })
  }
})
