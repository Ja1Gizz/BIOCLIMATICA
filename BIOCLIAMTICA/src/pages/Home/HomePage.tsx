import { Link } from 'react-router'
import logoBioclimatica from '../../assets/Logo Bioclimatica.png'

export default function HomePage() {
  return (
    <div className="space-y-8 py-8">
      <section className="grid items-center gap-6 rounded-[28px] bg-[#fdfdfb] p-6 shadow-[0_18px_50px_rgba(17,24,39,0.12)] md:p-10 lg:grid-cols-[1.08fr_0.92fr]">
        <div>
          <h1 className="max-w-2xl text-4xl font-black leading-[1.08] text-[#17382a] md:text-5xl">Bioclimática: cuide melhor do seu cultivo.</h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-[#52677a] md:text-lg">Organize grupos de plantas, registre sensores e acompanhe as informações ambientais da sua lavoura em um só lugar.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/contato" className="rounded-full bg-[#1f7a4d] px-6 py-3 font-bold text-white shadow-sm transition hover:bg-[#17623e]">Fale com a equipe</Link>
            <Link to="/integrantes" className="rounded-full border border-[#cad7c1] bg-white px-6 py-3 font-bold text-[#17382a] transition hover:border-[#1f7a4d]">Conheça os integrantes</Link>
          </div>
        </div>
        <div className="flex items-center justify-center p-2">
          <div className="w-full text-center">
            <img
              src={logoBioclimatica}
              alt="Bioclimática"
              className="mx-auto h-48 w-full max-w-lg object-contain md:h-56 lg:h-64"
            />
            <p className="mx-auto -mt-3 max-w-md text-base leading-7 text-[#52677a]">
              Tecnologia para acompanhar o solo, organizar cultivos e cuidar melhor da lavoura.
            </p>
          </div>
        </div>
      </section>
      <section className="rounded-[28px] border border-[#dfe6d7] bg-[#fdfdfb] p-6 shadow-[0_18px_50px_rgba(17,24,39,0.08)] md:p-8">
        <h2 className="text-2xl font-black text-[#17382a] md:text-3xl">Por que usar a Bioclimática?</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {[
            ['sprout', 'Gestão de cultivo', 'Organize grupos por nome e tipo de plantio para acompanhar cada área da sua lavoura.'],
            ['sensor', 'Cadastro simplificado', 'Cadastre sensores e mantenha os dados principais associados ao seu usuário.'],
            ['drop', 'Decisão para o solo', 'Acompanhe as condições da lavoura e tenha informações para cuidar da água e da cultura com mais precisão.']
          ].map(([icon, title, text]) => (
            <article key={title} className="rounded-3xl border border-[#dfe6d7] bg-white p-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#dfeedd] text-[#17623e]" aria-hidden="true">
                {icon === 'sprout' && (
                  <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 21V10" /><path d="M12 14C8 14 5 12 5 8c4 0 7 2 7 6Z" /><path d="M12 11c0-4 3-6 7-6 0 4-3 6-7 6Z" />
                  </svg>
                )}
                {icon === 'sensor' && (
                  <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7.6 7.6a5 5 0 0 0 0 8.8" /><path d="M16.4 7.6a5 5 0 0 1 0 8.8" /><path d="M4.8 4.8a9 9 0 0 0 0 14.4" /><path d="M19.2 4.8a9 9 0 0 1 0 14.4" /><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
                  </svg>
                )}
                {icon === 'drop' && (
                  <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2.5S5.5 10.1 5.5 15a6.5 6.5 0 0 0 13 0C18.5 10.1 12 2.5 12 2.5Z" /><path d="M9 16a3 3 0 0 0 3 3" />
                  </svg>
                )}
              </span>
              <h2 className="mt-5 text-xl font-black text-[#17382a]">{title}</h2>
              <p className="mt-2 leading-6 text-[#5d7165]">{text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
