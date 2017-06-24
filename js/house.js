var cvs = document.getElementById("myCanvas");
var ctx = cvs.getContext("2d");

// 平面直角坐标系的配置文件
var cfg = {
  // 坐标系偏离左侧与右侧的 x 轴距离
  offsetX: 100,
  // 坐标系偏离上侧与下侧的 y 轴距离
  offsetY: 100,
  // 坐标系箭头的长度
  arrowLength: 10,
  // 坐标系箭头和轴的夹角
  arrowAngle: Math.PI / 6,
  // 虚线绘制间距
  lineDashWidth: 30,
  // 字体偏移量（px）
  fontOffset: 5,
  // 是否绘制坐标系
  initializedGrid: false
};

// 全局设置
(function () {
  // 初始化 Canvas
  cvs.width = window.innerWidth;
  cvs.height = window.innerHeight;
// 绘制白色背景
  ctx.save();
  ctx.fillStyle = "rgba(255, 255, 255, 1)";
  ctx.fillRect(0, 0, cvs.width, cvs.height);
  ctx.restore();
// 全局设置
  ctx.font = "10px Consolas";
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.translate(0, cvs.height);
  ctx.transform(1, 0, 0, -1, 0, 0);
})();

/**
 * 初始化平面直角坐标系
 */
function initGrid() {
  ctx.beginPath();
  // 水平 X 轴
  ctx.moveTo(cfg.offsetX, cfg.offsetY);
  ctx.lineTo(cvs.width - cfg.offsetX, cfg.offsetY);
  var tempX = cfg.arrowLength * Math.cos(cfg.arrowAngle);
  var tempY = cfg.arrowLength * Math.sin(cfg.arrowAngle);
  ctx.lineTo(cvs.width - cfg.offsetX - tempX, cfg.offsetY + tempY);
  ctx.moveTo(cvs.width - cfg.offsetX, cfg.offsetY);
  ctx.lineTo(cvs.width - cfg.offsetX - tempX, cfg.offsetY - tempY);
  // 竖直 Y 轴
  ctx.moveTo(cfg.offsetX, cfg.offsetY);
  ctx.lineTo(cfg.offsetX, cvs.height - cfg.offsetY);
  tempX = cfg.arrowLength * Math.sin(cfg.arrowAngle);
  tempY = cfg.arrowLength * Math.cos(cfg.arrowAngle);
  ctx.lineTo(cfg.offsetX - tempX, cvs.height - cfg.offsetY - tempY);
  ctx.moveTo(cfg.offsetX, cvs.height - cfg.offsetY);
  ctx.lineTo(cfg.offsetX + tempX, cvs.height - cfg.offsetY - tempY);
  ctx.stroke();
  // 虚线
  ctx.save();
  ctx.beginPath();
  ctx.setLineDash([5, 5]);
  tempX = cfg.offsetX;
  tempY = cfg.offsetY;
  ctx.globalAlpha = 0.2;
  while ((tempX += cfg.lineDashWidth) < cvs.width - cfg.offsetX) {
    ctx.moveTo(tempX, cfg.offsetY);
    ctx.lineTo(tempX, cvs.height - cfg.offsetY);
  }
  while ((tempY += cfg.lineDashWidth) < cvs.height - cfg.offsetY) {
    ctx.moveTo(cfg.offsetX, tempY);
    ctx.lineTo(cvs.width - cfg.offsetX, tempY);
  }
  ctx.stroke();
  ctx.restore();
  // 标称文字
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  tempX = cfg.offsetX;
  tempY = cfg.offsetY;
  while (tempX < cvs.width - cfg.offsetX) {
    ctx.fillText(tempX - 100 + "", tempX - cfg.fontOffset * 2, cvs.height - cfg.offsetY + cfg.fontOffset * 3);
    tempX += cfg.lineDashWidth;
  }
  while ((tempY += cfg.lineDashWidth) < cvs.height - cfg.offsetY) {
    ctx.fillText(tempY - 100 + "", cfg.offsetX - cfg.fontOffset * 7, cvs.height - tempY + cfg.fontOffset);
  }
  ctx.restore();
  ctx.translate(cfg.offsetX, cfg.offsetY);
  data.initializedGrid = true;
}

