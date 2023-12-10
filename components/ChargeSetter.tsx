import { Signal } from "@preact/signals";
import {
  ChargeType,
  HeraldryCharge,
  HeraldryCommand,
  HeraldryExtraCommand,
  HeraldryMetal,
  HeraldryTincture,
} from "./Heraldry.tsx";
import Select from "./Select.tsx";
import Checkbox from "./Checkbox.tsx";

interface ChargeSetterProps {
  charges: Signal<HeraldryCharge[]>;
}

export default function ChargeSetter(props: ChargeSetterProps) {
  const rows = [];
  for (let i = 0; i < props.charges.value.length; i++) {
    rows.push(
      <div class="w-full flex flex-row gap-1 p-1 border-2 rounded flex-wrap">
        <div class="flex flex-row gap-1 items-center">
          <div>Shape:</div>
          <div>
            <Select
              value={props.charges.value[i].type}
              onInput={(e) => (props.charges.value = [
                ...props.charges.value.filter((_, index) => index !== i),
                {
                  ...props.charges.value[i],
                  type: e.currentTarget.value as ChargeType,
                },
              ])}
            >
              <option value="circle">Circle</option>
              <option value="square">Square</option>
            </Select>
          </div>
        </div>
        <div class="flex flex-row gap-1 items-center">
          <div>Color:</div>
          <div>
            <Select
              value={props.charges.value[i].color}
              onInput={(e) => (props.charges.value = [
                ...props.charges.value.filter((_, index) => index !== i),
                {
                  ...props.charges.value[i],
                  color: e.currentTarget
                    .value as (HeraldryMetal | HeraldryTincture),
                },
              ])}
            >
              <option value="gules">Gules</option>
              <option value="noir">Noir</option>
              <option value="argent">Argent</option>
              <option value="or">Or</option>
            </Select>
          </div>
        </div>
        <div class="flex flex-row gap-1 items-center">
          <div>Arrangment:</div>
          <div>
            <Select
              value={props.charges.value[i].arrangement}
              onInput={(e) => (props.charges.value = [
                ...props.charges.value.filter((_, index) => index !== i),
                {
                  ...props.charges.value[i],
                  arrangement: e.currentTarget
                    .value as (HeraldryCommand | HeraldryExtraCommand),
                },
              ])}
            >
              <option value="fess">Fess</option>
              <option value="pall">Pall</option>
              <option value="bend">Bend</option>
            </Select>
          </div>
        </div>
        {props.charges.value[i].arrangement === "bend" && (
          <div class="flex flex-row gap-1 items-center">
            <div>Sinister:</div>
            <div>
              <Checkbox
                checked={props.charges.value[i].sinister}
                onInput={(e) => (props.charges.value = [
                  ...props.charges.value.filter((_, index) => index !== i),
                  {
                    ...props.charges.value[i],
                    sinister: e.currentTarget.checked,
                  },
                ])}
              />
            </div>
          </div>
        )}
        <div class="flex flex-row gap-1 items-center min-h-16">
          <div>Major Offset</div>
          <div class="h-full">
            <input
              class="h-full"
              type="range"
              min="-40"
              max="40"
              value={props.charges.value[i].offset.major}
              onInput={(e) => (props.charges.value = [
                ...props.charges.value.filter((_, index) => index !== i),
                {
                  ...props.charges.value[i],
                  offset: {
                    ...props.charges.value[i].offset,
                    major: Number(e.currentTarget.value),
                  },
                },
              ])}
            />
          </div>
          <div>
            {props.charges.value[i].offset.major}
          </div>
        </div>
        <div class="flex flex-row gap-1 items-center min-h-16">
          <div>Minor Offset</div>
          <div class="h-full">
            <input
              class="h-full"
              type="range"
              min="-40"
              max="40"
              value={props.charges.value[i].offset.minor}
              onInput={(e) => (props.charges.value = [
                ...props.charges.value.filter((_, index) => index !== i),
                {
                  ...props.charges.value[i],
                  offset: {
                    ...props.charges.value[i].offset,
                    minor: Number(e.currentTarget.value),
                  },
                },
              ])}
            />
          </div>
          <div>
            {props.charges.value[i].offset.minor}
          </div>
        </div>
        <div class="flex flex-row gap-1 items-center min-h-16">
          <div>Rotation</div>
          <div class="h-full">
            <input
              class="h-full"
              type="range"
              min="-180"
              max="180"
              value={props.charges.value[i].rotation}
              onInput={(e) => (props.charges.value = [
                ...props.charges.value.filter((_, index) => index !== i),
                {
                  ...props.charges.value[i],
                  rotation: Number(e.currentTarget.value),
                },
              ])}
            />
          </div>
        </div>
        <div>
          <button
            onClick={() => (props.charges.value = [
              ...props.charges.value.filter((_, index) => index !== i),
            ])}
          >
            Remove
          </button>
        </div>
      </div>,
    );
  }
  return (
    <div class="w-full flex flex-col gap-1">
      <div class="flex flex-row">
        <button
          onClick={() => (props.charges.value = [...props.charges.value, {
            type: "circle",
            color: "gules",
            arrangement: "fess",
            count: 1,
            rotation: 0,
            offset: { major: 0, minor: 0 },
            sinister: false,
          }])}
        >
          Add Charge
        </button>
      </div>
      {rows}
    </div>
  );
}
