const DEFAULT_JAVA_API = 'https://bioclimatica.onrender.com'

export const API_URL = (import.meta.env.VITE_BIOCLIMATICA_API_URL as string | undefined)?.replace(/\/$/, '')
  || DEFAULT_JAVA_API

export function getCurrentUserId(): string {
  return localStorage.getItem('bioclimatica-user-id')?.trim() || ''
}

export type ApiValue = string | number | boolean | null | ApiValue[] | { [key: string]: ApiValue }

export class ApiError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

async function request<T = ApiValue>(
  path: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: object
): Promise<{ data: T; location?: string }> {
  let response: Response
  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined
    })
  } catch {
    throw new Error('Não foi possível conectar à API Bioclimática. Tente novamente em instantes.')
  }

  const text = await response.text()
  if (!response.ok) {
    let message = ''
    try {
      const parsed = JSON.parse(text) as { mensagem?: string; message?: string }
      message = parsed.mensagem || parsed.message || ''
    } catch {
      // Respostas de proxy e infraestrutura podem não ser JSON.
    }
    throw new ApiError(response.status, message || `Não foi possível concluir a solicitação (${response.status}).`)
  }

  if (!text) return { data: null as T, location: response.headers.get('Location') || undefined }
  try {
    return { data: JSON.parse(text) as T, location: response.headers.get('Location') || undefined }
  } catch {
    return { data: text as T, location: response.headers.get('Location') || undefined }
  }
}

export interface Usuario {
  idUsuario: number
  nome: string
  email: string
  telefone: string
  rua: string | null
}

export interface Grupo {
  idGrupo: number
  nome: string
  tipo: string
}

export interface Sensor {
  idSensor: number
  idGrupo: number | null
  cdSensor: string
  tipoSensor: string
  tipoSafra: string
}

export interface UsuarioCadastro {
  nome: string
  email: string
  senha: string
  telefone: string
  rua: string
  bairro: string
  cidade: string
  estado: string
  latitude: number
  longitude: number
}

export async function getUsuario(userId: string): Promise<Usuario> {
  const { data } = await request<Usuario>(`/usuarios/${encodeURIComponent(userId)}`)
  return data
}

export async function createUsuario(usuario: UsuarioCadastro): Promise<Usuario> {
  const response = await request<Usuario>('/usuarios/cadastro', 'POST', usuario)
  if (response.data?.idUsuario) return response.data

  if (response.location) {
    const location = new URL(response.location, `${API_URL}/`)
    const result = await request<Usuario>(`${location.pathname}${location.search}`)
    return result.data
  }

  throw new Error('O cadastro foi recebido, mas a API não retornou o usuário criado.')
}

export async function listGrupos(userId = getCurrentUserId()): Promise<Grupo[]> {
  const { data } = await request<Grupo[]>(`/usuarios/${encodeURIComponent(userId)}/grupos`)
  return data
}

export async function createGrupo(nome: string, tipo: string, userId = getCurrentUserId()): Promise<void> {
  await request(`/usuarios/${encodeURIComponent(userId)}/grupos`, 'POST', { nome, tipo })
}

export async function updateGrupo(idGrupo: number, nome: string, tipo: string, userId = getCurrentUserId()): Promise<void> {
  await request(`/usuarios/${encodeURIComponent(userId)}/grupos/${idGrupo}`, 'PUT', { nome, tipo })
}

export async function deleteGrupo(idGrupo: number, userId = getCurrentUserId()): Promise<void> {
  await request(`/usuarios/${encodeURIComponent(userId)}/grupos/${idGrupo}`, 'DELETE')
}

export async function listSensores(userId = getCurrentUserId()): Promise<Sensor[]> {
  const { data } = await request<Sensor[]>(`/usuarios/${encodeURIComponent(userId)}/sensores`)
  return data
}

export async function createSensor(cdSensor: string, tipoSensor: string, tipoSafra: string, userId = getCurrentUserId()): Promise<void> {
  await request(`/usuarios/${encodeURIComponent(userId)}/sensores/registrar`, 'POST', {
    cdSensor,
    tipoSensor,
    tipoSafra
  })
}

export async function updateSensor(idSensor: number, cdSensor: string, tipoSensor: string, tipoSafra: string, userId = getCurrentUserId()): Promise<void> {
  await request(`/usuarios/${encodeURIComponent(userId)}/sensores/${idSensor}`, 'PUT', {
    cdSensor,
    tipoSensor,
    tipoSafra
  })
}

export async function associateSensorToGrupo(idSensor: number, idGrupo: number, userId = getCurrentUserId()): Promise<void> {
  await request(`/usuarios/${encodeURIComponent(userId)}/sensores/${idSensor}/grupo/${idGrupo}`, 'PUT')
}

export async function deleteSensor(idSensor: number, userId = getCurrentUserId()): Promise<void> {
  await request(`/usuarios/${encodeURIComponent(userId)}/sensores/${idSensor}`, 'DELETE')
}
