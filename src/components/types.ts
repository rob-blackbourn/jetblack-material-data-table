export interface Row {
  [key: string]: any
}

export interface Column {
  id: string
  title?: string
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify'
  getValue?: (row: Row, column: Column, columns: Column[]) => any
  formatValue?: (value: any, row: Row, column: Column, columns: Column[]) => string
  renderValue?: (value: any, row: Row, column: Column, columns: Column[]) => React.ReactNode | string
  search?: (text: string, row: Row, column: Column, columns: Column[]) => boolean
  compare?: (lhs: Row, rhs: Row, column: Column, columns: Column[]) => -1 | 0 | 1
}

export interface ColumnSortMap {
  [id: string]: 'asc' | 'desc'
}
