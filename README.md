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
       position: "center",
       top: 70,
       borderRaduis: 6, 
       closeButton: "/img/cancel.png",
       outerImage: true,
       closeAnimation: "bounce",
       scrollDesign: {activate: true},
       style: {backgroundImage: '/path/to/image.ext'}
    ,[eleements]);
    ```
    - **Popup style parameter** can have 6 options 
        - position: can accept on parameter *center* if you don't write it it will work anyway, it make all elements in center (vertically and horizontally) this is so helpfull if you use the grid element
        - top: it accept numbers as int(1) or string("1") this one make space ↨ between the top of the document and the popup
        - borderRaduis: The border raduis of the popup it accept numbers as int(1) or string("1") 
        - closeButton: this parameter accept the url of the image that you want to be the close button
        - outerImage: accept true or false this propertie is responsable for putting the image button in the popup (if false or not defined) or in the top right (if is true)
        - closeAnimation: until today this properties accept 3 options for close animation [bounce, slideLeft, slideRight] 
        - scrollDesign: this option accept one parameter *{activate: true}* and you will need it if you want to build a popup with a big height so you can style the scroll bar with css this is the class of it **::-webkit-scrollbar <- for the width of the hole bar  ::-webkit-scrollbar-track <- the hole bar track ::-webkit-scrollbar-thumb <- the scroll bar thumb**
        - style: this option until today accept one option *{backgroundImage: '/path/to/image.ext'}* this option put a background image for the popup
- The Second one for the elements that you want inside the popup
    ```
    easyToUsePopup.create(true,
    [
     // title eleemnt
        {type: "title", fontsSize: 20, value: "This is element", tag: "H1", customClass: "text-class second-class", id: "theId1"},
    // image element
        {type: "img", imgSrc: "/path/to/image.ext", onClick: "yourFunction"}
     // grid eleemnt
        {type:"grid", number: 3, grid:[
           {type: "title", fontsSize: 10, value: "first grid element",  tag: "H1", customCss:"color:red;"},
           {type: "title", fontsSize: "20", value: "second grid element", tag: "H2", customClass:"left-one", onClick: helloThis}},
           {type: "title", fontsSize: 15, value: "third grid element",  tag: "H3", id:"elem-id"},
           {type: "input", inputType: "text", onClick: function () {
                return alert(this.value);
            }, value: "input-text"},

        ]},

    );
    // don't worry if you don't understand all this we will break it down in the next sections 
    ```
## Element properties
- Until today there are 13 **[type, customCss, customClass, fontsSize, align, color, value, require, id, name, onClick, inputType, tag]**
    - type: the type of the input until today the popup support **[text or title, form, grid, input, space, html, img or image]** or you can enter
    - customCss: you can enter css code as string like this **"position: relative;display: block;max-width: 1200px;"** and the previous styles will not be override
    - customClass: you can enter classes as string like this **"text-class second-class"** you can enter one class or multiple class
    - fontsSize: is the font size of the element it's helpfull for text or title and it accept numbers as int or string
    - align: is accept 3 values [center, left, right] if is image the image will be in center else this propertie do the job of text-align
    - color: this properties accept all values of color properties of css like rgba or hex code
    - value: for the title or text it will put text inside the element and the value attribute if is input it will show attribute value
    - require: this propertie work for input it work like required attribute
    - id: put the id for the element
    - name: this propertie is helpfull for input without is you cannot send form data
    - onClick: this is onclick event it accept **Anonymous function** and name of the function as function or as string see the code above
    - inputType: this propertie work just if the type is input
    - tag: this one work for text or title because the title or text by default it append element as div and you can cang the tag to what ever you want



TODO: please don't forget the the localhost style
