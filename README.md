AVISO: As informações estão desatualizadas e irão ser arrumados!

# CS2 Discord Bot - Projeto Web

Este repositório contém a parte Web do bot Pablo: com o **Inspect Redirector** e **Web Roulette**, ambos desenvolvidos para complementar as funcionalidade do bot de Discord que é voltado ao jogo Counter-Strike 2 (CS2).

## Estrutura do Projeto

O projeto está organizado em duas pastas principais:

1. **inspectRedirector/**: Responsável por redirecionar links do Discord para o jogo CS2.
2. **webRoulette/**: Simulador de roleta para abrir caixas do CS2.

---

## Inspect Redirector

### Objetivo
O **Inspect Redirector** resolve uma limitação do Discord, que não permite abrir links com o protocolo `steam:` diretamente. Ele redireciona esses links para o jogo CS2, permitindo que os usuários inspecionem itens.

### Estrutura
- **`inspect.html`**: Página principal que orienta o usuário a abrir o link no Steam.
- **`explanation.html`**: Explica por que o redirecionamento é necessário.
- **`script.js`**: Script que redireciona automaticamente para o link do Steam.
- **`style.css`**: Estilização das páginas HTML.
- **`assets/alert.png`**: Imagem de alerta exibida na página.

### Como Funciona
1. O usuário acessa o link gerado pelo bot do Discord.
2. O **Inspect Redirector** redireciona automaticamente para o protocolo `steam:`, abrindo o jogo CS2.

---

## Web Roulette

### Objetivo
O **Web Roulette** é um simulador de roleta que permite aos usuários abrir caixas do CS2 de forma interativa.

### Estrutura
- **`roulette.html`**: Página principal do simulador de roleta.
- **`error.html`**: Página de erro exibida caso o ID fornecido seja inválido ou tenha expirado.
- **`script.js`**: Script que gerencia a lógica da roleta e a interação com a API.
- **`style.css`**: Estilização das páginas HTML.
- **`assets/trash.svg`**: Ícone utilizado na interface.

### Como Funciona
1. O usuário acessa a página com um ID específico.
2. A página consome uma API para buscar informações sobre a caixa e os itens.
3. O usuário clica no botão "Abrir Caixa" para iniciar a roleta.
4. Após o sorteio, o item obtido é exibido em um modal.
5. O item é deletado da base de dados após ser aberto.