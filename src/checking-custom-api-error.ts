import { CustomAPIError } from './error';

export function isCustomAPIError(err: unknown): err is CustomAPIError {
  return (
    err instanceof Error &&
    'statusCode' in err &&
    typeof (err as any).statusCode === 'number'
  );
}
