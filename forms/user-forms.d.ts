import type { FormValidations } from '@sotaoi/omni/input/base-input';

declare const user: { [key: string]: () => Promise<FormValidations> };

export { user };
