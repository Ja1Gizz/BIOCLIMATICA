import { teamMembers } from '../../data/teamMembers'

export default function IntegrantesPage() {
  return (
    <div className="py-8">
      <section className="rounded-[28px] bg-[#fdfdfb] px-5 py-7 shadow-[0_18px_50px_rgba(17,24,39,0.12)] md:px-8 md:py-8">
        <header className="text-center">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#1f7a4d]">Quem somos</p>
          <h1 className="mt-3 text-4xl font-black text-[#152238] md:text-5xl">Conheça os integrantes</h1>
          <p className="mt-3 text-base text-[#52677a]">A equipe por trás da Bioclimática.</p>
        </header>

        <section className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <article
              key={member.slug}
              className="overflow-hidden rounded-2xl border border-[#edf0f3] bg-white shadow-[0_8px_16px_rgba(31,45,61,0.08)]"
            >
              <div className="p-4 pb-3">
                <img
                  src={member.photo}
                  alt={`Foto de ${member.name}`}
                  className="aspect-[3/4] w-full rounded-xl object-cover"
                />
              </div>
              <div className="m-4 mt-1 rounded-xl bg-[#1f7a4d] p-4 text-white">
                <h2 className="text-base font-black">{member.name}</h2>
                <p className="mt-1 text-sm font-bold">{member.rm}</p>
                <div className="mt-4 flex gap-4 text-sm font-bold">
                  <a href={member.github} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                    GitHub
                  </a>
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                    LinkedIn
                  </a>
                </div>
              </div>
            </article>
          ))}
        </section>
      </section>
    </div>
  )
}
