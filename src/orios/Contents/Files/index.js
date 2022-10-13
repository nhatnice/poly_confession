import Axios from '../../Axios';

class Files {
    static async uploadMedia(file) {
        const formData = new FormData(); 
        formData.append( 
          "file", 
          file, 
          file.name 
        ); 

        return await Axios.post(`/files/upload_media`, formData);
    }
}

export default Files;