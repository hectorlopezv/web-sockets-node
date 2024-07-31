import crypto from "crypto";
import { NextFunction, Request, Response } from 'express';
import { envs } from "../../config/envs";

 
const secretKey = envs.SECRET_TOKEN;
 
export class GithubSha256Middleware {
 
  static verifySignature = async ( req: Request, res: Response, next: NextFunction ) => {
    const expectedSignature = "sha256=" + crypto.createHmac( "sha256", secretKey )
      .update( JSON.stringify( req.body ) )
      .digest( "hex" );
 
    const signature = req.headers[ "x-hub-signature-256" ];
    if ( signature !== expectedSignature ) {
      return res.status( 401 ).send( "Unauthorized" );
    }
 
    next();
 
  };
}