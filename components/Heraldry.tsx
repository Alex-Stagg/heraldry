import { computed, Signal, useSignal } from "@preact/signals";
import { StateUpdater, useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";

export type HeraldryShape = "pointed" | "rounded";
export type HeraldryCutout = "left" | "right" | "both" | "down left" | "down right" | "down both" | "long";
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
  cutout?: HeraldryCutout;
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


interface HeraldryCutoutProps extends Omit<JSX.SVGAttributes<SVGCircleElement>, "d" | "type"> {
  type?: HeraldryCutout
};

function Cutout(props: HeraldryCutoutProps) {
  if (props.type === "left") {
    return <circle
      r="7.5"
      cx="-22.5"
      cy="-22.5"
      {...props}
    />
  }

  if (props.type === "down left") {
    return <circle
      r="7.5"
      cx="-25"
      cy="-10"
      {...props}
    />
  }

  if (props.type === "right") {
    return <circle
      r="7.5"
      cx="22.5"
      cy="-22.5"
      {...props}
    />
  }

  if (props.type === "down right") {
    return <circle
      r="7.5"
      cx="25"
      cy="-10"
      {...props}
    />
  }

  if (props.type === "both") {
    return <>
    <circle
      r="7.5"
      cx="-22.5"
      cy="-22.5"
      {...props}
    />
      <circle
      r="7.5"
      cx="22.5"
      cy="-22.5"
      {...props}
    />
    </>
  }

  if (props.type === "down both") {
    return <>
    <circle
      r="7.5"
      cx="-25"
      cy="-10"
      {...props}
    />
      <circle
      r="7.5"
      cx="25"
      cy="-10"
      {...props}
    />
    </>
  }

  if (props.type === "long") {
    return <>
    <circle
      r="100"
      cx="-123.5"
      cy="-10"
      {...props}
    />
      <circle
      r="100"
      cx="123.5"
      cy="-10"
      {...props}
    />
    </>
  }

  return <></>
}

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
      <g mask="url(#shield-with-cutout)">
        <circle cx={x} cy={y} r="5" class={`${fills[props.color]}`} />
      </g>
    );
  } else if (props.type === "square") {
    return (
      <g mask="url(#shield-with-cutout)">
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
        mask="url(#shield-with-cutout)"
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
        mask="url(#shield-with-cutout)"
      />
    );
  }
  if (props.command === "bend") {
    return (
      <g mask="url(#shield-with-cutout)">
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
      <g mask="url(#shield-with-cutout)">
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
      <g mask="url(#shield-with-cutout)">
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
      <g mask="url(#shield-with-cutout)">
        <polygon
          points="0,-15 100,85 100,95 0,-5 -100,95 -100,85"
          class={`${fills[props.color]}`}
        />
      </g>
    );
  } else if (props.command === "chevron" && props.perverse) {
    return (
      <g mask="url(#shield-with-cutout)">
        <polygon
          points="0,15 100,-85 100,-95 0,5 -100,-95 -100,-85"
          class={`${fills[props.color]}`}
        />
      </g>
    );
  } else if (props.command === "pall" && !props.perverse) {
    return (
      <g mask="url(#shield-with-cutout)">
        <polygon
          points="0,-5 -20,-25 -25,-25 -25,-20 -3.5,1.5 -3.5,35 3.5,35 3.5,1.5 25,-20 25,-25 20,-25"
          class={`${fills[props.color]}`}
        />
      </g>
    );
  } else if (props.command === "pall" && props.perverse) {
    return (
      <g mask="url(#shield-with-cutout)">
        <polygon
          points="0,5 -20,25 -25,25 -25,20 -3.5,-1.5 -3.5,-25 3.5,-25 3.5,-1.5 25,20 25,25 20,25"
          class={`${fills[props.color]}`}
        />
      </g>
    );
  } else if (props.command === "chief") {
    return (
      <g mask="url(#shield-with-cutout)">
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
      <g mask="url(#shield-with-cutout)">
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
      <g mask="url(#shield-with-cutout)">
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
      <g mask="url(#shield-with-cutout)">
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
        mask="url(#shield-with-cutout)"
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
        mask="url(#shield-with-cutout)"
      />
    );
  } else if (props.command === "bend" && !props.sinister) {
    return (
      <g mask="url(#shield-with-cutout)">
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
      <g mask="url(#shield-with-cutout)">
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
      <g mask="url(#shield-with-cutout)">
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
      <g mask="url(#shield-with-cutout)">
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
      <g mask="url(#shield-with-cutout)">
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
      <g mask="url(#shield-with-cutout)">
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
      <g mask="url(#shield-with-cutout)">
        <polygon points="0,0 0,100 -40,-40" class={`${fills[props.color]}`} />
        <polygon
          points="0,0 0,100 40,-40"
          class={`${fills[props.secondary!]}`}
        />
      </g>
    );
  } else if (props.command === "pall" && props.perverse) {
    return (
      <g mask="url(#shield-with-cutout)">
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
          <mask id="shield">
            <Shape
              type={props.heraldry.value.shape}
              fill="#FFF"
            />
          </mask>
          <mask id="shield-with-cutout">
            <Shape
              type={props.heraldry.value.shape}
              fill="#FFF"  
            />
            <Cutout
              type={props.heraldry.value.cutout}
              fill="#000"
            />
          </mask>
          <mask id="cutout">
            <rect
              x="-50"
              y="-50"
              width="100"
              height="100"
              fill="#FFF"
            />
            <Cutout
              type={props.heraldry.value.cutout}
              fill="#000"
            />
          </mask>
        </defs>
        
        <Shape
          mask="url(#shield-with-cutout)"
          type={props.heraldry.value.shape}
          class={`${fills[props.heraldry.value.field]}`}
        />
        {props.heraldry.value.division !== undefined && (
          <Division {...props.heraldry.value.division!} />
        )}
        {props.heraldry.value.ordinary !== undefined && (
          <Ordinary {...props.heraldry.value.ordinary!} />
        )}

        {charges}

        <Shape
          mask="url(#cutout)"
          type={props.heraldry.value.shape}
          style="fill: none;stroke: #000000;stroke-width: 0.352777;stroke-linecap: round;stroke-linejoin: round;"
        />
        <Cutout
          mask="url(#shield)"
          type={props.heraldry.value.cutout}
          style="fill: none;stroke: #000000;stroke-width: 0.352777;stroke-linecap: round;stroke-linejoin: round;"
        />
      </svg>
    </div>
  );
}
