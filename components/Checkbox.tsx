import { IS_BROWSER } from "$fresh/runtime.ts";
import { JSX } from "preact/jsx-runtime";

export default function Checkbox(props: JSX.HTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="checkbox"
      {...props}
      disabled={!IS_BROWSER || props.disabled}
      class="w-6 h-6 border-gray-500 border-2 rounded bg-white hover:bg-gray-200 transition-colors"
    />
  );
}
