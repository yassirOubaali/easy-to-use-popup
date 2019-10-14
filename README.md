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
**Remember :** that you cannot activate the popup without 0 element you need to add one element minimum

Now you will see the popup like this
![alt text](https://easyToUsePopup.yassiroubaali.com/img/hello-world-easyToUsePopUp.png)

## Options
Easy To Use Popup Need Two Parameters
- The first One for the popup style, animation and close image
    ```
    easyToUsePopup.create(
       position: "center", // Make all elements in center (vertically and horizontally)
       top: 70, // the space between the top of the browser and the popup it's 70 by default
       borderRaduis: 6, // The border raduis of the popup
       closeButton: "/img/cancel.png",// close image path
       outerImage: true, // This option if you want the image to be inside the popup or in the top right please check the Outer image section
       closeAnimation: "bounce", // animation type check the animations section
    [eleements]);
    ```
- The Second one for the elements
he first One for the popup style, animation and close image
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
