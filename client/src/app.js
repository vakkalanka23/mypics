import {AuthorizeStep} from 'aurelia-auth';

export class App {

  configureRouter(config, router) {
    this.router = router;
    config.addPipelineStep('authorize', AuthorizeStep); 
    config.map([
      { 
   route: ['', 'home'],
   moduleId: './modules/home',
   name: 'Home' 
      },


      {
        route: 'pic',
        moduleId: './modules/pic',
        name: 'pic',
        auth: false 
     },

      
  { route: 'list',
   moduleId: './modules/list',
   name: 'List', 
   auth: true 
     }
    ]);
  }
}