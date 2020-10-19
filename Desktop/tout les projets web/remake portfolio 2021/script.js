
let smokeOverlay = {
    main: document.querySelector("#smokeOverlay"),
    smokeImgContainer : document.querySelectorAll(".smokeImgContainer"),

    fadeInSmoke : function(){
        let parent = this.main;
        let children = this.smokeImgContainer;
        parent.innerHTML = "";
        children.forEach(function(element){
            element.classList.add("fadeInSmoke");
            parent.appendChild(element);
        });
    },

    fadeOutSmoke : function(){
        let parent = this.main;
        let children = this.smokeImgContainer;
        parent.innerHTML = "";
        children.forEach(function(element){
            element.classList.add("fadeOutSmoke");
            parent.appendChild(element);
        });

    },

};



/*
    fadeOutSmoke : function(){
        let element = this.smokeOverlayImg;
        let parent = element[0].parentElement;
        parent.innerHTML = "";
        element.forEach(function(element){
            parent.appendChild(element);
        });
        // important, had no choice to get rid of all elements in parent clone them et re append them becaus otherwise, i've seen that there is an problem with css animation
        //when you try to remove a class and re apply it to an element to re animate this element, its not stable. 
    },
*/

let landingPage = {
    index : 0,
    navBar: document.querySelector("#navbarContainer"),

    arrow : {
        container: document.querySelector("#btnContainer"),
        up : document.querySelector("#up"),
        down : document.querySelector("#down"),

        addArrowListenners : function(){
            let mainObj = landingPage;
    
            this.down.addEventListener("click", function(){
                mainObj.incrementIndex();
            });
    
            this.up.addEventListener("click", function(){
                mainObj.decrementIndex();
            });
        },
    },

    info : {
        contentContainer : document.querySelector("#contentContainer"),
        infoContainer : document.querySelector("#informationContainer"),
        description : document.querySelector(".contentDescription"),
        listOfContent : document.querySelectorAll("#listOfContent li"),
        title : document.querySelector(".contentTitle"),
        moreInfoBtn : document.querySelectorAll(".moreInfo"),

        changeInfo : function(){
            this.listOfContent.forEach(function(element){
                element.className = "";
                element.classList.add("hiddenInfo");
            });
            console.log(landingPage.index);
            this.listOfContent[landingPage.index].classList.add("showInfo");
        },

        addMoreInfoListenners : function(){
            let mainObj = landingPage;
            let self = this;
            this.moreInfoBtn.forEach(function(element, index){
                element.addEventListener("click", function(){
                    self.mainObj.switchToProjectPage();
                });
            });
        },

        addTouchListenners : function(){
            let mainObj = landingPage;
            this.contentContainer.addEventListener("touchstart", function(ev){
                let y = ev.touches[0].clientY;
                mainObj.touchVar.touchStartY = y;
            });
    
            this.contentContainer.addEventListener("touchmove", function(ev){
                let yMoove = ev.changedTouches[0].clientY;
                if(yMoove - mainObj.touchVar.touchStartY > 150){
                    mainObj.decrementIndex();
                    mainObj.touchVar.touchStartY = yMoove;
                    }
                if(yMoove - mainObj.touchVar.touchStartY < -150){
                    mainObj.incrementIndex();
                    mainObj.touchVar.touchStartY = yMoove;
                }
            });
        },
    },

    navIndex : {
        savedIndex : 0,
        container : document.querySelector("#indexContainer"),
        allListItem : document.querySelectorAll("#indexContainer li"),
        allLineState : document.querySelectorAll("#indexContainer li  .lineState"),
        allLine : document.querySelectorAll("#indexContainer li  .line"),

        initialise : function(){
            this.mainObj = landingPage;
            this.selectThisNavIndex(this.savedIndex);
        },

        addNavIndexListenners : function(){
            const self = this;
            this.allListItem.forEach(function(element, index){
                element.addEventListener("mouseenter", function(){
                    self.deselectLastSelectedNavIndex(self.savedIndex);
                    self.selectThisNavIndex(index);
                });

                element.addEventListener("mouseleave", function(){
                    self.deselectLastSelectedNavIndex(index);
                    self.resetNavIndexToLastClicked();
                });

                element.addEventListener("click", function(){
                    self.mainObj.index = index;
                    self.saveLastClickedIndex(index);
                    self.mainObj.change();
                });
                
            });
        },

        saveLastClickedIndex : function(index){
            this.savedIndex = index;
        },

        resetNavIndexToLastClicked : function(){
            this.selectThisNavIndex(this.savedIndex);
        },

        selectThisNavIndex(index){
            this.allLine[index].classList.add("hoveredLine");
            this.allLineState[index].innerHTML = (index + 1) + "/" + this.allLine.length;
        },

        deselectLastSelectedNavIndex : function(index){
            this.allLine[index].classList.remove("hoveredLine");
            this.allLineState[index].innerHTML = "";
        },
    },


    footer : {

    },

    bg : {
        bgContainer : document.querySelector("#background"),
        bgStyle : document.querySelector("#background").style,
        bgUrlList : ["background1.jpg", "background2.jpg", "background3.jpg", "background4.jpg"],

        initialise : function(){
            this.mainObj = landingPage;
            this.changeBgUrl();
        },

        changeBgUrl : function(){
            let child = document.createElement("img");
            child.style.display = "none";
            child.classList.add("backgroundImage");
            this.bgContainer.appendChild(child);
            child.src = "image/background/background" + this.mainObj.index + ".jpg";
    
            child.onload = function(){
                child.style.display = "block";
                smokeOverlay.fadeOutSmoke();
            }
        },
    },

    touchVar : {
        touchStartY : "",
    },

    addWheelListenners : function(){
        let self = this;
        document.onwheel = (e) =>{
            if(e.deltaY > 0){
                self.incrementIndex();
            } else{
                self.decrementIndex();
            }
        }
    },


    incrementIndex : function(){
        if(this.index == this.bg.bgUrlList.length-1){
            this.index = this.bg.bgUrlList.length-1;
            this.navIndex.deselectLastSelectedNavIndex(this.index);
            this.navIndex.selectThisNavIndex(this.index);
            this.navIndex.savedIndex = this.index;
        }else{
            this.index ++
            this.navIndex.deselectLastSelectedNavIndex(this.index-1);
            this.navIndex.selectThisNavIndex(this.index);
            this.navIndex.savedIndex = this.index;
        }
        this.change();
    },



    decrementIndex : function(){
        let indexZero = 0;
        if(this.index == indexZero){
            this.index = indexZero;
            this.navIndex.deselectLastSelectedNavIndex(this.index);
            this.navIndex.selectThisNavIndex(this.index);
            this.navIndex.savedIndex = this.index;
        }else{
            this.index --
            this.navIndex.deselectLastSelectedNavIndex(this.index+1);
            this.navIndex.selectThisNavIndex(this.index);
            this.navIndex.savedIndex = this.index;
        }
        this.change();
    },

    change: function(){
        this.info.changeInfo();
        this.bg.changeBgUrl();

    },

    initialise: function(){
        this.bg.initialise();
        this.navIndex.initialise();
        this.navIndex.addNavIndexListenners();
        this.addWheelListenners();
        this.arrow.addArrowListenners();
        this.info.addMoreInfoListenners();
        this.info.addTouchListenners();
    },  

};


