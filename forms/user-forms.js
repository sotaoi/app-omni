// const { FormValidations } = require('@sotaoi/omni/input/base-input');
const { validations } = require('@sotaoi/omni/forms/validations');

// const user: { [key: string]: () => Promise<FormValidations> } = {
const user = {
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

module.exports = { user };
