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

export interface WorkedPiecesTable {
  P40_LINE_ID: string | null;
  P40_STYLE_DESC: string | null;
  P40_MACHINE_POSITION: number | null;
  P40_STAGE_ID: string | null;
  P40_STAGE_DESC: string | null;
  P40_OPERATOR_ID: string | null;
  G25_DS_OPERATORE: string | null;
  LINE_TARGET: number | null;
  ACHIEVED: number | null;
  H1: number | null;
  H2: number | null;
  H3: number | null;
  H4: number | null;
  H5: number | null;
  H6: number | null;
  H7: number | null;
  H8: number | null;
  H9: number | null;
  H10: number | null;
  H11: number | null;
  H12: number | null;
  H13: number | null;
  OT: number | null;
  CRITICAL: undefined;
}
