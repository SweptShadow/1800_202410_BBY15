# Project Title
Bus-With-Us


## 1. Project Description
Our team BBY15 is developing a web application to help people who commute by providing them with bus route and occupancy information.
This browser based web application is to provide bus occupancy and bus route information to commuters in the lower mainland.

## 2. Names of Contributors
* Hi, my name is Arsh Mann! I am excited to develop my first application!
* Daniil's honest reaction: AAAAAA, I'm so excited.
* Hi, my name is Dil! I am excited to work on my first hands-on project.
	
## 3. Technologies and Resources Used
List technologies (with version numbers), API's, icons, fonts, images, media or data sources, and other resources that were used.
* HTML, CSS, JavaScript
* Bootstrap 5.0 (Frontend library)
* Firebase 8.0 (BAAS - Backend as a Service)
* Google Map API
* Photoshop for maps (instead of doing overlay for maps we used images)
* Google Fonts

## 4. Complete setup/installion/usage
State what a user needs to do when they come to your project.  How do others start using your code or application?
Here are the steps:
* Sign up via email or guest log in
* Find the relvent route or stop
* View the information our application provide
* Write review of bus stops to update our db and make the informaiton more accurate.

## 5. Known Bugs and Limitations
Here are some known bugs:
* Some layouts (other than mobile) do not work as intended
* JS code may break when trying to implement new features (we cut back on those feature because we couldn't get code to work in unison)

## 6. Features for Future
What we'd like to build in the future:
* Use the Trans-Link API key to get real-time bus route and location information.
* Instead of different images for the color coded bus stop occupancy have it be projected live on a map.
* Implement the Karma system we wanted to implement.
* Link to other applications seemlessly so users would want to use our application more readily.
	
## 7. Contents of Folder
Content of the project folder:

```
 Top level of project folder: 
├── .gitignore              # Git ignore file
├── index.html              # Splash page that pops up when page is visited intially
├── login.html              # Login page 
├── landing.html            # Landing page HTML file, this is what users see when you come to url
├── review.html             # Review form page file
├── setting.html            # Setting page file
├── skeleton.html           # Skeleton html file we use to make other pages
├── thanks.html             # Thanks html file for conformation after submitting a review.
├── translinkalerts.html    # Trans Link Alerts Page which we had more ambitions for but trnaslinkw ebsite doesn't allow direct embedding
├── userInfo.html           # User profile page
├── eachstopinfo.html       # Each bus stop html file which gets populated from information from our db
├── eachbusInfo.html        # Each bus route html file which gets populated from information from our db
├── busRoutes.html          # Bus Routes page which populates the list of bus routes in our db
├── bookmarkedroutes.html   # Bookmarked routes which is populated from user bookmarked routes
├── allmaps.html            # All route map html file
├── abtcntct.html           # About Us & Contact Us page combined file
├── .firebaserc             
├── firebase.json            
├── firestore.indexes.json   
├── firestore.rules          
└── README.md               # Lots of typing later here we are


It has the following subfolders and files:
├── .git                    # Folder for git repo
├── images                  # Folder for images
    /025.png                # Acknowledge source
    /025Afternoon.png       # Route 25 Image
    /025Base.png            # Route 25 Image
    /025Evening.png         # Route 25 Image
    /025Morning.png         # Route 25 Image
    /025Night.png           # Route 25 Image
    /110Afternoon.png       # Route 110 Image
    /110Base.png            # Route 110 Image
    /110Evening.png         # Route 110 Image
    /110Morning.png         # Route 110 Image
    /110Night.png           # Route 110 Image
    /130.png                # Route 130 Image
    /130Afternoon.png       # Route 130 Image
    /130Base.png            # Route 130 Image
    /130Evening.png         # Route 130 Image
    /130Morning.png         # Route 130 Image
    /130Night.png           # Route 130 Image
    /222.png                # Route 222 Image
    /222Afternoon.png       # Route 222 Image
    /222Base.png            # Route 222 Image
    /222Evening.png         # Route 222 Image
    /222Morning.png         # Route 222 Image
    /222Night.png           # Route 222 Image
    /GuestLogin.png         # Guest login icon
    /Logo.png               # App Logo
    /translink-double-decker.jpg    # Background image
├── scripts                 # Folder for scripts
    /authentication.js      # Authentication JS file
    /bookmark.js            # Bookmark JS file
    /busroutes.js           # Bus Routes Page JS file
    /eachBusInfo.js         # Each bus route loading JS file
    /eachstopinfo.js        # Each bus stop laoding JS file
    /firebaseAPI_BWS.js     # firebase initilization
    /index.js               # index JS file
    /landingScript.js       # Landing JS file
    /logoutScript.js        # Logout JS file
    /review.js              # Review page JS file
    /skeleton.js            # Skeleton JS file
    /userInfo.js            # User profile JS file
    /userlocation.js        # User location tracking JS file
├── styles                  # Folder for styles
    /abtcntct.css           # About Us & Contact Us page
    /allMapsStyle.css       # All map style css file
    /bInfo.css              # Each bus info page css file
    /index.css              # Index css file
    /landingStyle.css       # Landing Style css file used in most pages
    /loginStyle.css         # Login page style css file
    /reviewStyle.css        # Review style css file
    /routeStyle.css         # Route style css file
    /sinfo.css              # Each Stop css file
    /style.css              # Style css file
    /styleSettings.css      # Settings css file
├── text                    # Folder for navbar and footer
    /footer.html            # Sticky fixed footer which contains navigaton buttons
    /navbar.html            # Navbar which contains logo which links to landing page and burger menu with advanced feature
└── .vscode



```


