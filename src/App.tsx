import { Text } from "@mantine/core";
import { AgGridReact } from "ag-grid-react";
import {
  ColDef,
  ICellRendererParams,
  ValueFormatterParams,
} from "ag-grid-community";
import {
  AgGridMultiSelectEditor,
  AgGridMultiSelectEditorParams,
} from "./AgGridMultiSelectEditor";
import "./App.css";
import {
  AgGridMultiSelectEditorWithoutStyles,
  AgGridMultiSelectEditorWithoutStylesParams,
} from "./AgGridMultiSelectEditorWithoutStyles";

type Job = {
  name: string;
  tasks: string[];
};

const allTasks = ["T1", "T2", "T3", "T4", "T5"];

const data: Job[] = [
  { name: "Tom", tasks: ["T1", "T4"] },
  { name: "Jerry", tasks: [] },
];

const columnDefs: ColDef[] = [
  {
    field: "name",
    headerName: "Name",
    maxWidth: 150,
    editable: false,
  },
  {
    field: "tasks",
    headerName: "Tasks",
    cellEditor: AgGridMultiSelectEditor,
    editable: true,
    cellEditorParams: {
      options: allTasks,
    } as AgGridMultiSelectEditorParams,
    valueFormatter: (params: ValueFormatterParams) => {
      return params.value.join(", ");
    },
    cellRenderer: (params: ICellRendererParams) => {
      if (params.data.tasks.length <= 0) {
        return (
          <Text size="sm" c="dimmed">
            Click to tag tasks
          </Text>
        );
      }
      return <Text size="md">{params.data.tasks.join(", ")}</Text>;
    },
  },
  {
    field: "tasks",
    headerName: "Tasks",
    cellEditor: AgGridMultiSelectEditorWithoutStyles,
    editable: true,
    cellEditorParams: {
      options: allTasks,
    } as AgGridMultiSelectEditorWithoutStylesParams,
    valueFormatter: (params: ValueFormatterParams) => {
      return params.value.join(", ");
    },
    cellRenderer: (params: ICellRendererParams) => {
      if (params.data.tasks.length <= 0) {
        return (
          <Text size="sm" c="dimmed">
            Click to tag tasks
          </Text>
        );
      }
      return <Text size="md">{params.data.tasks.join(", ")}</Text>;
    },
  },
];

export default function App() {
  return (
    <div className="App">
      <div style={{ height: "500px", width: "100%" }}>
        <div
          className="ag-theme-alpine"
          style={{ height: "100%", width: "100%" }}
        >
          <AgGridReact
            rowData={data}
            columnDefs={columnDefs}
            singleClickEdit={true}
            editType={"fullRow"}
            defaultColDef={{
              flex: 1,
              resizable: true,
              editable: true,
              autoHeight: true,
              autoHeaderHeight: true,
            }}
          />
        </div>
      </div>
    </div>
  );
}
