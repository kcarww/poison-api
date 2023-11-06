// express-session.d.ts
import 'express-session';
import session from 'express-session';

import { Store, SessionData } from 'express-session';
import { Options } from 'express-mysql-session'; 

declare module 'express-session' {
  interface SessionOptions {
    userId?: number; 
  }
}
