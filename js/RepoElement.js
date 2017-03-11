
/*
	<div id="repo-{{repo.name}}" class="repo" data-ng-repeat="repo in repos" data-on-finish-render="attachDraggables">
		<p title="{{repo.description}}" ><a href="#">{{repo.name}}</a></p>

	</div>
*/

function createRepoElement(repo){
    var elem = document.createElement("div");
    elem.id = repo.name;
    elem.classList.add("repo");
    var p = document.createElement("p");
    p.title = repo.description;
    var a = document.createElement("a");
    a.href = repo.html_url;
    a.innerHTML = repo.name;
    p.appendChild(a);
    elem.appendChild(p);
    $(elem).draggable({
        addClasses:false,
        revert:true,
        revertDuration:200,
        start:function(){
            console.log("rwoa")
        }
    })

    return elem;
}