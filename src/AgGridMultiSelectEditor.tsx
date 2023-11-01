import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { MultiSelect } from "@mantine/core";
import { ICellEditorParams } from "ag-grid-community";
import { ICellEditorReactComp } from "ag-grid-react";

export interface AgGridMultiSelectEditorParams extends ICellEditorParams {
  options: string[];
}

interface AgGridMultiSelectEditorRef extends ICellEditorReactComp {
  getValue: () => string[];
}

export const AgGridMultiSelectEditor = React.forwardRef<
  AgGridMultiSelectEditorRef,
  AgGridMultiSelectEditorParams
>((props, _ref) => {
  const [value, setValue] = useState<string[]>(props.value);
  const refInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // focus on input
    refInput.current?.focus();
  }, []);

  /* Component Editor Lifecycle methods */
  useImperativeHandle(_ref, () => {
    return {
      getValue: () => {
        return value;
      },
      isPopup: () => {
        return false;
      },
    };
  });

  return (
    <div className="ag-cell-edit-wrapper">
      <MultiSelect
        ref={refInput}
        className="ag-cell-editor"
        data={props.options.map((option) => ({ label: option, value: option }))}
        value={value}
        onChange={setValue}
        searchable
      />
    </div>
  );
});
