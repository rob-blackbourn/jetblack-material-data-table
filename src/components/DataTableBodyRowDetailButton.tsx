import * as React from 'react'

import TableCell from '@mui/material/TableCell'
import IconButton from '@mui/material/IconButton'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

type DataTableBodyRowDetailButtonProps = {
  showRowDetail: boolean
  onChange: (showRowDetail: boolean) => void
}

const DataTableBodyRowDetailButton: React.FC<DataTableBodyRowDetailButtonProps> = ({
  showRowDetail,
  onChange,
}) => (
  <TableCell style={{ width: 24, height: 24, padding: 0 }}>
    <IconButton onClick={() => onChange(!showRowDetail)}>
      {showRowDetail ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
    </IconButton>
  </TableCell>
)

export default DataTableBodyRowDetailButton
