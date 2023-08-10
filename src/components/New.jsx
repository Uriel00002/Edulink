import React from "react";

export const New = () => {



    
 


    return(

        <React.Fragment>

                <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
                <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
                <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

                <div className="container">
                    <div className="row">
                        <h2>Carrousel Bootstrap 4 with Thumbnails</h2>
                    </div>
                </div>
                <br/>
                <div className="container">

                    <div className="col-sm-12">
                        <h3>RELATED POSTS</h3>
                    </div>
                    <hr/>	
                    <div className="col-sm-12">
                        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                <div className="carousel-inner" role="listbox">
                    <div className="carousel-item active">
                        <div className="row">
                            <div className="col-sm-3">
                                <img className="d-block img-fluid" src="http://placehold.it/400x400" alt="First slide"/>
                                <div className="text-center">
                                    <h6 className="card-title">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h6>
                                </div>
                            </div>
                            
                            <div className="col-sm-3">
                                <img className="d-block img-fluid" src="http://placehold.it/400x400" alt="First slide"/>
                                <div className="text-center">
                                    <h6 className="card-title">Lorem ipsum dolor sit amet.</h6>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <img className="d-block img-fluid" src="http://placehold.it/400x400" alt="First slide"/>
                                <div className="text-center">
                                    <h6 className="card-title">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h6>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <img className="d-block img-fluid" src="http://placehold.it/400x400" alt="First slide"/>
                                <div className="text-center">
                                    <h6 className="card-title">Lorem ipsum dolor sit amet.</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="row">
                            <div className="col-sm-3">
                                <img className="d-block img-fluid" src="http://placehold.it/400x400" alt="First slide"/>
                                <div className="text-center">					
                                    <h6 className="card-title">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h6>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <img className="d-block img-fluid" src="http://placehold.it/400x400" alt="First slide"/>

                            </div>
                            <div className="col-sm-3">
                                <img className="d-block img-fluid" src="http://placehold.it/400x400" alt="First slide"/>
                            </div>
                            <div className="col-sm-3">
                                <img className="d-block img-fluid" src="http://placehold.it/400x400" alt="First slide"/>
                            </div>
                        </div>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
                </div>
                </div>
                </div>
                <hr/>

        </React.Fragment>
    );

}
