

import {inject} from 'aurelia-framework';
import {DataServices} from './data-services';

@inject(DataServices)
export class Galleries {
   constructor(data) {
        		this.data = data;
        		this.GALLERY_SERVICE = 'galleries';
                this.galleriesArray = [];

            }
            

    async save(gallery){
		if(gallery){
			if(!gallery._id){
				let serverResponse = await this.data.post(gallery, this.GALLERY_SERVICE);
		if(!serverResponse.error){
			this.galleriesArray.push(serverResponse);
		     }
		           return serverResponse;
		 }else{
			 let serverResponse = await this.data.put(gallery, this.GALLERY_SERVICE + "/" +gallery._id);
			  return serverResponse;
		 }
}}


async getUserGalleries(id){
		let response = await this.data.get(this.GALLERY_SERVICE + "/user/" + id);
		if(!response.error && !response.message){
			this.galleriesArray = response;
		}
       }
       
async deleteGallery(id){
		let response = await this.data.delete(this.GALLERY_SERVICE + "/" + id);
		if(!response.error){
			for(let i = 0; i < this.galleriesArray.length; i++){
				if(this.galleriesArray[i]._id === id){
					this.galleriesArray.splice(i,1);
				}
			}
		}
	}

}
