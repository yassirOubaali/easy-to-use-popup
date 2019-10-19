    # easy-to-use-popup

**easy to use popup** is a small open source library that help you create popup easily and make them ready to send the data

## Getting Started
Before starting please visit the [easy to use popup website](https://easyToUsePopup.yassiroubaali.com) to see the full documentation 

and Some pre-built popup templates 

and the output of the library

## Installing
you **can** clone the dist repo from github or from the official website https://easyToUsePopup.yassiroubaali.com  || use the **CDN**

- ***CDN***
    - https://cdn-easyToUsePopup.yassiroubaali.com/js/easytousepopup.min.js   
    - https://cdn-easyToUsePopup.yassiroubaali.com/css/easytousepopup.min.css

## Documentation
To Activate the popup run this code after integrating the easytousepopup.min.js file
```
easyToUsePopup.create(true ,[
    {type: "title", value: "Hello, World"}
]);
```
**Remember :** that you cannot activate the popup with 0 element you need to add one element minimum

Now you will see the popup like this
![alt text](https://easyToUsePopup.yassiroubaali.com/img/hello-world-easyToUsePopUp.png)

## Options
Easy To Use Popup Need Two Parameters
- The first one for the popup style, animation and close image
    ```
    easyToUsePopup.create(
<<<<<<< HEAD
       position: "center", // Make all elements in center (vertically and horizontally) this is so helpfull if you use the grid element
=======
       position: "center", // Make all elements in center (vertically and horizontally)
>>>>>>> 83738c8c107f01e6337a1fc5aef60a6e16b2f099
       top: 70, // the space between the top of the browser and the popup it's 70 by default
       borderRaduis: 6, // The border raduis of the popup
       closeButton: "/img/cancel.png",// close image path
       outerImage: true, // This option if you want the image to be inside the popup or in the top right please check the Outer image section
       closeAnimation: ["bounce", "slideLeft", "slideRight"], // animation type until today the popup accept 3 type of animations
       scrollDesign: //this option accept one parameter *{activate: true}* and you will need it if you want to build a popup with a big height so you can style the scroll bar with css this is the class of it **::-webkit-scrollbar <- for the width of the hole bar  ::-webkit-scrollbar-track <- the hole bar track ::-webkit-scrollbar-thumb <- the scroll bar thumb**
       style: this option until today accept one option *{backgroundImage: '/path/to/image.ext'}* this option put a background image for the popup
    ,[eleements]);
    ```
<<<<<<< HEAD
    - **Popup style parameter** can have 6 options 
        - position: can accept on parameter *center* if you dan't write it it will work anyway.
        - top: it accept numbers as int(1) or string("1") this one make space ↨ between the top of the document and the popup
        - borderRaduis: is the border raduis of the popup
        - closeButton: this parameter accept the url of the image that you want to be the close button
        - outerImage: accept true or false this propertie is responsable for putting the image button in the popup or int the top right if is true
        - closeAnimation: until today this properties accept optiions for close animation [bounce, slideLeft, slideRight]
=======
>>>>>>> 83738c8c107f01e6337a1fc5aef60a6e16b2f099
- The Second one for the elements that you want inside the popup
    ```
    easyToUsePopup.create(true,
    [
     // title eleemnt
        {type: "title", fontsSize: 20, value: "Thex Inside", tag: "H1", customClass: "text-class second-class", id: "input"},
     // grid eleemnt
        {type:"grid", number: 3, grid:[
           {type: "title", fontsSize: 10, value: "first grid element",  tag: "H1"},
           {type: "title", fontsSize: 20, value: "second grid element", tag: "H2", customClass:"left-one"},
           {type: "title", fontsSize: 30, value: "third grid element",  tag: "H3", id:"elem-id"}
        ]}
    );
    // don't worry if you don't understand all this we will break it down in the next sections 
    ```
<<<<<<< HEAD

TODO: please don't forget the the localhost style
=======
>>>>>>> 83738c8c107f01e6337a1fc5aef60a6e16b2f099
