import { faker } from '@faker-js/faker' // Importa a biblioteca Faker para gerar dados aleatórios
const options = {env:{snapshotOnly: true}}

describe('Create Issue', options, () => {
    // Define um objeto 'issue' com dados aleatórios para a issue e o projeto
    const issue = {
        title: `issue-${faker.string.uuid()}`, // Gera um título aleatório para a issue
        description: faker.lorem.words(3), // Gera uma descrição aleatória com 3 palavras
        project: {
            name: `project-${faker.string.uuid()}`, // Gera um nome aleatório para o projeto
            description: faker.lorem.words(5) // Gera uma descrição aleatória para o projeto com 5 palavras
        }
    }

    beforeEach(() => {
        cy.api_deleteProjects()
        cy.login() // Realiza o login antes de cada teste
        cy.api_createProject(issue.project) // Cria um projeto usando os dados gerados
    })

    it('successfully', () => {
        cy.gui_createIssue(issue) // Cria uma issue usando os dados gerados

        // Verifica se a issue foi criada com sucesso, verificando se os detalhes da issue contêm o título e a descrição gerados
        cy.get('.issue-details')
            .should('contain', issue.title)
            .and('contain', issue.description)
    })
})