import { Link } from 'react-router'

const questions = [
  ['O que é o projeto Bioclimática?', 'É uma iniciativa voltada a apoiar o acompanhamento de cultivos e o uso consciente da água na agricultura.'],
  ['Qual problema o projeto busca enfrentar?', 'A Bioclimática busca ajudar agricultores a acompanhar melhor as condições do cultivo e a tomar decisões que reduzam desperdícios e perdas na lavoura.'],
  ['Para quem o projeto foi pensado?', 'O projeto foi pensado especialmente para agricultores familiares e pessoas que cultivam em espaços urbanos.'],
  ['Como a Bioclimática ajuda a organizar os cultivos?', 'Ela permite separar os cultivos em grupos e manter os sensores associados a cada grupo, facilitando o acompanhamento de diferentes áreas e plantações.'],
  ['Qual é o papel dos sensores no projeto?', 'Os sensores são parte da proposta de acompanhar as condições do solo e fornecer informações úteis para o cuidado com cada cultivo.'],
  ['A Bioclimática substitui a experiência do agricultor?', 'Não. O projeto é uma ferramenta de apoio: as informações ajudam no acompanhamento, mas as decisões continuam considerando a experiência de quem cultiva.']
]

export default function FAQPage() {
  return (
    <div className="py-8">
      <section className="rounded-[28px] bg-[#fdfdfb] px-5 py-7 shadow-[0_18px_50px_rgba(17,24,39,0.12)] md:px-8 md:py-8">
        <header>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#1f7a4d]">Central de ajuda</p>
          <h1 className="mt-3 text-4xl font-black text-[#17382a] md:text-5xl">Perguntas frequentes</h1>
          <p className="mt-3 text-base leading-7 text-[#52677a] md:text-lg">
            Informações rápidas para aproveitar melhor os recursos da Bioclimática.
          </p>
        </header>

        <section className="mt-7 space-y-3">
          {questions.map(([question, answer]) => (
            <details
              key={question}
              className="group rounded-2xl border border-[#edf0f3] bg-white p-5 shadow-[0_5px_14px_rgba(31,45,61,0.06)]"
            >
              <summary className="cursor-pointer list-none font-black text-[#17382a]">
                {question}
                <span className="float-right text-xl text-[#1f7a4d] transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 leading-7 text-[#52677a]">{answer}</p>
            </details>
          ))}
        </section>

        <div className="mt-7 flex flex-col gap-4 rounded-2xl bg-[#edf2e8] px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-bold text-[#17382a]">Ainda precisa de ajuda? Estamos à disposição.</p>
          <Link
            to="/contato"
            className="rounded-full bg-[#1f7a4d] px-6 py-3 text-center text-sm font-bold text-white shadow-sm transition hover:bg-[#17623e]"
          >
            Fale com a equipe
          </Link>
        </div>
      </section>
    </div>
  )
}
