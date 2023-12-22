import { Signal, useComputed } from "@preact/signals";
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
import { useState } from "preact/hooks";
import { Button } from "./Button.tsx";

interface ChargeSetterProps {
  charges: Signal<HeraldryCharge[]>;
}

interface ChargeInputProps {
  charges: Signal<HeraldryCharge[]>;
  index: number;
}

function ChargeInput(props: ChargeInputProps) {
  const myCharge = useComputed(() => props.charges.value[props.index]);
  const setState = (f: (prev: HeraldryCharge) => void) => {
    const prev: HeraldryCharge = {
      type: myCharge.value.type,
      color: myCharge.value.color,
      arrangement: myCharge.value.arrangement,
      sinister: myCharge.value.sinister,
      count: myCharge.value.count,
      rotation: myCharge.value.rotation,
      offset: {
        major: myCharge.value.offset.major,
        minor: myCharge.value.offset.minor,
      },
    };

    f(prev);
    props.charges.value = [
      ...props.charges.value.slice(0, props.index),
      prev,
      ...props.charges.value.slice(props.index + 1),
    ];
  };

  return (
    <div class="w-full flex flex-col gap-2 p-1 border-2 rounded border-slate-300 bg-slate-200">
      <div class="w-full flex flex-row gap-2 flex-wrap">
        <div class="flex flex-row gap-1 items-center">
          <div>Shape:</div>
          <div>
            <Select
              value={myCharge.value.type}
              onInput={(e) =>
                setState((prev) => {
                  prev.type = e.currentTarget.value as ChargeType;
                })}
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
              value={myCharge.value.color}
              onInput={(e) =>
                setState((prev) => {
                  prev.color = e.currentTarget
                    .value as (HeraldryMetal | HeraldryTincture);
                })}
            >
              <option value="gules">Gules</option>
              <option value="noir">Noir</option>
              <option value="argent">Argent</option>
              <option value="or">Or</option>
            </Select>
          </div>
        </div>
        <div class="flex flex-row gap-1 items-center">
          <div>Arrangement:</div>
          <div>
            <Select
              value={myCharge.value.arrangement}
              onInput={(e) =>
                setState((prev) => {
                  prev.arrangement = e.currentTarget
                    .value as (HeraldryCommand | HeraldryExtraCommand);
                })}
            >
              <option value="fess">Fess</option>
              <option value="pall">Pall</option>
              <option value="bend">Bend</option>
            </Select>
          </div>
        </div>
        <div class="flex flex-row gap-1 items-center">
          <div>Sinister:</div>
          <div>
            <Checkbox
              checked={myCharge.value.sinister}
              onInput={(e) =>
                setState((prev) => {
                  prev.sinister = e.currentTarget.checked;
                })}
            />
          </div>
        </div>
      </div>
      <div class="flex flex-row gap-1">
        <div class="flex flex-col gap-1">
          <div class="flex flex-row gap-1 items-center flex-wrap">
            <div>Major Offset:</div>
            <div>
              <input
                type="range"
                min="-40"
                max="40"
                value={myCharge.value.offset.major}
                onInput={(e) =>
                  setState((prev) => {
                    prev.offset.major = Number(e.currentTarget.value);
                  })}
              />
            </div>
            <div>
              <input
                class="rounded p-1"
                type="number"
                min="-40"
                max="40"
                value={myCharge.value.offset.major}
                onInput={(e) => setState(prev => {
                  prev.offset.major = Number(e.currentTarget.value);
                })}
              />
            </div>
          </div>
          <div class="flex flex-row gap-1 items-center flex-wrap">
            <div>Minor Offset:</div>
            <div>
              <input
                type="range"
                min="-40"
                max="40"
                value={myCharge.value.offset.minor}
                onInput={(e) =>
                  setState((prev) => {
                    prev.offset.minor = Number(e.currentTarget.value);
                  })}
              />
            </div>
            <div>
            <input
                class="rounded p-1"
                type="number"
                min="-40"
                max="40"
                value={myCharge.value.offset.minor}
                onInput={(e) => setState(prev => {
                  prev.offset.minor = Number(e.currentTarget.value);
                })}
              />
            </div>
          </div>
          {myCharge.value.type != "circle" && <div class="flex flex-row gap-1 items-center flex-wrap">
            <div>Rotation:</div>
            <div>
              <input
                type="range"
                min="-180"
                max="180"
                value={myCharge.value.rotation}
                onInput={(e) =>
                  setState((prev) => {
                    prev.rotation = Number(e.currentTarget.value);
                  })}
              />
            </div>
            <div>
            <input
                class="rounded p-1"
                type="number"
                min="-180"
                max="180"
                value={myCharge.value.rotation}
                onInput={(e) => setState(prev => {
                  prev.rotation = Number(e.currentTarget.value);
                })}
              />
            </div>
          </div>}
        </div>
      </div>
      <div>
        <Button
          onClick={() => (props.charges.value = [
            ...props.charges.value.filter((_, index) => index !== props.index),
          ])}
        >
          Remove
        </Button>
      </div>
    </div>
  );
}

export default function ChargeSetter(props: ChargeSetterProps) {
  const rows = [];
  for (let i = 0; i < props.charges.value.length; i++) {
    rows.push(
      <ChargeInput index={i} charges={props.charges} />,
    );
  }
  return (
    <div class="w-full flex flex-col gap-1">
      <div>
        <Button
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
        </Button>
      </div>
      {props.charges.value.length > 0 && (
        <div class="w-full flex flex-col gap-1 border-2 rounded p-1 bg-white border-slate-300">
          {rows}
        </div>
      )}
    </div>
  );
}
