const ROOT_KEY = "@OneClickDrive";
export const LS_KEY = {
  auth_token: `${ROOT_KEY}:auth`,
  user_type: `${ROOT_KEY}:type`,
};

export const RESPONSE_STATUS_CODE = {
  success: 200,
  badRequest: 400,
  internalServerError: 500,
  unAuthorized: 401,
  validationError: 422,
};

export const RESPONSE_STATUS = {
  success: "SUCCESS",
  failure: "FAILURE",
  serverError: "SERVER_ERROR",
  badRequest: "BAD_REQUEST",
  recordNotFound: "RECORD_NOT_FOUND",
  validationError: "VALIDATION_ERROR",
  unauthorized: "UNAUTHORIZED",
};
