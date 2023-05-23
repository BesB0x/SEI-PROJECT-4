# SEI Project 4: Atmos

## Overview

 
For our last project on the General Assembly SEI we were tasked to make a full-stack application, solo. The front-end had to be powered by React, and it had to consume a PostgreSQL database made by me, implemented using Django and Django RestFramework. I opted to create an app where users can upload and experiment with  ‘atmospheres’. An atmosphere consists of a piece of audio and a photograph that are viewed in conjunction. The user can then add any atmospheres on the site to their personal collection, and in another part of the app they can process the audio of any atmosphere live using audio effects whilst they view the photo in full screen.

## Brief

* Choose to work solo or in a team.
* Build a full-stack application by making a backend and front-end.
* Use a Python Django API using Django REST Framework to serve the data from a Postgres database.
* Consume the API with a separate front-end built with React.
* Be a complete product which most likely means multiple relationships and CRUD functionality for at least a couple of models.
* Be deployed online so it's publicly accessible.


## Deployment
<a href='https://atm0s.herokuapp.com/' > Explore For Yourself!</a>

## Timeframe
 
Timeframe : 1.5 Weeks
 
Working Team: Solo project

## Technologies used:

### Front-End
CSS
SCSS
Bootstrap
HTML
JavaScript
Tone.js
React
FsLightbox
React-Modal
React-Slider
Cloudinary
Axios 
 
### Back-End
Python
Django
Django REST framework
PostreSQL
PyJWT
 
### Other
Heroku
Table Plus
Insomnia
Figma
Trello


## Installation
Install back-end dependencies: ```pipenv install```
Enter the project shell: ```pipenv shell```
Make migrations: ```python manage.py makemigrations```
Migrate: ```python manage.py migrate```
Load record info from database: ```python manage.py loaddata records/seeds.json```
Load record user info from database: ```python manage.py loaddata users/seeds.json```
Run server: ```python manage.py runserver```
Navigate to client folder: ```cd client```
Install front-end dependencies: ```npm i```
Start front-end server: ```npm run start```
phew! done.


## Planning

### Come up with the concept
 
Since this was the last project of our course, I wanted to challenge myself, create something I would genuinely want to use, and make  something I’ve not seen on the internet before. Something to do with sound and art was a must, and with that seed I took myself off the pub to brainstorm. In my previous project we’d made an app where users could interact via a comments section, and I really liked the social element of this, and I wanted a section of the app just for the individual user, where they’d have powers of customisation. I wanted these so that I could use the energy that lies within the dynamic of social and personal interaction with an app - I wanted my app to be a living thing more than anything so it needed living things to interact with !
 
So now I had the concept of something artistic, something social, and something where the user can have creative input. I’m really interested in combining art forms to create more well-rounded artistic experiences, and I love the idea that art is everywhere, we just don’t necessarily feel it all the time! Therefore, I decided to make an app where one can lean into looking for art in the everyday, by pairing audio and imagery together to create the feeling of an environment. You could have a photo of the inside of a church and pair it with an audio recording of what was happening when you were there.. Or you could upload audio of a busy street, for example, and undercut the sense of quiet and peace that might be there, and create emotional connections that hadn’t been explored previously.
Once I had this concept, I wanted to dig deeper into playing with an atmosphere, searching for novel emotion. I therefore decided to add in the ability to put sound effects on the audio. I’ve been using Ableton Live for the last 3 years and have built up a few ideas for my own take on how to process audio; I saw an opportunity here to give them a go!
 
 
 
### Some Noteworthy Inspiration
 
Now that I had my idea, I started looking into how to implement it, and looked around for people who may have done a similar thing. The <a href='https://github.com/MaxAlyokhin/public-transport-orchestra/blob/master/'> Public Transport Orchestra </a> was a fascinating example of using everyday life to make music, and <a href='https://github.com/cwilso'> this </a> GitHub Repo gave me an entry into how to go about coding sound effects.
 
### Wireframe
 
