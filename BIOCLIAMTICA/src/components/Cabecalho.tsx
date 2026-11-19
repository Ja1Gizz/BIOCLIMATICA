import { NavLink, Link } from 'react-router'
import logoBioclimatica from '../assets/Logo Bioclimatica.png'

export default function Cabecalho() {
  const links = [
    { label: 'Início', to: '/' },
    { label: 'Integrantes', to: '/integrantes' },
    { label: 'Sobre', to: '/sobre' },
    { label: 'FAQ', to: '/faq' },
    { label: 'Contato', to: '/contato' }
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-[#dfe6d7] bg-[#f7f8f2]/95 px-4 backdrop-blur md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid min-h-16 grid-cols-[240px_1fr_240px] items-center gap-4">
          <Link to="/" className="flex shrink-0 items-center" aria-label="Bioclimática - início">
            <img
              src={logoBioclimatica}
              alt=""
              aria-hidden="true"
              className="h-12 w-[190px] object-contain object-left"
            />
          </Link>
          <nav aria-label="Navegação principal" className="hidden items-center justify-center gap-1 lg:flex">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-semibold transition ${isActive ? 'text-[#17623e]' : 'text-[#4b6257] hover:text-[#17623e]'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="hidden items-center justify-end gap-2 sm:flex">
            <Link
              to="/entrar"
              className="text-sm font-bold text-[#17382a] transition hover:text-[#17623e]"
            >
              Entrar
            </Link>
            <span className="text-[#cad7c1]" aria-hidden="true">|</span>
            <Link to="/cadastrar" className="text-sm font-bold text-[#17382a] transition hover:text-[#17623e]">
              Cadastrar
            </Link>
          </div>
        </div>
        <nav aria-label="Navegação móvel" className="flex gap-2 overflow-x-auto pb-3 lg:hidden">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={({ isActive }) => `shrink-0 px-3 py-2 text-xs font-bold ${isActive ? 'text-[#17623e]' : 'text-[#4b6257]'}`}>
              {link.label}
            </NavLink>
          ))}
          <Link to="/entrar" className="shrink-0 px-2 py-2 text-xs font-bold text-[#17382a] hover:text-[#17623e]">Entrar</Link>
          <Link to="/cadastrar" className="shrink-0 px-2 py-2 text-xs font-bold text-[#17382a] hover:text-[#17623e]">Cadastrar</Link>
        </nav>
      </div>
    </header>
  )
}