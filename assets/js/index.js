

$("#add_user").submit(function(event){
    alert("Data inserted successfully");
})

$("#update_user").submit(function(event){
    event.preventDefault();
console.log("hi");
    var unindexed_array=$('#update_user').serializeArray();
    console.log("hi");
    var data={}
    $.map(unindexed_array,function(n,i){
       data[n.name]=n.value;  
    })
    console.log(data);

    var request={
        "url":`http://localhost:3000/api/users/${data.id}`,
        "method":"PUT",
        "data":data
}
$.ajax(request).done(function(response){
    alert("Data updated successfully!");
})
})

if(window.location.pathname=="/"){
    $onDelete=$(".table tbody td a.delete");
    $onDelete.click(function(){
        var id=$(this).attr("data-id")

        var request={
            "url":`http://localhost:3000/api/users/${id}`,
            "method":"DELETE"
            
    }

    if(confirm("Do you really want to delete this record?")){

        $.ajax(request).done(function(response){
            alert("Data deleted successfully!");
            location.reload()
        })
    }

    })
}