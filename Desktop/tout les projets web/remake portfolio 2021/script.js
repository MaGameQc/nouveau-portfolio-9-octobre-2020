
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
                console.log("removed");
            }
            if(self.removeListener == false){
                if(e.deltaY >= 50){
                    self.incrementIndex();
                } 
                else if(e.deltaY <= -50){
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

    turnOffEventListeners: function(){
        this.removeListener = true;
    },

    turnOnEventListeners: function(){
        this.removeListener = false;
    },


    switchToProjectPage : function(index){

        this.turnOffEventListeners();
        smokeOverlay.fadeInSmoke();
        smokeOverlay.main.style.zIndex = "1";
        setTimeout(function(){
            document.querySelector("#main").style.display = "none";
            document.querySelector("#background").style.display = "none";
            document.querySelector("#project").style.display = "grid";
            smokeOverlay.fadeOutSmoke();
            smokeOverlay.main.style.zIndex = "0";
        }, 2000);

        projectSection.showMoreInfo(index);
    },

};


landingPage.initialise();



projectSection = {
    index : 0,
    projectDynamicElements : {
        landingPageVideo : document.querySelector("#landingVideo"),
        
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
            this.landingPageVideo.src = project.landingPageVideoSource;

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
            landingPageVideoSource: "video/BurgerMaker.mp4",
            landingPageTitle: "BurgerMaker",
            landingPageInfo: "C'est une petite application web qui vous permet de choisir l'animation de votre icône hamburger préféré, copier son code HTML et CSS, puis le coller dans votre propre projet.",
            landingPageTryBtn: "https://magame.ca/hamburgerMaker/",
            aboutProjectTitle: "C'est Quoi BurgerMaker ?",
            aboutProjectDescription: "Ces fameuses icônes hamburger, toujours présente sur mobile, toujours aussi fun à programmer ! J'ai souhaitez-me créer un outil qui allait me permettre de sauver du temps à coder. j'ai donc créé un outil qui génère un code HTML et CSS que tu peux copier et coller dans ton projet, afin d'avoir une icône hamburger animé et fonctionnel en quelques cliques seulement.",
            aboutProjectImage: "image/mockUps/hamburgerIphone.png",
            approachTitle: "Approche",
            approachDescription: "Je voulais tout d'abord que le projet reste simple, tu choisis ton animation tu la colles, et boom ! Ça marche ! Pour ce faire, j'ai décidé de mettre Javascript de côté et de me servir uniquement de CSS pour déclencher l'animation. Ce qui fait en sorte que ça reste simple à ajouter / modifier dans ses propres projets.",
            approachImage: "image/mockUps/hamburgerPc.png",
            role: "Front-End / UI",
            projectDuration: "1 Semaine",
            projectDate: "Octobre 2020",
        },
    
        project1 = {
            landingPageVideoSource: "video/jonTube.mp4",
            landingPageTitle: "JonTube",
            landingPageInfo: "JonTube est simplement une copie basique de YouTube.",
            landingPageTryBtn: "https://magame.ca/jonTube/",
            aboutProjectTitle: "C'est quoi JonTube ?",
            aboutProjectDescription: "JonTube se veut être une version un peu parodique de Youtube. Une version vraiment simplifiée, car je l'ai créé pour tester CSS grid étant donné que j'avais plus l'habitude avec Boostrap grid. Le site web permet d'écouter une vidéo, la mettre sur mute, faire play, faire pause, avancer en cliquant sur la barre de progression ou reculer, poster un commentaire. La base quoi !",
            aboutProjectImage: "image/mockUps/jonTubeIphone.png",
            approachTitle: "Approche",
            approachDescription: "Au départ, je faisais JonTube pour le fun, j'ai fini par y mettre plus de temps, et je souhaitais surtout rendre le vidéo player fonctionnel. J'ai aussi décidé avec ce projet de cesser de me servir de Bootstrap car ça fait du code HTML très sale, surtout quand un seul élément HTML à 6 classes Bootstrap.",
            approachImage: "image/mockUps/jonTubePc.png",
            role: "Front-End / UI",
            projectDuration: "1 Semaine",
            projectDate: "Septembre 2020",
        },
    
        project2 = {
            landingPageVideoSource: "video/piano.mp4",
            landingPageTitle: "LearnPiano",
            landingPageInfo: "LearnPiano est une application web permettant d'apprendre les gammes, accords et même de branché votre piano MIDI par USB et de jouer.",
            landingPageTryBtn: "https://magame.ca/piano/",
            aboutProjectTitle: "C'est Quoi LearnPiano ?",
            aboutProjectDescription: "LearnPiano est un outil très simple qui vous permet de jouer du piano sur le clavier de votre Pc, en touchant l'écran sur votre mobile, ou encore en branchant votre piano MIDI USB dans votre ordinateur. Vous pourrez vous en servir pour apprendre vos gammes, votre doigté pour toutes les gammes mineures et majeures et plus encore.",
            aboutProjectImage: "image/mockUps/pianoIphone.png",
            approachTitle: "Approche",
            approachDescription: "J'improvise souvent des beats dans mon temps libre, et une des choses qui me déplaisent, c'est que les ressources gratuites pour apprendre à jouer du piano ou du synthétiseur sont très réparties sur le web, ça manque aussi cruellement d'interactivité. J'ai donc décidé de créer mon propre petit web app pour apprendre mes gammes et mes accords.",
            approachImage: "image/mockUps/pianoPc.png",
            role: "Front-End / UI",
            projectDuration: "3 Semaines",
            projectDate: "Mai 2020",
        },
    ],

    


    navBar : {
        container : document.querySelector(".projectFixedNavBar"),
        leftArrow : document.querySelector("#leftArrow"),
        rightArrow : document.querySelector("#rightArrow"),
        closeBtn : document.querySelector("#closeBtn"),

        addListeners : function(){
            let mainObj = projectSection;
            let self = this;

            this.leftArrow.addEventListener("click", function(){
                smokeOverlay.fadeOutSmoke();
                mainObj.previousProject();
            });
            this.rightArrow.addEventListener("click", function(){
                smokeOverlay.fadeOutSmoke();
                mainObj.nextProject();
            });
            this.closeBtn.addEventListener("click", function(){
                mainObj.switchToLandingPage();
            });
            document.addEventListener("scroll", function(){
                self.checkNavIsOverlapingDescription();
            });
        },

        checkNavIsOverlapingDescription: function(){
            let triggerElement = document.querySelector(".landingVideoContainer").getBoundingClientRect().height;
            let navBarHeight = this.container.getBoundingClientRect().height;
            let navBarPosition = window.pageYOffset;
            if(navBarPosition > triggerElement - navBarHeight){
                this.leftArrow.classList.add(".fixedNavBarBtn");
                this.rightArrow.classList.add(".fixedNavBarBtn");
                this.closeBtn.classList.add(".fixedNavBarBtn");
                this.leftArrow.style.color = "#0760fe";
                this.rightArrow.style.color = "#0760fe";
                this.closeBtn.style.color = "#0760fe";

            }else{
                this.leftArrow.classList.remove(".fixedNavBarBtn");
                this.rightArrow.classList.remove(".fixedNavBarBtn");
                this.closeBtn.classList.remove(".fixedNavBarBtn");
                this.leftArrow.style.color = "white";
                this.rightArrow.style.color = "white";
                this.closeBtn.style.color = "white";
            }
            
        },
    },


    previousProject : function(){
        console.log( "projectSection.project" + this.index);
        if(this.index < 0){
            this.index = 0;
        }else{
            this.index --
            this.projectDynamicElements.generatePageContent(projectSection.projects[this.index]);
        }
    },

    nextProject : function(){
        console.log( "projectSection.project" + this.index);
        if(this.index >= this.projects.length-1){
            this.index = this.projects.length-1;
        }else{
            this.index ++
            this.projectDynamicElements.generatePageContent(projectSection.projects[this.index]);
        }
    },


    initialise : function(){
        this.navBar.addListeners();
        this.projectDynamicElements.generatePageContent(projectSection.projects[projectSection.index]);
    },

    showMoreInfo: function(index){
        this.index = index;
        this.projectDynamicElements.generatePageContent(projectSection.projects[this.index]);
    },

    switchToLandingPage : function(){

        smokeOverlay.fadeInSmoke();
        smokeOverlay.main.style.zIndex = "1";
        setTimeout(function(){
            document.querySelector("#main").style.display = "grid";
            document.querySelector("#background").style.display = "grid";
            document.querySelector("#project").style.display = "none";
            smokeOverlay.fadeOutSmoke();
            smokeOverlay.main.style.zIndex = "-1";
            landingPage.turnOnEventListeners();
            
        }, 2000);

    },
};



projectSection.initialise();