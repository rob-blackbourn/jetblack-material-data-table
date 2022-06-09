import { Theme } from '@mui/material/styles'
import { SxProps } from '@mui/system'

export interface Row<TRow = {}> {
  [key: string]: TRow
}

export type ColumnGetValueHandler<TRow, TContext> = (
  row: Row<TRow>,
  column: Column<TRow, TContext>,
  columns: Column<TRow, TContext>[],
  rows: Row<TRow>[],
  context: TContext
) => any

export type ColumnFormatValueHandler<TRow, TContext> = (
  value: any,
  row: Row<TRow>,
  column: Column<TRow, TContext>,
  columns: Column<TRow, TContext>[],
  rows: Row<TRow>[],
  context: TContext
) => string

export type ColumnRenderValueHandler<TRow, TContext> = (
  value: any,
  row: Row<TRow>,
  column: Column<TRow, TContext>,
  columns: Column<TRow, TContext>[],
  rows: Row<TRow>[],
  context: TContext
) => React.ReactNode | string

export type ColumnSearchHandler<TRow, TContext> = (
  text: string,
  row: Row<TRow>,
  column: Column<TRow, TContext>,
  columns: Column<TRow, TContext>[],
  rows: Row<TRow>[],
  context: TContext
) => boolean

export type ColumnCompareHandler<TRow, TContext> = (
  lhs: Row<TRow>,
  rhs: Row<TRow>,
  column: Column<TRow, TContext>,
  columns: Column<TRow, TContext>[],
  rows: Row<TRow>[],
  context: TContext
) => -1 | 0 | 1

export interface Column<TRow = {}, TContext = null> {
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
