import { computed, Signal, useSignal } from "@preact/signals";
import { StateUpdater, useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";

export type HeraldryShape = "pointed" | "rounded";
export type HeraldryMetal = "argent" | "or";
export type HeraldryTincture = "gules" | "noir";
export type HeraldryCommand =
  | "fess"
  | "pale"
  | "bend"
  | "cross"
  | "saltire"
  | "chevron"
  | "pall"
  | "border";
export type HeraldryExtraCommand = "chief" | "base" | "tierce" | "canton";

export interface HeraldryDivision {
  color: HeraldryMetal | HeraldryTincture;
  secondary?: HeraldryMetal | HeraldryTincture;
  command: HeraldryCommand;
  sinister?: boolean;
  perverse?: boolean;
}

export interface HeraldryOrdinary {
  color: HeraldryMetal | HeraldryTincture;
  command: HeraldryCommand | HeraldryExtraCommand;
  sinister?: boolean;
  perverse?: boolean;
}

export type ChargeType = "circle" | "square";

export interface HeraldryCharge {
  type: ChargeType;
  color: HeraldryMetal | HeraldryTincture;
  arrangement: HeraldryCommand | HeraldryExtraCommand;
  sinister: boolean;
  count: number;
  rotation: number;
  offset: {
    major: number;
    minor: number;
  };
}

export interface HeraldryDef {
  shape: HeraldryShape;
  field: HeraldryMetal | HeraldryTincture;
  division?: HeraldryDivision;
  ordinary?: HeraldryOrdinary;
  charges?: HeraldryCharge[];
}

interface HeraldryProps {
  heraldry: Signal<HeraldryDef>;
  class?: string;
  id?: string;
}

const fills = {
  gules: "fill-gules",
  noir: "fill-noir",
  argent: "fill-argent",
  or: "fill-or",
};

interface HeraldryShapeProps extends Omit<JSX.SVGAttributes<SVGPathElement>, "d" | "type"> {
  type: HeraldryShape
};

function Shape(props: HeraldryShapeProps) {
  if (props.type === "rounded") {
    return <path
      d="M -25,-25 H 25 L 25,0 C 25,32.5 0,32.5 0,32.5 0,32.5 -25,32.5 -25,0 Z"
      {...props}
    />
  }

  return <path
    d="M -25,-25 H 25 L 25,0 C 25,25 0,32.5 0,32.5 0,32.5 -25,25 -25,0 Z"
    {...props}
  />
}

function Charge(props: HeraldryCharge) {
  let fx = (major: number, minor: number) => major;
  let fy = (major: number, minor: number) => minor;

  if (props.arrangement === "pall") {
    fx = (major: number, minor: number) => minor;
    fy = (major: number, minor: number) => major;
  } else if (props.arrangement === "bend" && !props.sinister) {
    fx = (major, minor) => major + minor;
    fy = (major, minor) => major - minor;
  } else if (props.arrangement === "bend" && props.sinister) {
    fx = (major, minor) => major - minor;
    fy = (major, minor) => -major - minor;
  }

  const x = fx(props.offset.major, props.offset.minor);
  const y = fy(props.offset.major, props.offset.minor);

  if (props.type === "circle") {
    return (
      <g clip-path="url(#shield)">
        <circle cx={x} cy={y} r="5" class={`${fills[props.color]}`} />
      </g>
    );
  } else if (props.type === "square") {
    return (
      <g clip-path="url(#shield">
        <rect
          x={x - 5}
          y={y - 5}
          width="10"
          height="10"
          class={`${fills[props.color]}`}
          transform={`rotate(${props.rotation} ${x} ${y})`}
        />
      </g>
    );
  } else {
    return <></>;
  }
}

function Ordinary(props: HeraldryOrdinary) {
  if (props.command === "fess") {
    return (
      <rect
        x="-50"
        y="-5"
        height="10"
        width="100"
        class={`${fills[props.color]}`}
        clip-path="url(#shield)"
      />
    );
  }
  if (props.command === "pale") {
    return (
      <rect
        x="-5"
        y="-50"
        height="100"
        width="10"
        class={`${fills[props.color]}`}
        clip-path="url(#shield)"
      />
    );
  }
  if (props.command === "bend") {
    return (
      <g clip-path="url(#shield)">
        <rect
          x="-5"
          y="-50"
          height="100"
          width="10"
          class={`${fills[props.color]}`}
          transform={`rotate(${props.sinister ? 45 : -45})`}
        />
      </g>
    );
  }
  if (props.command === "cross") {
    return (
      <g clip-path="url(#shield)">
        <rect
          x="-50"
          y="-5"
          height="10"
          width="100"
          class={`${fills[props.color]}`}
        />
        <rect
          x="-5"
          y="-50"
          height="100"
          width="10"
          class={`${fills[props.color]}`}
        />
      </g>
    );
  } else if (props.command === "saltire") {
    return (
      <g clip-path="url(#shield)">
        <rect
          x="-50"
          y="-5"
          height="10"
          width="100"
          class={`${fills[props.color]}`}
          transform="rotate(45)"
        />
        <rect
          x="-5"
          y="-50"
          height="100"
          width="10"
          class={`${fills[props.color]}`}
          transform="rotate(45)"
        />
      </g>
    );
  } else if (props.command === "chevron" && !props.perverse) {
    return (
      <g clip-path="url(#shield)">
        <polygon
          points="0,-15 100,85 100,95 0,-5 -100,95 -100,85"
          class={`${fills[props.color]}`}
        />
      </g>
    );
  } else if (props.command === "chevron" && props.perverse) {
    return (
      <g clip-path="url(#shield)">
        <polygon
          points="0,15 100,-85 100,-95 0,5 -100,-95 -100,-85"
          class={`${fills[props.color]}`}
        />
      </g>
    );
  } else if (props.command === "pall" && !props.perverse) {
    return (
      <g clip-path="url(#shield)">
        <polygon
          points="0,-5 -20,-25 -25,-25 -25,-20 -3.5,1.5 -3.5,35 3.5,35 3.5,1.5 25,-20 25,-25 20,-25"
          class={`${fills[props.color]}`}
        />
      </g>
    );
  } else if (props.command === "pall" && props.perverse) {
    return (
      <g clip-path="url(#shield)">
        <polygon
          points="0,5 -20,25 -25,25 -25,20 -3.5,-1.5 -3.5,-25 3.5,-25 3.5,-1.5 25,20 25,25 20,25"
          class={`${fills[props.color]}`}
        />
      </g>
    );
  } else if (props.command === "chief") {
    return (
      <g clip-path="url(#shield)">
        <rect
          x="-25"
          y="-65"
          height="50"
          width="50"
          class={`${fills[props.color]}`}
        />
      </g>
    );
  } else if (props.command === "base") {
    return (
      <g clip-path="url(#shield)">
        <rect
          x="-25"
          y="20"
          height="50"
          width="50"
          class={`${fills[props.color]}`}
        />
      </g>
    );
  } else if (props.command === "tierce") {
    return (
      <g clip-path="url(#shield)">
        <rect
          x={props.sinister ? -60 : 10}
          y="-35"
          height="70"
          width="50"
          class={`${fills[props.color]}`}
        />
      </g>
    );
  } else if (props.command === "canton") {
    return (
      <g clip-path="url(#shield)">
        <rect
          x={props.sinister ? -60 : 10}
          y="-80"
          height="70"
          width="50"
          class={`${fills[props.color]}`}
        />
      </g>
    );
  } else if (props.command === "border") {
    return (
      <g>
        <path
          d="M -30,-30 H 30 L 30,0 C 30,30 0,37.5 0,37.5 0,37.5 -30,30 -30,0 Z"
          class={`${fills[props.color]}`}
          fill-opacity="1"
          mask="url(#tiny-shield)"
        />
      </g>
    );
  } else {
    return <></>;
  }
}

function Division(props: HeraldryDivision) {
  if (props.command === "fess") {
    return (
      <rect
        x="-25"
        y="-50"
        height="50"
        width="50"
        class={`${fills[props.color]}`}
        clip-path="url(#shield)"
      />
    );
  } else if (props.command === "pale") {
    return (
      <rect
        x="0"
        y="-25"
        height="100"
        width="50"
        class={`${fills[props.color]}`}
        clip-path="url(#shield)"
      />
    );
  } else if (props.command === "bend" && !props.sinister) {
    return (
      <g clip-path="url(#shield)">
        <rect
          x="-25"
          y="-25"
          height="100"
          width="100"
          transform="rotate(45 -25 -25)"
          class={`${fills[props.color]}`}
        />
      </g>
    );
  } else if (props.command === "bend" && props.sinister) {
    return (
      <g clip-path="url(#shield)">
        <rect
          x="25"
          y="-25"
          height="100"
          width="100"
          transform="rotate(45 25 -25)"
          class={`${fills[props.color]}`}
        />
      </g>
    );
  } else if (props.command === "cross") {
    return (
      <g clip-path="url(#shield)">
        <rect
          x="-100"
          height="100"
          width="100"
          class={`${fills[props.color]}`}
        />
        <rect
          y="-100"
          height="100"
          width="100"
          class={`${fills[props.color]}`}
        />
      </g>
    );
  } else if (props.command === "saltire") {
    return (
      <g clip-path="url(#shield)">
        <rect
          height="100"
          width="100"
          class={`${fills[props.color]}`}
          transform="rotate(135)"
        />
        <rect
          height="100"
          width="100"
          class={`${fills[props.color]}`}
          transform="rotate(-45)"
        />
      </g>
    );
  } else if (props.command === "chevron" && !props.perverse) {
    return (
      <g clip-path="url(#shield)">
        <rect
          y="-10"
          height="100"
          width="100"
          class={`${fills[props.color]}`}
          transform="rotate(45 0 -10)"
        />
      </g>
    );
  } else if (props.command === "chevron" && props.perverse) {
    return (
      <g clip-path="url(#shield)">
        <rect
          y="10"
          height="100"
          width="100"
          class={`${fills[props.color]}`}
          transform="rotate(-135 0 10)"
        />
      </g>
    );
  } else if (props.command === "pall" && !props.perverse) {
    return (
      <g clip-path="url(#shield)">
        <polygon points="0,0 0,100 -40,-40" class={`${fills[props.color]}`} />
        <polygon
          points="0,0 0,100 40,-40"
          class={`${fills[props.secondary!]}`}
        />
      </g>
    );
  } else if (props.command === "pall" && props.perverse) {
    return (
      <g clip-path="url(#shield)">
        <polygon points="0,0 0,-100 50,50" class={`${fills[props.color]}`} />
        <polygon
          points="0,0 0,-100 -50,50"
          class={`${fills[props.secondary!]}`}
        />
      </g>
    );
  } else {
    return <></>;
  }
}

export default function Heraldry(props: HeraldryProps) {
  const charges = [];
  for (let i = 0; i < props.heraldry.value.charges!.length; i++) {
    charges.push(<Charge {...props.heraldry.value.charges![i]} />);
  }

  return (
    <div class={props.class}>
      <svg viewBox="-40 -40 80 80" id={props.id}>
        <defs>
          <clipPath id="shield">
            <Shape type={props.heraldry.value.shape} />
          </clipPath>
          <mask id="tiny-shield">
            <Shape type={props.heraldry.value.shape} fill="#FFF" />
            <path
              d="M -20,-20 H 20 L 20,0 C 20,20 0,27.5 0,27.5 0,27.5 -20,20 -20,0 Z"
              fill="#000"
            />
          </mask>
        </defs>
        <Shape
          type={props.heraldry.value.shape}
          class={`${fills[props.heraldry.value.field]}`}
          style="stroke: #000000;stroke-width: 0.352777;stroke-linecap: round;stroke-linejoin: round;"
        />
        {props.heraldry.value.division !== undefined && (
          <Division {...props.heraldry.value.division!} />
        )}
        {props.heraldry.value.ordinary !== undefined && (
          <Ordinary {...props.heraldry.value.ordinary!} />
        )}

        {charges}

        <Shape
          type={props.heraldry.value.shape}
          style="fill: none;stroke: #000000;stroke-width: 0.352777;stroke-linecap: round;stroke-linejoin: round;"
        />
      </svg>
    </div>
  );
}
