import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import {
  createGrupo,
  createSensor,
  associateSensorToGrupo,
  deleteGrupo,
  deleteSensor,
  getUsuario,
  listGrupos,
  listSensores,
  updateGrupo,
  updateSensor,
  type Grupo,
  type Sensor,
  type Usuario,
  getCurrentUserId
} from '../../services/bioclimaticaApi'

export default function SensoresPage() {
  const navigate = useNavigate()
  const [grupos, setGrupos] = useState<Grupo[]>([])
  const [sensores, setSensores] = useState<Sensor[]>([])
  const [nome, setNome] = useState('')
  const [tipo, setTipo] = useState('')
  const [cdSensor, setCdSensor] = useState('')
  const [tipoSensor, setTipoSensor] = useState('')
  const [tipoSafra, setTipoSafra] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingSensorId, setEditingSensorId] = useState<number | null>(null)
  const [selectedGroups, setSelectedGroups] = useState<Record<number, string>>({})
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [userId] = useState(() => getCurrentUserId())
  const [usuario, setUsuario] = useState<Usuario | null>(null)

  const reload = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const [nextUsuario, nextGrupos, nextSensores] = await Promise.all([
        getUsuario(userId),
        listGrupos(userId),
        listSensores(userId)
      ])
      setUsuario(nextUsuario)
      setGrupos(nextGrupos)
      setSensores(nextSensores)
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Não foi possível carregar os dados da API.')
    } finally {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    if (!getCurrentUserId()) return
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void reload()
  }, [reload])

  async function saveGrupo(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setSuccess('')
    if (!nome.trim() || !tipo.trim()) {
      setError('Preencha o nome e o tipo de cultivo do grupo.')
      return
    }
    setLoading(true)
    try {
      if (editingId) await updateGrupo(editingId, nome.trim(), tipo.trim())
      else await createGrupo(nome.trim(), tipo.trim())
      setSuccess(editingId ? 'Grupo atualizado com sucesso.' : 'Grupo cadastrado com sucesso.')
      setNome('')
      setTipo('')
      setEditingId(null)
      await reload()
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Não foi possível salvar o grupo.')
    } finally {
      setLoading(false)
    }
  }

  async function saveSensor(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setSuccess('')
    if (!cdSensor.trim() || !tipoSensor.trim() || !tipoSafra.trim()) {
      setError('Preencha o código, o tipo do sensor e o tipo de safra.')
      return
    }
    setLoading(true)
    try {
      if (editingSensorId !== null) {
        await updateSensor(editingSensorId, cdSensor.trim(), tipoSensor.trim(), tipoSafra.trim())
      } else {
        await createSensor(cdSensor.trim(), tipoSensor.trim(), tipoSafra.trim())
      }
      setSuccess(editingSensorId !== null ? 'Sensor atualizado com sucesso.' : 'Sensor registrado com sucesso.')
      setCdSensor('')
      setTipoSensor('')
      setTipoSafra('')
      setEditingSensorId(null)
      await reload()
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Não foi possível cadastrar o sensor.')
    } finally {
      setLoading(false)
    }
  }

  function editGrupo(grupo: Grupo) {
    setEditingId(grupo.idGrupo)
    setNome(grupo.nome)
    setTipo(grupo.tipo)
  }

  function editSensor(sensor: Sensor) {
    setEditingSensorId(sensor.idSensor)
    setCdSensor(sensor.cdSensor)
    setTipoSensor(sensor.tipoSensor)
    setTipoSafra(sensor.tipoSafra)
    setError('')
    setSuccess('')
    document.getElementById('registrar-sensor')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  async function associateSensor(sensor: Sensor) {
    const idGrupo = Number(selectedGroups[sensor.idSensor])
    if (!Number.isInteger(idGrupo) || idGrupo <= 0) {
      setError('Selecione um grupo válido para associar ao sensor.')
      return
    }

    setError('')
    setSuccess('')
    setLoading(true)
    try {
      await associateSensorToGrupo(sensor.idSensor, idGrupo)
      setSuccess('Sensor associado ao grupo com sucesso.')
      await reload()
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Não foi possível associar o sensor ao grupo.')
      setLoading(false)
    }
  }

  async function removeGrupo(idGrupo: number) {
    setError('')
    setSuccess('')
    setLoading(true)
    try {
      await deleteGrupo(idGrupo)
      setSuccess('Grupo excluído com sucesso.')
      await reload()
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Não foi possível excluir o grupo.')
      setLoading(false)
    }
  }

  async function removeSensor(idSensor: number) {
    setError('')
    setSuccess('')
    setLoading(true)
    try {
      await deleteSensor(idSensor)
      setSuccess('Sensor excluído com sucesso.')
      await reload()
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Não foi possível excluir o sensor.')
      setLoading(false)
    }
  }

  function logout() {
    localStorage.removeItem('bioclimatica-user-id')
    navigate('/entrar', { replace: true })
  }

  if (!userId) {
    return (
      <div className="flex min-h-[calc(100vh-190px)] items-center justify-center py-8">
        <section className="w-full max-w-md rounded-[28px] bg-[#fdfdfb] px-6 py-8 text-center shadow-[0_18px_50px_rgba(17,24,39,0.12)] md:px-8">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#1f7a4d]">Acesso ao sensor</p>
          <h1 className="mt-3 text-3xl font-black text-[#17382a]">Informe seu ID de usuário</h1>
          <p className="mt-3 leading-7 text-[#52677a]">
            Entre com um usuário já cadastrado ou crie seu cadastro para acessar e administrar seus sensores.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Link to="/entrar" className="rounded-xl border border-[#1f7a4d] px-4 py-3 font-bold text-[#17623e]">
              Entrar
            </Link>
            <Link to="/cadastrar" className="rounded-xl bg-[#1f7a4d] px-4 py-3 font-bold text-white">
              Criar cadastro
            </Link>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="space-y-6 py-8">
      <header className="flex flex-wrap items-end justify-between gap-5 rounded-3xl border border-[#dfe6d7] bg-[#fdfdfb] p-6 shadow-[0_8px_24px_rgba(17,24,39,0.07)] md:p-8">
        <div>
          <p className="text-lg font-black text-[#17382a]">
            {usuario ? `Bem-vindo, ${usuario.nome}!` : loading ? 'Carregando seu perfil...' : 'Bem-vindo!'}
          </p>
          <h1 className="mt-2 text-3xl font-black text-[#17382a] md:text-5xl">Sensores e cultivos</h1>
          <p className="mt-3 max-w-2xl leading-7 text-[#5d7165]">Seu ID é <strong>{userId}</strong>, guarde com cuidado!</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={logout} className="shrink-0 rounded-full border border-[#cad7c1] bg-white px-5 py-3 text-sm font-bold text-[#17382a]">
            Sair
          </button>
        </div>
      </header>

      {error && <div role="alert" className="rounded-2xl border border-[#e9aaa6] bg-[#fde8e7] p-4 text-sm font-semibold text-[#8f2923]">{error}</div>}
      {success && <div role="status" className="rounded-2xl border border-[#b9d9b7] bg-[#e8f4e7] p-4 text-sm font-semibold text-[#17623e]">{success}</div>}

      <div className="grid gap-6 lg:grid-cols-2">
        <form onSubmit={saveGrupo} noValidate className="space-y-4 rounded-3xl border border-[#dfe6d7] bg-white p-6">
          <h2 className="text-xl font-black">{editingId ? 'Editar grupo' : 'Novo grupo de cultura'}</h2>
          <label className="block text-sm font-bold" htmlFor="nome">Nome do grupo</label>
          <input id="nome" value={nome} onChange={(event) => setNome(event.target.value)} className="w-full rounded-xl border border-[#cad7c1] px-3 py-3" />
          <label className="block text-sm font-bold" htmlFor="tipo">Cultivo</label>
          <input id="tipo" value={tipo} onChange={(event) => setTipo(event.target.value)} className="w-full rounded-xl border border-[#cad7c1] px-3 py-3" />
          <div className="flex gap-3">
            <button type="submit" disabled={loading} className="flex-1 rounded-xl bg-[#1f7a4d] px-4 py-3 font-bold text-white disabled:opacity-60">
              {loading ? 'Processando...' : editingId ? 'Atualizar grupo' : 'Cadastrar grupo'}
            </button>
            {editingId && (
              <button type="button" onClick={() => { setEditingId(null); setNome(''); setTipo('') }} className="rounded-xl border border-[#cad7c1] px-4 py-3 font-bold">Cancelar</button>
            )}
          </div>
        </form>

        <form id="registrar-sensor" onSubmit={saveSensor} noValidate className="scroll-mt-28 space-y-4 rounded-3xl border border-[#dfe6d7] bg-white p-6">
          <h2 className="text-xl font-black">{editingSensorId !== null ? 'Editar sensor' : 'Registrar sensor'}</h2>
          <label className="block text-sm font-bold" htmlFor="cdSensor">Código do sensor</label>
          <input id="cdSensor" value={cdSensor} onChange={(event) => setCdSensor(event.target.value)} className="w-full rounded-xl border border-[#cad7c1] px-3 py-3" />
          <label className="block text-sm font-bold" htmlFor="tipoSensor">Tipo do sensor</label>
          <input id="tipoSensor" value={tipoSensor} onChange={(event) => setTipoSensor(event.target.value)} className="w-full rounded-xl border border-[#cad7c1] px-3 py-3" />
          <label className="block text-sm font-bold" htmlFor="tipoSafra">Tipo de safra</label>
          <input id="tipoSafra" value={tipoSafra} onChange={(event) => setTipoSafra(event.target.value)} className="w-full rounded-xl border border-[#cad7c1] px-3 py-3" />
          <button type="submit" disabled={loading} className="w-full rounded-xl bg-[#17382a] px-4 py-3 font-bold text-white disabled:opacity-60">
            {loading ? 'Processando...' : editingSensorId !== null ? 'Atualizar sensor' : 'Registrar sensor'}
          </button>
          {editingSensorId !== null && (
            <button type="button" onClick={() => { setEditingSensorId(null); setCdSensor(''); setTipoSensor(''); setTipoSafra('') }} className="w-full rounded-xl border border-[#cad7c1] px-4 py-3 font-bold">
              Cancelar edição
            </button>
          )}
        </form>
      </div>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-[#dfe6d7] bg-white p-6">
          <h2 className="text-xl font-black">Grupos cadastrados</h2>
          {grupos.length === 0 ? <p className="mt-4 text-sm text-[#5d7165]">{loading ? 'Carregando...' : 'Nenhum grupo cadastrado.'}</p> : (
            <div className="mt-4 space-y-3">
              {grupos.map((grupo) => (
                <article key={grupo.idGrupo} className="flex items-center justify-between gap-3 rounded-2xl bg-[#f7f8f2] p-4">
                  <div><p className="font-black">{grupo.nome}</p><p className="text-sm text-[#5d7165]">{grupo.tipo}</p></div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => editGrupo(grupo)} className="rounded-lg border border-[#cad7c1] px-3 py-2 text-sm font-bold">Editar</button>
                    <button type="button" onClick={() => void removeGrupo(grupo.idGrupo)} disabled={loading} className="rounded-lg border border-[#e9aaa6] px-3 py-2 text-sm font-bold text-[#8f2923] disabled:opacity-60">Excluir</button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-[#dfe6d7] bg-white p-6">
          <h2 className="text-xl font-black">Sensores cadastrados</h2>
          {sensores.length === 0 ? <p className="mt-4 text-sm text-[#5d7165]">{loading ? 'Carregando...' : 'Nenhum sensor cadastrado.'}</p> : (
            <div className="mt-4 space-y-3">
              {sensores.map((sensor, index) => {
                const grupo = grupos.find((item) => item.idGrupo === sensor.idGrupo)
                return (
                  <article key={sensor.idSensor ?? index} className="rounded-2xl bg-[#edf2e8] p-4">
                    <dl className="grid gap-1 text-sm">
                      <div><dt className="inline font-bold">Código: </dt><dd className="inline break-all">{sensor.cdSensor}</dd></div>
                      <div><dt className="inline font-bold">Tipo: </dt><dd className="inline">{sensor.tipoSensor}</dd></div>
                      <div><dt className="inline font-bold">Safra: </dt><dd className="inline">{sensor.tipoSafra}</dd></div>
                      <div><dt className="inline font-bold">Grupo: </dt><dd className="inline">{grupo?.nome || (sensor.idGrupo === null ? 'Sem grupo' : `ID ${sensor.idGrupo}`)}</dd></div>
                    </dl>
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <button type="button" onClick={() => editSensor(sensor)} disabled={loading} className="rounded-lg border border-[#cad7c1] px-3 py-2 text-sm font-bold disabled:opacity-60">Editar</button>
                      <button type="button" onClick={() => void removeSensor(sensor.idSensor)} disabled={loading} className="rounded-lg border border-[#e9aaa6] px-3 py-2 text-sm font-bold text-[#8f2923] disabled:opacity-60">Excluir</button>
                      <select
                        aria-label={`Grupo do sensor ${sensor.cdSensor}`}
                        value={selectedGroups[sensor.idSensor] ?? (sensor.idGrupo === null ? '' : String(sensor.idGrupo))}
                        onChange={(event) => setSelectedGroups((current) => ({ ...current, [sensor.idSensor]: event.target.value }))}
                        className="min-w-0 flex-1 rounded-lg border border-[#cad7c1] bg-white px-3 py-2 text-sm"
                      >
                        <option value="">Selecione um grupo</option>
                        {grupos.map((item) => <option key={item.idGrupo} value={item.idGrupo}>{item.nome}</option>)}
                      </select>
                      <button type="button" onClick={() => void associateSensor(sensor)} disabled={loading || grupos.length === 0} className="rounded-lg bg-[#1f7a4d] px-3 py-2 text-sm font-bold text-white disabled:opacity-60">Associar</button>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
