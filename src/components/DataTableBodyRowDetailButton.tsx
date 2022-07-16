import * as React from 'react'

import TableCell from '@mui/material/TableCell'
import IconButton from '@mui/material/IconButton'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

export interface DataTableBodyRowDetailButtonProps {
  showRowDetail: boolean
  onChange: (showRowDetail: boolean) => void
}

export default function DataTableBodyRowDetailButton({
  showRowDetail,
  onChange,
}: DataTableBodyRowDetailButtonProps) {
  return (
    <TableCell style={{ width: 24, height: 24, padding: 0 }}>
      <IconButton onClick={() => onChange(!showRowDetail)}>
        {showRowDetail ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
      </IconButton>
    </TableCell>
  )
}
