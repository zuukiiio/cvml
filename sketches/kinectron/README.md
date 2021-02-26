# Kinectron Setup
Kinectron is an amazing tool that allows us to use a Kinect in our web browser.

### Quick links
* [Kinectron website](https://kinectron.github.io/)
* [Kinectron Coding Train Tutorial](https://www.youtube.com/watch?v=BV6xK3EOznI) (feat. Kinectron's creator Lisa Jamhoury)
* [Peer.js website](https://peerjs.com/) (we don't need this, but this is the library built into Kinectron that allows us to access kinect data over the Internet)

### Requirements
Anybody can code with Kinectron on any computer, as long as you have access to Kinect *data.* I emphasize *data* because you don't technically need a Kinect--you can work with a remote Kinect in real-time, or with pre-recorded Kinect data that lives on your computer.

#### But if you do want to work with a Kinect device, you need...
1. A Kinect Windows V2 (also called the Kinect One for Windows) or an Azure Kinect (I haven't worked with an Azure yet, the department just got one in to test with! They are the newest Kinect available).
2. A Kinect Windows Adapter
3. A Windows PC (needed to run the Kinectron Server.)

## **1. Setting up the Kinectron Server (if you're working with a physical Kinect on a Windows machine)**
*The Kinectron website has amazing documentation. You can follow the [setup guide here](https://kinectron.github.io/#/server/getting-started). Check below for a quick setup guide, which is just a shortened version of the official setup guide*

### Quick setup
1. [Download](https://download.microsoft.com/download/F/2/D/F2D1012E-3BC6-49C5-B8B3-5ACFF58AF7B8/KinectSDK-v2.0_1409-Setup.exe)/Install the Kinect for Windows SDK 2.0 ([more info here](https://www.microsoft.com/en-us/download/confirmation.aspx?id=44561))
2. [Download](https://github.com/kinectron/kinectron/releases/tag/0.3.6) the most recent version of Kinectron Server (Version 0.3.6 as of 02/17/2021. This version was released Nov 30, 2020) ([more info here](https://github.com/kinectron/kinectron/releases/tag/0.3.6))
3. Extract the downloaded Kinectron .zip folder and place it somewhere in your C: drive (I dragged the folder into my 'Program Files' folder)
4. Run **kinectron-server.exe**. I recommend pinning the application to your Windows taskbar for convenient access.
5. [Download](https://cdn.jsdelivr.net/gh/kinectron/kinectron@0.3.6/client/dist/kinectron-client.js) the kinectron-client.js library and place the file in your libs folder in your class repository
6. Create your p5.js sketch using the correct IP address to connect to a Kinect, or set it up so that you can use recorded Kinect data. ([Check out the starter code from the official setup guide here](https://kinectron.github.io/#/api/getting-started))
7. **Starter Code:**
   1. [Skeleton Starter](skeleton_starter/)
   2. [Depth Starter](depth_starter/)


**TODO**
1. Add starter code for local Kinect, public Kinect, and recorded Kinect data.
2. Record Kinect data (skeleton, color, depth)