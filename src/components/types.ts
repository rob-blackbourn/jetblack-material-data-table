export interface Row {
  [key: string]: any
}

export interface Column {
  order: number
  title?: string
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify'
  getValue?: (row: Row, column: Column, columns: ColumnMap) => any
  formatValue?: (value: any, row: Row, column: Column, columns: ColumnMap) => string
  renderValue?: (value: any, row: Row, column: Column, columns: ColumnMap) => React.ReactNode | string
  search?: (text: string, row: Row, column: Column, columns: ColumnMap) => boolean
  compare?: (lhs: Row, rhs: Row, column: Column, columns: ColumnMap) => -1 | 0 | 1
}

export interface ColumnMap {
  [id: string]: Column
}

export interface ColumnSortMap {
  [id: string]: 'asc' | 'desc'
}