Since there were a few moving parts to this project and plenty of unknowns – I had to find and teach myself a way of manipulating audio – I decided to first do a  wireframe with all my biggest stretch goals, and then strip off the least necessary ones for a mid-level stretch goal, and then strip every part of the concept that wasn’t absolutely necessary for an MVP. I had previously worked the other way round, starting with an MVP and then thinking about stretch goals, however I really wanted to be ambitious with this project! Before I thought about UI, I figured out my models and relationships that would be used in the back-end. For the sake of presenting this concept, I’ll talk about this after showing the wireframe.
 
For all versions, I had a main library, to display all atmospheres, and a user dashboard, where the user views their personal collection, creates new atmospheres and edits ones they’ve already created.
 
### Main Library
I wanted to keep this simple; a display of all the atmospheres on the app and a way of filtering them. I decided on filtering by user created tags, as well as a way of sorting the atmospheres either by the most recent or the most popular. Using Figma, I came up the below design:

![](https://res.cloudinary.com/detjuq0lu/image/upload/v1684857663/project%204%20readme/image1_nti4zp.png)

I liked the idea of keeping the design clean can minimal, with soft colours, so that the visual focus would always be on the atmospheres’ photos.
 
### User Dashboard
 
In a similar way I opted for minimalism, however for the user’s area of the app I wanted them to be able to decorate the place a bit, and so put in capability to set a profile picture and also to set a cover photo that would act as a background!

![](https://res.cloudinary.com/detjuq0lu/image/upload/v1684857663/project%204%20readme/image2_bqmdfv.png)

### Atmosphere tile design ideas

It was a lot of fun playing around with how to display the atmospheres, I started in my sketchbook and eventually whittled down the options to these:

![](https://res.cloudinary.com/detjuq0lu/image/upload/v1684857663/project%204%20readme/image3_h9pn1n.png)

My final design took inspiration from all of them, however I opted to get rid of the play button - which enlarges the photo and plays the audio -and instead make it so that the user can just click on the tile for this functionality.
  
 
### The DAW (digital audio workspace)
 
This is where the audio processing takes place. My initial plan was to have two separate pages. In the first one the user has a very large amount of flexibility as to how they process the audio. I wanted the user to be able to split up the audio file and implement effects on each slice, decide which effects to use, and also how to configure the effects. For example, if there was a filter effect – which cuts out certain frequencies of the audio source - and a delay effect – which records an input signal and then plays it back repeatedly in set periods of time  - added to audio, using the filter before or after the delay effect would change the sound quite drastically! Below was how I wanted it to look:

![](https://res.cloudinary.com/detjuq0lu/image/upload/v1684857663/project%204%20readme/image4_iniels.png)

When the user’s ready , they would go to another page, where the photo is full screen, and there are more high level audio processing capabilities, like how loud each segment of audio is, and a little bit of capability of changing the intensity of the effects. I liked this because the user sets more complex parameters in the preceding page, and then they get to mould the audio more generally when viewing the atmosphere.

![](https://res.cloudinary.com/detjuq0lu/image/upload/v1684857663/project%204%20readme/image5_ykuuaf.png)

For my mid-level concept, I decided to combine these two pages, and keep the audio processing capability simpler. This also meant that the user wouldn’t be able to split the audio into segments, the whole piece would be processed. I ended up opting for this model:

![](https://res.cloudinary.com/detjuq0lu/image/upload/v1684857663/project%204%20readme/image6_cwuw4v.png)


### Back-end Planning
 
The exact attributes changed slightly during the build process, but the relationships stayed the same. I needed a one-to-many relationship to attach the user to any atmospheres they created, a many-to-many relationship to attach tags to atmospheres, and another many-to-many relationship so users could have a personal collection of atmospheres.  

![](https://res.cloudinary.com/detjuq0lu/image/upload/v1684857664/project%204%20readme/image7_lw1it2.png)

The last thing I did before starting the build process was to create a Trello board for the work needed on the back-end, and for the front-end. This was really helpful for breaking down the project, and I used it extensively for the back-end build, however needed it less when I got to the front-end.
 
My rough plan was:
 
Days 1-2 – Build back-end.
Days 3-6 – Build front-end.
Days 7-8 – Work on SCSS and visual part of the app.
Days 9-11 – build audio processing capability.

## Build Process

### Back-end
 
#### Models

Using Django and Django REST framework I constructed a PostgreSQL database for my app to consume. I required 3 models – for users, tags, and atmospheres, all extending the AbstractUser class. The user model needed additional username, profile image, cover photo, and user_library (many-to-many relationship to know which atmospheres are in each user’s library) fields. The atmosphere model needed name, picture, audio, tags (many-to-many relationship to attach tags to atmospheres), owner (one-to-many relationship), and date created fields. The tag model needed a tag name.
 
#### Serializers

For the common serializers I simply extended the ModelSerializer class and attached the necessary model and fields. For my populated serializers I was able to take advantage of how agile a tool serializers are and make custom populated serializers for specific needs. This was particularly evident for my atmosphere model, below are the four serializers created:

![](https://res.cloudinary.com/detjuq0lu/image/upload/v1684857664/project%204%20readme/image8_fppk9z.png)

It was incredibly useful to be able to regulate exactly what data I wanted at which time. For example, the first serializer I wanted to have all the data held in a given tag, whereas for the second, it was for when a user edits an Atmosphere where I needed only one field from the tag, and also only a few fields from the atmosphere model.

#### Views
Among the more standard views for CRUD functionality, there were a few that required me to experiment a bit. This was centred around creating and editing atmospheres, as well as dealing with updating the user library. When a user creates a new atmosphere, that atmosphere needs to also be added to the user library, and so the post request needed to function in two ways:
First, an owner field is created with the user’s information, and the atmosphere is added to the database.

![](https://res.cloudinary.com/detjuq0lu/image/upload/v1684857665/project%204%20readme/image9_igvt1s.png)

Then, the user is located in the database, and by using the instance of the serialized atmosphere, the specific atmosphere is added to the user’s library.
 
In order to allow users to add and remove atmospheres from their library I used one view that checks if the atmosphere is already in the user library and removes or adds accordingly:

![](https://res.cloudinary.com/detjuq0lu/image/upload/v1684857665/project%204%20readme/image10_lc2tnz.png)

First, the user is identified and serialized, and the user library is extracted. Then the view uses a for loop and conditional logic to compare the data it’s been sent with the user library (which is an array) of the identified user and checks if the atmosphere is present. If it is, the atmosphere is removed, if it is not present, the atmosphere is appended to the user library array. Once this is done the user’s data is updated, checked that it’s still valid, and saved.
 
#### Authentication
When the user registers and when the user logs in there is authentication. On register to check that the password and password confirmation match, and on login to check that the user exists on the database.
 
For the password check, I first created a new user serializer. I removed and saved the password and password confirmation from the data; to hash the password before sending it to the database and the password confirmation isn’t being added to the database at all. The two passwords are then compared against each other and if they don’t match an exception is raised. The password is then validated for strength and the password field of the data is then added back in and assigned a hashed version of the password using Django’s authentication tools.
 
For user authentication I extended Django REST framework’s BaseAuthentication class. I then ensured that there is a bearer token attached to the request and accessed said token :

![](https://res.cloudinary.com/detjuq0lu/image/upload/v1684857664/project%204%20readme/image11_mruyy1.png)

I then used PyJWT for token authentication. This was placed inside a try/except block. In the try I created variables for the payload and the user. For the payload I used jwt.decode to decode and verify the bear token. For the user I simply located the user’s information in the database. If the token is successfully verified and no exceptions are raised , the authentication returns the user and the token:

![](https://res.cloudinary.com/detjuq0lu/image/upload/v1684857665/project%204%20readme/image12_cklh12.png)

Finally, I added this custom authentication to the setting.py file of my project as the default authentication class.

By the end of this process I was nicely on schedule :)
 
### Front-end
 
#### Register and Login
 
I started by creating a simple form from bootstrap. I then made some state called formFields that would be able to hold all the inputted data. Its initial state was therefore an object with key-value pairs for email, username, password, and password confirmation , where the values were set to an empty string.  For the functionality there were two functions; one to handle changes in the input, and one to handle submitting the form. To handle changes , I set the value of each input field to the relevant part of the formFields state and assigned the same handleChange function to the onChange event handler of each input. In the handleChange function, which took e as a parameter, formFields was set to a new object with its previous value spread in, and then a new key-value pair where the key was e.target.name (the name of the input) and the value was e.target.value.
 
The handleSubmit function sent a post request to my API , the sent data being formFields, and then using useNavigate() the function sends the user to the login page.
 
There was also state made for error handling, set to the error in the relevant catch areas, and displayed on the form only if there was a value in the error state.
 
The login code acts almost identically but takes just username and password, sending a post request to my endpoint for logging in.
 
 
#### Main Library
 
I wanted the functionality of this page to be simple and effective. It is the place for the user to find atmospheres they like and to add them to their library. There needed to be a functionality for viewing and filtering through the atmospheres, and for adding to the user’s library.
 
I decided to focus on filtering by tag , and then allow for sorting the atmospheres according to popularity or when they were added.
 
I started by creating a useCallback which sends a get request to get all data on the atmospheres, this was used at various points to bring back updated data on the atmospheres. On mount, the atmospheres, tags, and user data is all retrieved from the database and saved to state. With all the data needed, I could now display all tags and all atmospheres on the page, this was done using two separate components, one which mapped though all the tags and returned a button for each, and one which mapped through the atmospheres and returned a tile for each one. Each tile displays the picture, the name of the atmosphere, the owner, how many people have added it to their collection, and an icon to add or remove the atmosphere from their library. This was all achieved by mapping through the data, and for the user library capability I used the find method to check whether or not the atmosphere was in the user’s library or not.
 
To sort the atmospheres, I created a drop down with the two options. To sort by most recent, I first mapped through the atmospheres, isolated the data point which holds when each one was created, and altered the data so that this:

![](https://res.cloudinary.com/detjuq0lu/image/upload/v1684857665/project%204%20readme/image18_dhbtrm.png)

becomes this:

![](https://res.cloudinary.com/detjuq0lu/image/upload/v1684857665/project%204%20readme/image19_mojsjd.png)

his allowed me to use the localeCompare method when sorting.
 
If the user decides to sort by popularity, the sort method simply uses the length of user_library array in each atmosphere, putting the atmosphere with the longest array, and therefore most popular , to the top.
 
To allow users to filter by tags, I first attached a function to the onClick of the tag buttons, and created state called searchTags , an array to hold any tags the user wishes. This took the name of the button as a parameter. The function uses conditional logic to check if the given tag is in the searchTags array. It does this by iterating through all the tags in the database, finding the one with a matching name to the button , and using the includes method it checks if that tags exists in the searchTags array. If it is not included in searchTags, it is added, and if it is already present, it is removed. In order to update the displayed atmospheres, I used a useEffect with searchTags in its dependency array. Each time searchTags is changed, the state used to hold the displayed atmospheres is updated. Since in the database there’s a many to many relationship between the tags and atmospheres, one can access all the atmospheres attached to any given tag. Therefore, in the useEffect, I map through the serachTags, and return the array atmospheres in each datapoint, and then filter out the empty arrays. I then flatten this new array, and put it into a function which removes any duplicates, and finally set this to be used to display the atmospheres.

![](https://res.cloudinary.com/detjuq0lu/image/upload/v1684857665/project%204%20readme/image20_vjl8e1.png)

It should be noted that there is a logical error here in that if the user filters through the atmospheres, and then deselects all tags, no atmospheres are displayed. I have yet to figure out how to stop this from happening but it is my first priority moving forward!
 
To let the user view each atmosphere, is used FsLightbox, a react package which allows for full screen modal views. Since I only needed the most basic functionality, I used the provided template and tweaked it very slightly. I simply added functions to play and stop audio when the user opens or closes the modal.

![](https://res.cloudinary.com/detjuq0lu/image/upload/v1684857666/project%204%20readme/image21_z8mati.png)

I had a few issues getting the audio to stop when the user closes the modal, however setting the audio.currentTime to zero fixed it.
 
#### User Dashboard
 
This was where I wanted the user to feel capable of adding to the app by creating atmospheres and a space for themselves. It had to house their personal collection, have a place for creating and editing atmospheres, and it needed a way of sending the user to the page where they can play around with their atmospheres. 

The backbone of the edit and create forms functioned in the same way as register and login, in their handleChange functionality and much of the handleSubmit, but there were a few notable custom fields that needed some extra work: tags, audio, and images. Since the only fundamental difference between the forms was where the data was sent, they both used the same form template, called AtmosForm.js. This holds the code for adding all form data.
 
#### Tags
 
To add a tag to an atmosphere:
1.  	you can create a new tag.
2. 	you  can choose from an existing tag.
 
To allow for creating a tag I made an input field with the same onChange as has been previously mentioned. When the user clicks ‘Add’ , two API requests are made: one to post the new tag, and another to get back the newly updated list of tags.

![](https://res.cloudinary.com/detjuq0lu/image/upload/v1684857665/project%204%20readme/image13_zxyaur.png)

formFields is then set to a new object with formFields spread in, and the new tag is added in. The tags are then saved to state so that they can be displayed, and the state used for the onChange function of the input field is set to an empty string:

![](https://res.cloudinary.com/detjuq0lu/image/upload/v1684857665/project%204%20readme/image14_bkgwxc.png)

To allow for choosing tags that already exist I simply made a button for each tag, and if the user clicks on the given button, a function is run which adds or removes the given tags from formfields depending on if it’s already present or not. To check for this I used conditional logic and the  some method to iterate through the tags key of formFields and check if one of the tags had the same name as the name of the button that had been clicked.

![](https://res.cloudinary.com/detjuq0lu/image/upload/v1684857665/project%204%20readme/image15_gdol4o.png)

If the tag is not present, it is added in by setting formFields to a new value, and if it is present, then the function uses the filter method to remove the tag:

![](https://res.cloudinary.com/detjuq0lu/image/upload/v1684857665/project%204%20readme/image16_ymm6hl.png)

Finally, I needed a way of showing whether a tag has been successfully added or not. I therefore added a ternary to the className definition of the buttons. I used the some method to iterate through the tags in my formFields state; if this came back true the buttons class was set to ‘tag-green’ which has a different shade of green background-colour to the class ‘tag-red’, the class a button gets if the method returns false.

![](https://res.cloudinary.com/detjuq0lu/image/upload/v1684857665/project%204%20readme/image17_bpzxbm.png)

#### Audio and Images

For this I used Cloudinary, a cloud-based image and video management platform that offers storage, manipulation, optimization, and delivery services through an easy-to-use API. Using a file type input field, the user selects a file from their machine. On submitting the file, a function creates a new form, with the file and the upload preset (what’s needed to store the file to a specific folder in my cloudinary account). The form is sent via a post request to my cloud. This API request returns a link to the newly stored file, which is then set to the appropriate of the atmosphere’s formFields.


Around the dashboard’s functionality I wanted to allow the user to have an impact on the space itself, and therefore made it so that they can choose the background of the page, and create a profile picture. This was done using Cloudinary in the same way as the atmosphere forms. The atmosphere tiles are constructed in the same way as the main library, however the buttons are slightly different. If an atmosphere is created by the user, they have the option of editing it, and if they do not own it, they have the option of removing the atmosphere from their library. This was achieved by creating a function which first gets the payload from the users token stored in local storage, isolates the user’s ID and compares that against the id of the owner of the atmosphere. I then used a ternary to act according to whether the user is the owner or not like so:

![](https://res.cloudinary.com/detjuq0lu/image/upload/v1684857666/project%204%20readme/image22_vbtoac.png)

Though visually and functionally simple, the user dashboard required many different moving parts, and it therefore made sense to componentise the code as much as possible. By the end, the functionality had been broken down into eight separate components with almost all interacting with all. It was an incredibly good process to go through and has made me considerably more comfortable with breaking up my code.

#### The DAW (Digital Audio Workspace)
 
The final piece of functionality of the app is the page for experiencing the atmosphere and working with its audio. On each atmosphere tile in the user dashboard there’s a button which the user can click, when they do, the information about the atmosphere is saved to local storage, and the user is taken to another page. With this saved information, the background of this page is set to the atmosphere image, and the audio is loaded into a tone.js player node, which I use to play and pause the audio, as well as run it through effects. The user will also see a selection of sliders and buttons. Below is an example :

![](https://res.cloudinary.com/detjuq0lu/image/upload/v1684857667/project%204%20readme/image23_ewr96y.png)

For the sliders, I used a react package called react-slider. On the onChange event listener of each one there is a function which attenuates a certain parameter of an audio effect, making the effects changeable in real-time. There is also a pause and a play button.
 
#### Delay Effect
 
I spent the most time on this. A delay effect creates a repetition of an audio signal, which is played back after a specified time delay, and for a specified number of repetitions. It’s one of the most common audio effects and is a very powerful tool for creating rhythm, space, atmosphere, and much more. Tone.js has two prebuilt delays; a pingpong delay and a feedback delay. with a ping pong delay, the delayed signal alternates between the left and right channels to create a bouncing, whereas a feedback feeds the repetitions back into the delay effect to create sounds that can differ in intensity. I opted to use both in slightly different places. With both of these delays, though the repetitions do alter slightly over time, they stay pretty true to their original source. I didn’t want this, and so decided to create a delay effect out of multiple delays, so that I could manipulate the repetitions differently. I first created a feedback delay, and connected two more to that delay, meaning these two took the output of the original delay as their audio source, I called one of the delays the leftBranch, and one the rightBranch. I also set these all to state so that I could manipulate them with sliders later if I wanted to. Then I created two for loops which continually add two additional delay nodes onto these two delays. Within the for loop, a new delay node is created, called additionalDelay. Using a variable called leftBranch, the previous delay node is connected to the new delay node, and then this variable is reassigned to the most recent node, so that when the loop starts again, the next delay node is attached in series. I added reverb (an effect which simulates reverberations from a room ) and panning (an effect which adjusts the balance between left and right audio channels, so that the sounds can be heard at a specific part of the soundscape) to each of the delays and changed the parameters of them for both branches. There is also a count which is incremented each loop, and if the count exceeds 4, the loops are not run and no additional delay is added. Below is a visual representation of the delay structure:

![](https://res.cloudinary.com/detjuq0lu/image/upload/v1684857666/project%204%20readme/image24_gfl1xe.png)

And the code for the loop attached to the leftBranch:

![](https://res.cloudinary.com/detjuq0lu/image/upload/v1684857666/project%204%20readme/image25_avgs5a.png)

With this structure I was able to dig down into a delay effect and manipulate how the repetitions sound. Now I needed to allow the user to play around with them. I therefore made the feedback of the initial delay and the following two changeable via a slider, and I did the same for the volume of the effect as a whole. I also created an LFO node, a node which one can use to modulate any parameter automatically, and attached it to the panning effect of the two delay loops, and made a slider which adjusts the speed of this modulation.
 
Finally, I created six buttons which adjust the delay time, the amount of time between repetitions, of the right and left branch. When a different button is clicked, the rhythm of the delay is therefore changed !
 
#### Reverb
 
I kept the reverb effect simple, using tone.js’ basic reverb, and creating sliders which allow the user to adjust how prominently the reverb effect can be heard, and a slider which adjusts how big the room that it is simulating is.
 
#### Filters
 
A filter is an audio effect that modifies the frequency content of an audio signal, allowing certain frequencies to pass through while attenuating others, and is commonly used to shape the tonal characteristics of a sound.
I created two filters, one which can be adjusted by a slider, and another which is attached to an LFO, and the slider adjusts the speed of the modulation.
 

## Challenges

### Tags on the Forms

The process of using tags to filter data was the biggest challenge of this project, from creating the tags themselves through to using them as filters. To begin, building the part of the form for creating tags threw up a beastly rabbit hole of a problem. The long and short of this problem was that I wanted to have more functionality in the back-end that I needed. I wanted to have it so that in the front-end the client sends off one post request which creates any new tags and the whole atmosphere. I therefore needed to build the capability of checking for whether a tag exists, and adding tags, into the post view of the atmospheres.
My issues started gently, I had forgotten to set some form data to state and the tags weren’t formatted correctly. Then I began getting a type error for the update method on my serializer. At this point I think I should’ve stopped and re-thought the logic of my code, however I decided that I wanted to take on this challenge and went about creating a custom update method for my serializer that could update not just the atmosphere model but also the tag model. This worked and I had a brief moment of repose while the audio stopped uploading for some reason. This eventually stopped and then the real errors were back. At this point I realised that I’d cornered myself and was making life more difficult than it needed to be. I broke up the functionality into just creating or updating an atmosphere and the same for tags, meaning the client side had to send off a few extra requests. During this process I came up against another difficulty; parts of the form, including the tags, weren’t being added in the right format for the database to read them. The database was asking for different datapoints than I was giving, for example at one point it wanted just an id when I was giving it the tag name. I saw this as a need to change the database, instead of changing the data I was giving it. I am glad I can now see why this was unnecessary! I went about creating myriad custom serializers for different processes, and for the most part this worked. However, I finally began seeing how I just needed to change what I was sending to the database. I was exhausted at this point and I am so thankful for having my instructor there to help with this process. In the end, for the tags, it was pretty simple in that I created an id attribute for each tag button, and then for each new tag added there was an id field created.
 

## Wins

### Audio Processing
 
Coding the app’s audio processing capability was challenging and rewarding. Since it was the last push of the project, I was tired from working solidly for 9 days, but I was also fully in the flow of the project. My proposed schedule gave me two days to work on this part of the project and I’d pushed myself as hard as possible to ensure that I had that time. It was really important to me to allow for time to experiment and find new pathways through mistakes since this part of the project was as much artistic as it was anything else. I was therefore really happy that I managed to give myself this amount of time! It was gruelling, and the code is pretty hairy in places, but I was able to tamper with concepts of audio processing that I’ve always wondered about and it was incredibly rewarding :)
 
#### Effects Concepts
Though I put most effort on my delay effect tree, the simpler concepts I thought of were more interesting to me. In particular, having buttons that change the delay time of the separate branches so that different rhythmic patterns can occur, my ideas of creating movement in the sound through panning and filtering, and the idea of attaching a gain node (which controls volume) to both the effects audio signal, and the completely dry signal. To take the last example, I think this fracturing of the output allows the user to sonically experiment with feelings of abstraction and grounding simply because they have the ability to balance the volumes of these audio outputs. Whilst playing with this myself I found I could use it as a tool for creating a narrative, or a tool for tension and release.
 
#### Teaching Myself
Teaching myself how to use Tone.js was a really great experience. I used ChatGPT to very quickly grasp the basic concepts, like how the nodes are connected to each other in a modular fashion, what the parameters were for each node, how to connect the effects to the sliders and change them live. I also used the AI right at the start of the project to ensure that the goals I wanted to achieve were actually actionable, and it was a motivating feeling to have the reassurance that the logic is there, I just needed to figure it out!
 
 
### UI
 
Since I wanted this app to be a creative platform, as a rule I prioritised UI in my decision making. It’s certainly not perfect at this point, and it’s going to evolve the more I work on it, but I am very happy with how I’ve gone about it so far. I was also able to experiment with the ideas of UI itself whilst building this, which was just fab! This particularly came to light when designing and implementing the page for interacting with the atmospheres. Having a button to minimise the controls so that you are just looking at the picture was a simple and effective way of suggesting to the user to get the audio to a point which they like, and sit back and experience the atmosphere. I will talk a bit more about this in my key takeaways section 
Icons
Making my own icons for this project was a lot of fun. I started doing it at a time when I was particularly tired and it allowed me to breathe a bit and think about something else. I loved designing for animation, designing the icon for when it’s not hovered over, and for when it is and then slowing and smoothing the transition. I was particularly happy with the user library animation.
 
#### Landing Page and Colour Scheme
The combination of these two elements pulled the whole experience together in my opinion. I wasn’t happy with how everything was gelling together until I stumbled across the pale blue colour. Until I used that the colours of the different pages were both too different and too similar – the grey of the dashboard and the then white of the library. The blue glued everything together!
The landing page was implemented late in the day, on the penultimate day. Though I liked that there was not that much signposting of what things do, allowing the user to figure it out for themselves, I think without the splash there describing what the icons represent, the app risked feeling alienating to the user.  
 


### Working Through Big Issues
 
This project had a good few difficulties, and I am happy with how I worked through them. Since this was the last project, I consciously decided to ask the instructors for help as little as possible. This definitely slowed the process down at times, but it was a valuable learning experience. I took on a lot of more stress than the previous projects and worked methodically through it, learning how it is that I learn best.


## Key Learnings

### Tone.js
Teaching myself a JavaScript library was a great learning curve. It involved a massive amount of trial and error and was certainly frustrating at times, but it was amazing to see how much you can get done with libraries! I also used ChatGPT a lot to teach myself the basics and so had to learn how to communicate effectively with a LLM, which was in itself a big learning process. Working to understand the language and details it needs to produce effective responses was great and I will continue to fine tune this!
 
### CSS animations
It was fantastic to see how simple and powerful adding smooth animation to the app is. Most significantly, the animation on the splash page allowed me to easily control the user’s focus and so effectively and efficiently take them through the core of the app. What’s more, for the navbar animation, I simply created two versions of the icons , and set a hover effect to change the background image of the button, and added a small transition time, and it looks so smooth and visually satisfying! It was so great to be able to experiment with these tools.
 
### Modals
I had briefly used modals in the previous project, but it had been mainly implemented by someone else on the team. I loved how they looked and was really keen to learn a bit more about how they worked in this project. I therefore used two different modal packages, one for viewing the atmospheres, and one for the forms, and it was so great to get an understanding of the concept behind them. A big learning curve was understanding that any CSS applied to the modal button will be applied to the full screen version, I wrestled with that for a bit!
 
### UI – signposting
I really wanted to experiment with concepts of UI with this project. I opted to strip back what the user is told to do to try to allow breathing space for their own way of moving around the app. This was particularly true for the part of the app where the user can play with the audio. I deliberately left out any signposting of what the sliders and buttons do because I wanted the user to create their own definition of what they do. Of course, you could go through the code and breakdown exactly what is being done to the audio, however this definition of what’s happening is very often different to how the changes affect the emotion of the audio from the user’s perspective, and I wanted to focus on that part instead of the rigorously analytical definitions. I think this is a really fascinating idea because how the user defines the impact of the sliders could materially change how they use them, and if they themselves have come up with a definition instead of some external force, some part of them could be more deeply attached to what comes out of the app. This was the theory I wanted to play with!
Having put it to the test and watched people go through the app, I think I was being slightly  too idealistic perhaps. There has to be some level of signposting, and if there is less at one point, there probably has to be more elsewhere. Understanding signposting as a balancing dynamic was definitely an important takeaway.
 
### Serializers and data formatting
Seeing how versatile serializers can be was fantastic. In the end I went overboard with this idea, but this then showed me the other side of the coin which was how important formatting what data is sent to the database is. Seeing the balance between these two ideas was another great takeaway.

## Bugs

On the main library, if you filter by tags and then undo all your filtering, no atmospheres are selected and so the library is empty.
 
The Cloudinary upload can take a long time and sometimes fail.

The audio effects can be temperamental on some audio.


## Future Improvements

### Allowing users to view other people’s pages
This would be a great addition to the social aspect of the site, and could give the space for people to create different pages for specific artistic personas’ atmospheres, for example.

### Implementing AI to manipulate the audio
This was part of my very first idea for this app. I’m not entirely sure where I’d want the AI to exist, whether it controls the audio effects, or whether it is built into the effects themselves, but it’s a really exciting concept for AI to be a cog in the machine of human creativity.
 
### Fine tuning the effects I have already and then making more
I have so, so many more ideas for this…
 
### Visually representing the audio manipulation
For the delay tree for example, there’s a react package which creates stick-like trees , and I was thinking of setting the parameters of the length of the branches and speed of the growth to the parameters of the delay tree. This could be superimposed over the atmosphere’s image.
 
### Manipulating the photo
This is currently out of my realm of knowledge but it’s certainly a logical step !


## Final Project

### Landing Page

![](https://res.cloudinary.com/detjuq0lu/image/upload/v1684859857/project%204%20readme/Screenshot_2023-05-23_at_17.30.12_adrlvx.png)

### Main Library

![](https://res.cloudinary.com/detjuq0lu/image/upload/v1684859865/project%204%20readme/Screenshot_2023-05-23_at_17.30.32_tqj58r.png)

### User Dashboard

![](https://res.cloudinary.com/detjuq0lu/image/upload/v1684859875/project%204%20readme/Screenshot_2023-05-23_at_17.30.42_zw8rr0.png)

### Experimental Space

![](https://res.cloudinary.com/detjuq0lu/image/upload/v1684859873/project%204%20readme/Screenshot_2023-05-23_at_17.31.02_jklpq2.png)









