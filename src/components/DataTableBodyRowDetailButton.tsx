import * as React from 'react'
import TableCell from '@material-ui/core/TableCell'
import IconButton from '@material-ui/core/IconButton'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'

type DataTableBodyRowDetailButtonProps = {
  showRowDetail: boolean
  onChange: (showRowDetail: boolean) => void
}

const DataTableBodyRowDetailButton: React.FC<DataTableBodyRowDetailButtonProps> = ({
  showRowDetail,
  onChange,
}) => (
  <TableCell style={{ width: 24 }}>
    <IconButton onClick={() => onChange(!showRowDetail)}>
      {showRowDetail ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
    </IconButton>
  </TableCell>
)

export default DataTableBodyRowDetailButton
