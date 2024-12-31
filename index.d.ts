/**
 * Styling atrributes types
 */
interface StyleAttributes {
  [key: string]: string | number;
}

/**
 * Event attributes types
 */
interface EventsListeners {
  [event: string]: (event?: Event) => void;
}

interface QuarkDOM {
  style?: StyleAttributes;
  events?: EventsListeners;
  [key: string]:
    | string
    | QuarkDOM
    | StyleAttributes
    | EventsListeners
    | undefined;
}

/**
 * This function generates DOM elements from a JSON object.
 *
 * ```js
 * import { quark } from 'quark.js'
 *
 * document.querySelector("#element").innerHTML = quark({
 *  "div.container": {
 *    "h1": "Hello world!",
 *  },
 * });
 * ```
 *
 * @param json The JSON object to parse as HTML
 * @returns The DOM element generated from the JSON object.
 */
declare function quark(json: Record<string, QuarkDOM | string>): HTMLElement;

export { quark };
