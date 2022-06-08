import { Theme } from '@mui/material/styles'
import { SxProps } from '@mui/system'

export interface Row {
  [key: string]: any
}

export type ColumnGetValueHandler = (
  row: Row,
  column: Column,
  columns: Column[],
  rows: Row[],
  context: any
) => any

export type ColumnFormatValueHandler = (
  value: any,
  row: Row,
  column: Column,
  columns: Column[],
  rows: Row[],
  context: any
) => string

export type ColumnRenderValueHandler = (
  value: any,
  row: Row,
  column: Column,
  columns: Column[],
  rows: Row[],
  context: any
) => React.ReactNode | string

export type ColumnSearchHandler = (
  text: string,
  row: Row,
  column: Column,
  columns: Column[],
  rows: Row[],
  context: any
) => boolean

export type ColumnCompareHandler = (
  lhs: Row,
  rhs: Row,
  column: Column,
  columns: Column[],
  rows: Row[],
  context: any
) => -1 | 0 | 1

export interface Column {
  id: string
  title?: string
  hide?: boolean
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify'
  getValue?: ColumnGetValueHandler
  formatValue?: ColumnFormatValueHandler
  renderValue?: ColumnRenderValueHandler
  search?: ColumnSearchHandler
  compare?: ColumnCompareHandler
  sx?: SxProps<Theme>
}

export interface ColumnSortMap {
  [id: string]: 'asc' | 'desc'
}
