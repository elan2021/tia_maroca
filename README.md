# Tia Maroca — Next.js

Landing page da plataforma de atividades pedagógicas "Tia Maroca", construída em Next.js 14 (App Router) + TypeScript + Tailwind CSS, seguindo o design system em `DESIGN.md`.

## Rodando localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

## Estrutura

- `app/layout.tsx` — layout raiz, fontes (Plus Jakarta Sans / Be Vietnam Pro) e Material Symbols.
- `app/page.tsx` — monta a home a partir das seções.
- `app/globals.css` — utilitários customizados (cloud-shadow, rainbow-gradient, scribble-bg, etc).
- `components/` — Header, Hero, CategorySearch, ProductShowcase, ProductCard, Newsletter, Footer, BottomNav, Icon.
- `data/products.ts` — dados dos produtos e categorias (fácil de trocar por uma API/CMS depois).
- `tailwind.config.ts` — todos os tokens de cor, tipografia, radius e spacing do `DESIGN.md`.

## Notas

- As imagens usam URLs remotas (`lh3.googleusercontent.com`) via `next/image`; troque por assets próprios em produção.
- O ícone usa a fonte Material Symbols Outlined, carregada no `<head>`.
