export function quark(json) {
  const parseKey = (key) => {
    const [tag, ...rest] = key.split(/(?=[.#\[])/); // Split into tag, classes, IDs, and attributes
    const attributes = {};
    const regexAttr = /\[([^\]]+)=["']?([^\]"']+)["']?\]/;

    rest.forEach((part) => {
      if (part.startsWith(".")) {
        attributes.class = (attributes.class || "") + " " + part.slice(1);
      } else if (part.startsWith("#")) {
        attributes.id = part.slice(1);
      } else if (regexAttr.test(part)) {
        const [, attr, value] = part.match(regexAttr);
        attributes[attr] = value;
      }
    });
    return { tag, attributes };
  };

  const createElement = (key, value) => {
    const { tag, attributes } = parseKey(key);
    const element = document.createElement(tag);

    // Set attributes
    for (const [attr, val] of Object.entries(attributes)) {
      element.setAttribute(attr, val.trim());
    }

    // Process the value
    if (typeof value === "string") {
      element.textContent = value; // Set text content for strings
    } else if (typeof value === "object") {
      if (value.style) {
        // Apply styles
        Object.assign(element.style, value.style);
      }

      if (value.events) {
        // Attach event listeners
        for (const [event, handler] of Object.entries(value.events)) {
          element.addEventListener(event, handler);
        }
      }

      // Recursively process child elements
      for (const [childKey, childValue] of Object.entries(value)) {
        if (childKey !== "style" && childKey !== "events") {
          element.appendChild(createElement(childKey, childValue));
        }
      }
    }

    return element;
  };

  const [rootKey, rootValue] = Object.entries(json)[0];
  return createElement(rootKey, rootValue);
}
