
const serviceSelected = "";

export const editService = () => {



    function getSelectedService() {
        return serviceSelected;
    }


    function setSelectedService(serviceInput) {
        serviceSelected = serviceInput;
    }


}





/*

export class EditService {

    constructor(data) {
        this.data = data;
        this.getSelectedService = this.getSelectedService.bind(this);
        this.setSelectedService = this.setSelectedService.bind(this);
    }

    getSelectedService() {
        return this.data;
    }

    setSelectedService(dataInput) {
        this.data = dataInput;
        console.log('prova lettura id dal servizio: ', this.data);
    }
}


*/

