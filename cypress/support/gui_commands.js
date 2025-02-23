// ***********************************************
// Este exemplo commands.js mostra como
// criar vários comandos personalizados e sobrescrever
// comandos existentes.
//
// Para exemplos mais abrangentes de comandos personalizados,
// leia mais aqui:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- Este é um comando pai --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- Este é um comando filho --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- Este é um comando duplo --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- Isto sobrescreverá um comando existente --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Adiciona um comando personalizado 'login' ao Cypress
Cypress.Commands.add('login', (
  user = Cypress.env('user_name'), // Obtém o nome de usuário das variáveis de ambiente do Cypress
  password = Cypress.env('user_password'), // Obtém a senha das variáveis de ambiente do Cypress
  { cacheSession = true } = {}, // Define o valor padrão de cacheSession como true
) => { 
  // Função que realiza o login
  const login = () => {
    cy.visit('/users/sign_in') // Visita a página de login

    cy.get("[data-qa-selector='login_field']").type(user) // Digita o nome de usuário
    cy.get("[data-qa-selector='password_field']").type(password, { log: false }) // Digita a senha
    cy.get("[data-qa-selector='sign_in_button']").click() // Clica no botão de login
  }

  // Função que valida se o login foi bem-sucedido
  const validate = () => {
    cy.visit('/') // Visita a página inicial
    cy.location('pathname', { timeout: 1000 }) // Verifica o caminho da URL com um tempo limite de 1000ms ou 1 segundo
      .should('not.eq', '/users/sign_in') // Verifica se o caminho da URL não é '/users/sign_in'
  }

  // Opções para o comando de login
  const options = {
    cacheAcrossSpecs: true, // Permite que a sessão seja compartilhada entre diferentes arquivos de especificação
    validate, // Função de validação para verificar se o login foi bem-sucedido
  }

  // Verifica se a sessão deve ser armazenada em cache
  if (cacheSession) {
    cy.session(`${String(user)}-${Date.now()}`, login, options) // Cria uma sessão de login com um identificador único usando timestamp
  } else {
    login() // Realiza o login diretamente se cacheSession for false
  }
})

// Adiciona um comando personalizado 'logout' ao Cypress
Cypress.Commands.add('logout', () => {
    cy.get('.qa-user-avatar').click() // Clica no avatar do usuário
    cy.contains('Sign out').click() // Clica no botão de sair
})

// Adiciona um comando personalizado 'gui_createProject' ao Cypress
Cypress.Commands.add('gui_createProject', project => {
    cy.visit('/projects/new') // Visita a página de criação de projetos
    cy.url().should('include', '/projects/new') // Verifica se a URL está correta
    cy.get('#project_name').type(project.name) // Digita o nome do projeto
    cy.get('#project_description').type(project.description) // Digita a descrição do projeto
    cy.get('.qa-initialize-with-readme-checkbox').check() // Marca a caixa de seleção para inicializar com README
    cy.contains('Create project').click() // Clica no botão de criar projeto
})

// Adiciona um comando personalizado 'gui_createIssue' ao Cypress
Cypress.Commands.add('gui_createIssue', issue => {
    // Visita a página de criação de issues do projeto
    cy.visit(`/${Cypress.env('user_name')}/${issue.project.name}/issues/new`)
    
    // Digita o título da issue
    cy.get('.qa-issuable-form-title').type(issue.title)
    
    // Digita a descrição da issue
    cy.get('.qa-issuable-form-description').type(issue.description)
    
    // Clica no botão de submeter a issue
    cy.contains('Submit issue').click()
})

Cypress.Commands.add('gui_setLabelOnIssue', label => {
  cy.get('.qa-edit-link-labels').click()
  cy.contains(label.name).click()
  cy.get('body').click()
})

Cypress.Commands.add('gui_setMilestoneOnIssue', milestone => {
  cy.get('.block.milestone .edit-link').click()
  cy.contains(milestone.title).click()
})
