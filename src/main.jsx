import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// eslint-disable-next-line no-undef
const ZSB_COMPONENT = __VITE_CUSTOM_COMPONENT__ || 'zeroshot-bot';

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

  convertStyleToObject(styleString) {
    const styleObject = {};
    styleString.split(';').forEach((style) => {
      const [key, value] = style.split(':').map((s) => s.trim());
      if (key && value) {
        styleObject[key] = value;
      }
    });
    return styleObject;
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
            const ReactComponent = React.createElement(node.tagName.toLowerCase());
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
      .filter((attr) => attr.name !== 'framework')
      .map((attr) => this.convert(attr.name, attr.value))
      .reduce((props, prop) => ({ ...props, [prop.name]: prop.value }), {});
  }

  getEvents() {
    return Object.values(this.attributes)
      .filter((key) => /^on([a-z].*)/.exec(key.name))
      .reduce(
        (events, ev) => ({
          ...events,
          [ev.name]: (args) => this.dispatchEvent(new CustomEvent(ev.name, { ...args })),
        }),
        {},
      );
  }

  convert(attrName, attrValue) {
    let value = attrValue;
    if (attrName === 'style') {
      value =
        typeof attrValue === 'string'
          ? this.convertStyleToObject(attrValue)
          : typeof attrValue === 'object'
            ? attrValue
            : // reject other data types
              '';
    } else if (attrValue === 'true' || attrValue === 'false') {
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
