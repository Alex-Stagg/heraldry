import { IS_BROWSER } from "$fresh/runtime.ts";
import { JSX } from "preact/jsx-runtime";

export default function Select(props: JSX.HTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      disabled={!IS_BROWSER || props.disabled}
      class="px-2 py-1 border-gray-500 border-2 rounded bg-white transition-colors"
    >
      {props.children}
    </select>
  );
}
