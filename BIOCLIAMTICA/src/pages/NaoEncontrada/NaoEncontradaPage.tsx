import { useNavigate } from 'react-router'

export default function NaoEncontradaPage() {
  const navegar = useNavigate()

  return (
    <section className="mx-auto my-8 max-w-2xl space-y-5 rounded-3xl border border-[#dfe6d7] bg-white p-8 text-center shadow-sm">
      <p className="text-sm font-black uppercase tracking-[0.2em] text-[#1f7a4d]">Erro 404</p>
      <h1 className="text-3xl font-black">Página não encontrada</h1>
      <p className="text-[#5d7165]">Confira o endereço ou volte para a página inicial.</p>
      <button
        className="rounded-full bg-[#1f7a4d] px-5 py-3 font-bold text-white"
        type="button"
        onClick={() => navegar('/', { replace: true })}
      >
        Ir para o início
      </button>
    </section>
  )
}
