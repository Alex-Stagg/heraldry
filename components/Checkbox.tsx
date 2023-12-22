import { IS_BROWSER } from "$fresh/runtime.ts";
import { JSX } from "preact/jsx-runtime";

export default function Checkbox(
  props: Omit<JSX.HTMLAttributes<HTMLInputElement>, "class">,
) {
  return (
    <input
      class="accent-rose-500 w-6 h-6 text-zinc-50"
      type="checkbox"
      {...props}
      disabled={!IS_BROWSER || props.disabled}
    />
  );
}
