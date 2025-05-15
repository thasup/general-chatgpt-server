declare module "serverless-http" {
  import { type Express } from "express";

  interface ServerlessOptions {
    binary?: boolean | string[]
    provider?: string
    request?: any
    response?: any
  }

  function serverless (
    app: Express,
    options?: ServerlessOptions
  ): (event: any, context: any) => Promise<any>;

  export = serverless;
}
