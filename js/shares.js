const container =
document.getElementById(
"shareContainer"
);

if(container){

container.innerHTML = "";

const demoShares = [

{
name:"Reliance Industries",
price:1000,
profit:1200,
time:"30 Days"
},

{
name:"TCS",
price:2000,
profit:2400,
time:"45 Days"
},

{
name:"Infosys",
price:3000,
profit:3600,
time:"60 Days"
}

];

demoShares.forEach(share=>{

container.innerHTML += `
<div class="share-card">

<div class="share-left">

<h3>${share.name}</h3>

<p>Buy Price :
₹${share.price}</p>

<p>Profit :
₹${share.profit}</p>

<p>Duration :
${share.time}</p>

</div>

<button
class="buy-btn">
Buy
</button>

</div>
`;

});

}
