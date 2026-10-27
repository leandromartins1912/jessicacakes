# Jéssica Cakes — site

Site estático (HTML + CSS + JS, sem build) pronto para publicar no **Render** como *Static Site*.

```
public/
  index.html      → a página
  css/style.css   → visual (cores no topo, em :root)
  js/main.js      → CONFIG do WhatsApp + bolo 3D
  img/            → coloque aqui as fotos (veja abaixo)
  favicon.svg, robots.txt
render.yaml       → configuração do Render
```

## 1. Antes de publicar: preencha

| O quê | Onde |
|---|---|
| Número do WhatsApp (só números, com 55 + DDD) | `public/js/main.js` → `CONFIG.whatsapp` |
| Número como aparece no site, ex. `(31) 99999-8888` | `public/js/main.js` → `CONFIG.whatsappExibido` |
| Fotos dos cartões | salve em `public/img/` com os nomes `bolos-decorados.jpg`, `doces-finos.jpg`, `casamentos.jpg` (formato quase quadrado, ~1200 px, até 300 KB) |
| Preços, antecedência, endereço e horário | procure por `[` no `public/index.html` |

Enquanto a foto não existir, o cartão mostra um aviso no lugar. Ao preencher o número, todos os botões de WhatsApp abrem a conversa com a mensagem pronta.

## 2. Publicar no Render

1. Crie um repositório no GitHub (ex.: `jessica-cakes-site`) e envie **o conteúdo desta pasta** (com `render.yaml` na raiz).
   - Sem usar git: no GitHub, *Add file → Upload files* e arraste tudo.
2. Em <https://dashboard.render.com>: **New → Blueprint** → conecte o GitHub → escolha o repositório → **Apply**.
   - Alternativa: **New → Static Site** → repositório → *Build Command* vazio → *Publish Directory* `public`.
3. Em ~1 minuto o site fica no ar em `https://jessica-cakes.onrender.com` (o nome pode variar).
4. A cada alteração enviada ao GitHub, o Render publica de novo sozinho.

## 3. Domínio próprio (jessicacakes.com.br)

1. Registre em <https://registro.br>.
2. No Render: serviço → **Settings → Custom Domains → Add** → `jessicacakes.com.br` e `www.jessicacakes.com.br`.
3. No registro.br, em *DNS → Editar zona*:
   - `jessicacakes.com.br` → registro **A** → `216.24.57.1`
   - `www` → registro **CNAME** → `jessica-cakes.onrender.com` (o endereço que o Render mostrar)
   - apague registros **AAAA**, se houver.
4. Volte ao Render e clique em **Verify**. O HTTPS (cadeado) é emitido automaticamente.

## 4. Depois de no ar

- Cadastre/atualize o **Perfil da Empresa no Google** (Google Maps) com o link do site.
- Coloque o link na bio do Instagram.
- Para a prévia bonita ao compartilhar no WhatsApp, salve uma foto em `public/img/capa.jpg` (1200×630) e descomente a linha `og:image` no `index.html`, trocando o domínio se for outro.
"# jessicacakes" 
