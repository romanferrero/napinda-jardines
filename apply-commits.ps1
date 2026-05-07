<#
.SYNOPSIS
  Genera la historia de commits desde cero sobre el estado actual del proyecto.
  Pensado para ejecutar UNA SOLA VEZ desde PowerShell o Windows Terminal.

.DESCRIPTION
  - Borra la carpeta .git si existe (ignora errores de permisos).
  - Hace `git init` y configura usuario.
  - Stage + commit de los archivos en grupos lógicos.
  - Imprime el log al final.

.EXAMPLE
  # Desde PowerShell, parado en la carpeta del proyecto:
  PS> .\apply-commits.ps1

  # Si te dice "no se puede cargar archivo... ejecucion de scripts":
  PS> Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
  PS> .\apply-commits.ps1
#>

$ErrorActionPreference = 'Stop'

function Step-Commit {
    param(
        [string]$Message,
        [string[]]$Paths
    )
    foreach ($p in $Paths) {
        if (Test-Path $p) {
            & git -c core.autocrlf=false add -- $p 2>$null | Out-Null
        }
    }
    # ¿Hay algo staged?
    git diff --cached --quiet
    if ($LASTEXITCODE -ne 0) {
        git commit -m $Message --quiet
        $sha = (git rev-parse --short HEAD).Trim()
        Write-Host ("  {0}  {1}" -f $sha, $Message)
    }
}

# Ir a la carpeta del script
Set-Location -Path $PSScriptRoot

# Borrar .git previo si existe
if (Test-Path .git) {
    try {
        Remove-Item -Recurse -Force .git -ErrorAction Stop
    } catch {
        Write-Warning "No pude borrar .git automaticamente. Cerralo en VSCode/explorer y volve a correr."
        throw
    }
}

git init -b main | Out-Null
git config user.name 'Roman Ferrero'
git config user.email 'romaferrero@hotmail.com'
git config core.autocrlf false
git config core.eol lf

Write-Host "Generando historia de commits..."
Write-Host ""

Step-Commit "chore: configurar Vite + Tailwind v4 + Router + Framer Motion" `
    @('.gitignore','eslint.config.js','package.json','package-lock.json','vite.config.js','index.html','public/favicon.svg')

Step-Commit "feat(design): paleta organica, tipografias y tokens del sistema de diseno" `
    @('src/index.css')

Step-Commit "feat(data): centralizar contenido editable (sitio, servicios, valores)" `
    @('src/data/site.js','src/data/services.js','src/data/values.js')

Step-Commit "feat(ui): componentes base reutilizables" `
    @('src/components/ui/Container.jsx','src/components/ui/Button.jsx','src/components/ui/FadeIn.jsx',
      'src/components/ui/SectionTitle.jsx','src/components/ui/Logo.jsx','src/components/ui/Icon.jsx')

Step-Commit "feat(layout): Footer y SiteLayout con Outlet" `
    @('src/components/layout/Footer.jsx','src/layouts/SiteLayout.jsx')

Step-Commit "feat(hooks): useContactForm con validacion y useScrollToHash" `
    @('src/hooks/useContactForm.js','src/hooks/useScrollToHash.js')

Step-Commit "feat(sections): Hero a pantalla completa con animaciones de entrada" `
    @('src/sections/Hero.jsx')

Step-Commit "feat(sections): Nosotros con valores y banda de estadisticas" `
    @('src/sections/About.jsx')

Step-Commit "feat(sections): grid de servicios con iconos y puntos" `
    @('src/sections/Services.jsx')

Step-Commit "feat(sections): galeria masonry con albumes por proyecto y lightbox" `
    @('src/data/gallery.js','src/sections/Gallery.jsx')

Step-Commit "feat(sections): formulario de contacto validado y WhatsApp flotante" `
    @('src/sections/Contact.jsx','src/sections/WhatsAppFAB.jsx')

Step-Commit "feat(sections): equipo con duenas de la empresa" `
    @('src/data/team.js','src/sections/Team.jsx')

Step-Commit "feat(layout): Navbar con contraste segun scroll y hamburger mejorado" `
    @('src/components/layout/Navbar.jsx')

Step-Commit "feat: routing, HomePage que compone secciones y NotFoundPage" `
    @('src/App.jsx','src/main.jsx','src/App.css','src/pages/HomePage.jsx','src/pages/NotFoundPage.jsx')

Step-Commit "docs: README con stack, comandos y estructura + scripts de commits" `
    @('README.md','apply-commits.sh','apply-commits.ps1')

# Cualquier remanente
git add -A | Out-Null
git diff --cached --quiet
if ($LASTEXITCODE -ne 0) {
    Step-Commit "chore: incluir archivos remanentes del scaffold" @()
}

Write-Host ""
Write-Host "Historia generada:"
git log --oneline
