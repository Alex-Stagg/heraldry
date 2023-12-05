import { Signal } from "@preact/signals";
import { JSX } from "preact/jsx-runtime";
import { HeraldryMetal, HeraldryTincture } from "./Heraldry.tsx";
import Select from "./Select.tsx";

interface ColorSelectorProps {
    containerProps?: JSX.HTMLAttributes<HTMLDivElement>,
    labelProps?: JSX.HTMLAttributes<HTMLLabelElement>,
    selectProps?: JSX.HTMLAttributes<HTMLSelectElement>,
    value: Signal<HeraldryMetal | HeraldryTincture>,
}

export default function ColorSelector(props: ColorSelectorProps) {
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
                onChange={(e) => (props.value.value = e.currentTarget.value as (HeraldryMetal | HeraldryTincture))}
            >
                <option value="gules">Gules</option>
                <option value="noir">Noir</option>
                <option value="argent">Argent</option>
                <option value="or">Or</option>
            </Select>
        </div>
    </div>
}
