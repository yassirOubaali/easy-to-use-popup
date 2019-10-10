// ---- Create the function
// TODO: the form can upload files and pictures in the next version
let easyToUsePopup = {
  create: function (popupType, popupElement) {
    if (typeof popupElement == 'undefined' || typeof popupElement != "object")
    {
      // If the user dosen't pass any parameter
      console.error("Create methode cannot be empty");
    }
    else
    {
      /* ------------------------------
        --- CREATE ELEMENT FUNCTION ---
        - this function is the responsable for creating all the elements from the passed objects
       ------------------------------- */
       function createAllElement(allElementObjects)
       {
         // TODO: table tag in the next version
         let createElement;
         switch (allElementObjects.type) {
          case "title":
          case "text":
            // Title or text
            // this element can be h1 || h2 || div || span || any tag you want
            createElement = document.createElement(((typeof allElementObjects.tag == "undefined" || allElementObjects.tag == "") ? "div" : allElementObjects.tag));
            // the value for the content of this title or text
            createElement.appendChild(document.createTextNode((typeof allElementObjects.value == "undefined" ? "" : allElementObjects.value)));
            break;
          case "html":
              createElement = document.createElement("div");
              createElement.innerHTML = (typeof allElementObjects.html != "undefined") ? allElementObjects.html : "";
            break;
          case "img":
          case "image":
            // img or image both for creating an image
            createElement = document.createElement("img");
            // and we need src option to show the image chosen
            createElement.setAttribute("src", ((typeof allElementObjects.imgSrc == "undefined" || allElementObjects.imgSrc == "") ? "empty" :  allElementObjects.imgSrc));
            createElement.classList.add("default-image");
            if (typeof allElementObjects.imgSrc == "undefined" || allElementObjects.imgSrc == "") console.error("please enter the path value of your image");
            break;
          case "input":
            // input we need just the type default is text of course
            createElement = document.createElement("input");
            createElement.setAttribute("type", (typeof allElementObjects.inputType == "undefined" ? "text" :  allElementObjects.inputType));
            if (allElementObjects.inputType == "checkbox")
            {
              let theParentElement = document.createElement("div");
              theParentElement.append(createElement);
              let theLabel = document.createElement("label");
              theLabel.textContent = allElementObjects.value;
              theParentElement.append(theLabel);
              createElement = theParentElement;
              //console.log(createElement);
            }
          break
        case "form":
            // form is handled by createTheForm Function
            createElement = createTheForm(allElementObjects);
          break;
          default:
           // the defaul to create any kind of others element
          createElement = document.createElement(allElementObjects.type);
         }
         return createElement;
       }

      /* ----------------------------------
        --- EMPTY ELEMENT TAGNAME ERROR ---
        - This function is activated when the user leave the type empty or dosen't call it
       ---------------------------------- */
       function elementTagEmptyError()
       {
         let theElementError = document.createElement("div");
         theElementError.classList.add("emptyTagElement");
         theElementError.textContent = "Object Type cannot be empty";
         return theElementError;
       }

      /* -------------------------
        --- Hide POPUP FUNCTION ---
        - this function is the responsible for closing the popup with the animation or witout it
        - then the popup elements are removed from the DOM
       ------------------------- */
       // global variabel to be used to close popup
       window.closePopup = hidePopup;
       window.closePopupAnimation = popupType.closeAnimation;
      function hidePopup(popupAnimation = null)
      {
        if (typeof window.easyToUsePopupHide == "undefined" || window.easyToUsePopupHide == false)
        {
          window.easyToUsePopupHide == true
          popupOverlay = document.querySelector(".overlay-popup");
          popupContainer = document.querySelector(".pop-up-container");
          popupOverlay.remove();
          if (popupAnimation == null)
          {
            popupContainer.remove();
            document.querySelector('html').style.overflowY = "unset";
            window.easyToUsePopup = false;
          }
          else
          {
            // get top value number
            let getNumber = function (textToNum) {
              if (textToNum == null) return console.log(textToNum);
              let numb = textToNum.match(/\d/g);
              topNumb = numb.join("");
              return topNumb;
            };
            /* [animations: bounce, slideLeft, slideRight] More comming soon */
            switch (popupAnimation) {
              case "bounce":
                  popupBox = document.querySelector(".popup-box");
                  let numberCount = 0;
                  let getTopValue = getNumber(popupBox.style.top);
                  let setIntervalBottom = setInterval(function () {
                    popupBox.style.top = (getTopValue++) + "px";
                    numberCount++;
                    if (numberCount >= 15)
                    {
                      clearInterval(setIntervalBottom);
                      let setIntervalTop = setInterval(function () {
                        popupBox.style.top = (topNumb -= 10) + "px";
                        if (topNumb <= -(popupBox.offsetHeight))
                        {
                            // finish the animation
                          clearInterval(setIntervalTop);
                          // remove popup from the DOM
                          popupContainer.remove();
                          // unset the html overflow
                          document.querySelector('html').style.overflowY = "unset";
                          // reset the function
                          window.easyToUsePopup = false;
                        }
                      }, 10);
                    }
                  },10);
                break;
              case "slideLeft":
                  popupBox = document.querySelector(".popup-box");
                  let getLeftValue = 0;
                  let setIntervalLeft = setInterval(function () {

                    popupBox.style.left = (getLeftValue -= 30) + "px";
                    console.log(popupBox.offsetWidth);
                    if (getLeftValue <= (popupBox.offsetWidth + 100) * -1)
                    {
                      // finish the animation
                      clearInterval(setIntervalLeft);
                      // remove popup from the DOM
                      popupContainer.remove();
                      // unset the html overflow
                      document.querySelector('html').style.overflowY = "unset";
                      // reset the function
                      window.easyToUsePopup = false;
                    }
                  }, 10);
                break;
              case "slideRight":
                  popupBox = document.querySelector(".popup-box");
                  let getRightValue = 0;
                  let setIntervalRight = setInterval(function () {
                    popupBox.style.right = (getRightValue -= 30) + "px";
                    console.log(popupBox.offsetWidth);
                    if (getRightValue <= (popupBox.offsetWidth + 100) * -1)
                    {
                      // finish the animation
                      clearInterval(setIntervalRight);
                      popupContainer.remove();
                      // remove popup from the DOM
                      document.querySelector('html').style.overflowY = "unset";
                      // reset the function
                      window.easyToUsePopup = false;
                    }
                  }, 10);
                break;
            }
          }

        }
      }

      /* -------------------------------
        --- ELEMENT POPUP FUNCTION ---
        - this function add the attributes and the events
       ------------------------------- */

      function elementProperties(elementType = true, popupElement, createdElement)
      {
        // if the eleemnt is a checkbox
        if (popupElement.inputType == "checkbox")
        {
          var theCreatedElement = createdElement;
          var label = createdElement.children[1];
          createdElement = createdElement.children[0];
          if (popupElement.id)
          {
            // add the id to the label as for
            label.setAttribute("for", popupElement.id)
          }
          else 
          {
            // here if the user dosen't put an id the check label will work with click event
            label.addEventListener("click", function () {
              if (!this.parentElement.children[0].checked)
                this.parentElement.children[0].checked = true;
              else 
                this.parentElement.children[0].checked = false;
            });
          }
          theCreatedElement.append(label);
        }
        // ------ Css Values
        if (typeof popupElement.customCss !== "undefined")
        {
          createdElement.setAttribute("style", popupElement.customCss);
        }
        if (typeof popupElement.customClass !== "undefined")
        {
          createdElement.classList.add(popupElement.customClass);
        }
        if (typeof popupElement.fontsSize !== "undefined" && typeof popupElement.fontsSize == "number")
        {
          createdElement.style.fontSize = (createdElement.fontsSize) + "px";
        }
        if (typeof popupElement.align !== "undefined")
        {
          if (popupElement.type == "img" || popupElement.type == "image")
          {
            createdElement.style.margin = "auto";
            createdElement.style.display = "block";
          }
          else
          {
            createdElement.style.textAlign = popupElement.align;
          }
        }
        if (typeof popupElement.color !== "undefined" && popupElement.color != "")
        {
          createdElement.style.color = popupElement.color ;
        }
        // ------ set attributes
        if (typeof popupElement.value !== "undefined")
        {
          createdElement.setAttribute("value", popupElement.value);
        }
        if (popupElement.type == "input" && typeof popupElement.require !== "undefined")
        {
          createdElement.setAttribute("required", "required");
        }
        if (typeof popupElement.id !== "undefined")
        {
          createdElement.setAttribute("id", popupElement.id);
        }
        if (typeof popupElement.name !== "undefined")
        {
          createdElement.setAttribute("name", popupElement.name);
        }
        // ----- set events
        if (typeof popupElement.onClick !== "undefined")
        {
          if (popupElement.onClick == "CloseEasyToUsePopup")
          {
            // when the user want to close the popup if the user click on any object or any logic
            // and also wa have the fucntion [easyToUsePopup.closePopup()] that do the same thing
            createdElement.addEventListener('click', function () {hidePopup(popupType.closeAnimation)});
          }
          else if (typeof popupElement.onClick == "function")
          {
            // the user can put the function name
            createdElement.addEventListener('click', popupElement.onClick);
          }
          else if (String(popupElement.onClick).indexOf("()") < 1)
          {
            createdElement.setAttribute("onclick", popupElement.onClick + "()");
          }
          else
          {
            // the user can put the function name as a string
            createdElement.setAttribute("onclick", String(popupElement.onClick));
          }
        }
        if (popupElement.inputType == "checkbox")
        {
          createdElement = theCreatedElement;
        }
        
        return createdElement;
      }

      /* ----------------------------------------
        ----- Valid Url FUNCTION ----------------
        - this function check the url if is valid
        - the valid url dosen't support localhost
       ------------------------------------------ */

      function validURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?'+
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
          '((\\d{1,3}\\.){3}\\d{1,3}))'+
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
          '(\\?[;&a-z\\d%_.~+=-]*)?'+
          '(\\#[-a-z\\d_]*)?$','i');2
        return !!pattern.test(str);
      }

      /* -------------------------
        ----- FORM FUNCTION -----
        - this function create the form
       ------------------------- */
       function createTheForm(popupElementParameter) {
         createElementForm = document.createElement("form"),
         createElementFormCont = "";
         if (popupElementParameter.padding == false)
         {
           // this class to remove padding
           createElementForm.classList.add("pdZ");
         }

         createElementForm.addEventListener('submit', function (event) {
             event.preventDefault();
             let formDataArr = [],
                 formDataArrName = [],
                 formDataIndex = [];
             for (var i = 0; i < popupElementParameter.number; i++) {
               // check if the input hase a name
               if (typeof popupElementParameter.inputs[i].name != "undefined" && popupElementParameter.inputs[i].name != "")
               {
                 if (popupElementParameter.inputs[i].inputType != "submit")
                 {
                   for (var i = 0; i < this.childNodes.length; i++) {
                     // check the input is not the type of submit
                     if (this.childNodes[i].childNodes[0].type != "submit")
                     {
                      formDataIndex.push(i);
                      // check if the input is not checkbox and add it to the array
                      if (typeof this.childNodes[i].childNodes[0].type != "undefined")
                      {
                        formDataArr.push(this.childNodes[i].childNodes[0].value);
                      }
                      // check if the input is checkbox and add it to the array
                      else if (this.childNodes[i].childNodes[0].childNodes.length)
                      {
                        formDataArr.push(this.childNodes[i].childNodes[0].childNodes[0].checked);
                      }
                      // the name of the input to send it in the encoded url
                      formDataArrName.push(popupElementParameter.inputs[i].name);
                     }
                   }

                   let urlEncoded = function (firstPara, secondPara, indexpara) {
                      // convert the array to URLencoded
                      let theConArray = [];
                      for (var i = 0; i < indexpara.length; i++) {
                        theConArray.push(firstPara[i] + "=" + secondPara[i]);
                      }
                      return theConArray.join('&');
                    };

                  // check if the user want to send the request as ajax or reaload the page
                   if (popupElementParameter.ajax)
                   {
                      let xhttp = new XMLHttpRequest()
                     // if the user chose to use ajax
                     xhttp.onreadystatechange = function() {
                       if (this.readyState == 4 && this.status == 200) {
                         // the response of the ajax file will be in the function with the name of the returnedData value declared in the form
                         if (typeof popupElementParameter.returnedData != "undefined")
                         {
                            let returnedFunction = "window." + popupElementParameter.returnedData + " = function () { return " + this.responseText + "; };";
                            eval(returnedFunction);
                         }
                         if (typeof popupElementParameter.runFunction != "undefined")
                         {
                            // Run the runFunction Methode
                            // this function can return the returnedData function then you can recieve the data
                            eval(popupElementParameter.runFunction + "()");
                         }
                       }
                     };

                     if (typeof popupElementParameter.method != "" && (popupElementParameter.method).toLocaleLowerCase() == "post")
                     {
                      // if (validURL(popupElementParameter.url))
                      // {
                        xhttp.open("POST", popupElementParameter.url, true);
                        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                        xhttp.send(urlEncoded(formDataArrName, formDataArr, formDataIndex));
                      //}
                      // else 
                      // {
                      //   console.error("Please Enter a Valid Url");
                      // }
                    }
                    else if (typeof popupElementParameter.method != "" && (popupElementParameter.method).toLocaleLowerCase() == "get")
                    {
                      //check the url if it's a valid url
                      
                      // if (validURL(popupElementParameter.url))
                      // {
                        xhttp.open("GET", popupElementParameter.url, true);
                        xhttp.send();
                      // }
                      // else 
                      // {
                      //   console.error("Please Enter a Valid Url");
                      // }
                      
                    }
                    else
                    {
                      console.error("Please specify the request method in the form");
                    }
                  }
                  else
                  {
                    // if the user dont want to use ajax
                    window.location.href = popupElementParameter.url + "?" + urlEncoded(formDataArrName, formDataArr, formDataIndex);
                  }
                }
               }
               else
               {
                 // if the user dosen't specify a name for the input
                 if (popupElementParameter.inputs[i].type == "input")
                 {
                   console.error("Please Give the Element a name Attribute");
                 }
               }
             }
         });

        // the user need to specify the number of element this condition will be removed in the next version
         if (typeof popupElementParameter.number !== "undefined" && typeof popupElementParameter.number == "number")
         {
           for (var j = 0; j < popupElementParameter.number; j++)
           {
             if (typeof popupElementParameter.inputs[j].type != "undefined" && popupElementParameter.inputs[j].type != "")
             {
               // check if the user specify the type of the element
               createElementFormCont = document.createElement("div");
               createElementFormCont.setAttribute("class", "form-controll");
               if (popupElementParameter.inputs[j].type != "grid")
               {
                 createElementInput = createAllElement(popupElementParameter.inputs[j]);
               }
               else
               {
                 createElementInput = createTheGridElements(popupElementParameter.inputs[j]);
               }
               createElementFormCont.appendChild(elementProperties(true, popupElementParameter.inputs[j], createElementInput));
               createElementForm.appendChild(createElementFormCont);
             }
             else
             {
               // if the type dosen't exist it will show an error
               createElementForm.appendChild(elementTagEmptyError());
             }
           }
         }
         return createElementForm;
       }


      /* -------------------------
        --- GRID FUNCTION ---
       ------------------------- */

      function createTheGridElements(popupElementParameter)
      {
        if (popupElementParameter.type == "undefined" || popupElementParameter.type == "")
        {
          // if the type dosen't exist it will show an error
          return elementTagEmptyError();
        }
        else
        {
          // create the grid element
          createElementContainer = document.createElement("div"),
          createElementRow = document.createElement("div"),
          createElementDiv = "";
          createElementContainer.setAttribute("class", "container-popup");
          createElementRow.setAttribute("class", "row-popup");
          createElementContainer.appendChild(createElementRow);

          // the padding of the container
          if (typeof popupElementParameter.padding != "undefined" && popupElementParameter.padding == false)
            window.popupPadding = true;

          // make the elements center
          if (typeof popupElementParameter.center != "undefined" && popupElementParameter.center == true)
            createElementRow.classList.add("center");

          // the user need to specify the number of element this condition will be removed in the next version
          if (typeof popupElementParameter.number !== "undefined" && typeof popupElementParameter.number == "number")
          {
            if (popupElementParameter.number > 6)
            {
              // the grid system support 6 grid max
              return console.error("Grid support 6 element please create another grid element");
            }

            // put the properties in the parent eleemt like class, id ...
            createElementContainer = elementProperties(elementType = true, popupElementParameter, createElementContainer);

            for (var j = 0; j < popupElementParameter.number; j++) {
              // create the grids parent
              createElementDiv = document.createElement("div");
              createElementDiv.setAttribute("class", "col");
              createElementInner = createAllElement(popupElementParameter.grid[j]);

              if (popupElementParameter.grid[j].type != "form")
              {
                // put properties in the grids parents
                createElementInner = elementProperties(elementType = true, popupElementParameter.grid[j], createElementInner);
              }

              // add the class of the grid size specified from the user
              switch (popupElementParameter.number) {
                case 1:
                    createElementDiv.classList.add('pop-col-1');
                  break;
                case 2:
                    createElementDiv.classList.add('pop-col-2');
                  break;
                case 3:
                    createElementDiv.classList.add('pop-col-3');
                  break;
                case 4:
                    createElementDiv.classList.add('pop-col-4');
                  break;
                case 5:
                    createElementDiv.classList.add('pop-col-5');
                  break;
                case 6:
                    createElementDiv.classList.add('pop-col-6');
                  break;
                default:

              }
              // append the eleemnt created
              createElementDiv.appendChild(createElementInner);
              createElementRow.appendChild(createElementDiv);
            }
          }
        }
        return createElementContainer;
      }

      /* ----------------------------------
        --- CREATE THE POPUP FUNCTION ---
        - this function is the reasponsible of creating the popup
       ---------------------------------- */
      function createPopup(popupType, popupElements)
      {
        // check if the popup is not already initialized
        if (typeof window.easyToUsePopup == "undefined" || window.easyToUsePopup == false)
        {
          popupType = typeof popupType !== 'undefined' ? popupType : console.error("create function first parameter cannot be empty");
          popupElements = typeof popupElements !== 'undefined' ? popupElements : console.error("create function second parameter cannot be empty");
          // create popup structer element
          let popupOverlay        = document.createElement("div"),
              popupContainer      = document.createElement("div"),
              popupBox            = document.createElement("div"),
              popupBoxInside      = document.createElement("div"),
              closepopup          = document.createElement("span"),
              clickCloseOverlay   = document.createElement("div"),
              allPopup            = popupContainer.appendChild(popupBox),
              createElement       = "",
              createElementInner  = "",
              createElementContainer;

          document.querySelector('html').style.overflowY = "hidden";

          popupOverlay.classList.add("overlay-popup");
          popupContainer.classList.add("pop-up-container");
          popupBox.classList.add("popup-box");
          popupBoxInside.classList.add("popup-box-insider");
          closepopup.classList.add("close-popup");
          clickCloseOverlay.classList.add("close-popup-overlay");
          closepopup.textContent = "X";//TODO: we can change it to font awsome or image and add font awsome option

          if (typeof popupType.position !== "undefined")
          {
            popupContainer.classList.add("center");
          }
          if (typeof popupType.top !== "undefined")
          {
            popupBox.style.top = popupType.top + "px";
          }
          if (typeof popupType.borderRaduis !== "undefined")
          {
            popupBox.setAttribute("style", popupBox.getAttribute("style") + "border-radius:" + popupType.borderRaduis + "px");
          }
          if (typeof popupType.closeButton !== "undefined")
          {
            // the image of close button
            if (typeof popupType.outerImage !== "undefined" && popupType.outerImage == true)
            {
              closepopup.classList.add("closeOuter");
            }
            closepopup.classList.add("closeImage");
            closepopup.style.backgroundImage = "url(" + popupType.closeButton + ")";
            closepopup.textContent = "";
          }
          // close the popup when click the close button
          closepopup.addEventListener('click', function () {
            hidePopup(popupType.closeAnimation);
          });
          // close the popup when click the popup background overlay
          clickCloseOverlay.addEventListener('click', function () {
            hidePopup(popupType.closeAnimation);
          });

          // the scroll design if th epopup is big and we need scroll
          if (typeof popupType.scrollDesign !== "undefined")
          {
            if (typeof popupType.scrollDesign.activate !== "undefined" && popupType.scrollDesign.activate == true)
            {
              // design the scroll bar 
              popupBoxInside.classList.add("scroll-design");
            }
          }

          if (typeof popupType.style !== "undefined")
          {
            // the background image of the popup
            if (typeof popupType.style.backgroundImage !== "undefined" && popupType.style.backgroundImage !== "")
            {
              popupBox.style.backgroundImage = "url(" + popupType.style.backgroundImage + ")";
            }
          }

          for (var i = 0; i < popupElements.length; i++) {
            if (typeof popupElements[i].type != "undefined" || popupElements[i].type != "")
            {
              // The for loop responsible of creating all eleemnt
              let elementTagArr = ["grid", "form", "space"];
              if (!elementTagArr.includes(popupElements[i].type))
              {
                createElement = createAllElement(popupElements[i]);
              }
              else
              {
                switch (popupElements[i].type) {
                  // --------- Grid ---------
                  case "grid":
                      createElement = createTheGridElements(popupElements[i]);
                    break;
                  // --------- Form ---------
                  case "form":
                      createElement = createTheForm(popupElements[i]);
                    break;
                  case "space":
                      // the space element is like separator
                      createElement = document.createElement("div");
                      if (typeof popupElements[i].spaceHeight !== "undefined")
                      {
                        createElement.setAttribute("style", "display:block;height:" + popupElements[i].spaceHeight + ";");
                      }
                    break;
                }
              }
              // set the properties for the lement
              popupBoxInside.appendChild(elementProperties(true, popupElements[i], createElement));
            }
            else
            {
              popupBoxInside.appendChild(elementTagEmptyError());
            }
          }
          // the popup padding
          if (window.popupPadding)
          {
            popupBox.classList.add("pdZ");
          }
          // append element
          popupBox.prepend(popupBoxInside);
          popupBox.prepend(closepopup);

          // the popup max height will not be bigger than the screen
          popupBoxInside.style.maxHeight = (window.innerHeight - 185) + "px";

          popupContainer.append(clickCloseOverlay);
          document.body.prepend(popupContainer);
          document.body.prepend(popupOverlay);

          // this global variable to let the script know that the popup is initialized
          window.easyToUsePopup = true;

          // this global variable to let the script know that the popup is not hided
          window.easyToUsePopupHide = false;
        }
        else
        {
          // you cannot use more than one popup at  time warning
          console.warn("You cannot use more that 1 popup");
        }
      }
      let popupTypes = popupType;
      // run the create popup function
      createPopup(popupTypes, popupElement);
    }
  },
  closePopup: function (closeAnimation = null) {
    // this function if the user want to close the popup from his own code
    // check if the popup is active
    if (window.easyToUsePopup)
    {
      // now we will close the popup with the animation the user chosen
      window.closePopup(window.closePopupAnimation);
    }
    else
    {
      console.error("The popup Is not open to be closed !!");
    }
  }
};
