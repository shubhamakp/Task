
    $.getJSON("data.json", function(data) {
        var text = "";
        console.log(data.length);
        $.each(data,function(key,value){
            
            text+= '<div class="shop-item">';
            text+= '<span class="shop-item-title">' +  value.name + '</span>';
            text+= '<img class="shop-item-image" src="Images/Album 1.png">';
            text+= '<div class="shop-item-details">';
            text+= '<span class="shop-item-price">$ '+ value.price + '</span>';
            text+= '<button class="btn btn-primary shop-item-button" type="button">ADD</button>';
            text+= '</div>';
            text+= '</div>';
        })  ;           
        $(".hello").append(text);
    });
