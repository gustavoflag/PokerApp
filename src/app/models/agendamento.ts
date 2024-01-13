import { Local } from "./local";

export enum AgendamentoStatus {
  ATIVO = 'ativo',
  INATIVO = 'inativo',
  CANCELADO = 'cancelado',
  TERMINADO = 'terminado'
}

export class Agendamento {
  _id!: string;
  data!: Date;
  local!: Local;
  status!: AgendamentoStatus;
  jogoId?: string;
  numeroJogo?: string;
}