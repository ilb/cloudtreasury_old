class CustomError extends Error {
  constructor(message, name) {
    super(message);
    this.name = name;
  }
}

export class ValidationError extends CustomError {
  constructor(message) {
    super(message, 'ValidationError');
  }
}

export class BadRequestError extends CustomError {
  constructor(message) {
    super(message, 'BadRequestError');
  }
}
