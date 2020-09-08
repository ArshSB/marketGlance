function addClustering(markers, map) {

    /*
    Following code applies clustering on all the markers in the array using MarkerClustererPlus external library

    Each cluster returns the mean price of all the houses inside it,
    allowing the user to determine the relative expensiveness of many residential areas in Winnipeg
     */


    /*
    This function is used to override the default calculator used for clustering

    Originally returns the total number of houses in the cluster
    but function is slightly changed to instead return mean house price

    Lines commented with '%' is my addition, the rest of the code is unchanged
     */

    MarkerClusterer.CALCULATOR = (clusterMarkers, numStyle) => {
        let index = 0;
        const count = clusterMarkers.length;
        let houseTotalPrice = 0;   // %
        let dv = count;

        for(let i = 0; i < count; i++) { //%

            //holds total price of all houses in the cluster
            houseTotalPrice += parseInt(clusterMarkers[i].getTitle());

            /*
            Steps: 1) the marker's title is retrieved which holds the house sale price in form $500,000
                   2) RegEx is used to replace any non digits with empty space, now in form 500000
                   3) string is converted to integer so mathematical operations can be to applied to it
             */

        }

        while (dv !== 0) {
            dv = Math.floor(dv / 10);
            index++;
        }

        let mean = (Math.round(houseTotalPrice/count/1000)) + "k" ; //%

        index = Math.min(index, numStyle);

        return {
            text: mean, //%
            index: index
        };
    }

    let markerCluster = new MarkerClusterer(map, markers,
        {
            imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
            gridSize: 150,   //dictates how 'big' the clusters should be
            maxZoom: 18 ,    //max zoom at which clusters are disabled
        });
}

export { addClustering };
