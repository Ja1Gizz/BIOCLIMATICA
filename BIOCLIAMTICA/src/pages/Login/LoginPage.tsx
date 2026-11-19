import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { ApiError, createUsuario, getUsuario } from '../../services/bioclimaticaApi'

const CADASTRO_INICIAL = {
  nome: '',
  email: '',
  senha: '',
  telefone: '',
  rua: '',
  bairro: '',
  cidade: '',
  estado: '',
  latitude: '',
  longitude: ''
}

const CAMPOS_CADASTRO: Array<[keyof typeof CADASTRO_INICIAL, string]> = [
  ['nome', 'Nome'],
  ['email', 'E-mail'],
  ['senha', 'Senha'],
  ['telefone', 'Telefone'],
  ['rua', 'Rua'],
  ['bairro', 'Bairro'],
  ['cidade', 'Cidade'],
  ['estado', 'Estado']
]

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [userId, setUserId] = useState(() => localStorage.getItem('bioclimatica-user-id')?.trim() || '')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const mode: 'entrar' | 'cadastrar' = location.pathname === '/cadastrar' ? 'cadastrar' : 'entrar'
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [cadastro, setCadastro] = useState(CADASTRO_INICIAL)

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    const id = userId.trim()
    if (!/^\d+$/.test(id)) {
      setError('Informe um ID numérico válido.')
      return
    }
    setLoading(true)
    try {
      await getUsuario(id)
      localStorage.setItem('bioclimatica-user-id', id)
      navigate('/sensores', { replace: true })
    } catch (caught) {
      if (caught instanceof ApiError && caught.status === 404) {
        setError('Usuário não encontrado. Verifique o ID informado.')
      } else if (caught instanceof ApiError && caught.status === 409) {
        setError(caught.message)
      } else if (caught instanceof ApiError) {
        setError(caught.message || 'Não foi possível validar o usuário.')
      } else {
        setError('Não foi possível conectar à API Java.')
      }
    } finally {
      setLoading(false)
    }
  }

  async function cadastrar(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    const nextErrors: Record<string, string> = {}

    if (!cadastro.nome.trim()) nextErrors.nome = 'Informe o nome.'
    if (!cadastro.email.trim()) nextErrors.email = 'Informe o e-mail.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cadastro.email.trim())) nextErrors.email = 'Informe um e-mail válido.'
    if (!cadastro.senha) nextErrors.senha = 'Informe uma senha.'
    if (!cadastro.telefone.trim()) nextErrors.telefone = 'Informe o telefone.'
    else if (cadastro.telefone.length > 11) nextErrors.telefone = 'O telefone deve ter no máximo 11 números.'
    if (!cadastro.rua.trim()) nextErrors.rua = 'Informe a rua.'
    if (!cadastro.bairro.trim()) nextErrors.bairro = 'Informe o bairro.'
    if (!cadastro.cidade.trim()) nextErrors.cidade = 'Informe a cidade.'
    if (!cadastro.estado.trim()) nextErrors.estado = 'Informe o estado.'

    const latitude = Number(cadastro.latitude)
    const longitude = Number(cadastro.longitude)
    if (!cadastro.latitude.trim()) nextErrors.latitude = 'Informe a latitude.'
    else if (!Number.isFinite(latitude) || latitude < -90 || latitude > 90) nextErrors.latitude = 'Use um valor entre -90 e 90.'
    if (!cadastro.longitude.trim()) nextErrors.longitude = 'Informe a longitude.'
    else if (!Number.isFinite(longitude) || longitude < -180 || longitude > 180) nextErrors.longitude = 'Use um valor entre -180 e 180.'

    setFieldErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setError('Confira os campos destacados antes de concluir o cadastro.')
      return
    }

    setLoading(true)
    try {
      const usuario = await createUsuario({
        nome: cadastro.nome.trim(),
        email: cadastro.email.trim(),
        senha: cadastro.senha,
        telefone: cadastro.telefone.trim(),
        rua: cadastro.rua.trim(),
        bairro: cadastro.bairro.trim(),
        cidade: cadastro.cidade.trim(),
        estado: cadastro.estado.trim(),
        latitude,
        longitude
      })

      localStorage.setItem('bioclimatica-user-id', String(usuario.idUsuario))
      navigate('/sensores', { replace: true })
    } catch (caught) {
      if (caught instanceof ApiError) setError(caught.message || 'Não foi possível cadastrar o usuário.')
      else setError(caught instanceof Error ? caught.message : 'Não foi possível concluir o cadastro.')
    } finally {
      setLoading(false)
    }
  }

  function mudarCampo(campo: keyof typeof cadastro, valor: string) {
    let valorLimpo = valor

    if (campo === 'telefone') {
      valorLimpo = valor.replace(/\D/g, '').slice(0, 11)
    } else if (campo === 'latitude' || campo === 'longitude') {
      valorLimpo = valor
        .replace(',', '.')
        .replace(/[^\d.-]/g, '')
      if ((valorLimpo.match(/-/g)?.length || 0) > 1) {
        valorLimpo = valorLimpo.replace(/(?!^)-/g, '')
      }
      const partes = valorLimpo.split('.')
      if (partes.length > 2) valorLimpo = `${partes[0]}.${partes.slice(1).join('')}`
    }

    setCadastro((atual) => ({ ...atual, [campo]: valorLimpo }))
    setFieldErrors((atuais) => {
      if (!atuais[campo]) return atuais
      const next = { ...atuais }
      delete next[campo]
      return next
    })
    if (error) setError('')
  }

  function pularCadastro() {
    localStorage.setItem('bioclimatica-user-id', '22')
    navigate('/sensores', { replace: true })
  }

  return (
    <div className="flex min-h-[calc(100vh-190px)] items-center justify-center py-8">
      <section className={`w-full rounded-[28px] bg-[#fdfdfb] px-6 py-8 shadow-[0_18px_50px_rgba(17,24,39,0.12)] md:px-8 ${mode === 'cadastrar' ? 'max-w-3xl' : 'max-w-md'}`}>
        <p className="text-xs font-black uppercase tracking-[0.28em] text-[#1f7a4d]">Acesso aos sensores</p>
        <h1 className="mt-3 text-4xl font-black text-[#17382a]">{mode === 'entrar' ? 'Usar meu ID' : 'Cadastrar usuário'}</h1>

        {mode === 'entrar' ? (
        <form onSubmit={submit} noValidate className="mt-6">
          <label htmlFor="sensor-user-id" className="block text-sm font-bold text-[#17382a]">
            ID do usuário
          </label>
          <input
            id="sensor-user-id"
            type="text"
            inputMode="numeric"
            value={userId}
            onChange={(event) => setUserId(event.target.value.replace(/\D/g, '').slice(0, 10))}
            className="mt-2 w-full rounded-xl border border-[#cad7c1] bg-white px-4 py-3 outline-none focus:border-[#1f7a4d]"
          />
          {error && (
            <p role="alert" className="mt-3 rounded-xl border border-[#e9aaa6] bg-[#fde8e7] px-4 py-3 text-sm font-semibold text-[#8f2923]">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={!userId.trim() || loading}
            className="mt-5 w-full rounded-xl bg-[#1f7a4d] px-4 py-3 font-bold text-white disabled:opacity-60"
          >
            {loading ? 'Validando...' : 'Acessar meus sensores'}
          </button>
        </form>
        ) : (
        <form onSubmit={cadastrar} noValidate className="mt-6">
          <div className="grid gap-4 md:grid-cols-2">
            {CAMPOS_CADASTRO.map(([campo, label]) => (
              <label key={campo} className="block text-sm font-bold text-[#17382a]" htmlFor={`cadastro-${campo}`}>
                {label}
                <input
                  id={`cadastro-${campo}`}
                  type={campo === 'senha' ? 'password' : campo === 'email' ? 'email' : 'text'}
                  inputMode={campo === 'telefone' ? 'numeric' : campo === 'email' ? 'email' : 'text'}
                  required
                  maxLength={campo === 'telefone' ? 11 : undefined}
                  aria-invalid={Boolean(fieldErrors[campo])}
                  aria-describedby={fieldErrors[campo] ? `erro-${campo}` : undefined}
                  value={cadastro[campo as keyof typeof cadastro]}
                  onChange={(event) => mudarCampo(campo as keyof typeof cadastro, event.target.value)}
                  className={`mt-2 w-full rounded-xl border bg-white px-4 py-3 font-normal outline-none focus:border-[#1f7a4d] ${fieldErrors[campo] ? 'border-[#b84b45]' : 'border-[#cad7c1]'}`}
                />
                {fieldErrors[campo] && <span id={`erro-${campo}`} className="mt-1 block text-xs font-bold text-[#a62b24]">{fieldErrors[campo]}</span>}
              </label>
            ))}
            <label className="block text-sm font-bold text-[#17382a]" htmlFor="cadastro-latitude">
              Latitude
              <input id="cadastro-latitude" required type="text" inputMode="decimal" value={cadastro.latitude} onChange={(event) => mudarCampo('latitude', event.target.value)} aria-invalid={Boolean(fieldErrors.latitude)} aria-describedby={fieldErrors.latitude ? 'erro-latitude' : undefined} className={`mt-2 w-full rounded-xl border bg-white px-4 py-3 font-normal outline-none focus:border-[#1f7a4d] ${fieldErrors.latitude ? 'border-[#b84b45]' : 'border-[#cad7c1]'}`} />
              {fieldErrors.latitude && <span id="erro-latitude" className="mt-1 block text-xs font-bold text-[#a62b24]">{fieldErrors.latitude}</span>}
            </label>
            <label className="block text-sm font-bold text-[#17382a]" htmlFor="cadastro-longitude">
              Longitude
              <input id="cadastro-longitude" required type="text" inputMode="decimal" value={cadastro.longitude} onChange={(event) => mudarCampo('longitude', event.target.value)} aria-invalid={Boolean(fieldErrors.longitude)} aria-describedby={fieldErrors.longitude ? 'erro-longitude' : undefined} className={`mt-2 w-full rounded-xl border bg-white px-4 py-3 font-normal outline-none focus:border-[#1f7a4d] ${fieldErrors.longitude ? 'border-[#b84b45]' : 'border-[#cad7c1]'}`} />
              {fieldErrors.longitude && <span id="erro-longitude" className="mt-1 block text-xs font-bold text-[#a62b24]">{fieldErrors.longitude}</span>}
            </label>
          </div>

          {error && (
            <p role="alert" className="mt-4 rounded-xl border border-[#e9aaa6] bg-[#fde8e7] px-4 py-3 text-sm font-semibold text-[#8f2923]">{error}</p>
          )}
          <button type="submit" disabled={loading} className="mt-5 w-full rounded-xl bg-[#1f7a4d] px-4 py-3 font-bold text-white disabled:opacity-60">
            {loading ? 'Cadastrando...' : 'Criar usuário'}
          </button>
          <div className="mt-2 flex justify-end">
            <button type="button" onClick={pularCadastro} className="bg-transparent px-2 py-1 text-sm font-bold text-[#17382a]/50 transition hover:text-[#17623e]/80">
              Pular
            </button>
          </div>
        </form>
        )}
      </section>
    </div>
  )
}
