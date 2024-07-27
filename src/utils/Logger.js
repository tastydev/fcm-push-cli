import c from "ansi-colors";

export class Logger {
  static warn(message, ...args) {
    console.log("[LOG]", c.yellow(message), ...args);
  }

  static error(message, ...args) {
    console.log("[LOG]", c.red(message), ...args);
  }

  static success(message, ...args) {
    console.log("[LOG]", c.green(message), ...args);
  }
}
