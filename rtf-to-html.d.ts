declare module '@iarna/rtf-to-html' {
  export function fromString(rtf: string, callback: (err: Error | null, html: string) => void): void;
}