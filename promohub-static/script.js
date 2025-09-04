// === ДАННЫЕ КУПОНОВ ===
const COUPONS = [
  // 🏪 Супермаркеты
  ...Array.from({length:8}, (_,i)=>({store:"Пятёрочка", category:"supermarket", title:`Скидка ${5+i}% на продукты`, code:`P5${i}`, url:"https://5ka.ru", expires:Date.now()+1000*60*60*(i+2), likes:0})),
  ...Array.from({length:8}, (_,i)=>({store:"Магнит", category:"supermarket", title:`Купон Магнит -${10+i}%`, code:`MAG${i}`, url:"https://magnit.ru", expires:Date.now()+1000*60*60*(i+3), likes:0})),
  ...Array.from({length:8}, (_,i)=>({store:"Лента", category:"supermarket", title:`Лента: скидка ${i+1}00₽`, code:`LEN${i}`, url:"https://lenta.com", expires:Date.now()+1000*60*60*(i+4), likes:0})),
  ...Array.from({length:8}, (_,i)=>({store:"Перекрёсток", category:"supermarket", title:`Перекрёсток -${i+5}%`, code:`PX${i}`, url:"https://perekrestok.ru", expires:Date.now()+1000*60*60*(i+5), likes:0})),

  // 🍔 Еда
  ...Array.from({length:8}, (_,i)=>({store:"Яндекс Еда", category:"food", title:`Купон YFood ${i}`, code:`YFOOD${i}`, url:"https://eda.yandex.ru", expires:Date.now()+1000*60*60*(i+1), likes:0})),
  ...Array.from({length:8}, (_,i)=>({store:"Delivery Club", category:"food", title:`Delivery -${i+1}00₽`, code:`DEL${i}`, url:"https://delivery-club.ru", expires:Date.now()+1000*60*60*(i+2), likes:0})),
  ...Array.from({length:8}, (_,i)=>({store:"Додо Пицца", category:"food", title:`Пицца +${i+1} в подарок`, code:`DODO${i}`, url:"https://dodopizza.ru", expires:Date.now()+1000*60*60*(i+3), likes:0})),
  ...Array.from({length:8}, (_,i)=>({store:"Бургер Кинг", category:"food", title:`2=1 бургер №${i+1}`, code:`BK${i}`, url:"https://burgerking.ru", expires:Date.now()+1000*60*60*(i+4), likes:0})),
  ...Array.from({length:8}, (_,i)=>({store:"KFC", category:"food", title:`KFC bucket скидка ${i*5}%`, code:`KFC${i}`, url:"https://kfc.ru", expires:Date.now()+1000*60*60*(i+5), likes:0})),
  ...Array.from({length:8}, (_,i)=>({store:"Subway", category:"food", title:`Subway купон ${i}`, code:`SUB${i}`, url:"https://subway.ru", expires:Date.now()+1000*60*60*(i+6), likes:0})),

  // 🛍 Магазины
  ...Array.from({length:8}, (_,i)=>({store:"Мегамаркет", category:"shops", title:`Мегамаркет -${i+5}%`, code:`MEGA${i}`, url:"https://megamarket.ru", expires:Date.now()+1000*60*60*(i+3), likes:0})),
  ...Array.from({length:8}, (_,i)=>({store:"Яндекс Маркет", category:"shops", title:`Маркет купон ${i}`, code:`MARK${i}`, url:"https://market.yandex.ru", expires:Date.now()+1000*60*60*(i+2), likes:0})),
  ...Array.from({length:8}, (_,i)=>({store:"Ламода", category:"shops", title:`Ламода скидка ${i*5}%`, code:`LAM${i}`, url:"https://lamoda.ru", expires:Date.now()+1000*60*60*(i+4), likes:0})),
  ...Array.from({length:8}, (_,i)=>({store:"Золотое Яблоко", category:"shops", title:`ЗЯ скидка ${i+1}00₽`, code:`ZYA${i}`, url:"https://goldapple.ru", expires:Date.now()+1000*60*60*(i+5), likes:0})),
  ...Array.from({length:8}, (_,i)=>({store:"Зоомагазин", category:"shops", title:`Скидка на корм -${i*3}%`, code:`ZOO${i}`, url:"#", expires:Date.now()+1000*60*60*(i+6), likes:0})),

  // ✈️ Путешествия
  ...Array.from({length:8}, (_,i)=>({store:"Aviasales", category:"travel", title:`Aviasales купон ${i}`, code:`AVIA${i}`, url:"https://aviasales.ru", expires:Date.now()+1000*60*60*(i+2), likes:0})),
  ...Array.from({length:8}, (_,i)=>({store:"Яндекс Путешествия", category:"travel", title:`YTravel скидка ${i*10}%`, code:`YTR${i}`, url:"https://travel.yandex.ru", expires:Date.now()+1000*60*60*(i+3), likes:0}))
];

// === ФУНКЦИИ ===
function timeLeft(exp) {
  const diff = exp - Date.now();
  if (diff<=0) return "Истёк";
  const h=Math.floor(diff/1000/60/60);
  const m=Math.floor(diff/1000/60)%60;
  return `${h}ч ${m}м`;
}

function showToast(msg){
  const t=document.getElementById("toast");
  t.textContent=msg;
  t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"),2000);
}

function renderCoupons(category="all", search=""){
  const cards=document.getElementById("cards");
  cards.innerHTML="";
  COUPONS.filter(c=> (category==="all"||c.category===category) && (c.store.toLowerCase().includes(search)||c.code.toLowerCase().includes(search)))
    .forEach(c=>{
      const card=document.createElement("div");
      card.className="card";
      card.innerHTML=`
        <h3>${c.store}</h3>
        <p>${c.title}</p>
        <div class="code">${c.code}</div>
        <div class="timer">⏳ ${timeLeft(c.expires)}</div>
        <div>
          <button class="copy">Скопировать</button>
          <button class="like">👍 ${c.likes}</button>
          <a href="${c.url}" target="_blank"><button class="copy">Перейти</button></a>
        </div>
      `;
      // copy
      card.querySelector(".copy").onclick=()=>{navigator.clipboard.writeText(c.code);showToast("Код скопирован!");};
      // like
      card.querySelector(".like").onclick=(e)=>{c.likes++; e.target.textContent=`👍 ${c.likes}`;};
      cards.appendChild(card);
    });
}

// === СОБЫТИЯ ===
document.getElementById("tabs").addEventListener("click",e=>{
  if(e.target.classList.contains("tab")){
    document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
    e.target.classList.add("active");
    renderCoupons(e.target.dataset.category, document.getElementById("search").value.toLowerCase());
  }
});
document.getElementById("search").addEventListener("input",e=>{
  const cat=document.querySelector(".tab.active").dataset.category;
  renderCoupons(cat,e.target.value.toLowerCase());
});

// === СТАРТ ===
renderCoupons();
setInterval(()=>renderCoupons(document.querySelector(".tab.active").dataset.category, document.getElementById("search").value.toLowerCase()),60000);
