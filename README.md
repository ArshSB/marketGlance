# MarketGlance
[MarketGlance](https://marketglance.netlify.app/) visualizes recently sold houses in Winnipeg using Google Maps API and data provided by the City of Winnipeg

![Sample image](images/sample_image.PNG)

More specifically, it plots 19,177 houses sold in the 2016-2018 period and their respective sale data on to Google Maps. 

## General information

MarketGlance is a simple tool that one can use to determine sale prices of recently sold houses in Winnipeg. 

It is especially useful at visualizing the state of the housing market in Winnipeg and help one figure out a fair price of a house based on the past sale history of other houses in the surrounding area. One can also compare the sale price of a house with its tax assessment value for useful insights.

House sale data was retreived from City of Winnipeg website and processed using Pandas. JavaScript and Maps API was used to plot the data on to Google Maps and Bootstrap was utilized to build a responsive front-end.

## Potential future plans

I plan to update the map with data from the 2018-2020 period when it is released to the public by the City of Winnipeg. Additionally, if I find house sale data from other cities I may also plot them to their own maps.

I also plan to move the backend from local browser to cloud server which will help speed up the loading times and increase responsiveness of the map. 

## Built with

* [Bootstrap](https://getbootstrap.com/) - utilized for front end
* [Google Maps API for JavaScript](https://developers.google.com/maps/documentation/javascript/overview) - for plotting house sale data
* [Pandas](https://pandas.pydata.org/) - for processing and analysis of sale data
* [City of Winnipeg sale data](http://www.winnipegassessment.com/AsmtTax/English/SelfService/SalesBooks.stm)

## Attributions

* [Netlify](https://www.netlify.com/) - for hosting the app
* [Various icons and images](https://iconscout.com) - for free, high definition icons and images
* [Houses by Nick. V](http://houses.nickv.codes/) - for original idea and implementation
