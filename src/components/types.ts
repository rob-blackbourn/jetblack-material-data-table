export interface Row {
  [key: string]: any
}

export interface Column {
  id: string
  title?: string
  align?: 'left' | 'right'
  disablePadding?: boolean
  getValue?: (row: Row, column: Column) => any
  formatValue?: (value: any, row: Row, column: Column) => string
  renderValue?: (value: any, row: Row, column: Column) => React.ReactNode | string
  search?: (text: string, row: Row, column: Column) => boolean
}

export interface ColumnSortMap {
  [id: string]: 'asc' | 'desc'
}
