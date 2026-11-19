export default function ContatoPage() {
  const canais = [
    {
      titulo: 'E-mail',
      descricao: 'Envie sua dúvida ou solicitação por e-mail.',
      contato: 'joaoluizmo23@gmail.com',
      href: 'mailto:joaoluizmo23@gmail.com'
    },
    {
      titulo: 'WhatsApp',
      descricao: 'Fale com a equipe pelo WhatsApp.',
      contato: '(11) 93278-4516',
      href: 'https://wa.me/5511932784516'
    },
    {
      titulo: 'Teams',
      descricao: 'Entre em contato pelo Microsoft Teams.',
      contato: 'rm568747@fiap.com.br',
      href: 'mailto:rm568747@fiap.com.br'
    }
  ]

  return (
    <div className="py-8">
      <section className="rounded-[28px] bg-[#fdfdfb] px-5 py-7 shadow-[0_18px_50px_rgba(17,24,39,0.12)] md:px-8 md:py-8">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-[#1f7a4d]">Estamos à disposição</p>
        <h1 className="mt-3 text-4xl font-black text-[#152238] md:text-5xl">Entre em contato</h1>
        <p className="mt-3 text-base leading-7 text-[#4b6075] md:text-lg">
          Escolha o canal mais conveniente para falar com a equipe da Bioclimática.
        </p>

        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {canais.map((canal) => (
            <article
              key={canal.titulo}
              className="flex min-h-44 flex-col rounded-2xl border border-[#edf0f3] bg-white p-6 shadow-[0_8px_16px_rgba(31,45,61,0.08)]"
            >
              <h2 className="text-xl font-black text-[#172238]">{canal.titulo}</h2>
              <p className="mt-3 text-sm leading-6 text-[#52677a]">{canal.descricao}</p>
              <a
                href={canal.href}
                target={canal.titulo === 'WhatsApp' ? '_blank' : undefined}
                rel={canal.titulo === 'WhatsApp' ? 'noopener noreferrer' : undefined}
                className="mt-auto pt-5 text-base font-bold text-[#17623e] underline decoration-[#17623e] underline-offset-2"
              >
                {canal.contato}
              </a>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
