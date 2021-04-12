import React from 'react'
import SimpleDataTable from './SimpleDataTable'
import DataTableEx1 from './DataTableEx1'
import RowDetailDataTable from './RowDetailDataTable'
import NoPaginateDataTable from './NoPaginateDataTable'

import { Meta } from '@storybook/react/types-6-0'
import Typography from '@material-ui/core/Typography'

export const Simple: React.FC<{}> = () => <SimpleDataTable />

export const WithRowDetail: React.FC<{}> = () => <RowDetailDataTable />

export const WithoutPagination: React.FC<{}> = () => (
  <div>
    <div>
      <Typography variant="h2">A data table</Typography>
      <Typography variant="body1">Some text content</Typography>
    </div>

    <NoPaginateDataTable />

    <div>
      <Typography variant="body2">
        The quick brown fox jumped over the lazy dog. The quick brown fox jumped
        over the lazy dog. The quick brown fox jumped over the lazy dog. The
        quick brown fox jumped over the lazy dog. The quick brown fox jumped
        over the lazy dog. The quick brown fox jumped over the lazy dog. The
        quick brown fox jumped over the lazy dog. The quick brown fox jumped
        over the lazy dog.
      </Typography>
    </div>
  </div>
)

export const WithEverything: React.FC<{}> = () => <DataTableEx1 />

export default {
  title: 'DataTable examples', // Title of you main menu entry for this group of stories
  component: DataTableEx1, // This is the component documented by this Storybook page
} as Meta
