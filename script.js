// ตรรกะของเกม: ตอบคำถาม นับคะแนน สรุปผล
var i=0,score=0,ans=[];
var $=function(x){return document.getElementById(x)};
function show(id){["intro","quiz","end"].forEach(function(s){$(s).classList.toggle("hide",s!==id)});window.scrollTo(0,0)}
function load(){var q=Q[i];$("no").textContent="ข้อ "+(i+1)+" จาก "+Q.length;$("sc").textContent="ถูก "+score+" ข้อ";$("pg").style.width=(i/Q.length*100)+"%";$("chan").textContent=q.c;$("time").textContent=q.t;$("from").textContent=q.f;$("msg").textContent=q.m;$("ask").classList.remove("hide");$("fb").classList.add("hide")}
function answer(a){var q=Q[i],ok=a===q.s;ans.push(ok);if(ok)score++;$("sc").textContent="ถูก "+score+" ข้อ";
var b=$("fbbox");b.className="fb "+(ok?"good":"bad");$("fbt").textContent=(ok?"ถูกต้อง: ":"พลาด: ")+(q.s?"นี่คือกลโกง":"นี่เป็นของจริง");$("fbx").textContent=q.e;
$("fbl").innerHTML="";q.fl.forEach(function(t){var l=document.createElement("li");l.textContent=t;$("fbl").appendChild(l)});
$("ask").classList.add("hide");$("fb").classList.remove("hide");$("next").textContent=i===Q.length-1?"ดูผลลัพธ์":"ข้อต่อไป";$("next").focus()}
var FB_FALLBACK={"levels": [{"min": 9, "title": "ตาถึงมาก", "text": "คุณแยกได้เกือบทุกข้อ แต่ลองอ่านข้อที่พลาดเพื่ออุดช่องโหว่สุดท้าย"}, {"min": 7, "title": "ค่อนข้างปลอดภัย", "text": "คุณจับสัญญาณหลักได้ แต่ยังมีบางรูปแบบที่หลุดไป"}, {"min": 5, "title": "ยังเสี่ยง", "text": "คุณเสี่ยงโดนหลอกในบางรูปแบบ ลองดูสัญญาณเตือนของข้อที่พลาด"}, {"min": 0, "title": "ควรฝึกเพิ่ม", "text": "ไม่เป็นไร จุดประสงค์ของเกมนี้คือให้พลาดตรงนี้ก่อนโดนหลอกจริง ดูคำอธิบายด้านล่าง"}], "labels": {"correct": "ถูก", "wrong": "พลาด", "question": "ข้อ", "scam": "กลโกง", "real": "ของจริง"}, "portfolio": {"heading": "เก็บเข้า Portfolio", "hint": "คัดลอกสรุปนี้ไปวางในพอร์ตโฟลิโอได้เลย แก้ไขข้อความก่อนก็ได้", "template": "Spot the Scam: ทดลองกับตัวเอง\nคะแนน: {score}/{total} ({level})\nพลาดกลโกงที่หลอกสำเร็จ {missedScams} จาก {totalScams} ข้อ และเข้าใจผิดว่าข้อความจริงเป็นกลโกง {falseAlarms} ข้อ\nสิ่งที่เรียนรู้: สัญญาณร่วมของกลโกงคือการเร่งเวลา การขอเงินหรือข้อมูลส่วนตัว ลิงก์หรือบัญชีที่ไม่ตรงกับต้นทางจริง และการให้ย้ายไปคุยช่องทางอื่น\nวิธีป้องกัน: หยุดก่อนกด ตรวจต้นทางผ่านช่องทางที่เชื่อถือได้ และโทรยืนยันกับบุคคลหรือหน่วยงานโดยตรง"}};
var FB=FB_FALLBACK;
/* โหลดข้อความ feedback จาก feedback.json (ถ้าเปิดไฟล์ตรงๆ แบบ file:// เบราว์เซอร์อาจบล็อก จะใช้ FB_FALLBACK แทน) */
try{fetch("feedback.json").then(function(r){return r.json()}).then(function(j){FB=j}).catch(function(){})}catch(e){}
function fill(t,v){return t.replace(/\{(\w+)\}/g,function(m,k){return v[k]!==undefined?v[k]:m})}
function finish(){show("end");$("fs").textContent=score;
var lv=FB.levels.slice().sort(function(x,y){return y.min-x.min}).filter(function(l){return score>=l.min})[0]||FB.levels[FB.levels.length-1];
$("lvl").textContent=lv.title;$("lvlx").textContent=lv.text;
var P=FB.labels,r=$("review");r.innerHTML="";
var totalScams=0,missedScams=0,falseAlarms=0;
Q.forEach(function(q,k){var d=document.createElement("div");d.className="rev";var b=document.createElement("b");b.className=ans[k]?"r":"w";b.textContent=(ans[k]?P.correct:P.wrong)+" "+P.question+" "+(k+1)+" ("+(q.s?P.scam:P.real)+"): ";d.appendChild(b);d.appendChild(document.createTextNode(q.fl[0]));r.appendChild(d);
if(q.s){totalScams++;if(!ans[k])missedScams++}else if(!ans[k])falseAlarms++});
document.querySelector("#end .box h2").textContent=FB.portfolio.heading;
document.querySelector("#end .box .mute").textContent=FB.portfolio.hint;
$("sum").value=fill(FB.portfolio.template,{score:score,total:Q.length,level:lv.title,totalScams:totalScams,missedScams:missedScams,falseAlarms:falseAlarms})}
document.addEventListener("click",function(e){var t=e.target;
if(t.id==="start"){i=0;score=0;ans=[];show("quiz");load()}
else if(t.dataset&&t.dataset.a!==undefined){answer(+t.dataset.a)}
else if(t.id==="next"){i++;if(i>=Q.length){finish()}else{load()}}
else if(t.id==="again"){show("intro")}
else if(t.id==="copy"){var s=$("sum");s.select();var ok=false;try{if(navigator.clipboard){navigator.clipboard.writeText(s.value);ok=true}else{ok=document.execCommand("copy")}}catch(x){try{ok=document.execCommand("copy")}catch(y){}}$("cmsg").textContent=ok?"คัดลอกแล้ว":"เลือกข้อความแล้ว กด Ctrl+C หรือแตะค้างเพื่อคัดลอก"}
});
