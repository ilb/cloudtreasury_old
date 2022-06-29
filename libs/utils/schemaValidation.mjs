import ajv from './ajv.mjs';
import { ValidationError } from './error.mjs';

export function stringifyAjvErrors(ajvErrors) {
  const errorMessages = [];

  for (const err of ajvErrors) {
    const errProperty = (function () {
      const endpoints = err.dataPath.split('/');
      return endpoints[endpoints.length - 1];
    })();

    switch (err.keyword) {
      case 'required':
        errorMessages.push(`В запросе отсутствует ${err.params.missingProperty}`);
        break;
      case 'type':
        errorMessages.push(`Тип ${errProperty} должен быть ${err.params.type}`);
        break;
    }
  }
  if (errorMessages.length === 0) {
    errorMessages.push('Ошибка при валидации данных');
  }
  return errorMessages;
}

export function validateBySchema(object, schema) {
  const validate = ajv.compile(schema);
  if (validate(object)) {
    return;
  } else {
    const errorMessages = stringifyAjvErrors(validate.errors);

    let generalError = errorMessages.reduce((acc, msg) => (acc += `${msg}\n`), '');
    generalError = generalError.substring(0, generalError.length - 1);
    throw new ValidationError(generalError);
  }
}
