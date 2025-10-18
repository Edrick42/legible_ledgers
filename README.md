# Legible Ledgers — Starter

Projeto inicial com HTML, CSS e JS. Contém um layout de hero inspirado no anexo e a paleta de cores/tipografia solicitada.

Estrutura:
- `index.html` — página principal com header e hero
- `css/styles.css` — variáveis de cor, tokens e estilos responsivos
- `js/script.js` — pequenos scripts (smooth scroll, focus-visible)

Design tokens:
- Fonte de destaque: Platypi (display). Não está incluída por licença — adicione via seu provedor de webfonts ou localmente (veja abaixo).
- Fonte de texto: Lexend (carregada via Google Fonts).
- Cores primárias: Joyful Yellow (#FFDA03, #FFE885, #FFF6D2), Pure White (#FFFFFF, #F4F4F4), Almost Black (#1A1A1A, #333333).
- Cores secundárias (uso com cautela): Confident Blue, Witty Green, Warm Red.

Como usar/preview local:
1. Abra o projeto em um servidor estático (recomendado) — por ex. com Python:

```bash
# macOS / zsh
python3 -m http.server 8000
```

2. Abra `http://localhost:8000` no navegador.

Adicionar a fonte Platypi:
- Se você tiver arquivos de fonte (.woff / .woff2), coloque-os em `fonts/` e adicione @font-face em `css/styles.css` apontando para os arquivos.
- Ou use um provedor de webfonts — substitua a variável `--font-display` no CSS para apontar para a família carregada.

Próximos passos (sugeridos):
- Ajustar a tipografia com Platypi real (peso e espaçamento) — Platypi é essencial para o visual de destaque.
- Substituir o quadrado de ilustração por SVG ou imagem real e adicionar imagens responsivas.
- Refinar responsividade, otimizar para impressão e adicionar outras seções.
# legible_ledgers
