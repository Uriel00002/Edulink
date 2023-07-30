import React from "react";
import '../assets/css/footer.css'


class Footer extends React.Component{

    render(){

        return(

            <section id="footer">
            < div class="container">

                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-5">
                        <ul className="list-unstyled list-inline social text-center">
                            <li className="list-inline-item"><a href="https://www.facebook.com/UTTIJ?mibextid=b06tZ0"><i class="fa fa-facebook"></i></a></li>
                            <li className="list-inline-item"><a href="https://twitter.com/UTTlaxcala?t=f_BI5KM8tZdnc66C5zo5FA&s=09"><i class="fa fa-twitter"></i></a></li>
                            <li className="list-inline-item"><a href="https://instagram.com/ut_tlaxcala?igshid=MzRlODBiNWFlZA=="><i class="fa fa-instagram"></i></a></li>
                            <li className="list-inline-item"><a href="https://www.fiverr.com/share/qb8D02" target="_blank"><i class="fa fa-envelope"></i></a></li>
                        </ul>
                    </div>
                    <hr/>
                </div>	
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 text-center text-white">
                        <p><u><a href="https://www.nationaltransaction.com/">UTT</a></u>Universidad Tecnologica de Tlaxcala</p>
                        <p className="h6">© Todos los derechos reservados.<a class="text-green ml-2" href="https://www.sunlimetech.com" target="_blank">Sunlimetech</a></p>
                    </div>
                    <hr/>
                </div>	

            </div>
        </section>

        );

    }

}

export default Footer;