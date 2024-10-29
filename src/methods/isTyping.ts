/**
 * Return if the user is typing
 */
const isTyping = () => {
  const tagName = document.activeElement?.tagName ?? "";

  /**
   * HTML tags to be detected as typing
   */
  const inputTags = ["INPUT", "TEXTAREA", "SELECT"];

  if (inputTags.indexOf(tagName) !== -1) {
    return true;
  }
};

export default isTyping;
