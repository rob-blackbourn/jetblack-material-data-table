export interface Row {
  [key: string]: any
}

export interface Column {
  id: string
  title?: string
  align?: 'left' | 'right'
  disablePadding?: boolean
  getter?: (row: Row, column: Column) => any
  formatter?: (value: any, row: Row, column: Column) => string
  renderer?: (value: any, row: Row, column: Column) => React.ReactNode | string
}

export interface ColumnSortMap {
  [id: string]: 'asc' | 'desc'
}
