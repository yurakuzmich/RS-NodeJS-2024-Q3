import 'dotenv/config';
import { get } from 'env-var';

export const envVars = {
  PORT: get('PORT').required().asPortNumber(),
};