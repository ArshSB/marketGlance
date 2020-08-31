function configureMap() {

    /*
    Dynamically add map API to HTML and load map through a callback function
     */

    //API key is restricted to only be used for this application
    const key = 'https://maps.googleapis.com/maps/api/js?' +
        'key=AIzaSyC4lx5Thi59RLievNBGwRzSoT8_Ts8ZGFU' +
        '&libraries=places&callback=initialize';

    const script = document.createElement('script');
    script.src = key;

    script.async = false; //to avoid unforeseen errors

    document.head.appendChild(script);

}

export { configureMap };