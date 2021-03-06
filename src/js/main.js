Number.prototype.map=function(as,ae,bs,be){
	return (this-as)/(ae-as)*(be-bs)+bs
}
function load(qn){
	function ld(json){
		All_QUIZ[qn]=json
		open_quiz("javascript")
	}
	fetch(`./quiz_data/${qn}.json`).then((r)=>r.json()).then((json)=>ld(json))
}
function open_quiz(qn,q){
	q=q||0
	var json=All_QUIZ[qn]
	if (q>=json.questions.length){
		console.warn("END")
		console.log(`Result: ${pr.querySelectorAll(".quiz")[0]._p}/${pr.querySelectorAll(".quiz")[0]._tp} points (${Math.floor(pr.querySelectorAll(".quiz")[0]._p/pr.querySelectorAll(".quiz")[0]._tp*100)}%)`)
		pr.removeChild(pr.querySelectorAll(".quiz")[0])
		return
	}
	var qz=pr.querySelectorAll(".quiz")[0]
	qz._c=json.questions[q].correct
	qz._r=json.questions[q].reason
	qz._l=json.questions[q].level
	qz._q=q
	if (qz._n!=qn){
		qz._n=qn
		qz._p=0
		qz._tp=0
	}
	qz.end=function(v){
		clearInterval(qz_tmr)
		qz.querySelectorAll(".qz-q-wr")[0].querySelectorAll(".qz-question")[0].style.height="100%"
		qz.querySelectorAll(".qz-progress")[0].querySelectorAll(".qz-bar")[0].style.animationPlayState="paused"
		qz._tp+=[1,3,5][this._l]
		if (v==this._c){
			this._p+=[1,3,5][this._l]
			qz.querySelectorAll(".qz-q-wr")[0].querySelectorAll(".qz-question")[0].innerHTML=`<div class="qz-state correct">Correct!</div><div class="qz-pnt">+${[1,3,5][this._l]}p</div><br>${this._r}<div class="qz-next">Next</div>`
		}
		else{
			qz.querySelectorAll(".qz-q-wr")[0].querySelectorAll(".qz-question")[0].innerHTML=`<div class="qz-state">Incorrect!</div><div class="qz-pnt">+0p</div><br>${this._r}<div class="qz-next">Next</div>`
		}
		qz.querySelectorAll(".qz-q-wr")[0].querySelectorAll(".qz-question")[0].querySelectorAll(".qz-next")[0].onclick=function(){
			open_quiz(this.parentNode.parentNode.parentNode._n,this.parentNode.parentNode.parentNode._q+1)
		}
		qz.querySelectorAll(".qz-q-wr")[0].querySelectorAll(".qz-as-wr")[0].parentNode.removeChild(qz.querySelectorAll(".qz-q-wr")[0].querySelectorAll(".qz-as-wr")[0])
	}
	qz.innerHTML=""
	qz.appendChild(document.importNode(document.querySelectorAll("template.qz-template")[0].content,true))
	qz.querySelectorAll(".qz-header")[0].innerHTML=`${json.name} - Quiz`
	qz_tmr=setInterval(function(){
		var v=qz.querySelectorAll(".qz-progress")[0].querySelectorAll(".qz-bar")[0].getBoundingClientRect().width
		qz.querySelectorAll(".qz-progress")[0].querySelectorAll(".qz-bar")[0].style.background=`hsl(${v.map(0,694,0,100)},${v.map(0,694,71,75)}%,${v.map(0,694,46,41)}%)`//[100,71,46] , [0,75,41]
		if (v==0){
			qz.end(null)
		}
	},1)
	qz.querySelectorAll(".qz-q-wr")[0].querySelectorAll(".qz-question")[0].innerHTML=`<b>Question ${q+1}:</b><br>${json.questions[q].text}`
	for (var an of json.questions[q].anwsers){
		qz.querySelectorAll(".qz-q-wr")[0].querySelectorAll(".qz-as-wr")[0].innerHTML+=`<div class="qz-anwser" onclick="pr.querySelectorAll('.quiz')[0].end('${an}')"><div class="qz-an-text">${an}</div></div>`
	}
}
var pr,All_QUIZ={},qz_tmr
window.onload=function(){
	pr=document.getElementsByClassName("wr")[0]
	load("javascript")
}
