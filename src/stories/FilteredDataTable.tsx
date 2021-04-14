import React from 'react'
import { Theme, withStyles } from '@material-ui/core/styles'
import IconButton from "@material-ui/core/IconButton"
import ClearIcon from "@material-ui/icons/Clear"
import InputAdornment from "@material-ui/core/InputAdornment"
import TextField from "@material-ui/core/TextField"
import { Column, Row } from '../components/types'
import { DataTable } from '../index'


interface FilterTextFieldProps {
  text: string
  title: string
  onChange: (filterText: string) => void
}

const FilterTextField = ({
  text,
  title,
  onChange,
  className,
}: FilterTextFieldProps & { className: string }) => (
  <TextField
    className={className}
    label={title}
    value={text}
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <IconButton onClick={() => onChange("")}>
            <ClearIcon />
          </IconButton>
        </InputAdornment>
      ),
    }}
    onChange={(event) => onChange(event.target.value)}
  />
)

const styles = (theme: Theme) => ({
  filterTextField: {
    width: 300,
  }
})

interface FilteredDataTableProps {}

interface FilteredDataTableState {
  columns: Column[]
  rows: Row[]
  filterText: string
}

interface Classes {
  [key: string]: any
}

class FilteredDataTable extends React.Component<
  FilteredDataTableProps & Classes,
  FilteredDataTableState
> {
  state: FilteredDataTableState = {
    columns: [
      {
        id: 'name',
        title: 'Name',
        align: 'left',
      },
      {
        id: 'band',
        title: 'Band',
        align: 'left',
        getValue: (row, _column, _columns) => row['band'],
      },
      {
        id: 'founded',
        title: 'Founded',
        align: 'right',
        formatValue: (value, row, _column, _columns) => `${row.band} founded in ${value}`,
      },
    ],
    rows: [
      { name: 'Jimmy Page', band: 'Led Zeppelin', founded: 1968 },
      { name: 'Marc Bolan', band: 'T. Rex', founded: 1967 },
    ],
    filterText: ''
  }

  render() {
    const { classes } = this.props
    const { columns, rows, filterText } = this.state
    return (
      <div>
        <div>
          <FilterTextField
            className={classes.filterTextField}
            title="Filter"
            text={filterText}
            onChange={(filterText) => this.setState({ filterText })}
          />
        </div>

        <DataTable
          className={classes.DataTable}
          columns={columns}
          rows={rows}
          filterText={filterText}
          paginate={false}
        />
      </div>
    )
  }
}

export default withStyles(styles)(FilteredDataTable)
