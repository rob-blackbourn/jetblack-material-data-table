import React from "react"
import SimpleDataTable from "./SimpleDataTable"
import DataTableEx1 from "./DataTableEx1"

import { Meta } from "@storybook/react/types-6-0"

export const Simple: React.FC<{}> = () => <SimpleDataTable />
export const WithEverything: React.FC<{}> = () => <DataTableEx1 />

export default {
  title: "DataTable examples", // Title of you main menu entry for this group of stories
  component: DataTableEx1, // This is the component documented by this Storybook page
} as Meta
