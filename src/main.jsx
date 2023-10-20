import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const ZSB_COMPONENT = import.meta.env.VITE_CUSTOM_COMPONENT || 'zeroshot-bot';

  class ReactElement extends HTMLElement {
    constructor() {
      super();

      this.framework = this.getAttribute('framework');
      this.observer = new MutationObserver(() => this.update());
      this.observer.observe(this, { attributes: true });
    }

    connectedCallback() {
      this._innerHTML = this.innerHTML;
      this.mount();
    }

    disconnectedCallback() {
      this.unmount();
      this.observer.disconnect();
    }

    update() {
      this.unmount();
      this.mount();
    }

    mount() {
      const props = {
        ...this.getProps(this.attributes),
        ...this.getEvents(),
        children: this.parseHtmlToFramework(this.innerHTML),
      };

      createRoot(this).render(<App {...props} />);
    }

    unmount() {
      if (this.root) {
        this.root.unmount();
      }
    }

    parseHtmlToFramework(html) {
      switch (window.React) {
        case 'react': {
          const wrapper = document.createElement('div');
          wrapper.innerHTML = html;
          return Array.from(wrapper.childNodes).map((node) => {
            if (node.nodeType === 3) {
              return node.wholeText;
            } else {
              const ReactComponent = React.createElement(
                node.tagName.toLowerCase()
              );
              return ReactComponent;
            }
          });
        }

        case 'vue':
        case 'angular':
        default:
          return html;
      }
    }

    getProps(attributes) {
      return [...attributes]
        .filter((attr) => attr.name !== 'style' && attr.name !== 'framework')
        .map((attr) => this.convert(attr.name, attr.value))
        .reduce((props, prop) => ({ ...props, [prop.name]: prop.value }), {});
    }

    getEvents() {
      return Object.values(this.attributes)
        .filter((key) => /on([a-z].*)/.exec(key.name))
        .reduce(
          (events, ev) => ({
            ...events,
            [ev.name]: (args) =>
              this.dispatchEvent(new CustomEvent(ev.name, { ...args })),
          }),
          {}
        );
    }

    convert(attrName, attrValue) {
      let value = attrValue;
      if (attrValue === 'true' || attrValue === 'false') {
        value = attrValue === 'true';
      } else if (!isNaN(attrValue) && attrValue !== '') {
        value = +attrValue;
      } else if (/^{.*}/.exec(attrValue)) {
        value = JSON.parse(attrValue);
      }
      return {
        name: attrName,
        value: value,
      };
    }
  }
  
document.addEventListener('DOMContentLoaded', () => {
  customElements.define(ZSB_COMPONENT, ReactElement);
});

export default ReactElement;
