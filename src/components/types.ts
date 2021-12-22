export interface Row {
  [key: string]: any
}

export interface Column {
  id: string
  title?: string
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify'
  getValue?: (row: Row, column: Column, columns: Column[], rows: Row[]) => any
  formatValue?: (value: any, row: Row, column: Column, columns: Column[], rows: Row[]) => string
  renderValue?: (value: any, row: Row, column: Column, columns: Column[], rows: Row[]) => React.ReactNode | string
  search?: (text: string, row: Row, column: Column, columns: Column[], rows: Row[]) => boolean
  compare?: (lhs: Row, rhs: Row, column: Column, columns: Column[], rows: Row[]) => -1 | 0 | 1
}

export interface ColumnSortMap {
  [id: string]: 'asc' | 'desc'
}
