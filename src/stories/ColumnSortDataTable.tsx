import * as React from 'react'

import { Column, Row, ColumnSortMap } from "../components/types"
import { DataTable } from "../index"

const RenderDataTable = () => {
    const columns: Column[] = [
      {
        id: "name",
        title: "Name",
        align: "left",
      },
      {
        id: "band",
        title: "Band",
        align: "left",
        getValue: (row, _column, _columns) => row["band"],
      },
      {
        id: "founded",
        title: "Founded",
        align: "right",
        formatValue: (value, row, _column, _columns) => `${row.band} founded in ${value}`,
      }
    ]
    const rows: Row[] = [
      { name: "Jimmy Page", band: "Led Zeppelin", founded: 1968 },
      { name: "Marc Bolan", band: "T. Rex", founded: 1967 },
    ]

    const columnSortMap: ColumnSortMap = { name: 'asc', band: 'desc', founded: 'asc' }

    return (
      <div>
        <DataTable columns={columns} rows={rows} columnSortMap={columnSortMap} />
      </div>
    )
}

export default RenderDataTable
