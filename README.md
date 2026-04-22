# 3D Virtual Museum

This 3D Virutal Museum generates 6 paintings from the Harvard Art Museum API. Users can walk through the gallery, clicking on each painting to learn more.

https://github.com/user-attachments/assets/64e8902c-35cb-4571-bf92-86476b3f4c20


## How It's Made:

Tech Used: HTML, CSS, JavaScript, React, Reach Three Fiber, Vite, Webstorm (IDE)

The idea started after being inspirted by the Smithsonian's Voyager platform: bringing the museum experience to visitors. 
I pulled a 3D frame built by Fred Drabble from Sketch Fab (Source: https://sketchfab.com/3d-models/picture-frame-1520-dimensions-2a75286422e64948b1d6626bc9c6d47d) to have a frame to display the paintings in. 


## Optimizations
* Cached AI genreated alternative texts after user clicked into paniting. Reduced loading times for alternative texts and the program in general

## Next Steps
* Create loading/welcome screen when user first visits application
* Create a guided tour option - user uses tab to enter a guided tour to make keyboard navigation simpler and easier
* Timing for alt text generation - find a way to generate alt text for all paintings displayed to embed alt text into paintings before displayed. Possible use of conditional rendering

## Lessons Learned:
