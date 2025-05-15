/* eslint-disable @typescript-eslint/method-signature-style */
declare module "colors" {
  interface Colors {
    yellow(text: string): string
    red(text: string): string
    green(text: string): string
    blue(text: string): string
    white(text: string): string
    gray(text: string): string
    grey(text: string): string
    black(text: string): string
    magenta(text: string): string
    cyan(text: string): string
    rainbow(text: string): string
    zebra(text: string): string
    random(text: string): string
    bold(text: string): string
    italic(text: string): string
    underline(text: string): string
    strikethrough(text: string): string
    inverse(text: string): string
    dim(text: string): string
    reset(text: string): string
    brightRed(text: string): string
    brightGreen(text: string): string
    brightYellow(text: string): string
    brightBlue(text: string): string
    brightMagenta(text: string): string
    brightCyan(text: string): string
    brightWhite(text: string): string
  }

  const colors: Colors & {
    [key: string]: (text: string) => string
    enable(): void
    disable(): void
    setTheme(theme: Record<string, string>): void
  };

  export = colors;
}
