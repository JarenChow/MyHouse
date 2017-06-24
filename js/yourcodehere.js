// 可选是否初始化平面直角坐标系
initGrid();

// 示例：绘制房间图
drawHouse();

/**
 * 以下示例：
 * 在水平距离 60 像素位置，垂直距离 30 像素位置，使用实线绘制多边形
 * 右移 30 像素，上移 30 像素，画线
 * 左移 30 像素，上移 30 像素，不画线
 * 左移 30 像素，下移 30 像素，画线
 * 右移 30 像素，下移 30 像素，画线
 * 不缩放，按照坐标系像素绘制
 */
drawGeometricFigure(
  [
    60, 30, 1,
    30, 30, 1,
    -30, 30, 0,
    -30, -30, 1,
    30, -30, 1
  ],
  false
);
