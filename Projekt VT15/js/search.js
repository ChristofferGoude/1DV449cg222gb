/**
 * @author Christoffer
 */

var html = "";
$("#main").on("click", "#bandname", function() {
    document.getElementById("bandname").value = "";
});

$("#main").on("submit", "#bandsearchform", function(event) {
    event.preventDefault();
    
    html = "<div class='row'>";
    //$("#loading")empty();
    $("#result").empty();
    var bandquery = $("#bandname").val();
    
    if(bandquery != ""){
        bandquery = bandquery.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        document.getElementById("bandsearchbtn").disabled = true; 
        $("#result").append("<div class='col-md-12'><h2 class='headline'>" + bandquery + "</h2></div>");
        $("#loading").append("<div class='container'><div class='col-md-12'><img class='cent margin-top-30' src='images/loading.gif' /></div></div>");
        

        bandquery = bandquery.replace(/\s/g, "%20");
        biography(bandquery);
    }
    else{
        $("#result").append("<div class='col-md-12'><h2 class='headline'>You should try entering something in the searchbar!</h2></div>");
    }
});

function biography(bandquery){
    $.ajax({
        type: "POST",
        url: "php/bandsearch.php",
        datatype: "json",
        data: {biography:bandquery}
        }).done(function(data) {
            var showBiography = JSON.parse(data);
            
            $.ajax({
                type: "POST",
                url: "php/htmlcode.php",
                datatype: "text",
                data: {showBiography:showBiography}
                }).done(function(data){    
                    html += data;
                    relatedArtists(bandquery);
            }); 
    }); 
}

function relatedArtists(bandquery){
    $.ajax({
        type: "POST",
        url: "php/bandsearch.php",
        datatype: "json",
        data: {relatedArtists:bandquery}
        }).done(function(data) {
            var showRelatedArtists = JSON.parse(data);

            $.ajax({
                type: "POST",
                url: "php/htmlcode.php",
                datatype: "text",
                data: {showRelatedArtists:showRelatedArtists}
                }).done(function(data){    
                    html += data;
                    links(bandquery);
            }); 
    }); 
}

function links(bandquery){
    $.ajax({
        type: "POST",
        url: "php/bandsearch.php",
        datatype: "json",
        data: {links:bandquery}
        }).done(function(data) {
            var showLinks = JSON.parse(data);

            $.ajax({
                type: "POST",
                url: "php/htmlcode.php",
                datatype: "text",
                data: {showLinks:showLinks}
                }).done(function(data){    
                    html += data;
                    $("#loading").empty();
                    html += "</div>";
                    document.getElementById("bandsearchbtn").disabled = false;
                    $("#result").append(html);
            }); 
    });
}
