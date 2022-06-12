
 const Module = {
    created:false,
    leftDiv:null,
    rightDiv:null,
    parent:null,
    mainTextP:null,
    textP:null,
    leftImg:null,
    imgSrc:null,
    imgRatio:null,
    imgRatios:[{url:"_ar_1_1,c_fill,g_auto__c_scale,w_200", w:200, ratio:1}, {url:"_ar_1_1,c_fill,g_auto__c_scale,w_450", w:450, ratio:1},{url:"_ar_1_1,c_fill,g_auto__c_scale,w_630", w:630, ratio:1}, {url:"_ar_1_1,c_fill,g_auto__c_scale,w_767", w:767, ratio:1},{url:"_ar_4_3,c_fill,g_auto__c_scale,w_538", w:538, ratio:1.33},{url:"_ar_4_3,c_fill,g_auto__c_scale,w_694", w:694, ratio:1.33},{url:"_c_scale,w_480", w:480, ratio:1.5},{url:"_c_scale,w_784", w:784, ratio:1.5},{url:"_c_scale,w_1002", w:1002, ratio:1.5},{url:"_c_scale,w_1234", w:1234, ratio:1.5},{url:"_c_scale,w_1394", w:1394, ratio:1.5},{url:"_c_scale,w_1400", w:1400, ratio:1.5},{url:"_ar_16_9,c_fill,g_auto__c_scale,w_596", w:596, ratio:1.77},{url:"_ar_16_9,c_fill,g_auto__c_scale,w_720", w:720, ratio:1.77} ],
    button:null,
    shade:null,
    popup:null,
    popupMsg:null,
    popupButton:null,
    buttonClicks:0,
    resetButton:null,
    storage:0,
    doms:null,
    wcag:null,

    ImageRatio:function()
    {
        const ratios = [1, 1.33, 1.5, 1.77];
        const resW = window.screen.width * window.devicePixelRatio;
        const resH = window.screen.height * window.devicePixelRatio;
        const screenRatio = resW/resH; 
        let closestRatio = ratios[0];
        let closestValue = 100;
        for(let i = 0; i < ratios.length; i++)
        {
           if( Math.abs(ratios[i] - screenRatio) < closestValue)
           {
               closestValue = Math.abs(ratios[i] - screenRatio);
               closestRatio = ratios[i];
           }
        }
        let closestRatioW = this.imgRatios[0];
        let closestValueW = 100000;
        for(let i = 0; i < this.imgRatios.length; i++)
        {
            if( Math.abs(this.imgRatios[i].w - resW) < closestValueW && this.imgRatios[i].ratio == closestRatio)
           {
                closestRatioW = this.imgRatios[i];
                closestValueW = Math.abs(this.imgRatios[i].w - resW);
           }
        }
        this.imgRatio = closestRatioW;
        this.doms.leftImg.dom.src="./images/"+(this.imgSrc+this.imgRatio.url)+".jpg";
    },
    ScaleDivs:function(obj)
    {
        const parentWidth = obj.parent.getBoundingClientRect().width
        let width = window.innerWidth;
        if(width > parentWidth)
        {
            width = parentWidth;
        }
        if(width >= 600)
        {
            const halfWidthLeft = width/2;
            const halfWidthRight = width* 0.45;
            const imgWidth = halfWidthLeft * 0.8;
            const margin = halfWidthLeft * 0.09;
            obj.doms.leftDiv.dom.style.width = halfWidthLeft+"px";
            obj.doms.leftImg.dom.style.marginLeft = margin+"px";
            obj.doms.leftImg.dom.style.marginRight = margin+"px";
            obj.doms.rightDiv.dom.style.width = halfWidthRight+"px";
            obj.doms.leftImg.dom.style.width = imgWidth+"px";
            const imgHeight = imgWidth/obj.imgRatio.ratio;

            if(obj.doms.rightDiv.dom.getBoundingClientRect().height > imgHeight)
            {
                const diffH = obj.doms.rightDiv.dom.getBoundingClientRect().height - imgHeight;
                obj.doms.leftDiv.dom.style.paddingTop = (diffH/2)+"px";
            }
            else
            {
                obj.doms.leftDiv.dom.style.paddingTop = 0+"px";
            }
  
        }
        else
        {
            obj.doms.leftImg.dom.style.marginLeft = 0+"px";
            obj.doms.leftImg.dom.style.marginRight = 0+"px";
            let newWidth = width*0.9;
            obj.doms.leftDiv.dom.style.width = newWidth+"px";
            obj.doms.rightDiv.dom.style.width = newWidth+"px";
            obj.doms.leftImg.dom.style.width = newWidth+"px";
            
        }
        //

        
    },
    Start:function(parent, clas,img, maintext, text, buttonText, storage, wcag){
        if(this.created)
        {
            return;
        }
        if(wcag)
        {
            wcag.AddElement(this);
            this.wcag = wcag;
        }
        
        this.GenerateDoms();
        this.doms.div.dom = document.createElement('div');
        this.doms.div.dom.id = 'content';
        this.doms.div.dom.className = 'module '+clas;
        //
        this.doms.leftDiv.dom = document.createElement('div');
        this.doms.rightDiv.dom = document.createElement('div');
        this.doms.div.dom.appendChild(this.doms.leftDiv.dom);
        this.doms.div.dom.appendChild(this.doms.rightDiv.dom);
        this.doms.leftDiv.dom.className = "leftDiv";
        this.doms.rightDiv.dom.className = "rightDiv";
        //
        this.parent = parent;
        parent.appendChild(this.doms.div.dom);
        //
        this.doms.mainTextP.dom = document.createElement('h1');
        this.doms.textP.dom = document.createElement('p');
        this.doms.rightDiv.dom.appendChild(this.doms.mainTextP.dom);
        this.doms.rightDiv.dom.appendChild(this.doms.textP.dom);
        this.doms.mainTextP.dom.innerHTML = maintext;
        this.doms.textP.dom.innerHTML = text;
        this.doms.mainTextP.dom.className = "mainTextP";
        this.doms.textP.dom.className = "textP";
        //
        this.doms.leftImg.dom = document.createElement('img');
        this.doms.leftDiv.dom.appendChild(this.doms.leftImg.dom);
        this.doms.leftImg.dom.className = "leftImg";
        this.imgSrc = img;
        //
        this.doms.button.dom = document.createElement('div');
        this.doms.rightDiv.dom.appendChild(this.doms.button.dom);
        this.doms.button.dom.className = "moduleButton";
        this.doms.button.dom.innerHTML = buttonText;
        this.doms.button.isButton = true;
        //
        const clearDiv = document.createElement('div');
        this.doms.div.dom.appendChild(clearDiv);
        clearDiv.className = "clear";
        //
        parent.appendChild(this.doms.div.dom);
        let _this = this;
        this.ImageRatio();
        this.ScaleDivs(_this);
        
        window.addEventListener('resize', function(){
            _this.WindowChanged(_this);
        });
        this.doms.button.dom.addEventListener('click', function(){
            _this.ButtonClick(_this);
        });
        //
        this.storage = storage;
        let storageCount = localStorage.getItem("moduleStorage"+storage);
        storageCount = parseInt(storageCount);
        if(!storageCount)
        {
            localStorage.setItem("moduleStorage"+storage, _this.buttonClicks);
        }
        else
        {
            _this.buttonClicks = parseInt(storageCount);
        }
        this.created = true;
    },
    GenerateDoms:function()
    {
        this.doms={};
        const arr = ["div","leftDiv","rightDiv","mainTextP","textP","leftImg","button","shade","popup","closeButton","alerted","popupMsg","resetButton"];
        for(let i = 0; i < arr.length; i++)
        {     
            this.doms[arr[i]]={dom:null, prevCss:{fontSize:0,fontFace:"",background:"white", color:"black", upperCase:false}};
        }
    },
    WindowChanged:function(obj)
    {
        obj.ScaleDivs(obj);
    },
    ButtonClick:function(obj)
    {
        
        obj.doms.shade.dom = document.createElement('div');
        obj.doms.shade.dom.className = "moduleShade";
        obj.doms.shade.isPopup = true;
        document.body.appendChild(obj.doms.shade.dom);
        obj.doms.popup.dom = document.createElement('div');
        obj.doms.popup.dom.className = "modulePopup";
        obj.doms.popup.isPopup = true;
        //
        const absolute = document.createElement('div');
        obj.doms.popup.dom.appendChild(absolute);
        absolute.className = "absolute";
        obj.doms.closeButton.dom = document.createElement('div');
        absolute.appendChild(obj.doms.closeButton.dom);
        obj.doms.closeButton.dom.className = "modulePopupClose";
        obj.doms.closeButton.dom.innerHTML = "&#x2715";
        obj.doms.closeButton.isPopup = true;
        obj.doms.closeButton.isButton = true;
        //
        obj.doms.alerted.dom = document.createElement('h1');
        obj.doms.popup.dom.appendChild(obj.doms.alerted.dom);
        obj.doms.alerted.dom.className = "modulePopupAlert";
        obj.doms.alerted.dom.innerHTML = "Alert!";
        obj.doms.alerted.isPopup = true;
        //
        obj.doms.popupMsg.dom = document.createElement('p');
        obj.doms.popup.dom.appendChild(obj.doms.popupMsg.dom);
        obj.doms.popupMsg.dom.className = "modulePopupMsg";
        obj.doms.popupMsg.isPopup = true;
        
        obj.SetButtonClicks(obj,obj.buttonClicks + 1);
        //
        document.body.appendChild(obj.doms.popup.dom);
        obj.doms.shade.dom.addEventListener('click', function(){
            obj.ClosePopup(obj);
        });
        obj.doms.closeButton.dom.addEventListener('click', function(){
            obj.ClosePopup(obj);
        });
        if(obj.buttonClicks >= 5)
        {
            obj.doms.resetButton.dom = document.createElement('div');
            obj.doms.popup.dom.appendChild(obj.doms.resetButton.dom );
            obj.doms.resetButton.dom.className = "moduleButton";
            obj.doms.resetButton.dom.innerHTML = "Reset Count";
            obj.doms.resetButton.isPopup = true;
            obj.doms.resetButton.isButton = true;
            obj.doms.resetButton.dom.addEventListener('click', function(){
                obj.ResetCount(obj);
            });
        }
        if(obj.wcag)
        {
            obj.wcag.CheckCss(obj.wcag, true);
            obj.wcag.SetStyle(obj.wcag, true);
        }
    },
    ClosePopup:function(obj)
    {
        if(obj.doms.shade.dom !== null)
        {
            obj.doms.shade.dom.parentNode.removeChild(obj.doms.shade.dom);
        }
        if(obj.doms.popup.dom !== null)
        {
            obj.doms.popup.dom.parentNode.removeChild(obj.doms.popup.dom);
        }
        if(obj.doms.popupMsg.dom !== null)
        {
            obj.doms.popupMsg.dom.parentNode.removeChild(obj.doms.popupMsg.dom);
        }
        if(obj.doms.alerted.dom !== null)
        {
            obj.doms.alerted.dom.parentNode.removeChild(obj.doms.alerted.dom);
        }
        if(obj.doms.resetButton.dom !== null)
        {
            obj.doms.resetButton.dom.parentNode.removeChild(obj.doms.resetButton.dom);
        }
        obj.doms.shade.dom = null;
        obj.doms.popup.dom = null;
        obj.doms.popupMsg.dom = null;
        obj.doms.alerted.dom = null;
        obj.doms.resetButton.dom = null;
    },
    ResetCount:function(obj)
    {
        if(obj.doms.resetButton.dom !== null)
        {
            obj.doms.resetButton.dom.parentNode.removeChild(obj.doms.resetButton.dom);
        }
        obj.doms.resetButton.dom = null;
        obj.SetButtonClicks(obj,0);
    },
    SetButtonClicks:function(obj,count)
    {
        obj.buttonClicks = count;
        localStorage.setItem("moduleStorage"+obj.storage, count);
        obj.doms.popupMsg.dom.innerHTML = "You have clicked "+count+" times to related button.";
    },
    SetBigText:function(txt)
    {
        if(obj.doms.mainTextP.dom !== null)
        {
            obj.doms.mainTextP.dom.innerHTML = txt;
        } 
    },
    SetText:function(txt)
    {
        if(obj.doms.textP.dom !== null)
        {
            obj.doms.textP.dom.innerHTML = txt;
        }
    },
    SetImg:function(src)
    {
        if(obj.doms.leftImg.dom !== null)
        {
            this.imgSrc = src;
            this.ImageRatio();
            this.ScaleDivs(this);
        }
    },
    SetButtonText:function(txt)
    {
        if(obj.doms.button.dom !== null)
        {
            obj.doms.button.dom.innerHTML = txt;
        }
    } 
};
const Wcag = {
    created:false,
    main:null,
    panel:null,
    close:null,
    fontPlus:null,
    fontMinus:null,
    bigFont:null,
    normal:null,
    contrast:null,
    rContrast:null,
    reset:null,
    registered:[],
    fontSizeChange:0,
    upperCase:false,
    theme:0,
    cssChecked:false,
    buttonsState:[false,0],

    Start:function(parent)
    {
        if(this.created)
        {
            return;
        }
        this.created = true;
        let _this = this; 
        this.main = document.createElement('div');
        parent.appendChild(this.main);
        this.main.className = "wcagMain";
        this.main.innerHTML = "WCAG";
        this.main.addEventListener('click', function(){
            _this.ShowPanel(_this);
        });
        //
        this.panel = document.createElement('div');
        parent.appendChild(this.panel);
        this.panel.className = "wcagPanel";
        //
        this.close = document.createElement('div');
        this.panel.appendChild(this.close);
        this.close.className = "wcagClose";
        this.close.innerHTML = "Close";
        this.close.addEventListener('click', function(){
            _this.ClosePanel(_this);
        });
        //
        this.fontPlus = document.createElement('div');
        this.panel.appendChild(this.fontPlus);
        this.fontPlus.className = "wcagButton";
        this.fontPlus.innerHTML = "Bigger Font";
        this.fontPlus.addEventListener('click', function(){
            _this.ChangeStyle(_this, "p");
        });
        //
        this.fontMinus = document.createElement('div');
        this.panel.appendChild(this.fontMinus);
        this.fontMinus.className = "wcagButton";
        this.fontMinus.innerHTML = "Smaller Font";
        this.fontMinus.addEventListener('click', function(){
            _this.ChangeStyle(_this, "m");
        });
        //
        this.bigFont = document.createElement('div');
        this.panel.appendChild(this.bigFont);
        this.bigFont.className = "wcagButton";
        this.bigFont.innerHTML = "Visible Font";
        this.bigFont.addEventListener('click', function(){
            _this.ChangeStyle(_this, "up");
        });
        //
        this.normal = document.createElement('div');
        this.panel.appendChild(this.normal);
        this.normal.className = "wcagButton";
        this.normal.innerHTML = "Default Theme";
        this.normal.addEventListener('click', function(){
            _this.ChangeStyle(_this, "dt");
        });
        //
        this.contrast = document.createElement('div');
        this.panel.appendChild(this.contrast);
        this.contrast.className = "wcagButton";
        this.contrast.innerHTML = "Contrast Theme";
        this.contrast.addEventListener('click', function(){
            _this.ChangeStyle(_this, "ct");
        });
        //
        this.rContrast = document.createElement('div');
        this.panel.appendChild(this.rContrast);
        this.rContrast.className = "wcagButton";
        this.rContrast.innerHTML = "Reverse Contrast Theme";
        this.rContrast.addEventListener('click', function(){
            _this.ChangeStyle(_this, "rct");
        });
        //
        this.reset = document.createElement('div');
        this.panel.appendChild(this.reset);
        this.reset.className = "wcagButton";
        this.reset.innerHTML = "Reset";
        this.reset.addEventListener('click', function(){
            _this.ResetStyle(_this);
        });
        //
        let storage = localStorage.getItem("wcagStorage");
        if(!storage)
        {
            localStorage.setItem("wcagStorage", JSON.stringify({fontSizeChange:0,upperCase:false,theme:0}));
        }
        else
        {
            storage = JSON.parse(localStorage.getItem("wcagStorage"));
            this.fontSizeChange = storage.fontSizeChange;
            this.upperCase = storage.upperCase;
            this.theme = storage.theme;
        }
        this.ButtonSet();
    },
    AddElement:function(obj)
    {
        this.registered.push(obj);
    },
    ShowPanel:function(obj)
    {
        obj.panel.style.display = "inline-block";
        obj.main.style.display = "none";
        if(obj.cssChecked === false)
        {
            obj.CheckCss(obj, false);
            obj.cssChecked = true;
        }
    },
    ClosePanel:function(obj)
    {
        obj.panel.style.display = "none";
        obj.main.style.display = "inline-block";
    },
    ChangeStyle:function(obj, change)
    {
        
        if(change === "p" && obj.fontSizeChange <3)
        {
            obj.fontSizeChange++;
        }
        else if(change === "p")
        {
            return;
        }
        if(change === "m" && obj.fontSizeChange >-3)
        {
            obj.fontSizeChange--;
        }
        else if(change === "m")
        {
            return;
        }
        if(change === "up")
        {
            obj.upperCase = !obj.upperCase;
            obj.ButtonSet();
        }
        if(change === "dt" && obj.theme !== 0)
        {
            obj.theme = 0;
            obj.ButtonSet();
        }
        else if(change === "dt")
        {
            return;
        }
        if(change === "ct" && obj.theme !== 1)
        {
            obj.theme = 1;
            obj.ButtonSet();
        }
        else if(change === "ct")
        {
            return;
        }
        if(change === "rct" && obj.theme !== 2)
        {
            obj.theme = 2;
            obj.ButtonSet();
        }
        else if(change === "rct")
        {
            return;
        }
        localStorage.setItem("wcagStorage", JSON.stringify({fontSizeChange:obj.fontSizeChange,upperCase:obj.upperCase,theme:obj.theme}));
        obj.ChangeDoms(obj, change, false);
    },
    ChangeDoms:function(obj, change, onlyPopup)
    {
        for(let i = 0; i<obj.registered.length; i++)
        {
            for (const property in obj.registered[i].doms) {
                if(obj.registered[i].doms[property].dom !== null && (onlyPopup === false || obj.registered[i].doms[property].isPopup))
                {
                    if(change === "p" || change === "m")
                    {
                        const changeSize = obj.fontSizeChange * 3;
                        const newSize = obj.registered[i].doms[property].prevCss.fontSize + changeSize;
                        obj.registered[i].doms[property].dom.style.fontSize = newSize+"px";
                    }
                    if(change === "up")
                    {
                        if(obj.upperCase)
                        {
                            obj.registered[i].doms[property].dom.style.textTransform = "uppercase"; 
                        } 
                        else
                        {
                            obj.registered[i].doms[property].dom.style.textTransform = obj.registered[i].doms[property].prevCss.upperCase;
                        }
                    }
                    if(change === "dt" || change === "ct" || change === "rct")
                    {
                        if(obj.theme === 0)
                        {
                            obj.registered[i].doms[property].dom.style.backgroundColor = obj.registered[i].doms[property].prevCss.background;
                            obj.registered[i].doms[property].dom.style.color = obj.registered[i].doms[property].prevCss.color;
                        }
                        else if(obj.theme === 1)
                        {
                            if(obj.registered[i].doms[property].isButton)
                            {
                                obj.registered[i].doms[property].dom.style.backgroundColor = "#222222";
                            }
                            else
                            {
                                obj.registered[i].doms[property].dom.style.backgroundColor = "black";
                            }
                            obj.registered[i].doms[property].dom.style.color = "blue";
                        }
                        else if(obj.theme === 2)
                        {
                            if(obj.registered[i].doms[property].isButton)
                            {
                                obj.registered[i].doms[property].dom.style.backgroundColor = "#222222";
                            }
                            else
                            {
                                obj.registered[i].doms[property].dom.style.backgroundColor = "black";
                            }
                            obj.registered[i].doms[property].dom.style.color = "yellow";
                        }
                    }
                }
            }
        }
    },
    CheckCss:function(obj, onlyPopup)
    {
        for(let i = 0; i<obj.registered.length; i++)
        {
            for (const property in obj.registered[i].doms) {
                if(obj.registered[i].doms[property].dom !== null && (onlyPopup === false || obj.registered[i].doms[property].isPopup))
                {
                    const size = window.getComputedStyle(obj.registered[i].doms[property].dom, null).getPropertyValue('font-size');
                    const fontSize = parseFloat(size);
                    obj.registered[i].doms[property].prevCss.fontSize = fontSize;
                    const textTransform = window.getComputedStyle(obj.registered[i].doms[property].dom, null).getPropertyValue('text-transform');
                    obj.registered[i].doms[property].prevCss.upperCase = textTransform;
                    const color = window.getComputedStyle(obj.registered[i].doms[property].dom, null).getPropertyValue('color');
                    obj.registered[i].doms[property].prevCss.color = color;
                    const background = window.getComputedStyle(obj.registered[i].doms[property].dom, null).getPropertyValue('background-color');
                    obj.registered[i].doms[property].prevCss.background = background;
                }
            }
        }
    },
    ResetStyle:function(obj)
    {
        obj.fontSizeChange = 0;
        obj.upperCase = false;
        obj.theme = 0;
        localStorage.setItem("wcagStorage", JSON.stringify({fontSizeChange:0,upperCase:false,theme:0}));
        for(let i = 0; i<obj.registered.length; i++)
        {
            for (const property in obj.registered[i].doms) {
                if(obj.registered[i].doms[property].dom !== null)
                {
                    obj.registered[i].doms[property].dom.style.fontSize = obj.registered[i].doms[property].prevCss.fontSize+"px";
                    //const size = window.getComputedStyle(obj.registered[i].doms[property].dom, null).getPropertyValue('font-size');
                    //const fontSize = parseFloat(size);
                    //obj.registered[i].doms[property].dom.style.fontSize = fontSize+"px";
                    obj.registered[i].doms[property].dom.style.textTransform = obj.registered[i].doms[property].prevCss.upperCase;
                    obj.registered[i].doms[property].dom.style.color = obj.registered[i].doms[property].prevCss.color;
                    obj.registered[i].doms[property].dom.style.backgroundColor = obj.registered[i].doms[property].prevCss.background;
                }
            }
        }
        obj.ButtonSet();
    },
    SetStyle:function(obj, onlyPopup)
    {
        if(obj.fontSizeChange !== 0)
        {
            obj.ChangeDoms(obj, "p", onlyPopup);
        }
        if(obj.upperCase === true)
        {
            obj.ChangeDoms(obj, "up", onlyPopup);
        }
        if(obj.theme !== 0)
        {
            obj.ChangeDoms(obj, "dt", onlyPopup);
        }
    },
    ButtonSet:function()
    {
        if(this.upperCase && !this.buttonsState[0])
        {
            this.bigFont.className = "wcagButtonSet";
        }
        else if(!this.upperCase && this.buttonsState[0])
        {
            this.bigFont.className = "wcagButton";
        }
        if(this.theme === 0 && !this.buttonsState[1] !== 0)
        {
            this.normal.className = "wcagButtonSet";
        }
        else if(this.theme !== 0 && this.buttonsState[1] === 0)
        {
            this.normal.className = "wcagButton";
        }
        if(this.theme === 1 && !this.buttonsState[1] !== 1)
        {
            this.contrast.className = "wcagButtonSet";
        }
        else if(this.theme !== 1 && this.buttonsState[1] === 1)
        {
            this.contrast.className = "wcagButton";
        }
        if(this.theme === 2 && !this.buttonsState[1] !== 2)
        {
            this.rContrast.className = "wcagButtonSet";
        }
        else if(this.theme !== 2 && this.buttonsState[1] === 2)
        {
            this.rContrast.className = "wcagButton";
        }
        this.buttonsState[0] = this.upperCase;
        this.buttonsState[1] = this.theme;
    },
    CheckLoad:function()
    {
        this.CheckCss(this, false);
        this.cssChecked = true;
        this.SetStyle(this, false);
        this.ButtonSet();
    }


}