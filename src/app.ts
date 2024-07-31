import express from "express"
import { envs } from "./config/envs";
import { GithubController } from "./presentation/github/controller";
import { GithubSha256Middleware } from "./presentation/middleware/github.middleware";

(()=>{
  
    main();
})()

function main(){
  const app = express();

  const controller = new GithubController();

  app.use( express.json() );

  app.post('/api/github',GithubSha256Middleware.verifySignature, controller.webhookHandler );



  app.listen( envs.PORT, () => {
    console.log(`App running on port ${ envs.PORT }`);
  })
}