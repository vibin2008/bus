var dic = []
var sto = []
var price = ""
var a = document.getElementById("from")
var b = document.getElementById("to")
var c = document.getElementById("front")
var d = document.getElementById("back")
var stp = document.getElementById("route")


window.onload = function() {
  stp.value = "s2c";
  get(); 
};



function get(){
    a.innerHTML = ""
    b.innerHTML = ""
    
fetch("https://ayla-ropier-consuela.ngrok-free.dev/stop", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ table: stp.value})
  })
    .then(res => res.json())
    .then(data => {
        dic = data.distance
        sto = data.stops
        for(let i=0;i<sto.length;i++){
            var ele = document.createElement("option")
            ele.value = i.toString()
            ele.textContent = sto[i]
            var ele2 = document.createElement("option")
            ele2.value = i.toString()
            ele2.textContent = sto[i]
            a.append(ele)
            b.append(ele2)
        }
    })
}
    


function check(){
    
    if(a.value == b.value){
        alert("From and To address are same")
    }
    else{
        var sum = 0
        var rs = 0.58
        var fromvalue = Number(a.value)
        var tovalue = Number(b.value)
        if(fromvalue>tovalue){
            for(let i=fromvalue;i>=tovalue+1;i--){
            sum = sum+dic[i]
        }
    }
        else{
            for(let i=fromvalue+1;i<=tovalue;i++){
            sum = sum+dic[i]
        }
        }
        
        var e = c.querySelector("h3")
        price = Math.floor(sum*rs).toString()
        e.textContent = e.textContent+" "+price+" RS"
        c.style.display = "block"
        d.style.display = "block"
       
    }
}

function pay(){
     fetch("https://ayla-ropier-consuela.ngrok-free.dev/pay", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ price: Number(price),from: Number(a),to: Number(b)})
  })
    .then(res => res.json())
    .then(data => 
        {
            console.log(data.url)
            window.location.href = data.url

        })
}