// 处于画布中移动的游标
var cursorX, cursorY;

// 房间的原始数据
var data = {
  // 墙壁宽度 wallWidth
  ww: 270,
  // 房间内数据
  a1: 1630, a2: 420, a3: 3900, a4: 2340, a5: 130,
  b: 2340,
  c1: 1280, c2: 350, c3: 1670, c4: 160,
  d1: 820, d2: 240,
  e: 1370,
  f1: 240, f2: 275, f3: 1600, f4: 160, f5: 160,
  g1: 275, g2: 620, g3: 5100, g4: 2000, g5: 2360, g6: 800, g7: 270, g8: 980, g9: 980,
  h1: 540, h2: 1780,
  i1: 620, i2: 620, i3: 5100, i4: 120, i5: 120,
  j1: 540, j2: 1780,
  k1: 620, k2: 5100, k3: 2000, k4: 270, k5: 980, k6: 370, k7: 620,
  l: 840,
  m1: 620, m2: 400, m3: 1800, m4: 3920, m5: 765,
  n1: 540, n2: 1780,
  o1: 765, o2: 5020, o3: 120, o4: 625,
  p1: 540, p2: 1450,
  q1: 2000, q2: 3620, q3: 625, q4: 330,
  r1: 1400, r2: 1400,
  s1: 1400, s2: 1600,
  t1: 330, t2: 4600,
  u1: 510, u2: 400,
  v: 1150,
  w: 1000,
  // 画布 x 轴长度与 y 轴长度
  xLength: 0,
  yLength: 0,
  // 起始绘制点
  startX: 0,
  startY: 0,
  percent: 0,
  parts: null
};

