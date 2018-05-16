import React from 'react';
import {Image,Carousel} from 'react-bootstrap';

import image from '../../../images/home.jpg';
import image2 from '../../../images/1.jpg';
import image3 from '../../../images/PAR373321.jpg';

let imgSize = {
    width:'auto',
height:'auto'
};

export const HomeComponent = () => {

    return (

        <div>
        <Carousel>
        <Carousel.Item>
            <img style={imgSize} src={image} />
            <Carousel.Caption>
                <h3>Solamente del grandissimo relax</h3>
                <p>Non c'è niente di meglio di un week-end nei nostri centri benessere</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img style={imgSize}  src={image2} />
            <Carousel.Caption>
                <h3>Massaggi, trattamenti di bellezza e molto altro</h3>
                <p>Regalati dei puri momenti di terra piatta</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img style={imgSize} src={image3} />
            <Carousel.Caption>
                <h3>Una mela al giorno leva il medico di torno</h3>
                <p>Speriamo di no, altrimenti non potreste beneficiare dei nostri dietologi altamente qualidicati</p>
            </Carousel.Caption>
        </Carousel.Item>
    </Carousel>
        </div>

);
}