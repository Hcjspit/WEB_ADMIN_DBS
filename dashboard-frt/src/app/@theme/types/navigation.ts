export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  link?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  groupClasses?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
  onClick?: () => void;
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

export const productionLines = [
  { id: '001', name: 'Line 01' },
  { id: '002', name: 'Line 02' },
  { id: '003', name: 'Line 03' },
  { id: '004', name: 'Line 04' },
  { id: '005', name: 'Line 05' },
  { id: '006', name: 'Line 06' },
  { id: '007', name: 'Line 07' },
  { id: '008', name: 'Line 08' },
  { id: '009', name: 'Line 09' },
  { id: '010', name: 'Line 10' },
  { id: '011', name: 'Line 11' },
  { id: '012', name: 'Line 12' },
  { id: '013', name: 'Line 13' },
  { id: '014', name: 'Line 14' },
  { id: '015', name: 'Line 15' },
  { id: '016', name: 'Line 16' },
  { id: '017', name: 'Line 17' },
  { id: '018', name: 'Line 18' },
  { id: '019', name: 'Line 19 ' },
  { id: '020', name: 'Line 20' }
];