landingPage.initialise();



// let bg = {
//     indx : 0,
//     savedNavIndex : 0,
//     isIncrementing : false,
//     Container : document.getElementById("background"), 
//     Url : document.getElementById("background").style,
//     smokeContainer : document.querySelector("#smokeOverlay"),
//     smokeOverlayImg : document.querySelectorAll(".smokeImgContainer"),
//     ImgNames : ["background1.jpg", "background2.jpg", "background3.jpg", "background4.jpg"],
//     navList : document.querySelectorAll("#lineList li"),
//     navSpanLines : document.querySelectorAll("#lineList li span"),
//     navLineState : document.querySelectorAll(".lineState"),
//     arrowUp : document.querySelector("#up"),
//     arrowDown : document.querySelector("#down"),
//     touchStartClientY : "",
//     contentList : document.querySelectorAll("#listOfContent li"),

//     moreDetails: {
//         moreInfoBtn : document.querySelectorAll(".moreInfo"),
    
//         addListenners : function(){
//             let self = this;
//             this.moreInfoBtn.forEach(function(element, index){
//                 element.addEventListener("click", function(){
//                     self.startLoading(index);
//                 });
//             });
//         },
    
//         startLoading : function(index){
//             if(index == 0){
//                 this.showProject1();
//             }
//             else if(index == 1){
//                 this.showProject2();
//             }
//             else if(index == 2){
//                 this.showProject3();
//             }
//         },
    
