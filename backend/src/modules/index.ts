import makeExecutableSchemaFromModules from '../utils/modules';

import bill from './bill';
import installment from './installment';
import user from './user';

export default makeExecutableSchemaFromModules({
  modules: [user, bill, installment],
});
