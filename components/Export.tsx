import { Button } from "./Button.tsx";

function getDescendantNodes(node: Node, all: Node[] = []) {
  all.push(...node.childNodes as NodeListOf<Node>);
  for (const child of node.childNodes) {
    getDescendantNodes(child, all);
  }
  return all;
}

function saveSvg() {
  const renderSpace = document.getElementById("heraldry2")!;

  const heraldry = document.getElementById("heraldry")!;
  const clone = heraldry.cloneNode(true);
  renderSpace.appendChild(clone);
  const children = getDescendantNodes(clone);
  for (const child of children) {
    console.log((child as HTMLElement).attributes.getNamedItem("class"));
    const cssProps = window.getComputedStyle(child as HTMLElement);
    const fill = cssProps.fill;
    console.log(cssProps.getPropertyValue("fill"));
    if (fill !== "") {
      (child as HTMLElement).setAttribute("fill", fill);
    }
  }

  const base64doc = btoa(
    unescape(encodeURIComponent((clone as HTMLElement).outerHTML)),
  );
  const a = document.createElement("a");
  const e = new MouseEvent("click");
  a.download = "heraldry.svg";
  a.href = "data:image/svg+xml;base64," + base64doc;
  a.dispatchEvent(e);

  a.remove();
  (clone as HTMLElement).remove();
}

export default function Export() {
  return (
    <>
      <Button type="button" disabled={false} onClick={() => saveSvg()}>
        Export as SVG
      </Button>
    </>
  );
}