//         showProject1 : function(){
//             bg.fadeInSmoke();
//         },
    
//         showProject2 : function(){
    
//         },
    
//         showProject3 : function(){
    
//         },
    
//         show : function(){
//             console.log(this.moreInfoBtn);
//         },
//     },

//     initialiseListenners : function(){
//         this.addWheelListenner();
//         this.addNavIndexListenners();
//         this.addArrowListenners();
//         this.addTouchListenners();
//         this.moreDetails.addListenners();
//     },

//     addWheelListenner : function(){
//         document.onwheel = (e) =>{
//             if(e.deltaY > 0){
//                 this.isIncrementing = true;
//                 this.changeBgImage(this.isIncrementing);
//             } else{
//                 this.isIncrementing = false;
//                 this.changeBgImage(this.isIncrementing);
//             }
//         }
//     },

//     addTouchListenners : function(){
//         document.getElementById("contentContainer").addEventListener("touchstart", function(ev){
//             let y = ev.touches[0].clientY;
//             bg.touchStartClientY = y;
//         });

//         document.getElementById("contentContainer").addEventListener("touchmove", function(ev){
//             let yMoove = ev.changedTouches[0].clientY;
//             if(yMoove - bg.touchStartClientY > 150){
//                     bg.swipeDown();
//                     bg.touchStartClientY = yMoove;
//                 }
//             if(yMoove - bg.touchStartClientY < -150){
//                 bg.swipeUp();
//                 bg.touchStartClientY = yMoove;
//             }
//         });

        
//     },

//     addArrowListenners : function(){
//         let self = bg;

//         self.arrowDown.addEventListener("click", function(){
//             self.isIncrementing = true;
//             self.changeBgImage(self.isIncrementing);
//         });

//         self.arrowUp.addEventListener("click", function(){
//             self.isIncrementing = false;
//             self.changeBgImage(self.isIncrementing);
//         });
//     },


//     addNavIndexListenners : function(){
//         const self = bg;
//         this.navList.forEach(function(element, index){
//             element.addEventListener("mouseenter",function(){
//                 self.deselectLastSelectedIndexBar();
//                 self.indx = index;
//                 self.selectThisIndexBar();
//             });
            
//             element.addEventListener("mouseleave",function(){
//                 self.deselectLastSelectedIndexBar();
//                 self.indx = self.savedNavIndex;
//                 self.selectThisIndexBar();
//             });

//             element.addEventListener("click", function(){
//                 self.saveIndex();
//                 self.changeBgImage();
//                 self.fadeOutSmoke();
//                 self.changeContentDescription();
//             });
//         });
//     },

//     swipeDown : function(){
//         this.isIncrementing = false;
//         this.changeBgImage(this.isIncrementing);
//     },

//     swipeUp : function(){
//         this.isIncrementing = true;
//         this.changeBgImage(this.isIncrementing);
//     },

//     fadeInSmoke : function(){
//         let smokeContainer = this.smokeContainer;
//         let element = this.smokeOverlayImg;
//         this.smokeContainer.style.zIndex = "3";


//         element.forEach(function(element){
//             element.classList.add("fadeInSmoke");
//         });
//         setTimeout(function(){
//             document.getElementById("main").style.display = "none";
//             document.getElementById("project").style.display = "grid";
//         },1200);


  

       

//             setTimeout(function(){
//                 element.forEach(function(element){
//                     element.classList.remove("fadeInSmoke");
//                 });
//                 bg.fadeOutSmoke();
//             },2400);
            
