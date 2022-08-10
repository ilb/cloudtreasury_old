import nc from 'next-connect';
import { onError, onNoMatch } from '../../../libs/middlewares.mjs';
import { createScope, processUsecaseApiInstance } from '../../../libs/usecases.mjs';
import CalculateFairPrice from '../../../src/usecases/CalculateFairPrice.mjs';

export default nc({ onNoMatch, onError }).post(async (req, res) => {
  const context = { query: { ...req.query, ...req.body }, req };
  const scope = await createScope(context.req);
  const usecase = new CalculateFairPrice(scope.cradle);

  const data = await processUsecaseApiInstance(context, usecase);
  res.status(200).json(data);
});
