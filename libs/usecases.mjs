import application from './application.mjs';
import { validateBySchema } from './utils/schemaValidation.mjs';
import logger from './logger';

/**
 * create scope for usecase processing
 * @param req The HTTP IncomingMessage object
 * @returns
 */
export async function createScope(req, withSession = true, addScope = null) {
  return application.createScope(req, withSession, addScope);
}

/**
 * process usecase by name (from appication context)
 * @param context contex from getServerSideProps
 * @param useCaseName
 * @returns
 */
export async function processUsecase(context, useCaseName) {
  const scope = await createScope(context.req);
  const usecase = scope.resolve(useCaseName);
  return processUsecaseInstance(context, usecase);
}

/**
 * Исполнить usecase для getServerSideProps
 * @param context как в https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
 * @param usecase экземпляр usecase
 * @returns
 */
export async function processUsecaseInstance(context, usecase) {
  const request = context.query;
  // проверка прав доступа при наличии функции accessible
  if (usecase.accessible) {
    const accessible = await usecase.accessible(request);
    if (!accessible) {
      // FIXME - как то возвращать 403 (нет доступа)
      return {
        notFound: true
      };
    }
  }
  const props = {
    request,
    response: await usecase.process(request),
    schema: await usecase.schema(request)
  };
  return { props };
}

export async function processUsecaseApi(context, usecaseName) {
  const scope = await createScope(context.req);
  const usecase = scope.resolve(usecaseName);
  return processUsecaseApiInstance(context, usecase);
}

export async function processUsecaseApiInstance(context, usecase) {
  const request = context.query;
  return await usecase.process(request);
}

export async function processUsecaseApiInstance2({ req, res }, usecase) {
  const request = { ...req.query, ...req.body };
  const schema = await usecase.schema(request);
  // проверка прав доступа при наличии функции accessible
  if (usecase.accessible) {
    const accessible = await usecase.accessible(request);
    if (!accessible) {
      res.status(403).end();
      return;
    }
  }
  try {
    if (schema) {
      validateBySchema(request, schema);
    }
    const result = await usecase.process(request);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(204);
    }
  } catch (err) {
    logger.error(err);
    const errName = err.constructor.name;
    if (errName == 'BadRequestError' || errName == 'ValidationError') {
      //TODO: json responses if client accepts application/json?
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.status(400).send(err.message);
    } else {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.status(500).send('Internal error');
    }
  }
}

export const processSchema = async (context, usecaseName) => {
  const scope = await application.createScope(context.req);
  const usecase = scope.resolve(usecaseName);
  return processSchemaInstance(context, usecase);
};

export const processSchemaInstance = async (context, usecase) => {
  const request = context.query;
  const props = {
    request,
    schema: await usecase.schema(request)
  };
  if (usecase.prepare) {
    props.response = await usecase.prepare(request);
  }
  return { props };
};
