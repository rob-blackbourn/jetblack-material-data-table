export interface Row {
  [key: string]: any
}

export interface Column {
  id: string
  title?: string
  hide?: boolean
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify'
  getValue?: (row: Row, column: Column, columns: Column[], rows: Row[], context: any) => any
  formatValue?: (value: any, row: Row, column: Column, columns: Column[], rows: Row[], context: any) => string
  renderValue?: (value: any, row: Row, column: Column, columns: Column[], rows: Row[], context: any) => React.ReactNode | string
  search?: (text: string, row: Row, column: Column, columns: Column[], rows: Row[], context: any) => boolean
  compare?: (lhs: Row, rhs: Row, column: Column, columns: Column[], rows: Row[], context: any) => -1 | 0 | 1
}

export interface ColumnSortMap {
  [id: string]: 'asc' | 'desc'
}
