select tableh.*,'' as CRITICAL from ( SELECT P40_LINE_ID,P40_STYLE_DESC,P40_MACHINE_POSITION, P40_STAGE_ID,P40_STAGE_DESC, P40_OPERATOR_ID, G25_DS_OPERATORE,  LINE_TARGET, H1,nvl(H2,0) H2,nvl(H3,0) H3,nvl(H4,0) H4, nvl(H5,0) H5,nvl(H6,0) H6,nvl(H7,0) H7,nvl(H8,0) H8 ,nvl(H9,0) H9 , nvl(H10,0) H10, nvl(H11,0) H11, nvl(H12,0) H12, nvl(H13,0)  H13, nvl(H11,0) +nvl(H12,0) +nvl(H13,0)  as OT from  ( SELECT P40.P40_CD_LINEA P40_LINE_ID,G60_CODICE AS P40_STYLE_DESC, P40.P40_CD_FASE as  P40_STAGE_ID, Z02.Z02_DESCRIZIONE AS P40_STAGE_DESC,P40_CD_OPERATORE AS P40_OPERATOR_ID,G25.G25_DS_OPERATORE ,SUM(P40_QTA_LAVORATA) AS P40_WORKED_QTY, P40_POS_Y as P40_MACHINE_POSITION, GET_WORKING_HR(TO_CHAR (P40_DATA_ORA_F, 'HH24MI')) H, ROUND(NVL((  ( (SYSDATE - TO_DATE (TO_CHAR (SYSDATE, 'YYYY-MM-DD') || ' 07:00', 'YYYY-MM-DD HH24:MI'))* 24* 60)  / NULLIF((MAX(T02_TEMPO)/60),0)),0),0) LINE_TARGET FROM DBS.P40_RILEVAZIONI P40 LEFT OUTER JOIN DBS.Z02_FASI_DI_LAVORO Z02 ON (P40.P40_CD_FASE = Z02.Z02_CODICE) LEFT OUTER JOIN DBS.G25_OPERATORI G25 ON (P40.P40_CD_OPERATORE = G25.G25_CD_OPERATORE) LEFT OUTER JOIN DBS.Z03_MACCHINE Z03 ON (P40.P40_CD_MACCHINA = Z03.Z03_CODICE) LEFT OUTER JOIN DBS.G22_ANAGRAFICA_ARTICOLI G22 ON (P40.P40_KEY_G22 = G22.G22_KEY) LEFT OUTER JOIN DBS.G60_ARCH_STILE G60 ON (G22.G22_FK_1 = G60.G60_KEY) LEFT OUTER JOIN P06_CARTELLINI_PROD P06 ON (    P06.P06_CD_AZIENDA = P40.P40_CD_AZIENDA AND P06.P06_ANNO_CARTELLINO = P40.P40_ANNO_CARTELLINO AND P06.P06_NR_CARTELLINO = P40.P40_NR_CARTELLINO) LEFT OUTER JOIN T02_FASI_ST ON T02_FK_T01 = P06_KEY_T01 AND T02_CD_FASE = P40_CD_FASE inner join G25_OPERATORI G25 on P40.P40_CD_OPERATORE=G25.G25_CD_OPERATORE WHERE    TRUNC (P40.P40_DATA_ORA_F)>=trunc(sysdate-41)  and  TRUNC (P40.P40_DATA_ORA_F-42) < trunc(sysdate-42)+1 and  P40_CD_LINEA= 001 GROUP BY  P40.P40_CD_LINEA,P40.P40_POS_Y,  G60.G60_CODICE,  P40.P40_CD_FASE, Z02.Z02_DESCRIZIONE, P40.P40_CD_OPERATORE,G25.G25_DS_OPERATORE, GET_WORKING_HR (TO_CHAR (P40.P40_DATA_ORA_F, 'HH24MI'))) PIVOT ( SUM(P40_WORKED_QTY) FOR ( H ) IN ( 1 H1 , 2  H2 , 3  H3 ,4  H4 ,5 H5 ,6 H6 , 7 H7,8 H8 ,9 H9 , 10 H10 ,12 H11 ,13 H12 ,14 H13 ,15 H15, 16 H16 ,17 H17 ))) tableh order by P40_MACHINE_POSITION