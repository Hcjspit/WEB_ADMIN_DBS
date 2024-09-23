export interface BigScreenData {
  CD_LINEA?: string;
  CD_UNITA?: string;
  DS_LINEA?: string;
  DS_UNITA?: string;
  STD_TIME?: number;
  G60_KEY?: number | null;
  G60_CODICE?: string | null;
  SMV?: number;
  TARGET?: number | null;
  TOTAL_MACHINES?: number | null;
  ACTIVE_CADRE?: number | null;
  CHECKED_QTY: number;
  OUTPUT?: number | null;
  AVG_TRACKING?: number | null;
  REJECTED_PCS?: number | null;
  EFFICIENCY_PERC?: number | null | undefined;
  REJECTION_PERC?: number | null;
  DHU_PERC?: number | null;
  DEFECTED_PCS?: number | null;
  UPDATE_DATE?: Date;
  CD_AZIENDA?: string;
  EFFICIENCY_PERC_YSTD?: number | null;
  G60_CODICE_YSTD?: string | null;
}

export interface DefectData {
  Z21_DS_CAUSALE_RIPRESO?: string | null;
  NO_DEFS?: number | null;
  COLORID?: number | null;
}

export interface TopLineData {
  CD_LINEA?: string;
  CHECKED_QTY?: number;
}

export interface OutputData {
  P40_CD_LINEA?: string;
  P40_KEY_G22?: number;
  P40_QTA_LAVORATA?: number;
}
