export function quark(json) {
  const parseKey = (key) => {
    const attributes = {};
    const regexAttr = /\[([^\]]+)=["']?([^\]"']+)["']?\]/g; // Matches attributes like [key="value"]
    const regexParts =
      /^(?<tag>[a-z]+\d?)?(?<id>#\w+)?(?<classes>(\.\w+|-\w+)*)?(?<attrs>(\[.*\])*)$/i;

    const match = key.match(regexParts);

    if (!match) {
      throw new Error(`Invalid key format: ${key}`);
    }

    const { tag, id, classes, attrs } = match.groups;

    if (id) {
      attributes.id = id.slice(1); // Remove the `#`
    }

    if (classes) {
      attributes.class = classes.replace(/\./g, " ").trim(); // Replace `.` with spaces
    }

    if (attrs) {
      let attrMatch;
      while ((attrMatch = regexAttr.exec(attrs)) !== null) {
        const [, attr, value] = attrMatch;
        attributes[attr] = value;
      }
    }

    return { tag, attributes };
  };

  const createElement = (key, value) => {
    const { tag = "div", attributes } = parseKey(key);
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

      if (value.src || ["img", "audio"].includes(tag)) {
        // Attach src if the element is img or audio
        element.src = value.src;
      }

      // Recursively process child elements
      for (const [childKey, childValue] of Object.entries(value)) {
        if (!["style", "src"].includes(childKey)) {
          element.appendChild(createElement(childKey, childValue));
        }
      }
    }

    return element;
  };

  const [rootKey, rootValue] = Object.entries(json)[0];
  return createElement(rootKey, rootValue);
}
