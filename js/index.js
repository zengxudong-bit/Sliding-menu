window.onload = function(){
  // 这里就是为了模拟循环的数据
  let shoppingList = document.getElementsByClassName("shoppingList")[0];
  let html = '';
  for(let i=0;i<5;i++){
    html += `<section class="shoppingListItem">
    <section class="goodsInfo" ontouchstart="touchstart(event,${i})" ontouchmove="touchmove(event,${i})" ontouchend="touchend()">
    <div>
      <input type="checkbox" name="singleton">
    </div>
    <section>
      <img
        src="https://img12.360buyimg.com/n1/s450x450_jfs/t19159/209/2023185658/362877/530db816/5ae0247dN64e8b5cf.jpg"
        alt="" class="goodsListImg">
      <section>
        <header>
          <h5>爱他美 恩宁4段4罐</h5>
          <p>商品库存:35</p>
        </header>
        <footer>
          <span>￥5164</span>
          <aside>
            <span class="minusBtn">-</span>
            <input type="number" value="1">
            <span class="addBtn">+</span>
          </aside>
        </footer>
      </section>
    </section>
    </section><aside>
    <span class="collet">收藏</span>
    <span class="delete">删除</span>
    </aside></section>`;
  }
  shoppingList.innerHTML = html;
}

let initXY = [0,0];//记录移动的坐标
let isStop = false;//记录是否禁止滑动
let oldIndex = null;//记录旧的下标
let theIndex = null;//记录新的下标

function touchstart(event,index){
  if(event.touches.length > 1) {
    isStop = true;
    return;
  }
  oldIndex = theIndex;
  theIndex = null;
  initXY = [event.touches[0].pageX,event.touches[0].pageY];
  // console.log(initXY);
}

function touchmove(event,index){
  if(event.touches.length > 1) return;
  let moveX = event.touches[0].pageX - initXY[0];
  let moveY = event.touches[0].pageY - initXY[1];
  if(isStop || Math.abs(moveX) < 5) return;//如果禁止滑动或者滑动的距离小于5就返回
  if(Math.abs(moveY) > Math.abs(moveX)){
    isStop = true;
    return;
  }
  if(moveX<0){
    theIndex = index;
    isStop = true;
  }else if(theIndex && oldIndex === theIndex){
    oldIndex =index;
    theIndex = null;
    isStop = true;
    setTimeout(()=>{oldIndex=null;},150);//设置150毫秒延迟来凸显动画效果，实际不加也可以
  }
  // 这里用jq就不用循环了，但我懒得引，大家知道就好
  let goods = document.getElementsByClassName("goodsInfo");
  for(let i=0;i<goods.length;i++){
    theIndex === i ? goods[i].classList.add("open") : goods[i].classList.remove("open");
  };
  // console.log(moveX,moveY);
}

function touchend(){
  isStop = false;
}