#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────
# apply-commits.sh
# Genera la historia de commits desde cero sobre el estado actual del
# proyecto. Pensado para ejecutar UNA SOLA VEZ desde Git Bash.
#
# Cómo correrlo:
#   1) Abri Git Bash en la carpeta del proyecto
#      (right-click en la carpeta -> "Git Bash here")
#   2) Ejecuta:
#        bash apply-commits.sh
#
# Si te pide eliminar .git previo, desde Git Bash hace:
#   rm -rf .git
# ─────────────────────────────────────────────────────────────────────
set -euo pipefail

[ -d .git ] && rm -rf .git

git init -b main >/dev/null
git config user.name "Roman Ferrero"
git config user.email "romaferrero@hotmail.com"

c() { git add "$@" 2>/dev/null || true; }
done_commit() {
  git commit -m "$1" >/dev/null && echo "  $(git rev-parse --short HEAD)  $1"
}

echo "Generando historia de commits..."
echo ""

# 1. Scaffold + tooling
c .gitignore eslint.config.js package.json package-lock.json vite.config.js index.html public/favicon.svg
done_commit "chore: configurar Vite + Tailwind v4 + Router + Framer Motion"

# 2. Sistema de diseno
c src/index.css
done_commit "feat(design): paleta organica, tipografias y tokens del sistema de diseno"

# 3. Capa de datos
c src/data/site.js src/data/services.js src/data/values.js
done_commit "feat(data): centralizar contenido editable (sitio, servicios, valores)"

# 4. UI components
c src/components/ui/Container.jsx src/components/ui/Button.jsx src/components/ui/FadeIn.jsx \
  src/components/ui/SectionTitle.jsx src/components/ui/Logo.jsx src/components/ui/Icon.jsx
done_commit "feat(ui): componentes base reutilizables (Container, Button, FadeIn, SectionTitle, Logo, Icon)"

# 5. Layout (version inicial sin contraste de navbar)
c src/components/layout/Footer.jsx src/layouts/SiteLayout.jsx
done_commit "feat(layout): Footer y SiteLayout con Outlet"

# 6. Hooks
c src/hooks/useContactForm.js src/hooks/useScrollToHash.js
done_commit "feat(hooks): useContactForm con validacion y useScrollToHash"

# 7. Hero
c src/sections/Hero.jsx
done_commit "feat(sections): Hero a pantalla completa con animaciones de entrada"

# 8. Nosotros
c src/sections/About.jsx
done_commit "feat(sections): Nosotros con valores y banda de estadisticas"

# 9. Servicios
c src/sections/Services.jsx
done_commit "feat(sections): grid de servicios con iconos y puntos"

# 10. Galeria con albumes
c src/data/gallery.js src/sections/Gallery.jsx
done_commit "feat(sections): galeria masonry con albumes por proyecto y lightbox navegable"

# 11. Contacto + WhatsApp FAB
c src/sections/Contact.jsx src/sections/WhatsAppFAB.jsx
done_commit "feat(sections): formulario de contacto validado y WhatsApp flotante"

# 12. Equipo / duenas
c src/data/team.js src/sections/Team.jsx
done_commit "feat(sections): equipo con duenas de la empresa"

# 13. Navbar con contraste segun scroll
c src/components/layout/Navbar.jsx
done_commit "feat(layout): Navbar con links y logo claros sobre Hero, oscuros al scrollear"

# 14. Routing y pages
c src/App.jsx src/main.jsx src/App.css src/pages/HomePage.jsx src/pages/NotFoundPage.jsx
done_commit "feat: routing con react-router, HomePage que compone todas las secciones y NotFoundPage"

# 15. Docs
c README.md apply-commits.sh
done_commit "docs: README con stack, comandos y estructura + script de commits"

# 16. Cualquier remanente (assets viejos del scaffold que no se usan)
git add -A
if ! git diff --cached --quiet; then
  done_commit "chore: incluir archivos remanentes del scaffold"
fi

echo ""
echo "Historia generada:"
git log --oneline
