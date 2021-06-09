class GAPIScriptError extends Error {
  constructor({
    message, url, line, column, error,
  }: {
    message: string | Event
    url?: string
    line?: number
    column?: number
    error?: Error
  }) {
    super(error?.message);
    this.errMessage = message;
    this.url = url;
    this.line = line;
    this.column = column;
  }

  public errMessage: string | Event

  public url?: string

  public line?: number

  public column?: number
}
export default function loadGapiScript(): Promise<typeof gapi> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = () => {
      if (window.gapi) {
        resolve(window.gapi);
      } else {
        reject();
      }
    };
    script.onerror = (message, url, line, column, error) => {
      reject(new GAPIScriptError({
        message,
        url,
        line,
        column,
        error,
      }));
    };
    document.getElementsByTagName('head')[0].appendChild(script);
  });
}
