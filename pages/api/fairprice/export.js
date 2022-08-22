import nc from 'next-connect';
import { onError, onNoMatch } from '../../../libs/middlewares.mjs';
import { createScope, processUsecaseApiInstance } from '../../../libs/usecases.mjs';
import GetStockValuationsReport from '../../../src/reports/usecases/GetStockValuationsReport.mjs';

export default nc({ onNoMatch, onError }).get(async (req, res) => {
  const context = { query: { ...req.query, ...req.body }, req };
  const scope = await createScope(context.req);
  const usecase = new GetStockValuationsReport(scope.cradle);

  const data = await processUsecaseApiInstance(context, usecase);
  res.setHeader('Content-Type', data.contentType);
  res.setHeader('Content-Disposition', `attachment; filename=${data.attachmentName}`);
  res.status(200).send(data.content);
});
