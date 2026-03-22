export interface Voto {
  id: number;
  studente_username: string;
  studente_nome: string;
  materia: string;
  voto: number;
  created_at: string;
}

export interface NuovoVoto {
  studenteNome: string;
  studenteUsername: string;
  materia: string;
  voto: number;
}
