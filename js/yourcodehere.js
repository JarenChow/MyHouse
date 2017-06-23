// 可选是否初始化平面直角坐标系
initGrid();

// 示例：绘制房间图
drawHouse();

/**
 * 使用这个方法来绘制自己的多边形
 *
 * 传入参数为一个列表对象以及一个布尔值
 *
 * 列表对象：
 * 前 3 个参数为一组
 * 分别代表绘制起始 x，起始 y，是否虚线（1 代表实线，0 代表虚线）
 * 后面每 3 个参数为一组
 * 分别代表水平平移距离 x，竖直平移距离 y，是否绘制（1 代表绘制，0 代表不绘制）
 *
 * 布尔值：
 * true 表示按照实际尺寸来缩放并绘制
 * false 表示不缩放，按照坐标系尺寸来绘制
 *
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