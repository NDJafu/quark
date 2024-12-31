/**
 * Styling atrributes types
 */
interface StyleAttributes {
  [key: string]: string | number;
}

interface QuarkDOM {
  style?: StyleAttributes;
  src?: string;
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
 * A regular element
 *
 * ```js
 * import { quark } from 'quark.js'
 *
 * document.querySelector("#element").innerHTML = quark({
 *  "div": {
 *    "h1": "Hello world!",
 *  },
 * });
 * ```
 *
 * An image element
 *
 * ```js
 * const quarkImg = quark({
 *  "img#example": {
 *    src: "./example.png",
 *  },
 * });
 * ```
 * @param json The JSON object to parse as HTML
 * @returns The DOM element generated from the JSON object.
 */
declare function quark(json: Record<string, QuarkDOM | string>): HTMLElement;

export { quark };
