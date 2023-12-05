import { Signal } from "@preact/signals";
import { JSX } from "preact/jsx-runtime";
import { HeraldryCommand } from "./Heraldry.tsx";
import Select from "./Select.tsx";

interface CommandSelectorProps {
    containerProps?: JSX.HTMLAttributes<HTMLDivElement>,
    labelProps?: JSX.HTMLAttributes<HTMLLabelElement>,
    selectProps?: JSX.HTMLAttributes<HTMLSelectElement>,
    value: Signal<HeraldryCommand>,
}

export default function CommandSelector(props: CommandSelectorProps) {
    return <div {...props.containerProps}>
        <div>
            <label {...props.labelProps}>
                {props.labelProps?.children}
            </label>
        </div>
        <div>
            <Select
                {...props.selectProps}
                value={props.value.value}
                onChange={(e) => (props.value.value = e.currentTarget.value as HeraldryCommand)}
            >
                <option value="fess">Fess</option>
                <option value="pale">Pale</option>
                <option value="bend">Bend</option>
                <option value="cross">Cross</option>
                <option value="saltire">Saltire</option>
                <option value="chevron">Chevron</option>
                <option value="pall">Pall</option>
            </Select>
        </div>
    </div>
}
