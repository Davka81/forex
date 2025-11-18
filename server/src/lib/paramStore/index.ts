import { APP_ENV } from '../../utils/constants';
import LocalParamStore from './LocalParamStore';
import ProdParamStore from './ProdParamStore';

const prodStore = new ProdParamStore();
const localStore = new LocalParamStore();
console.log('NODE_ENV:::', process.env.NODE_ENV);

const paramStore = APP_ENV == 'prod' ? prodStore : localStore;

export default paramStore;