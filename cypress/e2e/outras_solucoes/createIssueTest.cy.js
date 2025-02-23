import { faker } from '@faker-js/faker'

describe('Create Issue', () => {

beforeEach('login', () => {
    cy.login()
    cy.visit('/dashboard/projects')
})

it('create issue', () => {
    const issueTitle = faker.lorem.sentence() // Gera um título aleatório
    const issueDescription = faker.lorem.sentences(2) // Gera uma descrição aleatória

    cy.get(':nth-child(1) > .project-details > .flex-wrapper > .align-items-center > .d-flex > .text-plain > .project-full-name > .namespace-name').click()
    cy.get('.shortcuts-issues').click()
    cy.get('#new_issue_link').click()
    cy.get('#issue_title').type(issueTitle)
    cy.get('#issue_description').type(issueDescription) // Insere a descrição gerada
    cy.get('.append-right-10 > .btn').click()
})

});