// ตรรกะของเกม: ตอบคำถาม นับคะแนน สรุปผล
var i=0,score=0,ans=[];
var $=function(x){return document.getElementById(x)};
function show(id){["intro","quiz","end"].forEach(function(s){$(s).classList.toggle("hide",s!==id)});window.scrollTo(0,0)}
function load(){var q=Q[i];$("no").textContent="ข้อ "+(i+1)+" จาก "+Q.length;$("sc").textContent="ถูก "+score+" ข้อ";$("pg").style.width=(i/Q.length*100)+"%";$("chan").textContent=q.c;$("time").textContent=q.t;$("from").textContent=q.f;$("msg").textContent=q.m;$("ask").classList.remove("hide");$("fb").classList.add("hide")}
function answer(a){var q=Q[i],ok=a===q.s;ans.push(ok);if(ok)score++;$("sc").textContent="ถูก "+score+" ข้อ";
var b=$("fbbox");b.className="fb "+(ok?"good":"bad");$("fbt").textContent=(ok?"ถูกต้อง: ":"พลาด: ")+(q.s?"นี่คือกลโกง":"นี่เป็นของจริง");$("fbx").textContent=q.e;
$("fbl").innerHTML="";q.fl.forEach(function(t){var l=document.createElement("li");l.textContent=t;$("fbl").appendChild(l)});
$("ask").classList.add("hide");$("fb").classList.remove("hide");$("next").textContent=i===Q.length-1?"ดูผลลัพธ์":"ข้อต่อไป";$("next").focus()}
function finish(){show("end");$("fs").textContent=score;var L=score>=9?["ตาถึงมาก","คุณแยกได้เกือบทุกข้อ แต่ลองอ่านข้อที่พลาดเพื่ออุดช่องโหว่สุดท้าย"]:score>=7?["ค่อนข้างปลอดภัย","คุณจับสัญญาณหลักได้ แต่ยังมีบางรูปแบบที่หลุดไป"]:score>=5?["ยังเสี่ยง","คุณเสี่ยงโดนหลอกในบางรูปแบบ ลองดูสัญญาณเตือนของข้อที่พลาด"]:["ควรฝึกเพิ่ม","ไม่เป็นไร จุดประสงค์ของเกมนี้คือให้พลาดตรงนี้ก่อนโดนหลอกจริง ดูคำอธิบายด้านล่าง"];
$("lvl").textContent=L[0];$("lvlx").textContent=L[1];
var r=$("review");r.innerHTML="";var miss=[];
Q.forEach(function(q,k){var d=document.createElement("div");d.className="rev";var b=document.createElement("b");b.className=ans[k]?"r":"w";b.textContent=(ans[k]?"ถูก ":"พลาด ")+"ข้อ "+(k+1)+" ("+(q.s?"กลโกง":"ของจริง")+"): ";d.appendChild(b);d.appendChild(document.createTextNode(q.fl[0]));r.appendChild(d);if(!ans[k])miss.push(q.e)});
var sc=0,rl=0,fs=0;Q.forEach(function(q,k){if(q.s){sc++;if(!ans[k])fs++}else if(!ans[k])rl++});
$("sum").value="Spot the Scam: ทดลองกับตัวเอง\nคะแนน: "+score+"/10 ("+L[0]+")\nพลาดกลโกงที่หลอกสำเร็จ "+fs+" จาก "+sc+" ข้อ และเข้าใจผิดว่าข้อความจริงเป็นกลโกง "+rl+" ข้อ\nสิ่งที่เรียนรู้: สัญญาณร่วมของกลโกงคือการเร่งเวลา การขอเงินหรือข้อมูลส่วนตัว ลิงก์หรือบัญชีที่ไม่ตรงกับต้นทางจริง และการให้ย้ายไปคุยช่องทางอื่น\nวิธีป้องกัน: หยุดก่อนกด ตรวจต้นทางผ่านช่องทางที่เชื่อถือได้ และโทรยืนยันกับบุคคลหรือหน่วยงานโดยตรง"}
document.addEventListener("click",function(e){var t=e.target;
if(t.id==="start"){i=0;score=0;ans=[];show("quiz");load()}
else if(t.dataset&&t.dataset.a!==undefined){answer(+t.dataset.a)}
else if(t.id==="next"){i++;if(i>=Q.length){finish()}else{load()}}
else if(t.id==="again"){show("intro")}
else if(t.id==="copy"){var s=$("sum");s.select();var ok=false;try{if(navigator.clipboard){navigator.clipboard.writeText(s.value);ok=true}else{ok=document.execCommand("copy")}}catch(x){try{ok=document.execCommand("copy")}catch(y){}}$("cmsg").textContent=ok?"คัดลอกแล้ว":"เลือกข้อความแล้ว กด Ctrl+C หรือแตะค้างเพื่อคัดลอก"}
});
