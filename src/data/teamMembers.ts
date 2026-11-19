import pedru from '../assets/Pedru.webp'
import thiago from '../assets/Thiago.jpg'
import joao from '../assets/João.jpg'
import caua from '../assets/caua.webp'
import type { TeamMember } from '../types/bioclimatica'

export const teamMembers: TeamMember[] = [
  { slug: 'joao-luiz', name: 'João Luiz Oliveira', rm: 'RM 568747', photo: joao, github: 'https://github.com/Ja1Gizz', linkedin: 'https://www.linkedin.com/in/jo%C3%A3o-luiz-silva-matias-de-oliveira-34599b408/' },
  { slug: 'caua-trevisanuto', name: 'Cauã Trevisanuto', rm: 'RM 570312', photo: caua, github: 'https://github.com/CauaTr', linkedin: 'https://www.linkedin.com/in/cau%C3%A3-trevisanuto-997405411/' },
  { slug: 'pedro-basilisco', name: 'Pedro Basilisco', rm: 'RM 572370', photo: pedru, github: 'https://github.com/P3druuh', linkedin: 'https://www.linkedin.com/in/pedro-basilio-770108411' },
  { slug: 'thiago-ferreira', name: 'Thiago Ferreira', rm: 'RM 572492', photo: thiago, github: 'https://github.com/thiago2908', linkedin: 'https://www.linkedin.com/in/thiago-f-rocha-325904290/' }
]
