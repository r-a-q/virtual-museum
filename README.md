# 3D Virtual Museum

This 3D Virutal Museum generates 6 paintings from the Harvard Art Museum API. Users can walk through the gallery, clicking on each painting to learn more.

https://github.com/user-attachments/assets/986dfb4b-acdc-4d7a-9f46-237af7336665


## How It's Made:

Tech Used: HTML, CSS, JavaScript, React, Reach Three Fiber, Vite, Webstorm (IDE)

The idea started after being inspirted by the Smithsonian's Voyager platform: bringing the museum experience to visitors. 
I pulled a 3D frame built by Fred Drabble from Sketch Fab to have a frame to display the paintings in. 
(Source: https://sketchfab.com/3d-models/picture-frame-1520-dimensions-2a75286422e64948b1d6626bc9c6d47d)

As of now, users use keys W, A, S, and D to navigate through the gallery. When a user wants to learn more about a certain painting, they can hover the crosshair over the image and click to revela a 2D pop-up displaying relevant information about the painting, including: title, artist, year painted, and the period painting is from.

Accessibility:
In learning more about human-centered design, I'm how accessible my projects are from the get-go. In this development stage, I realized the Harvard Museum Art API does not provide alternative text (alt text) for many of the paintings. My solution has been to provie the painting to Claude API and have Claude generate alt text for the paintings in the gallery. 
Updated: Moved from showing alt text as a description to alt attribute in source code:

https://github.com/user-attachments/assets/2ed622e8-7381-484a-a3e3-b9edb65ace5b

## Optimizations
* Cached AI genreated alternative texts after user clicked into paniting. Reduced loading times for alternative texts and the program in general

## Next Steps
* Create loading/welcome screen when user first visits application
* Create a guided tour option - user uses tab to enter a guided tour to make keyboard navigation simpler and easier
* ~~Timing for alt text generation - find a way to generate alt text for all paintings displayed to embed alt text into paintings before displayed. Possible use of conditional rendering~~
* Dyamnically change sizing of each frame to display painting correctly
* Create a "next gallery" feature to generate 6 new images

## Lessons Learned:
