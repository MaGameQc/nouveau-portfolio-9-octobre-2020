
let bg = {
    indx : 0,
    savedNavIndex : 0,
    isIncrementing : false,
    Container : document.getElementById("background"), 
    Url : document.getElementById("background").style,
    smokeContainer : document.querySelector("#smokeOverlay"),
    smokeOverlayImg : document.querySelectorAll(".smokeTest"),
    ImgNames : ["background1.jpg", "background2.jpg", "background3.jpg", "background4.jpg"],
    navList : document.querySelectorAll("#lineList li"),
    navSpanLines : document.querySelectorAll("#lineList li span"),
    navLineState : document.querySelectorAll(".lineState"),
    arrowUp : document.querySelector("#up"),
    arrowDown : document.querySelector("#down"),
    touchStartClientY : "",
    contentList : document.querySelectorAll("#listOfContent li"),

    moreDetails: {
        moreInfoBtn : document.querySelectorAll(".moreInfo"),
    
        addListenners : function(){
            let self = this;
            this.moreInfoBtn.forEach(function(element, index){
                element.addEventListener("click", function(){
                    self.startLoading(index);
                });
            });
        },
    
        startLoading : function(index){
            if(index == 0){
                this.showProject1();
            }
            else if(index == 1){
                this.showProject2();
            }
            else if(index == 2){
                this.showProject3();
            }
        },
    
        showProject1 : function(){
            bg.fadeInSmoke();
        },
    
        showProject2 : function(){
    
        },
    
        showProject3 : function(){
    
        },
    
        show : function(){
            console.log(this.moreInfoBtn);
        },
    },

    initialiseListenners : function(){
        this.addWheelListenner();
        this.addNavIndexListenners();
        this.addArrowListenners();
        this.addTouchListenners();
        this.moreDetails.addListenners();
    },

    addWheelListenner : function(){
        document.onwheel = (e) =>{
            if(e.deltaY > 0){
                this.isIncrementing = true;
                this.changeBgImage(this.isIncrementing);
            } else{
                this.isIncrementing = false;
                this.changeBgImage(this.isIncrementing);
            }
        }
    },

    addTouchListenners : function(){
        document.getElementById("contentContainer").addEventListener("touchstart", function(ev){
            let y = ev.touches[0].clientY;
            bg.touchStartClientY = y;
        });

        document.getElementById("contentContainer").addEventListener("touchmove", function(ev){
            let yMoove = ev.changedTouches[0].clientY;
            if(yMoove - bg.touchStartClientY > 150){
                    bg.swipeDown();
                    bg.touchStartClientY = yMoove;
                }
            if(yMoove - bg.touchStartClientY < -150){
                bg.swipeUp();
                bg.touchStartClientY = yMoove;
            }
        });

        
    },

    addArrowListenners : function(){
        let self = bg;

        self.arrowDown.addEventListener("click", function(){
            self.isIncrementing = true;
            self.changeBgImage(self.isIncrementing);
        });

        self.arrowUp.addEventListener("click", function(){
            self.isIncrementing = false;
            self.changeBgImage(self.isIncrementing);
        });
    },


    addNavIndexListenners : function(){
        const self = bg;
        this.navList.forEach(function(element, index){
            element.addEventListener("mouseenter",function(){
                self.deselectLastSelectedIndexBar();
                self.indx = index;
                self.selectThisIndexBar();
            });
            
            element.addEventListener("mouseleave",function(){
                self.deselectLastSelectedIndexBar();
                self.indx = self.savedNavIndex;
                self.selectThisIndexBar();
            });

            element.addEventListener("click", function(){
                self.saveIndex();
                self.changeBgImage();
                self.fadeOutSmoke();
                self.changeContentDescription();
            });
        });
    },

    swipeDown : function(){
        this.isIncrementing = false;
        this.changeBgImage(this.isIncrementing);
    },

    swipeUp : function(){
        this.isIncrementing = true;
        this.changeBgImage(this.isIncrementing);
    },

    fadeInSmoke : function(){
        let smokeContainer = this.smokeContainer;
        let element = this.smokeOverlayImg;
        this.smokeContainer.style.zIndex = "3";


        element.forEach(function(element){
            element.classList.add("fadeInSmoke");
        });
        setTimeout(function(){
            document.getElementById("main").style.display = "none";
            document.getElementById("project1").style.display = "grid";
        },1200);


  

       

            setTimeout(function(){
                element.forEach(function(element){
                    element.classList.remove("fadeInSmoke");
                });
                bg.fadeOutSmoke();
            },2400);
            
            setTimeout(function(){
                console.log(smokeContainer);
                smokeContainer.style.display = "none";
                    
                    // document.querySelector("background").display = "none";
                }, 3600);
        

        
    },

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

    selectThisIndexBar : function(){        
        let element = this.navSpanLines[this.indx]; 
        element.classList.add("hoveredLine");

        let state = this.navList[this.indx].firstElementChild;
        state.innerHTML = (this.indx + 1) + "/" + this.navList.length;
    },

    deselectLastSelectedIndexBar : function(hoverIndex){
        let element = this.navSpanLines[this.indx]; 
        element.classList.remove("hoveredLine");

        let state = this.navList[this.indx].firstElementChild;
        state.innerHTML = "";
    },

    saveIndex : function(){
        this.savedNavIndex = this.indx;
    },

    changeContentDescription : function(){  
            this.contentList.forEach(function(element){
                element.className = "";
                element.classList.add("hiddenInfo")
            });
            this.contentList[this.indx].classList.add("showInfo");
    },

    changeBgImage : function(isIncrementing){
        if(isIncrementing == true){
            this.deselectLastSelectedIndexBar();
            this.indx ++
            this.saveIndex();
            this.fadeOutSmoke();
                if(this.indx > this.ImgNames.length -1){
                    this.indx = 0;
                    this.changeContentDescription();
                    this.saveIndex();
                }else{
                    this.changeContentDescription();
                }
                this.selectThisIndexBar();
        }
        if(isIncrementing == false){
            this.deselectLastSelectedIndexBar();
            this.indx --
            this.saveIndex();
            this.fadeOutSmoke();
                if(this.indx < 0){
                    this.saveIndex();
                    this.indx = this.ImgNames.length -1;
                    this.changeContentDescription();
                }else{
                    this.changeContentDescription();
                }
                this.selectThisIndexBar();
        }
        
        this.Url.backgroundImage = "url('image/background/" + this.ImgNames[this.indx] + "')";
    },


};

// let moreDetails = {
//     moreInfoBtn : document.querySelectorAll(".moreInfo"),

//     addListenners : function(){
//         let self = this;
//         this.moreInfoBtn.forEach(function(element, index){
//             element.addEventListener("click", function(){
//                 self.startLoading(index);
//             });
//         });
//     },

//     startLoading : function(index){
//         if(index == 0){
//             this.showProject1();
//         }
//         else if(index == 1){
//             this.showProject2();
//         }
//         else if(index == 2){
//             this.showProject3();
//         }
//     },

//     showProject1 : function(){
//         bg.fadeInSmoke();
        
//     },

//     showProject2 : function(){

//     },

//     showProject3 : function(){

//     },

//     show : function(){
//         console.log(this.moreInfoBtn);
//     },
// };





    bg.selectThisIndexBar();
    bg.initialiseListenners();