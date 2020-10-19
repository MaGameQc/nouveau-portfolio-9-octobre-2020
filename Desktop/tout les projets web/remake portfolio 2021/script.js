
let smokeOverlay = {
    main: document.querySelector("#smokeOverlay"),
    smokeImgContainer : document.querySelectorAll(".smokeImgContainer"),

    fadeInSmoke : function(){
        let parent = this.main;
        let children = this.smokeImgContainer;
        parent.innerHTML = "";
        children.forEach(function(element){
            element.classList.remove("fadeOutSmoke");
            element.classList.add("fadeInSmoke");
            parent.appendChild(element);
        });
    },

    fadeOutSmoke : function(){
        let parent = this.main;
        let children = this.smokeImgContainer;
        parent.innerHTML = "";
        children.forEach(function(element){
            element.classList.remove("fadeInSmoke");
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
    removeListener : false,
    navBar: document.querySelector("#navbarContainer"),

    arrow : {
        container: document.querySelector("#btnContainer"),
        up : document.querySelector("#up"),
        down : document.querySelector("#down"),

        addArrowListeners : function(){
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
        description : document.querySelectorAll(".contentDescription"),
        listOfContent : document.querySelectorAll("#listOfContent li"),
        title : document.querySelectorAll(".contentTitle"),
        moreInfoBtn : document.querySelectorAll(".moreInfo"),

        changeInfo : function(){
            this.listOfContent.forEach(function(element){
                element.className = "";
                element.classList.add("hiddenInfo");
            });
            this.listOfContent[landingPage.index].classList.add("showInfo");
        },

        addMoreInfoListeners : function(){
            let mainObj = landingPage;
            let self = this;
            this.moreInfoBtn.forEach(function(element, index){
                element.addEventListener("click", function(){
                    mainObj.switchToProjectPage(index);
                });
            });
        },

        addTouchListeners : function(){
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

        addNavIndexListeners : function(){
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

    addWheelListeners : function(addOrRemove){
        let self = this;
        document.addEventListener("wheel", function listenToWheel (e){
            if(self.removeListener == true){
                document.removeEventListener("wheel", listenToWheel);
            }
            if(self.removeListener == false){
                if(e.deltaY > 0){
                    self.incrementIndex();
                } else{
                    self.decrementIndex();
                }
            }
        });
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
        this.removeListener = false;
        this.bg.initialise();
        this.navIndex.initialise();
        this.navIndex.addNavIndexListeners();
        this.addWheelListeners();
        this.arrow.addArrowListeners();
        this.info.addMoreInfoListeners();
        this.info.addTouchListeners();
    },  

    removeEventListeners: function(){
        this.removeListener = true;
        this.addWheelListeners();

    },


    switchToProjectPage : function(index){

        this.removeEventListeners();
        smokeOverlay.fadeInSmoke();
        smokeOverlay.main.style.zIndex = "1";
        setTimeout(function(){
            document.querySelector("#main").style.display = "none";
            document.querySelector("#background").style.display = "none";
            document.querySelector("#project").style.display = "grid";
            smokeOverlay.fadeOutSmoke();
            smokeOverlay.main.style.zIndex = "0";
        }, 2000);

        
        
        
        if(index == 0){
            
        }
    },

};


landingPage.initialise();



projectSection = {
    index : 0,
    projectDynamicElements : {
        
        landingPageTitle : document.querySelector(".projectTitle"),
        landingPageInfo : document.querySelector(".projectDescription"),
        landingPageTryBtn : document.querySelector(".tryLink"),
      
        aboutProjectTitle : document.querySelector(".aboutTitle"),
        aboutProjectDescription : document.querySelector(".aboutDescriptionText"),
        aboutProjectImage : document.querySelector(".mobileImage"),
       
        approachTitle : document.querySelector(".approachTitle"),
        approachDescription : document.querySelector(".approachDescriptionText"),
        approachImage : document.querySelector(".pcImage"),
        
        role : document.querySelector(".projectRole"),
        projectDuration: document.querySelector(".projectDuration"),
        projectDate: document.querySelector(".projectDate"), 
        
        generatePageContent : function(project){
            this.landingPageTitle.textContent = project.landingPageTitle;    
            this.landingPageInfo.textContent = project.landingPageInfo;
            this.landingPageTryBtn.href = project.landingPageTryBtn;

            this.aboutProjectTitle.textContent = project.aboutProjectTitle;
            this.aboutProjectDescription.textContent = project.aboutProjectDescription;
            this.aboutProjectImage.src = project.aboutProjectImage;

            this.approachTitle.textContent = project.approachTitle;
            this.approachDescription.textContent = project.approachDescription;
            this.approachImage.src = project.approachImage;

            this.role.textContent = project.role;
            this.projectDuration = project.projectDuration;
            this.projectDate = project.projectDate;
        },
        
        
    },

    projects : [
        project0 = {
            landingPageTitle: "BurgerMaker",
            landingPageInfo: "C'est une petite application web qui vous permet de choisir l'animation de votre hamburger icon préféré, copier son code HTML et CSS, puis le coller dans votre propre projet.",
            landingPageTryBtn: "https://magame.ca/hamburgerMaker/",
            aboutProjectTitle: "C'est Quoi BurgerMaker ?",
            aboutProjectDescription: "en tant que développeur, une des choses que j'aime bien faire sont les hamburger icons. ce fameux bouton qui est toujours là à nous attendre si on va sur un site web avec un appareille mobile. Puisque je cherchais un projet qui me ferait pratiquer Javascript, je me suis dit, bah je devrais coder une liste de ces icônes, tu choisie celle que tu veut sur le site, et ca te génère le code HTML et CSS afin de pouvoir t'en servir dans tes projets. Ce projet m'en à appris plus sur la programmation orientée objet, qu'il est important d'encapsuler, de séparer son code en plusieurs methodes, sinon, c'est très difficile de s'y retrouver.",
            aboutProjectImage: "image/mockUps/iphoneMockUpPortrait.png",
            approachTitle: "Approche",
            approachDescription: "en tant que développeur, une des choses que j'aime bien faire sont les hamburger icons. ce fameux bouton qui est toujours là à nous attendre si on va sur un site web avec un appareille mobile. Puisque je cherchais un projet qui me ferait pratiquer Javascript, je me suis dit, bah je devrais coder une liste de ces icônes, tu choisie celle que tu veut sur le site, et ca te génère le code HTML et CSS afin de pouvoir t'en servir dans tes projets. Ce projet m'en à appris plus sur la programmation orientée objet, qu'il est important d'encapsuler, de séparer son code en plusieurs methodes dans un objet, sinon, c'est très difficile de s'y retrouver.",
            approachImage: "image/mockUps/pcMockUp.png",
            role: "Front-End / UI",
            projectDuration: "1 Semaine",
            projectDate: "Octobre 2020",
        },
    
        project1 = {
            landingPageTitle: "BurgerMaker;salkfjslfjsa",
            landingPageInfo: "test",
            landingPageTryBtn: "https://magame.ca/hamburgerMaker/",
            aboutProjectTitle: "hey hey",
            aboutProjectDescription: "test de retest",
            aboutProjectImage: "image/mockUps/iphoneMockUpPortrait.png",
            approachTitle: "Approche",
            approachDescription: "en tant que développeur, une des choses que j'aime bien faire sont les hamburger icons. ce fameux bouton qui est toujours là à nous attendre si on va sur un site web avec un appareille mobile. Puisque je cherchais un projet qui me ferait pratiquer Javascript, je me suis dit, bah je devrais coder une liste de ces icônes, tu choisie celle que tu veut sur le site, et ca te génère le code HTML et CSS afin de pouvoir t'en servir dans tes projets. Ce projet m'en à appris plus sur la programmation orientée objet, qu'il est important d'encapsuler, de séparer son code en plusieurs methodes dans un objet, sinon, c'est très difficile de s'y retrouver.",
            approachImage: "image/mockUps/pcMockUp.png",
            role: "Front-End / UI",
            projectDuration: "1 Semaine",
            projectDate: "Octobre 2020",
        },
    
        project2 = {
            landingPageTitle: "piece of shhhhhh",
            landingPageInfo: "C'est une petite application web qui vous permet de choisir l'animation de votre hamburger icon préféré, copier son code HTML et CSS, puis le coller dans votre propre projet.",
            landingPageTryBtn: "https://magame.ca/hamburgerMaker/",
            aboutProjectTitle: "C'est Quoi BurgerMaker ?",
            aboutProjectDescription: "en tant que développeur, une des choses que j'aime bien faire sont les hamburger icons. ce fameux bouton qui est toujours là à nous attendre si on va sur un site web avec un appareille mobile. Puisque je cherchais un projet qui me ferait pratiquer Javascript, je me suis dit, bah je devrais coder une liste de ces icônes, tu choisie celle que tu veut sur le site, et ca te génère le code HTML et CSS afin de pouvoir t'en servir dans tes projets. Ce projet m'en à appris plus sur la programmation orientée objet, qu'il est important d'encapsuler, de séparer son code en plusieurs methodes, sinon, c'est très difficile de s'y retrouver.",
            aboutProjectImage: "image/mockUps/iphoneMockUpPortrait.png",
            approachTitle: "Approche",
            approachDescription: "en tant que développeur, une des choses que j'aime bien faire sont les hamburger icons. ce fameux bouton qui est toujours là à nous attendre si on va sur un site web avec un appareille mobile. Puisque je cherchais un projet qui me ferait pratiquer Javascript, je me suis dit, bah je devrais coder une liste de ces icônes, tu choisie celle que tu veut sur le site, et ca te génère le code HTML et CSS afin de pouvoir t'en servir dans tes projets. Ce projet m'en à appris plus sur la programmation orientée objet, qu'il est important d'encapsuler, de séparer son code en plusieurs methodes dans un objet, sinon, c'est très difficile de s'y retrouver.",
            approachImage: "image/mockUps/pcMockUp.png",
            role: "Front-End / UI",
            projectDuration: "1 Semaine",
            projectDate: "Octobre 2020",
        },
    ],

    


    navBar : {
        leftArrow : document.querySelector("#leftArrow"),
        rightArrow : document.querySelector("#rightArrow"),
        closeBtn : document.querySelector("#closeBtn"),

        addListeners : function(){
            let mainObj = projectSection;

            this.leftArrow.addEventListener("click", function(){
                smokeOverlay.fadeOutSmoke();
                mainObj.previousProject();
            });
            this.rightArrow.addEventListener("click", function(){
                smokeOverlay.fadeOutSmoke();
                mainObj.nextProject();
            });
            this.closeBtn.addEventListener("click", function(){
            });
        },
    },


    previousProject : function(){
        console.log( "projectSection.project" + this.index);
        this.index --
        this.projectDynamicElements.generatePageContent(projectSection.projects[this.index]);
    },

    nextProject : function(){
        console.log( "projectSection.project" + this.index);
        this.index ++
        this.projectDynamicElements.generatePageContent(projectSection.projects[this.index]);
    },


    initialise : function(){
        this.navBar.addListeners();
    },
};

projectSection.initialise();
console.log(projectSection.projectDynamicElements.generatePageContent);
projectSection.projectDynamicElements.generatePageContent(projectSection.projects[projectSection.index]);
