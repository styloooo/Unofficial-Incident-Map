# Unofficial-Incident-Map
Node.js app that maps incident reports from Unofficial 2015 in C-U

This app uses the Google Maps API to plot ticketing information from Unofficial. Charges are plotted as circles with radii proportionally 
sized according to the number of citations at a location. The radii are defined by sqrt(charge_frequency * 500). 
When a circle is clicked, an info window appears that lists the circle's location and the charges at the location. 
