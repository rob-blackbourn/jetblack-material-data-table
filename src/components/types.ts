export interface Row {
  [key: string]: any
}

export type Getter = (row: Row, key: string | ((row: Row) => any)) => any

export interface Column {
  id: string
  title?: string
  align?: 'left' | 'right'
  disablePadding?: boolean
  getter?: (row: Row, column: Column) => any
  formatter?: (value: any, row: Row, column: Column) => string
}

export interface ColumnSortMap {
  [id: string]: 'asc' | 'desc'
}
