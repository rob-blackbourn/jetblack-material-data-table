import { Row, Column, ColumnSortMap } from './types'

export function getFieldValue<TRow>(
  row: Row<TRow>,
  key: string | ((row: Row<TRow>) => any)
): any {
  if (typeof key === 'string') {
    return row[key]
  } else if (typeof key === 'function') {
    return key(row)
  } else {
    throw new Error('key must be a function or a string')
  }
}

export function getColumnValue<TRow, TContext>(
  row: Row<TRow>,
  column: Column<TRow, TContext>,
  columns: Column<TRow, TContext>[],
  rows: Row<TRow>[],
  context: TContext | null
): any {
  if (column.getValue) {
    return column.getValue(row, column, columns, rows, context)
  } else {
    return row[column.id]
  }
}

export function getFormattedValue<TRow, TContext>(
  row: Row<TRow>,
  column: Column<TRow, TContext>,
  columns: Column<TRow, TContext>[],
  rows: Row<TRow>[],
  context: TContext | null
): string {
  const value = getColumnValue(row, column, columns, rows, context)
  if (column.formatValue) {
    return column.formatValue(value, row, column, columns, rows, context)
  } else if (value == null) {
    return ''
  } else {
    // Ensure we return a string.
    return value + ''
  }
}

export function getRenderedValue<TRow, TContext>(
  row: Row<TRow>,
  column: Column<TRow, TContext>,
  columns: Column<TRow, TContext>[],
  rows: Row<TRow>[],
  context: TContext | null
): React.ReactNode | string {
  if (column.renderValue) {
    return column.renderValue(
      getColumnValue(row, column, columns, rows, context),
      row,
      column,
      columns,
      rows,
      context
    )
  } else {
    return getFormattedValue(row, column, columns, rows, context)
  }
}
function compareRows<TRow, TContext>(
  lhs: Row<TRow>,
  rhs: Row<TRow>,
  columns: Column<TRow, TContext>[],
  columnSortMap: ColumnSortMap,
  rows: Row<TRow>[],
  context: TContext | null
): number {
  for (const [id, sortDirection] of Object.entries(columnSortMap)) {
    const column = columns.find(x => x.id === id)
    if (column) {
      if (column.compare) {
        const result = column.compare(lhs, rhs, column, columns, rows, context)
        if (result !== 0) {
          return result
        }
      } else {
        const lhsValue = getColumnValue(lhs, column, columns, rows, context)
        const rhsValue = getColumnValue(rhs, column, columns, rows, context)
        if (rhsValue < lhsValue) {
          return sortDirection === 'asc' ? 1 : -1
        } else if (rhsValue > lhsValue) {
          return sortDirection == 'asc' ? -1 : 1
        }
      }
    }
  }
  return 0
}

export function stableSort<TRow, TContext>(
  rows: Row<TRow>[],
  columns: Column<TRow, TContext>[],
  columnSortMap: ColumnSortMap,
  context: TContext | null
): Row<TRow>[] {
  const data = rows.map((row, index) => ({ row, index }))
  data.sort((lhs, rhs) => {
    const difference = compareRows(
      lhs.row,
      rhs.row,
      columns,
      columnSortMap,
      rows,
      context
    )
    return difference !== 0 ? difference : lhs.index - rhs.index
  })
  return data.map(({ row }) => row)
}

export function filterRows<TRow, TContext>(
  rows: Row<TRow>[],
  columns: Column<TRow, TContext>[],
  filterText: string,
  context: TContext | null
): Row<TRow>[] {
  if (!filterText) {
    return rows
  }
  const matchString = filterText.toLowerCase()
  return rows.filter(row =>
    columns.some(column =>
      column.search
        ? column.search(matchString, row, column, columns, rows, context)
        : getFormattedValue(row, column, columns, rows, context)
            .toLowerCase()
            .includes(matchString)
    )
  )
}

export function isRowSelected<TRow>(
  row: Row<TRow>,
  selected: Row<TRow>[],
  compareRow?: (lhs: Row<TRow>, rhs: Row<TRow>) => boolean
): boolean {
  return compareRow == null
    ? selected.includes(row)
    : selected.find(x => compareRow(row, x)) !== undefined
}
