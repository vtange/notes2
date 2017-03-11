 "use strict";

document.addEventListener("DOMContentLoaded", main);

var content = document.getElementById("content");
var sidebar = document.getElementById("sidebar");
var save_btn = document.getElementById("save-btn");
var left_btn = document.getElementById("left-btn");
var right_btn = document.getElementById("right-btn");
var unsorted;
var new_grouping;
var repoReference = {
	//used for quickly finding a repo in debug
}
var boxes = {
	"unsorted":0
}
var translation = 0;
function main(){
	
		unsorted = createGrouping("unsorted");
		new_grouping = createGrouping("new-grouping");
		new_grouping.classList.add("big-plus");
		content.appendChild(new_grouping);
		sidebar.appendChild(unsorted);

    if(arrRepos)
    {
        arrRepos.forEach(function(repo){
					var repoElement = createRepoElement(repo);
					var box;
					if(!repo.boxArchive)
					{
						box = unsorted;
						repo.boxArchive = "unsorted";
					}
					else
					{
						box = document.getElementById(repo.boxArchive);
						if(!box)
						{
							box = createGrouping(repo.boxArchive);
							content.insertBefore(box,new_grouping);
						}
					}
					repoReference[repo.name] = repo; 	//debug use
					boxes[repo.boxArchive] = boxes[repo.boxArchive] ? boxes[repo.boxArchive]+1 : 1;

					box.lastElementChild.appendChild(repoElement);
        });
		content.style.transform = "translateX("+(Math.max(Object.keys(boxes).length-4,0))*-300+"px)";
		adjustGrpingHeight();
    }
    else
    {
        console.log("found no data to draw with. please add a .js file with a var 'override' or 'repos' to get started.")
    }

	save_btn.addEventListener("click",function(event){
		var element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent("var arrRepos = "+JSON.stringify(arrRepos, null, "\t")));
		element.setAttribute('download', "repos.js");

		element.style.display = 'none';
		document.body.appendChild(element);

		element.click();

		document.body.removeChild(element);
	});

	left_btn.addEventListener("click",moveLeft);

	right_btn.addEventListener("click",moveRight);	
};

function moveLeft(event){
	translation = translation+300 <= 0 ? translation+300 : translation ;
	content.style.transform = "translateX("+translation+"px)";
}
function moveRight(event){
	translation = content.clientWidth+(translation) > window.innerWidth ? translation-300 : translation;
	content.style.transform = "translateX("+translation+"px)";
}
function adjustGrpingHeight(){
	var groupings = document.querySelectorAll(".grouping-list");
	for(var i = groupings.length-1; i >= 0; i--)
	{
		groupings[i].style.height = content.clientHeight;
	}
}
function removeEmptyGrping(name){
	var grouping = document.getElementById(name);
	if(grouping)
	{
		content.removeChild(grouping);
		delete boxes[name];
	}

}