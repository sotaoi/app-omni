import { FormValidations } from '@sotaoi/omni/input';
import { validations } from '@sotaoi/omni/forms/validations';

const user: { [key: string]: () => Promise<FormValidations> } = {
  'user-register-form': async () => ({
    email: [...validations.user.email, { method: 'required' }],
    name: [...validations.user.name],
    password: [...validations.user.password, { method: 'required' }],
    // todo lowprio: add image type validation to validation fns
    avatar: [],
  }),
  'user-update-form': async () => ({
    email: [...validations.user.email, { method: 'required' }],
    name: [...validations.user.name],
    // todo lowprio: add image type validation to validation fns
    avatar: [{ method: 'required' }, { method: 'file', args: { type: 'image', maxSize: 1000000 } }],
  }),
  'auth-user-form': async () => ({
    email: [{ method: 'required' }],
    password: [{ method: 'required' }],
    rememberMe: [...validations.user.rememberMe],
  }),
};

export { user };
