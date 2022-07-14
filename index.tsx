import React, { FC } from "react";
import { createRoot, Root } from "react-dom/client";


function createUrl(id?: number, width?: number, height?: number) {
  if (id) {
    return `https://picsum.photos/id/${id}/${[width, height].filter(Boolean).join("/")}`;
  }
  return `https://picsum.photos/${[width, height].filter(Boolean).join("/")}`;
}

const App: FC<{
  id?: number;
  width?: number;
  height?: number;
}> = ({ id, width, height }) => {
  return (
    <img src={createUrl(id, width, height)} />
  );
};

class LoremPicsum extends HTMLElement {
  static observedAttributes = ["id", "width", "height"];

  private root: Root;
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.root = createRoot(this.shadowRoot!);
  }

  connectedCallback() {
    const widthStr = this.attributes.getNamedItem("width")?.value;
    const heightStr = this.attributes.getNamedItem("height")?.value;
    const idStr = this.attributes.getNamedItem("id")?.value;
    const width = widthStr ? parseInt(widthStr, 10) : undefined;
    const height = heightStr ? parseInt(heightStr, 10) : undefined;
    const id = idStr ? parseInt(idStr, 10) : undefined;
    this.root.render(<App {...{ id, width, height }} />);
  }

  disconnectedCallback() {
    this.root.unmount();
  }

  attributeChangedCallback() {
    this.connectedCallback();
  }
}

customElements.define("lorem-picsum", LoremPicsum);
