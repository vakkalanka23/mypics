import {inject} from 'aurelia-framework';
import {DataServices} from './data-services';

@inject(DataServices)
export class pics {
   constructor(data) {
        		this.data = data;
        		this.PIC_SERVICE = 'pics';
                this.picsArray = [];

   		 }
    async save(pic){
		if(pic){
			if(!pic._id){
				let serverResponse = await this.data.post(pic, this.PIC_SERVICE);
		if(!serverResponse.error){
			this.picsArray.push(serverResponse);
		     }
		           return serverResponse;
		 }else{
			 let serverResponse = await this.data.put(pic, this.PIC_SERVICE + "/" +pic._id);
			  return serverResponse;
		 }
}}

async getGallerypics(id){
    let response = await this.data.get(this.PIC_SERVICE + "/gallery/" + id);
    if(!response.error && !response.message){
        this.picsArray = response;
    }
   }

async uploadFile(files, galleryId, picId){
        let formData = new FormData();
        files.forEach((item, index) => {
	    formData.append("file" + index, item);
        });
    
	let response = await this.data.uploadFiles(formData, this.PIC_SERVICE + "/upload/"  + galleryId + "/"   + picId);
	console.log("this is being called " + this.PIC_SERVICE + "/upload/" + galleryId + "/" + picId);
	return response;
}




       

async deletepic(id){
		let response = await this.data.delete(this.PIC_SERVICE + "/" + id);
		if(!response.error){
			for(let i = 0; i < this.picsArray.length; i++){
				if(this.picsArray[i]._id === id){
					this.picsArray.splice(i,1);
				}
			}
		}
	}

}