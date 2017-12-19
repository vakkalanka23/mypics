import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {AuthService} from 'aurelia-auth';
import {pics} from '../resources/data/pics';

@inject(Router,pics,AuthService)
export class pic {
  constructor(router,pics,auth) {
  this.router = router;
  this.pics = pics;
  this.auth = auth;
  this.user = JSON.parse(sessionStorage.getItem('user'));
  this.showList = true;
  this.showForm = false;
  this.editTodoForm = false;
  this.showCompleted = false;
  }
async activate(gallery){
		await this.pics.getGallerypics(JSON.parse(sessionStorage.getItem('gallery'))._id);
	}




   createpic(){	
		this.picObj = {
			galleryId: JSON.parse(sessionStorage.getItem('gallery'))._id
			
		}
		this.showList = false;
		this.showForm = true;		
   }

   async savepic(){
        if(this.picObj){       
            let response = await this.pics.save(this.picObj);
            if(response.error){
                alert("There was an error creating the pic");
            } else {
                var galleryId = JSON.parse(sessionStorage.getItem('gallery'))._id;
                var picId = response._id;
                if(this.filesToUpload && this.filesToUpload.length){
                    await this.pics.uploadFile(this.filesToUpload, galleryId,picId );
                    this.filesToUpload = [];
                }
            }
            this.showList = true;
			this.showForm = false;
        }
    }


	backToList(){
		this.router.navigate('list');
	}

	 back(){
		 this. showList = true;
		  this.showForm = false;
	 }

	  editpic(pic){
        this.picObj = pic;
        this. showList = false;
		this.showForm = true;
      }

   deletepic(pic){
        this.pics.deletepic(pic._id);
    }

	 changeFiles(){
    	this.filesToUpload = new Array(); 
    	this.filesToUpload.push(this.files[0]);
	}
	removeFile(index){
    	this.filesToUpload.splice(index,1);
    }
    
    logout(){
        sessionStorage.removeItem('user');
        this.auth.logout();
       }
       
}