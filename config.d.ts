declare const config: (key: string) => any;
declare const init: (
  setupFn: (configs: { [key: string]: any }) => void,
  fs: any,
  path: any,
  extraVars: { [key: string]: string },
) => void;

export { config, init };
