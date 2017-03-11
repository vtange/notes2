
function createGrouping(id){
    var content = document.getElementById("content");
    var elem = document.createElement("div");
    elem.id = id ? id : "";
    elem.classList.add("grouping");
    var title = document.createElement("div");
    title.innerHTML = id;
    title.classList.add("grouping-title");
    var list = document.createElement("div");
    list.classList.add("grouping-list");
    if(id =="unsorted")
    {
        $(list).droppable({
                    accept:".repo",
                    addClasses:false,
                    hoverClass:"grouping-list-hover",
                    drop:moveRepo,
                    over: function(event, ui){
                        $( "#content .grouping-list" ).droppable( "disable" )
                    },
                    out: function(event, ui){
                        $( "#content .grouping-list" ).droppable( "enable" )
                    }
                });
    }
    else{
        $(list).droppable({
                    accept:".repo",
                    addClasses:false,
                    hoverClass:"grouping-list-hover",
                    drop:moveRepo
                });
    }
    elem.appendChild(title);
    elem.appendChild(list);
        
    return elem;
}

function moveRepo(event, obj){
    event.stopPropagation();
    var repo = repoReference[obj.draggable[0].id];

    if(event.target.parentNode.id == obj.draggable[0].parentNode.parentNode.id)
    {
        return;
    }
    else{

        if(event.target.parentNode.classList.contains("big-plus"))
        {
            var newGrpName = "_"+obj.draggable[0].id;
            var newGrp = createGrouping(newGrpName); //name box as dragged element's name
            newGrp.lastElementChild.appendChild(obj.draggable[0]);
            content.insertBefore(newGrp, new_grouping);

            boxes[repo.boxArchive] -= 1;
            if(boxes[repo.boxArchive]==0)
            {
                removeEmptyGrping(repo.boxArchive);
            }
            boxes[newGrpName] = 1;  //name box as dragged element's name
            repo.boxArchive = newGrpName;
        }
        else{
            event.target.appendChild(obj.draggable[0]);
            boxes[repo.boxArchive] -= 1;
            if(boxes[repo.boxArchive]==0)
            {
                removeEmptyGrping(repo.boxArchive);
            }
            boxes[event.target.parentNode.id] += 1;
            repo.boxArchive = event.target.parentNode.id;
        }
        adjustGrpingHeight();
    }
}