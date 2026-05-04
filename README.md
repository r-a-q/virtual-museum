# 3D Virtual Museum

This 3D Virtual Museum generates 6 paintings from the Harvard Art Museum API. Users can walk through the gallery, clicking on each painting to learn more.

https://github.com/user-attachments/assets/986dfb4b-acdc-4d7a-9f46-237af7336665


## How It's Made:

Tech Used: HTML, CSS, JavaScript, React, Reach Three Fiber, Vite, Webstorm (IDE)

The idea began after being inspired by the Smithsonian's Voyager platform, which brings the museum experience to visitors. 
I pulled a 3D frame built by Fred Drabble from Sketch Fab to display the paintings.

(Source: https://sketchfab.com/3d-models/picture-frame-1520-dimensions-2a75286422e64948b1d6626bc9c6d47d)

As of now, users use keys W, A, S, and D to navigate through the gallery. When a user wants to learn more about a certain painting, they can hover the crosshair over the image and click to reveal a 2D pop-up displaying relevant information about the painting, including: title, artist, year painted, and the period the painting is from.

Accessibility:
In learning more about human-centered design, I'm making accessibility a priority from the get-go. In this development stage, I realized the Harvard Museum of Art API does not provide alternative text (alt text) for many of the paintings. My solution has been to provide the painting to the Claude API and have Claude generate alt text for the paintings in the gallery. 

Updated: Moved from showing alt text as a description to the alt attribute in the source code:

https://github.com/user-attachments/assets/2ed622e8-7381-484a-a3e3-b9edb65ace5b

Requirements to Run:
Since the virtual museum pulls data from the Harvard Art Museum API, you will need to get your own key from them. More information here: https://harvardartmuseums.org/collections/api

This program also generates alt text from the Claude API. You will also need to get this from the Claude API token.

## Optimizations
* Cached AI-generated alternative texts after the user clicked into the paneling. Reduced loading times for alternative texts and the program in general

## Next Steps
* Create a loading/welcome screen when the user first visits the application
* Create a guided tour option - user uses tab to enter a guided tour to make keyboard navigation simpler and easier
* ~~Timing for alt text generation - find a way to generate alt text for all paintings displayed to embed alt text into paintings before they are displayed. Possible use of conditional rendering~~
* Dynamically change the sizing of each frame to display the painting correctly
* Create a "next gallery" feature to generate 6 new images
* Implement Voyager for a more 3D experience

## Lessons Learned:
* Project Management - had to learn how to manage my time by balancing school and making progress on the project. I drafted a timeline to learn a new skill, including when to start working and which milestones I wanted to hit when.
* Learning Quickly - Wanted to learn React & React Three Fiber to render 3D frames and create the museum itself
* Thinking about the person behind the screen - I was able to put into practice what I've learned from my Computer Ethics class, thinking of the experience of those using my program. This is why I prioritized accessibility and spent time generating alt text with AI. This project helped me exercise that skill, which I want to continue building as I grow as a developer.