// 对 data 进行数据操作和赋值
with (data) {
  // 三角函数求第 19 部分正确的垂直延伸距离
  var part19Angle = Math.atan((s2 - s1) / (g1 + v + f2 + ww + f1 + e + d2));
  var part19Vertical = ww / 2 *
    (ww / 2 + ww / 2 / Math.sin(part19Angle)) / (ww / 2 / Math.tan(part19Angle));

  // 画布 x 轴长度与 y 轴长度
  xLength = cvs.width - cfg.offsetX * 2;
  yLength = cvs.height - cfg.offsetY * 2;

  // 计算正确比例
  var houseX = ww * 6 + b + d2 + e + f1 + f2 + v + g1 + g2 + h2 + i1 + i2 + j2 + k1
    , houseY = ww * 5 + h1 + k2 + k7 + l + m1 + m4 + s2 + part19Vertical * 2 + 400,
    percent1 = xLength / houseX,
    percent2 = yLength / houseY;
  percent = percent1 < percent2 ? percent1 : percent2;

  // 开始绘制的坐标
  startX = cfg.lineDashWidth;
  startY = yLength - yLength % cfg.lineDashWidth - percent * (h1 + ww);

  // 需要绘制的内容
  parts = [];

  parts.push(
    // part 1
    [
      cursorX = startX, cursorY = startY, 1,
      ww, 0, 1,
      0, -ww - a1, 1,
      a2, 0, 1,
      0, -ww, 1,
      -a2, 0, 1,
      0, -a3, 1,
      a4, 0, 1,
      0, a5, 1,
      ww, 0, 1,
      0, -ww - a5 * 2, 1,
      -ww, 0, 1,
      0, a5, 1,
      -a4 - ww, 0, 1,
      0, ww * 3 + a3 + a1, 1
    ],
    // part 2
    [
      cursorX += percent * ww, cursorY, 0,
      b, 0, 1,
      0, -ww / 2, 0,
      -b, 0, 1,
      0, -ww / 2, 0,
      b, 0, 1
    ],
    // part 3
    [
      cursorX += percent * b, cursorY -= percent * (ww + a1 - c4), 1,
      ww, 0, 1,
      0, -c1, 1,
      c2, 0, 1,
      0, -ww, 1,
      -c2, 0, 1,
      0, -c3, 1,
      -ww, 0, 1,
      0, c3 + c1 - c4, 1,
      -a2, 0, 1,
      0, ww, 1,
      a2, 0, 1,
      0, c4, 1
    ],
    // part 4
    [
      cursorX, cursorY += percent * (a1 + ww - c4), 1,
      ww + d2, 0, 1,
      0, -ww, 1,
      -d2, 0, 1,
      0, -d1, 1,
      -ww, 0, 1,
      0, d1 + ww, 1
    ],
    // part 5
    [
      cursorX += percent * (ww + d2), cursorY, 0,
      e, 0, 1,
      0, -ww / 2, 0,
      -e, 0, 1,
      0, -ww / 2, 0,
      e, 0, 1
    ],
    // part 6
    [
      cursorX += percent * e, cursorY, 1,
      f1 + ww + f2, 0, 1,
      0, -ww, 1,
      -f2, 0, 1,
      0, -f3, 1,
      f4, 0, 1,
      0, -f5, 1,
      -f4 - ww, 0, 1,
      0, f5 + f3, 1,
      -f1, 0, 1,
      0, ww, 1
    ],
    // part 7
    [
      cursorX += percent * (f1 + ww + f2 + v), cursorY, 1,
      g1 + ww + g2, 0, 1,
      0, -ww, 1,
      -g2, 0, 1,
      0, -g3, 1,
      g4, 0, 1,
      0, -ww, 1,
      -g4 - ww, 0, 1,
      0, g5, 1,
      -g6, 0, 1,
      0, g7, 1,
      g6, 0, 1,
      0, g8, 1,
      -g9, 0, 1,
      0, f5, 1,
      g9, 0, 1,
      0, f3, 1,
      -g1, 0, 1,
      0, ww, 1
    ],
    // part 8
    [
      cursorX += percent * (g1 + ww + g2), cursorY, 0,
      0, h1, 1,
      h2, 0, 1,
      0, -h1, 1,
      ww / 2, 0, 0,
      0, h1 + ww / 2, 1,
      -ww - h2, 0, 1,
      0, -h1 - ww / 2, 1,
      -ww / 2, 0, 0,
      0, h1 + ww, 1,
      ww * 2 + h2, 0, 1,
      0, -ww - h1, 1
    ],
    // part 9
    [
      cursorX += percent * h2, cursorY, 1,
      i1 + ww + i2, 0, 1,
      0, -ww, 1,
      -i2, 0, 1,
      0, -i3, 1,
      i5, 0, 1,
      0, -ww, 1,
      -i5 - ww - i4, 0, 1,
      0, ww, 1,
      i4, 0, 1,
      0, i3, 1,
      -i1, 0, 1,
      0, ww, 1
    ],
    // part 10
    [
      cursorX += percent * (i1 + ww + i2), cursorY, 0,
      0, j1, 1,
      j2, 0, 1,
      0, -j1, 1,
      ww / 2, 0, 0,
      0, j1 + ww / 2, 1,
      -ww - j2, 0, 1,
      0, -j1 - ww / 2, 1,
      -ww / 2, 0, 0,
      0, j1 + ww, 1,
      ww * 2 + j2, 0, 1,
      0, -j1 - ww, 1
    ],
    // part 11
    [
      cursorX += percent * j2, cursorY, 1,
      k1 + ww, 0, 1,
      0, -ww * 2 - k2 - k7, 1,
      -ww, 0, 1,
      0, k7, 1,
      -(k3 - ww - k4), 0, 1,
      0, -k5 - ww, 1,
      -ww - k6, 0, 1,
      0, ww, 1,
      k6, 0, 1,
      0, k5, 1,
      -k4, 0, 1,
      0, ww, 1,
      k3, 0, 1,
      0, k2, 1,
      -k1, 0, 1,
      0, ww, 1
    ],
    // part 12
    [
      cursorX += percent * k1, cursorY -= percent * (k2 + ww * 2 + k7), 0,
      0, -l, 1,
      ww / 2, 0, 0,
      0, l, 1,
      ww / 2, 0, 0,
      0, -l, 1
    ],
    // part 13
    [
      cursorX, cursorY -= percent * l, 1,
      ww, 0, 1,
      0, -m1 - ww * 2 - m4, 1,
      -ww - m5, 0, 1,
      0, ww, 1,
      m5, 0, 1,
      0, m4, 1,
      -m3 - ww, 0, 1,
      0, m2, 1,
      ww, 0, 1,
      0, -(m2 - ww), 1,
      m3, 0, 1,
      0, m1, 1
    ],
    // part 14
    [
      cursorX -= percent * m5, cursorY -= percent * (m1 + ww * 2 + m4), 0,
      0, -n1, 1,
      -n2, 0, 1,
      0, n1, 1,
      -ww / 2, 0, 0,
      0, -n1 - ww / 2, 1,
      ww + n2, 0, 1,
      0, ww / 2 + n1, 1,
      ww / 2, 0, 0,
      0, -n1 - ww, 1,
      -ww * 2 - n2, 0, 1,
      0, ww + n1, 1
    ],
    // part 15
    [
      cursorX -= percent * n2, cursorY, 1,
      -o1 - ww - o4, 0, 1,
      0, ww, 1,
      o4, 0, 1,
      0, o2 + ww, 1,
      ww + o3, 0, 1,
      0, -ww, 1,
      -o3, 0, 1,
      0, -o2, 1,
      o1, 0, 1,
      0, -ww, 1
    ],
    // part 16
    [
      cursorX -= percent * (o1 + ww + o4), cursorY, 0,
      0, -p1, 1,
      -p2, 0, 1,
      0, p1, 1,
      -ww / 2, 0, 0,
      0, -p1 - ww / 2, 1,
      ww + p2, 0, 1,
      0, ww / 2 + p1, 1,
      ww / 2, 0, 0,
      0, -p1 - ww, 1,
      -ww * 2 - p2, 0, 1,
      0, ww + p1, 1
    ],
    // part 17
    [
      cursorX -= percent * p2, cursorY, 1,
      -q3 - ww - q4, 0, 1,
      0, ww, 1,
      q4, 0, 1,
      0, q2 + ww, 1,
      q1, 0, 1,
      0, -ww, 1,
      -(q1 - ww), 0, 1,
      0, -q2, 1,
      q3, 0, 1,
      0, -ww, 1
    ],
    // part 18
    [
      cursorX -= percent * (q3 + ww), cursorY += percent * (ww * 2 + q2), 1,
      0, r1, 1,
      r2, 0, 1
    ],
    // part 19
    [
      cursorX, cursorY -= percent * (ww * 2 + q2), 0,
      0, -s1, 1,
      -(g1 + v + f2 + ww + f1 + e + d2), -(s2 - s1), 1,
      0, s2, 1,
      -ww / 2, 0, 0,
      0, -s2 - part19Vertical, 1,
      ww + (g1 + v + f2 + ww + f1 + e + d2), s2 - s1, 1,
      0, part19Vertical + s1, 1,
      ww / 2, 0, 0,
      0, -s1 - part19Vertical * 2, 1,
      -ww * 2 - (g1 + v + f2 + ww + f1 + e + d2), -s2 + s1, 1,
      0, part19Vertical * 2 + s2, 1
    ],
    // part 20
    [
      cursorX -= percent * (g1 + v + f2 + ww + f1 + e + d2), cursorY, 1,
      -ww, 0, 1,
      0, ww + t2, 1,
      ww, 0, 1,
      0, -t2, 1,
      t1, 0, 1,
      0, -ww, 1,
      -t1, 0, 1
    ],
    // part 21
    [
      cursorX += percent * (d2 + e + f1 + ww), cursorY += percent * (ww * 2 + q2 + r1 + w + g5), 1,
      -u1, 0, 1,
      0, ww, 1,
      u1 - ww, 0, 1,
      0, u2 - ww, 1,
      ww, 0, 1,
      0, -u2, 1
    ],
    // part 22
    [
      cursorX += percent * f2, cursorY += percent * (g7 + g8 + f5 + f3), 0,
      v, 0, 1,
      0, ww / 2, 0,
      -v, 0, 1,
      0, ww / 2, 0,
      v, 0, 1
    ],
    // part 23
    [
      cursorX += percent * (v + g1 + ww), cursorY -= percent * (g3 + ww), 0,
      0, -w, 1,
      ww, 0, 0,
      0, w, 1,
      ww, 0, 0,
      0, -w, 1
    ]
  );
}

