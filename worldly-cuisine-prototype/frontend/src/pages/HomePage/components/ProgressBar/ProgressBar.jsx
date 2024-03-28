import React, { useState, useEffect, useRef } from 'react';
import { Stage, Layer, Rect, Circle } from 'react-konva';
import Konva from 'konva';
import './ProgressBar.css';

// Your component code...


function ProgressBar() {
  const [rectWidth, setRectWidth] = useState(50);
  const [collisions, setCollisions] = useState([false, false, false, false, false]);
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
  const containerRef = useRef();


  const rectX = 0;
  const rectY = 60;
  const rectHeight = 25;

  const circles = [
    { x: (dimensions.width / 6 * 1), y: 75, radius: 25 },
    { x: (dimensions.width / 6 * 2), y: 75, radius: 25 },
    { x: (dimensions.width / 6 * 3), y: 75, radius: 25 },
    { x: (dimensions.width / 6 * 4), y: 75, radius: 25 },
    { x: (dimensions.width / 6 * 5), y: 75, radius: 25 }
  ];

  const maxWidth = dimensions.width;

  useEffect(() => {
    const checkCollision = (rectWidth) => {
      const rectRightEdge = rectX + rectWidth;
      const rectLeftEdge = rectX;
      const rectTopEdge = rectY;
      const rectBottomEdge = rectY + rectHeight;

      setCollisions(circles.map(circle => 
        rectRightEdge >= circle.x - circle.radius &&
        rectLeftEdge <= circle.x + circle.radius &&
        rectBottomEdge >= circle.y - circle.radius &&
        rectTopEdge <= circle.y + circle.radius
      ));
    };

    checkCollision(rectWidth);
  }, [rectWidth]);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} className='progressBar'>
      <button onClick={() => setRectWidth(prevWidth => Math.max(prevWidth - 10, 0))}>-</button>
      <input id='myRange' type="range" min="0" max={maxWidth} value={rectWidth} onChange={e => setRectWidth(Number(e.target.value))} />
      <button onClick={() => setRectWidth(prevWidth => Math.min(prevWidth + 10, maxWidth))}>+</button>
      <Stage width={dimensions.width} height={dimensions.height} id='progressBarStage'>
        <Layer id='progressBarLayer'>
          <Rect
            x={rectX}
            y={rectY}
            width={rectWidth}
            height={rectHeight}
            fill="green"
          />
          {circles.map((circle, index) => (
            <AnimatedCircle
              key={index}
              x={circle.x}
              y={circle.y}
              radius={circle.radius}
              isColliding={collisions[index]}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}

const AnimatedCircle = ({ x, y, radius, isColliding }) => {
  const circleRef = useRef();
  const [color, setColor] = useState('blue');

  useEffect(() => {
    setColor(isColliding ? 'red' : 'blue');
    if (isColliding) {
      // Implement scale animation or similar effect here
      const node = circleRef.current;
      const anim = new Konva.Animation(frame => {
        const scale = Math.sin(frame.time * 0.002) + 1;
        node.scaleX(scale);
        node.scaleY(scale);
      }, node.getLayer());
      anim.start();

      return () => anim.stop();
    }
  }, [isColliding]);

  return (
    <Circle
      ref={circleRef}
      x={x}
      y={y}
      radius={radius}
      fill={color}
    />
  );
};

export default ProgressBar;
