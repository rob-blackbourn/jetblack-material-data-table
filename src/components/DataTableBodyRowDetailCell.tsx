import * as React from 'react'

import TableCell from '@mui/material/TableCell'

import { Row, Column } from './types'

type DataTableBodyRowDetailCellProps = {
  row: Row
  rows: Row[]
  columns: Column[]
  context: any
  rowDetail: (row: Row, columns: Column[], rows: Row[], context: any) => React.ReactNode
  colSpan: number
}

const DataTableBodyRowDetailCell: React.FC<DataTableBodyRowDetailCellProps> = ({
  row,
  rows,
  columns,
  context,
  rowDetail,
  colSpan,
}) => <TableCell colSpan={colSpan}>{rowDetail(row, columns, rows, columns)}</TableCell>

export default DataTableBodyRowDetailCell
