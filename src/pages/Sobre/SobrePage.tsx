export default function SobrePage() {
  return (
    <div className="py-8">
      <section className="rounded-[28px] bg-[#fdfdfb] px-5 py-7 shadow-[0_18px_50px_rgba(17,24,39,0.12)] md:px-8 md:py-8">
        <header className="rounded-3xl bg-[#e9f1df] p-6 md:p-9">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#1f7a4d]">Sobre</p>
          <h1 className="mt-2 text-3xl font-black md:text-5xl">Informação simples para agir na hora certa</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-[#4e6557]">A Bioclimática combina sensores IoT de umidade do solo com previsões meteorológicas locais. Assim, você entende o risco da lavoura antes que o clima cause perdas.</p>
        </header>
        <section className="mt-5 grid gap-5 md:grid-cols-3">
          {[
            ['Para quem é', 'Agricultores familiares e urbanos que precisam cuidar da umidade e de cada cultivo com confiança.'],
            ['Como a análise acontece', 'O sistema organiza os dados dos sensores e das informações climáticas para apoiar decisões sobre cada cultivo.'],
            ['Por que antecipar', 'Antecipar ações ajuda a proteger a lavoura antes de períodos de seca, chuva forte ou encharcamento.']
          ].map(([title, text]) => (
            <article key={title} className="rounded-3xl border border-[#dfe6d7] bg-white p-6">
              <h2 className="text-xl font-black">{title}</h2>
              <p className="mt-3 leading-7 text-[#5d7165]">{text}</p>
            </article>
          ))}
        </section>
      </section>
    </div>
  )
}
