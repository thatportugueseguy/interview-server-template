import type { StatusCode } from './statusCodes';
export interface ErrorWithServerStatusCode extends Error {
  status: StatusCode;
}
