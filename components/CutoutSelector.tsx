import { Signal } from "@preact/signals";
import { JSX } from "preact/jsx-runtime";
import { HeraldryCutout } from "./Heraldry.tsx";
import Select from "./Select.tsx";

interface CommandSelectorProps {
  containerProps?: JSX.HTMLAttributes<HTMLDivElement>;
  labelProps?: JSX.HTMLAttributes<HTMLLabelElement>;
  selectProps?: JSX.HTMLAttributes<HTMLSelectElement>;
  value: Signal<HeraldryCutout>;
}

export default function CutoutSelector(props: CommandSelectorProps) {
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
          ) => (props.value.value = e.currentTarget.value as (HeraldryCutout))}
        >
          <option value="left">Sinister</option>
          <option value="right">Dexter</option>
          <option value="both">Both</option>
          <option value="down left">Down Sinister</option>
          <option value="down right">Down Dexter</option>
          <option value="down both">Down both</option>
          <option value="long">Long</option>
        </Select>
      </div>
    </div>
  );
}
