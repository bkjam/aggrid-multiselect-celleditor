import { Button, Space, Text } from "@mantine/core";
import { AgGridReact } from "ag-grid-react";
import {
  CellValueChangedEvent,
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
import { useRef, useState } from "react";

type Job = {
  name: string;
  tasks1: string[];
  tasks2: string[];
};

const allTasks = ["T1", "T2", "T3", "T4", "T5"];

const data: Job[] = [
  { name: "Tom", tasks1: ["T1", "T4"], tasks2: ["T2", "T3"] },
  { name: "Jerry", tasks1: [], tasks2: [] },
];

const columnDefs: ColDef[] = [
  {
    field: "name",
    headerName: "Name",
    maxWidth: 150,
  },
  {
    field: "tasks1",
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
      if (params.data.tasks1.length <= 0) {
        return (
          <Text size="sm" c="dimmed">
            Click to tag tasks
          </Text>
        );
      }
      return <Text size="md">{params.data.tasks1.join(", ")}</Text>;
    },
  },
  {
    field: "tasks2",
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
      if (params.data.tasks2.length <= 0) {
        return (
          <Text size="sm" c="dimmed">
            Click to tag tasks
          </Text>
        );
      }
      return <Text size="md">{params.data.tasks2.join(", ")}</Text>;
    },
  },
];

export default function App() {
  const gridRef = useRef<AgGridReact>(null);
  const [showData, setShowData] = useState<Job[]>([]);

  const handleCellValueChanged = (event: CellValueChangedEvent<Job>) => {
    console.log(event);
  };

  const onSaveButtonClick = () => {
    if (gridRef.current) {
      const gridApi = gridRef.current.api;

      // To get all the row data
      const allRowData: Job[] = [];
      gridApi.forEachNode((node) => {
        allRowData.push(node.data);
      });

      setShowData(allRowData);
    }
  };

  return (
    <div className="App">
      <Button onClick={onSaveButtonClick}>Save</Button>
      <Space h="md" />
      <div style={{ height: "500px", width: "100%" }}>
        <div
          className="ag-theme-alpine"
          style={{ height: "100%", width: "100%" }}
        >
          <AgGridReact
            ref={gridRef}
            rowData={data}
            columnDefs={columnDefs}
            singleClickEdit={true}
            editType={"fullRow"}
            stopEditingWhenCellsLoseFocus={true}
            onCellValueChanged={handleCellValueChanged}
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

      <Space h="md" />

      {showData.map((data, idx) => (
        <Text key={idx}>
          {data.name} + {data.tasks1.join(", ")} + {data.tasks2.join(", ")}
        </Text>
      ))}
    </div>
  );
}
