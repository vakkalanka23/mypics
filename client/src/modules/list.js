import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {AuthService} from 'aurelia-auth';
import {Galleries} from '../resources/data/galleries';

@inject(Router,Galleries,AuthService)
export class List {
  constructor(router,galleries,auth) {
	  
  this.router = router;
  this.galleries = galleries;
  this.auth = auth;
  this.message = 'Galleries';
  this.user = JSON.parse(sessionStorage.getItem('user'));
  this.showList = true;
  this.showForm = false;
  this.editTodoForm = false;
  this.showCompleted = false;
  }

  
async activate(){
		await this.galleries.getUserGalleries(this.user._id);
	}

   logout(){
	sessionStorage.removeItem('user');
	this.auth.logout();
   }


  createGallery(){	
		this.galleryObj = {
			gallery: "",
			description: "",
			 userId: this.user._id,
		}
		this.showList = false;
		this.showForm = true;		
   }
  


async saveGallery(){
        if(this.galleryObj){       
            let response = await this.galleries.save(this.galleryObj);
            if(response.error){
                alert("There was an error creating the Gallery");
            } else {
              
            }
            this.showList = true;
			this.showForm = false;
        }
    }


back(){
		 this. showList = true;
		  this.showForm = false;
     }
     
editGallery(gallery){
        this.galleryObj = gallery;
        this. showList = false;
		this.showForm = true;
      }

	

checkGallery(gallery) {  
	  sessionStorage.setItem("gallery", JSON.stringify(gallery));
  	  this.router.navigate('pic');   
    };

deleteGallery(gallery){
        this.galleries.deleteGallery(gallery._id);
    }

completeGallery(gallery){
    	gallery.completed = !gallery.completed;
    	this.galleryObj = gallery;
    	this.saveGallery();
	 }
	
changeFiles(){
    	this.filesToUpload = new Array(); 
    	this.filesToUpload.push(this.files[0]);
    }
    
removeFile(index){
    	this.filesToUpload.splice(index,1);
	}

}
