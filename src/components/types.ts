import { Theme } from '@mui/material/styles'
import { SxProps } from '@mui/system'

export interface Row {
  [key: string]: any
}

export type ColumnGetValueHandler<TRow extends Row, TContext> = (
  row: TRow,
  column: Column<TRow, TContext>,
  columns: Column<TRow, TContext>[],
  rows: TRow[],
  context: TContext
) => any

export type ColumnFormatValueHandler<TRow extends Row, TContext> = (
  value: any,
  row: TRow,
  column: Column<TRow, TContext>,
  columns: Column<TRow, TContext>[],
  rows: TRow[],
  context: TContext
) => string

export type ColumnRenderValueHandler<TRow extends Row, TContext> = (
  value: any,
  row: TRow,
  column: Column<TRow, TContext>,
  columns: Column<TRow, TContext>[],
  rows: TRow[],
  context: TContext
) => React.ReactNode | string

export type ColumnSearchHandler<TRow extends Row, TContext> = (
  text: string,
  row: TRow,
  column: Column<TRow, TContext>,
  columns: Column<TRow, TContext>[],
  rows: TRow[],
  context: TContext
) => boolean

export type ColumnCompareHandler<TRow extends Row, TContext> = (
  lhs: TRow,
  rhs: TRow,
  column: Column<TRow, TContext>,
  columns: Column<TRow, TContext>[],
  rows: TRow[],
  context: TContext
) => -1 | 0 | 1

export interface Column<TRow extends Row = {}, TContext = null> {
  id: string
  title?: string
  hide?: boolean
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify'
  getValue?: ColumnGetValueHandler<TRow, TContext>
  formatValue?: ColumnFormatValueHandler<TRow, TContext>
  renderValue?: ColumnRenderValueHandler<TRow, TContext>
  search?: ColumnSearchHandler<TRow, TContext>
  compare?: ColumnCompareHandler<TRow, TContext>
  sx?: SxProps<Theme>
}

export interface ColumnSortMap {
  [id: string]: 'asc' | 'desc'
}

export type RowDetailHandler<TRow extends Row, TContext> = (
  row: TRow,
  columns: Column<TRow, TContext>[],
  rows: TRow[],
  context: TContext
) => React.ReactNode
