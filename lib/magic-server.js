import { Magic } from '@magic-sdk/admin';

const magicAdmin = new Magic(process.env.MAGIC_SECRET_API_KEY);

export default magicAdmin;
