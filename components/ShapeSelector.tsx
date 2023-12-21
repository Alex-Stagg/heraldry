import { Signal } from "@preact/signals";
import { JSX } from "preact/jsx-runtime";
import { HeraldryShape } from "./Heraldry.tsx";
import Select from "./Select.tsx";

interface CommandSelectorProps {
  containerProps?: JSX.HTMLAttributes<HTMLDivElement>;
  labelProps?: JSX.HTMLAttributes<HTMLLabelElement>;
  selectProps?: JSX.HTMLAttributes<HTMLSelectElement>;
  value: Signal<HeraldryShape>;
}

export default function ShapeSelector(props: CommandSelectorProps) {
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
          ) => (props.value.value = e.currentTarget.value as HeraldryShape)}
        >
          <option value="pointed">Pointed</option>
        </Select>
      </div>
    </div>
  );
}
