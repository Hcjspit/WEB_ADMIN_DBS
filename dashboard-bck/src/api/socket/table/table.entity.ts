export interface SmallTable {
  TOTAL_LINES?: number | null;
  TOTAL_MACHINES?: number | null;
  TOTAL_TARGET?: number | null;
  TOTAL_OUTPUT?: number | null;
  TOTAL_ACTIVE_CADRE?: number | null;
  AVG_EFFICIENCY_PERC?: number | null;
  AVG_DHU_PERC?: number | null;
  AVG_REJECTION_PERC?: number | null;
  EFF_TOTAL?: number | null;
}

export interface BigTable {
  CD_LINEA?: string | null;
  DS_LINEA?: string | null;
  CD_UNITA?: string | null;
  G60_CODICE?: string | null;
  G60_KEY?: number | null;
  TARGET: number | null;
  TOTAL_MACHINES: number | null;
  ACTIVE_CADRE: number | null;
  CHECKED_QTY: number | null;
  OUTPUT: number | null;
  AVG_TRACKING: number | null;
  REJECTED_PCS: number | null;
  DEFECTED_PCS: number | null;
  EFFICIENCY_PERC: number | null;
  REJECTION_PERC: number | null;
  DHU_PERC: number | null;
  SMV: number | null;
  UPDATE_DATE: Date | null;
  CD_AZIENDA: string | null;
  STD_TIME: string | null;
  EFFICIENCY_PERC_YSTD: number | null;
  G60_CODICE_YSTD: string | null;
  EFF_TOTAL: number | null;
  INPUT: number | null;
}
