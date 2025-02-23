// Importa a função defineConfig do Cypress
const { defineConfig } = require('cypress')

// Exporta a configuração do Cypress usando a função defineConfig
module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost', // Define a URL base para os testes end-to-end
    env: {
      hideCredentials:true,
      requestMode: true,
    
    },
    experimentalRunAllSpecs: true, // Ativa a execução de todos os arquivos de teste
  },
  fixturesFolder: false, // Desativa o uso da pasta fixtures
  video: false, // Desativa a gravação de vídeo dos testes
})
