import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { MultiSelect } from "@mantine/core";
import { ICellEditorParams } from "ag-grid-community";
import { ICellEditorReactComp } from "ag-grid-react";

export interface AgGridMultiSelectEditorWithoutStylesParams
  extends ICellEditorParams {
  options: string[];
}

interface AgGridMultiSelectEditorWithoutStylesRef extends ICellEditorReactComp {
  getValue: () => string[];
}

export const AgGridMultiSelectEditorWithoutStyles = React.forwardRef<
  AgGridMultiSelectEditorWithoutStylesRef,
  AgGridMultiSelectEditorWithoutStylesParams
>((props: AgGridMultiSelectEditorWithoutStylesParams, _ref) => {
  const [value, setValue] = useState(props.value as string[]);
  const refInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // focus on input
    refInput.current?.focus();
  }, []);

  /* Component Editor Lifecycle methods */
  useImperativeHandle(_ref, () => {
    return {
      getValue() {
        return value;
      },
    };
  });

  return (
    <MultiSelect
      ref={refInput}
      data={props.options.map((option) => ({ label: option, value: option }))}
      value={value}
      onChange={setValue}
      searchable
    />
  );
});
