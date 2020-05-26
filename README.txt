Things wasn't able to complete:
-- protractor end to end test
-- some of the unit tests fail (not sure why but I suppose I'll need to do some digging)

otherwise, pretty much everything else was complete!
to run:

import the NYCTripCalculator solution in visual studio. For now I've just run it in debug mode through iisexpress. It should serve on port 44314 by default. The main endpoint that the api serves is this one, to get the price:
 https://localhost:44314/api/NYCTripCalculation/PostPrice

if the port is different or the url needs to be changed for any reason, it must also be changed correspondingly on the typescript file: fare-calculation-service.service.ts

to run:
so with visual studio running, open up the folder NYCTripCalculatorPortal in a shell environment. run with the command:
ng serve.
this should run it off of port 4200. if it has to run out off a different port, the url in the startup.cs file should also be changed.

my apologies for getting this to you guys so late and only having it be partially done, I've been spending a lot of my time volunteering these past two weeks.

but thank you so much for the opportunity, and I learned a whole bunch and had a lot of fun doing this project! 

