import nc from 'next-connect';
import { onError, onNoMatch } from 'libs/middlewares.mjs';
import { createScope, processUsecaseApiInstance2 } from 'libs/usecases.mjs';
import GetDictionaries from 'src/usecases/GetDictionaries.mjs';

const handler = nc({ onError, onNoMatch });
//'/dictionaries/:code/dictionaries',
export default handler.get(async (req, res) => {
  const scope = await createScope(req);
  const usecase = new GetDictionaries(scope.cradle);
  await processUsecaseApiInstance2({ req, res }, usecase);
});