//             setTimeout(function(){
//                 console.log(smokeContainer);
//                 smokeContainer.style.display = "none";
//                 document.getElementById("background").style.display = "none";
                    
//                     // document.querySelector("background").display = "none";
//                 }, 3600);
        

        
//     },

//     fadeOutSmoke : function(){
//         let element = this.smokeOverlayImg;
//         let parent = element[0].parentElement;
//         parent.innerHTML = "";
//         element.forEach(function(element){
//             parent.appendChild(element);
//         });
//         // important, had no choice to get rid of all elements in parent clone them et re append them becaus otherwise, i've seen that there is an problem with css animation
//         //when you try to remove a class and re apply it to an element to re animate this element, its not stable. 
//     },

//     selectThisIndexBar : function(){        
//         let element = this.navSpanLines[this.indx]; 
//         element.classList.add("hoveredLine");

//         let state = this.navList[this.indx].firstElementChild;
//         state.innerHTML = (this.indx + 1) + "/" + this.navList.length;
//     },

//     deselectLastSelectedIndexBar : function(hoverIndex){
//         let element = this.navSpanLines[this.indx]; 
//         element.classList.remove("hoveredLine");

//         let state = this.navList[this.indx].firstElementChild;
//         state.innerHTML = "";
//     },

//     saveIndex : function(){
//         this.savedNavIndex = this.indx;
//     },

//     changeContentDescription : function(){  
//             this.contentList.forEach(function(element){
//                 element.className = "";
//                 element.classList.add("hiddenInfo")
//             });
//             this.contentList[this.indx].classList.add("showInfo");
//     },

//     changeBgImage : function(isIncrementing){
//         if(isIncrementing == true){
//             this.deselectLastSelectedIndexBar();
//             this.indx ++
//             this.saveIndex();
//             this.fadeOutSmoke();
//                 if(this.indx > this.ImgNames.length -1){
//                     this.indx = 0;
//                     this.changeContentDescription();
//                     this.saveIndex();
//                 }else{
//                     this.changeContentDescription();
//                 }
//                 this.selectThisIndexBar();
//         }
//         if(isIncrementing == false){
//             this.deselectLastSelectedIndexBar();
//             this.indx --
//             this.saveIndex();
//             this.fadeOutSmoke();
//                 if(this.indx < 0){
//                     this.saveIndex();
//                     this.indx = this.ImgNames.length -1;
//                     this.changeContentDescription();
//                 }else{
//                     this.changeContentDescription();
//                 }
//                 this.selectThisIndexBar();
//         }
        
//         this.Url.backgroundImage = "url('image/background/" + this.ImgNames[this.indx] + "')";
//     },


// };















// let projectSection = {
//     seeAllProjects : document.querySelector(".seeAllProjects"),
//     hamburgerIcon : document.querySelector("#arrowLeftLabel"),
//     menu : document.querySelector("#allProjectsMenu"),
//     navBar : document.querySelector(".projectFixedNavBar"),
//     state : false,

//     addClass : function(){
//         this.menu.style.display = "flex";
//         this.menu.classList.add("slideIn");
//         this.state = true;
//     },

//     removeClass : function(){
//         this.menu.classList.add("slideOut");
//         setTimeout(function(){
//             projectSection.menu.style.display = "none";
//         }, 800);
//         this.state = false;
//     },

//     toggleClass : function(){
//         if(this.menu.classList.contains("slideIn")){
//             this.navBar.style.backgroundColor = "transparent";
//         } else{
//             setTimeout(function(){
//                 projectSection.navBar.style.backgroundColor = "black";
//             },800);

//         }
//         this.menu.classList.toggle("slideIn");
//     },

//     addListenners : function(){
//         let self = this;
//         this.seeAllProjects.addEventListener("click", function(){
//             self.toggleClass();
//         });
//         this.hamburgerIcon.addEventListener("click", function(){
//             self.toggleClass();
//         });
//     }
// }


// projectSection.menu.style.display = "flex";



    // bg.selectThisIndexBar();
    // bg.initialiseListenners();

    // projectSection.addListenners();