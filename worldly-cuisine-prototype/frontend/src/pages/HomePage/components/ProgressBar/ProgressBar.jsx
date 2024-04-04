import React, { useState, useEffect, useRef, useContext } from 'react';
import { FoodDataContext } from '../FoodDataContext';
import { Stage, Layer, Rect, Circle, Text } from 'react-konva';
import Konva from 'konva';
import './ProgressBar.css';

function ProgressBar() {
  const { foodItems } = useContext(FoodDataContext);

  const [rectWidth, setRectWidth] = useState(50);
  const [collisions, setCollisions] = useState([false, false, false, false, false]);
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
  const containerRef = useRef();

  const rectX = 0;
  const rectHeight = 10;
  const rectY = 50 - rectHeight / 2;

  const circles = [
    { x: (dimensions.width / 6 * 1), y: 50, radius: 18 },
    { x: (dimensions.width / 6 * 2), y: 50, radius: 18 },
    { x: (dimensions.width / 6 * 3), y: 50, radius: 18 },
    { x: (dimensions.width / 6 * 4), y: 50, radius: 18 },
    { x: (dimensions.width / 6 * 5), y: 50, radius: 18 }
  ];

  const lastCircle = circles[circles.length - 1];

  const maxWidth = dimensions.width / 6 * 5;

  useEffect(() => {
    const newWidth = Math.min(foodItems.length, 50); // Ensure the width does not exceed 50
    setRectWidth(newWidth);
  }, [foodItems]);


  useEffect(() => {
    const checkCollision = (rectWidth) => {
      const scaledWidth = rectWidth / 50 * maxWidth;
      const rectRightEdge = rectX + scaledWidth;
      const rectLeftEdge = rectX;
      const rectTopEdge = rectY;
      const rectBottomEdge = rectY + rectHeight;

      setCollisions(circles.map((circle, index) => {
        const isColliding = rectRightEdge >= circle.x - circle.radius &&
          rectLeftEdge <= circle.x + circle.radius &&
          rectBottomEdge >= circle.y - circle.radius &&
          rectTopEdge <= circle.y + circle.radius;
        const shouldPulse = foodItems.length >= 10 && rectWidth >= (index + 1) * 10;

        return isColliding && shouldPulse;
      }));
    };

    checkCollision(rectWidth);
  }, [rectWidth, maxWidth, foodItems.length]);

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
  }, [])

  useEffect(() => {
    setRectWidth(foodItems.length)
  }, [foodItems])

  return (
    <div ref={containerRef} className='progressBar'>
      {/* <input id='myRange' type="range" min="0" max='50' value={rectWidth} onChange={e => setRectWidth(Number(e.target.value))} />
       */}
      <Stage width={dimensions.width} height={100} id='progressBarStage'>
        <Layer id='progressBarLayer'>
          <Rect
            x={0}
            y={0}
            width={dimensions.width}
            height={100}
            fill="#65929E" // Your chosen background color
          />
          <Rect
            x={rectX}
            y={rectY}
            width={Math.min(rectWidth / 50 * maxWidth, maxWidth)}
            height={rectHeight}
            fill="#FFBF00"
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
          <Text
            x={lastCircle.x + lastCircle.radius + 60} // Adjust the position as needed
            y={lastCircle.y - 10} // Center vertically with the circle
            text={`${foodItems.length}/50`}
            fontSize={20}
            fontFamily="Arial"
            fill="white"
          />
        </Layer>
      </Stage>
    </div>
  );
}

const AnimatedCircle = ({ x, y, radius, isColliding }) => {
  const circleRef = useRef();
  const [color, setColor] = useState('blue');

  useEffect(() => {
    const node = circleRef.current;
    if (isColliding) {
      setColor('#FFBF00');
      const tween = new Konva.Tween({
        node: node,
        scaleX: 1.5,
        scaleY: 1.5,
        duration: 0.25,
        easing: Konva.Easings.EaseOut,
        onFinish: () => {
          new Konva.Tween({
            node: node,
            scaleX: 1,
            scaleY: 1,
            duration: 0.25,
            easing: Konva.Easings.EaseOut
          }).play();
        }
      });
      tween.play();
    } else {
      setColor('#2471A3');
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