console.log("缩放比例为：%f", data.percent);

/**
 * 绘制房间图
 */
function drawHouse() {
  if (!data.initializedGrid) {
    ctx.translate(cfg.offsetX, cfg.offsetY);
  }
  // 绘制房间内部
  data.parts.forEach(function (item, index) {
    drawGeometricFigure(item, true);
    console.log("第 %d 部分绘制完毕", index + 1);
  });
}

function resetCursor(x, y) {
  cursorX = x;
  cursorY = y;
}

function moveTo(offsetX, offsetY, percent) {
  cursorX += offsetX * percent;
  cursorY += offsetY * percent;
  ctx.moveTo(cursorX, cursorY);
}
// 等比例缩放的方法
function lineTo(offsetX, offsetY, percent) {
  cursorX += offsetX * percent;
  cursorY += offsetY * percent;
  ctx.lineTo(cursorX, cursorY);
}

/**
 * 使用这个方法来绘制自己的多边形
 *
 * @param {Array.<Number>} part
 * 前 3 个参数为一组，
 * 分别代表绘制起始 x，起始 y，是否虚线（1 代表实线，0 代表虚线）；
 * 后面每 3 个参数为一组，
 * 分别代表水平平移距离 x，竖直平移距离 y，是否绘制（1 代表绘制，0 代表不绘制）。
 *
 * @param {Boolean} scale
 * true 表示按照实际尺寸来缩放并绘制；
 * false 表示不缩放，按照坐标系尺寸来绘制。
 */
