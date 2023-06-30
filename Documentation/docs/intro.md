---
sidebar_position: 1
---

# Intro

This guide will provide a brief overview on how to implement a VR application inside a browser window. For this, we are going to use the ThreeJS graphics library to create a simple scene. Covering basic concepts like meshes, materials, lights, cameras, vectors... that enable us to create 3D environments.

# Alternatives

For complete beginners, this approach may not be optimal. This project contains a lot of code that may be intimidating for beginners. A simpler approach would be using [A-frame](https://aframe.io/) framework where we use a more abstract system of describing the virtual environment, with a lot of logic built in. This approach results in way less code, but is less flexible.

# Runing the project

To run the project you need to have [Node.js](https://nodejs.org/en/) installed. After installing Node.js, open a terminal in the project folder and run the following command:
```bash
npm install
```
This will install all the dependencies needed for the project. After the installation is complete, run the following command:
```bash
npm run build
```
This will build the project. After the build is complete, run the following command:
```bash
npm run start
```
This will start a local server on your machine. You can access the project by opening a browser and navigating to [http://localhost:4000/](http://localhost:4000/).

You can also skip the last step and serve the page using live server extension in VS Code. This will allow you to see the changes you make to the code in real time. To do this, open the project in VS Code and press `Ctrl+Shift+P` to open the command palette. Type `live server` and select `Open with Live Server`. This will open a new browser window with the project running.
Now inside the browser navigate to `public` folder witch contains the `index.html` file. This is the entry point of the project. You can make changes to the code and see the changes in real time.

# Recomendations

If you are not already using git for version control, I recommend you to start using it. It is a very useful tool for keeping track of changes in your code and for collaboration with other developers. For beginners i recommend using a git client. If you are using VS Code you can use the built-in git client.

```
    This is my first attempt at writing coherent documentation.
    English isn't my first language, but I chose to write in English anyway.
    Most of the relevant terms and tools are in English, 
    so it makes sense to use English to avoid confusion on what I meant. 
    So expect some mistakes or sentences that don't quite make sense.
```