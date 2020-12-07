$(window).load(function(){

	var mymap;
	var markeropa;
	var catmarkers = [];
	var savearray = [];
	var cordilarray = [], cdeliclarray = [], cpreclarray = [], cluxelarray = [], cdefilarray = [], cfeelarray = [], succeslarray = [], geocularray = [], panolarray = [], sceaugeoarray = [];
	var mondstadtarray = ["cordi","cdelic","cprec","cluxe","cdefi","cfee","succes","anemo","pano"];
    var nbtmark = 0;

// Réglages de la LightBox ligne de commande : <a href="media/test.jpg" data-lightbox="test1" data-title="Image de test"><img class="thumb" src="media/test.jpg" width="230px" alt="Image de test"/></a>
	lightbox.option({
		'fadeDuration': 400,
		'imageFadeDuration': 400,
		'maxWidth': 1200,
		'maxHeight': 900,
		'resizeDuration': 400
	});

// Fonctions Interaction sur la Map

	function onMapClick(e) {
		console.log(i18n["ui-click"] + mymap.wrapLatLng(e.latlng));
	};

	function onMarkerClick(e) {
		markeropa = this;
	};

// Fonctions de Gestion des Marqueurs

	function markeropacity(e) {
		if (e){
				markeropa.setOpacity(0.45);
			}
			else {
				markeropa.setOpacity(1);
			};
	};

	function initarray() {
		var i = 0;
		while (catmarkers[i]) {
			cookname = "chkbox" + catmarkers[i];
			switch (catmarkers [i]) {
				case "cordil":
					cordilarray = JSON.parse(localStorage.getItem(cookname));
					break;
				case "cdelicl":
					cdeliclarray = JSON.parse(localStorage.getItem(cookname));
					break;
				case "cprecl":
					cpreclarray = JSON.parse(localStorage.getItem(cookname));
					break;
				case "cluxel":
					cluxelarray = JSON.parse(localStorage.getItem(cookname));
					break;
				case "cdefil":
					cdefilarray = JSON.parse(localStorage.getItem(cookname));
					break;
				case "cfeel":
					cfeelarray = JSON.parse(localStorage.getItem(cookname));
					break;
				case "succesl":
					succeslarray = JSON.parse(localStorage.getItem(cookname));
					break;
				case "geocul":
					geocularray = JSON.parse(localStorage.getItem(cookname));
					break;
				case "panol":
					panolarray = JSON.parse(localStorage.getItem(cookname));
					break;
				case "sceaugeo":
					sceaugeoarray = JSON.parse(localStorage.getItem(cookname));
			}
			i++	
		};
	};

	function initmarker(markers,cbxname) {
		var cookm = JSON.parse(localStorage.getItem("chkbox" + cbxname));
		var i = 0;
		catmarkers.push(cbxname);
		if (cookm) {
			while (cookm[i]) {
				markeropa = markers[cookm[i] - 1];
				markeropacity (true);
				i++;
			};
		};
	};

	// Debuggage des markers

	function initmarkerdebug(markers,cbxname){
        var cookm = JSON.parse(localStorage.getItem("chkbox" + cbxname));
		console.log(localStorage.getItem("chkbox" + cbxname));
		var i = 0;
		catmarkers.push(cbxname);
		if (cookm) {
			while (cookm[i]) {
				markeropa = markers[cookm[i] - 1];
				console.log("Marker n° " + cookm[i]);
				markeropacity (true);
				i++;
			};
		};
      
    };

	function selectarray(mtype,mnumb,mstate) {
		switch (mtype) {
			case "cordil":
				cookts = gestionarray (cordilarray, mnumb, mstate);
				break;
			case "cdelicl":
				cookts = gestionarray (cdeliclarray, mnumb, mstate);
				break;
			case "cprecl":
				cookts = gestionarray (cpreclarray, mnumb, mstate);
				break;
			case "cluxel":
				cookts = gestionarray (cluxelarray, mnumb, mstate);
				break;
			case "cdefil":
				cookts = gestionarray (cdefilarray, mnumb, mstate);
				break;
			case "cfeel":
				cookts = gestionarray (cfeelarray, mnumb, mstate);
				break;
			case "succesl":
				cookts = gestionarray (succeslarray, mnumb, mstate);
				break;
			case "geocul":
				cookts = gestionarray (geocularray, mnumb, mstate);
				break;
			case "panol":
				cookts = gestionarray (panolarray, mnumb, mstate);
				break;
			case "sceaugeo":
				cookts = gestionarray (sceaugeoarray, mnumb, mstate);
		};
		localStorage.setItem("chkbox" + mtype, JSON.stringify(cookts));
	};

	function gestionarray(tempcook, chknb, etat) {
		if (etat) {
			tempcook.push(chknb);
		} else {
			var i = 0;
			while (tempcook[i]) {
			  	if (tempcook[i] == chknb) {
					tempcook.splice(i, 1);
    			};
				i++;
			};
		};
		return tempcook;
	};

	function activecb(mtype,mnumb) {
		var arrayvide = [];
		cooktl = JSON.parse(localStorage.getItem("chkbox" + mtype));
		if (cooktl) {
			var i = 0;
			while (cooktl[i]) {
				if (cooktl[i] == mnumb) {
					return true;
				};
				i++;
			};
			return false;
		} else {
            localStorage.setItem("chkbox" + mtype, JSON.stringify(arrayvide));
			initarray();
			return false;
		};
	};

	function resetmarkers() {
		doreset();
		alert(i18n["ui-reset"]);
        if (sessionStorage.languagemap == "fr") {
			document.location.href='indexl.html';
			} else {
			document.location.href='indexlen.html';}
	};

	function doreset () {
		var  i=0, cbx;
		var arraytoreset = catmarkers.concat(mondstadtarray);
		while (arraytoreset[i]) {
			cbx = "chkbox" + arraytoreset[i];
			localStorage.removeItem(cbx);
			i++;
		};
	};

	function savecookies() {
		savearray = ["v2", "cordil", cordilarray, "cdelicl", cdeliclarray, "cprecl", cpreclarray, "cluxel", cluxelarray, "cdefil", cdefilarray, "cfeel", cfeelarray, "succesl", succeslarray, "geocul", geocularray, "panol", panolarray, "sceaugeo", sceaugeoarray];
		var i=0, cbx;
		while (mondstadtarray[i]) {
			cbx = "chkbox" + mondstadtarray[i];
			savearray.push(mondstadtarray[i]);
			if (localStorage.getItem(cbx)) {
				savearray.push(JSON.parse(localStorage.getItem(cbx)));
			} else {
				savearray.push([]);
			};
			i++;
		};
		return savearray;
	};

	function loadcookies(lstmrk) {
		if (lstmrk[0] == "v2") {
			doreset();
			var i = 1, cbx;
			while (lstmrk[i]) {
				cbx = "chkbox" + lstmrk[i];
                localStorage.setItem(cbx, JSON.stringify(lstmrk[i+1]));
				i = i + 2;
			};
			alert(i18n["ui-import"]);
			if (sessionStorage.languagemap == "fr") {
				document.location.href='indexl.html';
				} else {
				document.location.href='indexlen.html';
				}
			} else {
			alert(i18n["ui-fileerror"])
		};
	};	

	function reselectmenu(){
		$('#activation-select-options li').each(function(){
			if ($(this).hasClass('selected')) {
				$('.' + $(this).attr('value')).hide();
			}
		});
		$('.matbtn').each(function(){
			if ($(this).hasClass('pressed')) {
				$('.' + $(this).attr('value')).hide();
			}
		});
	    if (localStorage.MenumapgenshinLLi) {
			var listatut = JSON.parse(localStorage.MenumapgenshinLLi);
	    } else {
	      	localStorage.MenumapgenshinLLi = [];
 		};
		 if (localStorage.MenumapgenshinLBtn) {
			var btnstatut = JSON.parse(localStorage.MenumapgenshinLBtn);
	    } else {
	      	localStorage.MenumapgenshinLBtn = [];
 		};
		if(listatut){
			listatut.forEach(function(element) {
				$("#li" + element).removeClass('selected');
				$('.' + element).show();
			});
		};
		if (btnstatut){
			btnstatut.forEach(function(element) {
				$("#btn" + element).removeClass('pressed').attr('src', "media/icones/" + element + "on.png");
				$('.' + element).show();
			});
		};
	};

	function openMenu(){
		$('#activation-select-box').addClass('selecting').text(i18n["ui-close"]);
		$('#activation-select-options').slideDown(150);
	};

    $(function () {

        // Initialisation et chargement de la Map
            mymap = L.map('mapid', {
                        crs: L.CRS.Simple,
                        minZoom : -2,
                        maxZoom : 2
                    });
        
            mymap.setMaxBounds(new L.latLngBounds([-700,-200], [4469,4047]));
            mymap.zoomControl.setPosition('topright')
            
            var bounds = [[0,0], [3769,3847]];
            var image = L.imageOverlay('media/map-liyue.jpg', bounds).addTo(mymap);
        
            mymap.fitBounds(bounds);
            
// Initialisation des marqueurs	

function loadmarker(marklist, markico, marktitle,filename,cbxname) {
    var listback = [], marq = [], nfichier, i, mtype;
    for (i=0; i<marklist.length; i++) {
        marq = marklist[i];
        // console.log("mark n° "+ (i+1) + " " + JSON.stringify(marq)); // Pour Debug les marqueurs
        mtype = marq[0];
        nfichier = filename + (i+1);
        switch (mtype) {
            case 0 : // Img
                L.marker(marq[1], {icon: markico, title: marktitle}).addTo(mymap).bindPopup(`<a href="media/${nfichier}.jpg" data-lightbox="${nfichier}" data-title="${marktitle}"><img class="thumb" src="media/${nfichier}.jpg"/></a>`, popupOptions);
                break;
            case 1 : // Img + cb
                listback.push(L.marker(marq[1], {icon: markico, title: marktitle}).addTo(mymap).on('click', onMarkerClick).bindPopup(`<a href="media/${nfichier}.jpg" data-lightbox="${nfichier}" data-title="${marktitle}"><img class="thumb" src="media/${nfichier}.jpg"/></a><br><h2><input id="mapbox" name="${cbxname}" value="${i + 1}" type="checkbox" /> Trouvé</h2>`, popupOptions));
                break;
            case 2 : // Img + txt
                L.marker(marq[1], {icon: markico, title: marktitle}).addTo(mymap).bindPopup(`<h1><a href="media/${nfichier}.jpg" data-lightbox="${nfichier}" data-title="${marktitle}"><img class="thumb" src="media/${nfichier}.jpg"/></a><br><br>${marq[2]}</h1>`, popupOptions);
                break;
            case 3 : // Img + txt + cb
                listback.push(L.marker(marq[1], {icon: markico, title: marktitle}).addTo(mymap).on('click', onMarkerClick).bindPopup(`<h1><a href="media/${nfichier}.jpg" data-lightbox="${nfichier}" data-title="${marktitle}"><img class="thumb" src="media/${nfichier}.jpg"/></a><br><br>${marq[2]}<br><h2><input id="mapbox" name="${cbxname}" value="${i + 1}" type="checkbox" /> Trouvé</h2>`, popupOptions));
                break;
            case 4 : // Video ss txt
                L.marker(marq[1], {icon: markico, title: marktitle}).addTo(mymap).bindPopup(`<iframe width="560" height="315" src="//www.youtube.com/embed/${marq[2]}?rel=0" frameborder="0" allowfullscreen></iframe>`, popupOptions);
                break;
            case 5 : // Video ss txt + cb
                listback.push(L.marker(marq[1], {icon: markico, title: marktitle}).addTo(mymap).on('click', onMarkerClick).bindPopup(`<iframe width="560" height="315" src="//www.youtube.com/embed/${marq[2]}?rel=0" frameborder="0" allowfullscreen></iframe><br><h2><input id="mapbox" name="${cbxname}" value="${i + 1}" type="checkbox" /> Trouvé</h2>`, popupOptions));
                break;
            case 6 : // Video + txt
                L.marker(marq[1], {icon: markico, title: marktitle}).addTo(mymap).bindPopup(`<iframe width="560" height="315" src="//www.youtube.com/embed/${marq[2]}?rel=0" frameborder="0" allowfullscreen></iframe><br><h1>${marq[3]}</h1>`, popupOptions);
                break;
            case 7 : // Video + txt + cb
                listback.push(L.marker(marq[1], {icon: markico, title: marktitle}).addTo(mymap).on('click', onMarkerClick).bindPopup(`<iframe width="560" height="315" src="//www.youtube.com/embed/${marq[2]}?rel=0" frameborder="0" allowfullscreen></iframe><br><h1>${marq[3]}<br><h2><input id="mapbox" name="${cbxname}" value="${i + 1}" type="checkbox" /> Trouvé</h2></h1>`, popupOptions));
                break;
            case 8 : // txt
                L.marker(marq[1], {icon: markico, title: marktitle}).addTo(mymap).bindPopup(`<h1>${marq[2]}</h1>`, popupOptions);
                break;
            case 9 : // txt + cb
                listback.push(L.marker(marq[1], {icon: markico, title: marktitle}).addTo(mymap).on('click', onMarkerClick).bindPopup(`<h1>${marq[2]}<br><h2><input id="mapbox" name="${cbxname}" value="${i + 1}" type="checkbox" /> Trouvé</h2></h1>`, popupOptions));
                break;
            case 10 : // null
                L.marker(marq[1], {icon: Null, title: ""}).addTo(mymap).bindPopup(`<h1>${marq[2]}</h1>`, popupOptions);
                break;
            case 11 : // null + cb
                listback.push(L.marker(marq[1], {icon: Null, title: ""}).addTo(mymap).on('click', onMarkerClick).bindPopup(`<h1>${marq[2]}<br><h2><input id="mapbox" name="${cbxname}" value="${i + 1}" type="checkbox" /> Trouvé</h2></h1>`, popupOptions));
                break;
            case 12 : // sans popup
                L.marker(marq[1], {icon: markico, title: marktitle}).addTo(mymap);
        };
    };
    console.log(marktitle + " : " + marklist.length + i18n["ui-load"]);
    nbtmark += marklist.length;
    // console.log("nombre de marqueur Total chargés : " + nbtmark); // Pour debug
    return listback;
};

// Chargement des Marqueurs

    loadmarker(liststatue,Statue,i18n.cat01,"statuel","");
    loadmarker(listteleport,Teleport,i18n.cat02,"tpl","");
    var markerspano = loadmarker(listpano,Pano,i18n.cat03,"panol","panol");
    initmarker (markerspano, "panol");
    var markerscordi = loadmarker(listcordi,Cordi,i18n.cat04,"ocl","cordil");
    initmarker (markerscordi, "cordil");
    var markerscdelic = loadmarker(listcdelic,Cdelic,i18n.cat05,"dcl","cdelicl");
    initmarker (markerscdelic, "cdelicl");
    var markerscprec = loadmarker(listcprec,Cprec,i18n.cat06,"pcl","cprecl");
    initmarker (markerscprec, "cprecl");
    var markerscluxe = loadmarker(listcluxe,Cluxe,i18n.cat07,"lcl","cluxel");
    initmarker (markerscluxe, "cluxel");
    var markerscdefi = loadmarker(listcdefi,Cdefi,i18n.cat08,"defil","cdefil");
    initmarker (markerscdefi, "cdefil");
    var markerscfee = loadmarker(listcfee,Cfee,i18n.cat09,"","cfeel");
    initmarker (markerscfee , "cfeel");
    var markersgeocul = loadmarker(listgeocul,Geocul,i18n.cat29,"geoc","geocul");
    initmarker (markersgeocul, "geocul");
    var markerssceaugeo = loadmarker(listsceaugeo,Sceaugeo,i18n.cat30,"sg","sceaugeo");
    initmarker (markerssceaugeo, "sceaugeo");
    loadmarker(listcristal,Cristal,i18n.cat11,"","");
    loadmarker(listelectroc,Electrocris,i18n.cat12,"","");
    loadmarker(listfbrume,Fbrume,i18n.cat13,"","");
    loadmarker(listffeu,Ffeu,i18n.cat14,"","");
    loadmarker(listbambou,Bambou,i18n.cat31,"","");
    loadmarker(listperle,Perle,i18n.cat32,"","");
    loadmarker(listlotus,Lotus,i18n.cat33,"","");
    loadmarker(listpomme,Pomme,i18n.cat15,"","");
    loadmarker(listcarotte,Carotte,i18n.cat16,"","");
    loadmarker(listradis,Radis,i18n.cat17,"","");
    loadmarker(listqingxin,Qingxin,i18n.cat34,"","");
    loadmarker(listmuguet,Muguet,i18n.cat35,"muguet","");
    loadmarker(listpiment,Piment,i18n.cat36,"","");
    loadmarker(listlysverni,Lysverni,i18n.cat37,"","");
    loadmarker(listfsoie,Fsoie,i18n.cat38,"","");
    loadmarker(listjade,Jade,i18n.cat39,"","");
    loadmarker(listconque,Conque,i18n.cat40,"","");
    loadmarker(listlapis,Lapis,i18n.cat41,"","");
    loadmarker(listferblanc,Ferblanc,i18n.cat25,"","");
    loadmarker(listgrenouille,Grenouille,i18n.cat27,"","");
    loadmarker(listlezard,Lezard,i18n.cat28,"","");
    loadmarker(listpapillon,Papillon,i18n.cat42,"","");
    loadmarker(listluciole,Luciole,i18n.cat43,"","");
    loadmarker(listnoyauc,Noyauc,i18n.cat44,"","");

    // Succés

	var markerssucces = [
	    L.marker([3146,1800], {icon: Succes, title: i18n["succesl-01-title"]}).addTo(mymap).on('click', onMarkerClick).bindPopup('<iframe width="560" height="315" src="//www.youtube.com/embed/lVXYQI-l2F4?rel=0" frameborder="0" allowfullscreen></iframe><br><h1>'+i18n["succesl-01-h1"]+'<br><h2><input id="mapbox" name="succesl" value="1" type="checkbox" /> '+i18n["ui-found"]+'</h2></h1>', popupOptions),
        L.marker([1991,2829], {icon: Succes, title: i18n["succesl-02-title"]}).addTo(mymap).on('click', onMarkerClick).bindPopup('<iframe width="560" height="315" src="//www.youtube.com/embed/SO7HtQ2JJP0?rel=0" frameborder="0" allowfullscreen></iframe><br><h1>'+i18n["succesl-02-h1"]+'<br><h2><input id="mapbox" name="succesl" value="2" type="checkbox" /> '+i18n["ui-found"]+'</h2></h1>', popupOptions)
    ];

    initmarker (markerssucces, "succesl");
    nbtmark += markerssucces.length;
    console.log(i18n["ui-succes"] + markerssucces.length + i18n["ui-load"]);

    localStorage.nbtliyue = nbtmark;

// Gestion Popups

mymap.on("click", onMapClick);

mymap.on('popupopen', function () {
    $(":checkbox").on("change", function(){
        var checkboxtype = this.name;
        var checkboxnumber = this.value;
        var checkboxstate = this.checked;
        selectarray (checkboxtype, checkboxnumber, checkboxstate);
        markeropacity(checkboxstate);
    });
    if(document.getElementById("mapbox")){
        var checkboxtype = document.getElementById("mapbox").name;
        var checkboxnumber = document.getElementById("mapbox").value;
        var checkboxstate = activecb(checkboxtype,checkboxnumber);
        $("#mapbox").prop('checked', checkboxstate);
    };
});

// Afficher / Masquer le Menu
$('#activation-select-box').on('click', function() {
    if ($(this).hasClass('selecting')) {
        $(this).removeClass('selecting').text(i18n["ui-open"]);
        $('#activation-select-options').slideUp(150); 
    } else {
        $(this).addClass('selecting').text(i18n["ui-close"]);
        $('#activation-select-options').slideDown(150);
    }
});

$('#activation-select-options li').on('click', function() {
    var val = $(this).attr('value');    
    $(this).toggleClass('selected');    
    $('.' + val).toggle();      

    var listatut = [];
    $('#activation-select-options li').each(function(){
        if (!($(this).hasClass('section')) && !($(this).hasClass('selected')) && !($(this).hasClass('selectbtn'))) {
            listatut.push($(this).attr('value'));
        };
    });
    localStorage.MenumapgenshinLLi = JSON.stringify(listatut);
});

$('.matbtn').on('click', function() {
    var ndf = $(this).attr('value');
    if ($(this).hasClass('pressed')) {
        $(this).attr('src', "media/icones/" + ndf + "on.png");
        $(this).toggleClass('pressed');
    } else {
        $(this).attr('src', "media/icones/" + ndf + "off.png");
        $(this).toggleClass('pressed');
    };
    $('.' + ndf).toggle();

    var btnstatut = [];
    $('.matbtn').each(function(){
        if (!($(this).hasClass('pressed'))) {
            btnstatut.push($(this).attr('value'));
        };
    });
    localStorage.MenumapgenshinLBtn = JSON.stringify(btnstatut);
});

// Gestion des Boutons Menu Haut

$('#BtnReset').on('click', function() {
    if (confirm(i18n["ui-prereset"])) {
        resetmarkers()
      }
});

$('#BtnEnglish').on('click', function() {
    // document.location.href='antholen.html';    
    document.location.href='indexlen.html';
});

$('#BtnFrench').on('click', function() {
    // document.location.href='anthol.html';    
    document.location.href='indexl.html';
});

$('#BtnExport').on('click', function() {
    this.href=URL.createObjectURL(new Blob([JSON.stringify(savecookies())]));
    alert(i18n["ui-export"]);
});

$('#BtnImport').on('click', function (e) {
    var fileElem = document.getElementById("ImportBox");
    if (fileElem) {
        fileElem.click();
    }
    e.preventDefault();
});

$('#ImportBox').on('change', function(ev_) {
    var fr_;
    (fr_=new FileReader()).onload=function(ev_) {
        loadcookies(JSON.parse(this.result));
    };
    fr_.readAsText(this.files[0]);
});

$('#btnmap').on('click', function () {
    // document.location.href='antho.html';    
	if (sessionStorage.languagemap == "fr") {
		document.location.href='indexfr.html';
		} else {
		document.location.href='index.html';}
});

}); // Fin Fonction globale

initarray();
reselectmenu();
openMenu();

}); // Fin Windows load