function drawGeometricFigure(part, scale) {
  ctx.save();
  ctx.beginPath();
  // 如果不是实线，则设置为虚线
  if (!part[2]) {
    ctx.setLineDash([5, 10]);
  }
  resetCursor(part[0], part[1]);
  // 初始化游标坐标位置
  ctx.moveTo(cursorX, cursorY);
  for (var i = 3; i < part.length; i += 3) {
    // 如果此属性为真，则画实线，否则只移动游标
    if (part[i + 2]) {
      lineTo(part[i], part[i + 1], scale ? data.percent : 1);
    } else {
      moveTo(part[i], part[i + 1], scale ? data.percent : 1);
    }
  }
  ctx.stroke();
  ctx.restore();
}

/*
 // 提供阅读本地配置文件的功能
 function upload(input) {
 // Chrome
 if (window.FileReader) {
 var file = input.files[0];
 if (file) {
 var filename = file.name.split(".")[0];
 var reader = new FileReader();
 reader.readAsText(file);
 reader.onload = function () {
 // 处理逻辑
 console.log(this.result);
 };
 } else {
 console.log("未选择文件");
 }
 }
 // IE 7 8 9 10
 else if (typeof window.ActiveXObject != "undefined") {
 var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
 xmlDoc.async = false;
 xmlDoc.load(input.value);
 console.log(xmlDoc.xml);
 }
 // Firefox
 else if (document.implementation && document.implementation.createDocument) {
 var xmlDoc = document.implementation.createDocument("", "", null);
 xmlDoc.async = false;
 xmlDoc.load(input.value);
 console.log(xmlDoc.xml);
 }
 else {
 alert("Not support your browser.");
 }
 }
 */
