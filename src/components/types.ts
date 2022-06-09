import { Theme } from '@mui/material/styles'
import { SxProps } from '@mui/system'

export interface Row {
  [key: string]: any
}

export type ColumnGetValueHandler<TContext> = (
  row: Row,
  column: Column<TContext>,
  columns: Column<TContext>[],
  rows: Row[],
  context: TContext
) => any

export type ColumnFormatValueHandler<TContext> = (
  value: any,
  row: Row,
  column: Column<TContext>,
  columns: Column<TContext>[],
  rows: Row[],
  context: TContext
) => string

export type ColumnRenderValueHandler<TContext> = (
  value: any,
  row: Row,
  column: Column<TContext>,
  columns: Column<TContext>[],
  rows: Row[],
  context: TContext
) => React.ReactNode | string

export type ColumnSearchHandler<TContext> = (
  text: string,
  row: Row,
  column: Column<TContext>,
  columns: Column<TContext>[],
  rows: Row[],
  context: any
) => boolean

export type ColumnCompareHandler<TContext> = (
  lhs: Row,
  rhs: Row,
  column: Column<TContext>,
  columns: Column<TContext>[],
  rows: Row[],
  context: any
) => -1 | 0 | 1

export interface Column<TContext> {
  id: string
  title?: string
  hide?: boolean
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify'
  getValue?: ColumnGetValueHandler<TContext>
  formatValue?: ColumnFormatValueHandler<TContext>
  renderValue?: ColumnRenderValueHandler<TContext>
  search?: ColumnSearchHandler<TContext>
  compare?: ColumnCompareHandler<TContext>
  sx?: SxProps<Theme>
}

export interface ColumnSortMap {
  [id: string]: 'asc' | 'desc'
}
