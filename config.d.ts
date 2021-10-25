declare const config: (key: string) => any;
declare const init: (
  setupFn: (configs: { [key: string]: any }) => void,
  fs: any,
  path: any,
  extraVars: { [key: string]: string },
) => void;
declare const env: (envvar: undefined | null | string) => null | string | boolean | { [key: string]: any };

export { config, init, env };
