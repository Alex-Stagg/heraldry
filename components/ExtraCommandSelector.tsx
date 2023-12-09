import { Signal } from "@preact/signals";
import { JSX } from "preact/jsx-runtime";
import { HeraldryCommand, HeraldryExtraCommand } from "./Heraldry.tsx";
import Select from "./Select.tsx";

interface ExtraCommandSelectorProps {
  containerProps?: JSX.HTMLAttributes<HTMLDivElement>;
  labelProps?: JSX.HTMLAttributes<HTMLLabelElement>;
  selectProps?: JSX.HTMLAttributes<HTMLSelectElement>;
  value: Signal<HeraldryCommand | HeraldryExtraCommand>;
}

export default function CommandSelector(props: ExtraCommandSelectorProps) {
  return (
    <div {...props.containerProps}>
      <div>
        <label {...props.labelProps}>
          {props.labelProps?.children}
        </label>
      </div>
      <div>
        <Select
          {...props.selectProps}
          value={props.value.value}
          onChange={(
            e,
          ) => (props.value.value = e.currentTarget.value as
            | HeraldryCommand
            | HeraldryExtraCommand)}
        >
          <option value="fess">Fess</option>
          <option value="pale">Pale</option>
          <option value="bend">Bend</option>
          <option value="cross">Cross</option>
          <option value="saltire">Saltire</option>
          <option value="chevron">Chevron</option>
          <option value="pall">Pall</option>
          <option value="border">Border</option>
          <option value="chief">Chief</option>
          <option value="base">Base</option>
          <option value="tierce">Tierce</option>
          <option value="canton">Canton</option>
        </Select>
      </div>
    </div>
  );
}
