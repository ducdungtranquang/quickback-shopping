import React, { useEffect, useState, useRef } from "react";

interface WheelComponentProps {
  segments: string[];
  segColors: string[];
  winningSegment?: string;
  onFinished: (segment: string) => void;
  onRotate?: () => void;
  onRotatefinish?: () => void;
  primaryColor?: string;
  primaryColoraround?: string;
  contrastColor?: string;
  buttonText?: string;
  isOnlyOnce?: boolean;
  size?: number;
  upDuration?: number;
  downDuration?: number;
  fontFamily?: string;
  width?: number;
  height?: number;
}

const WheelComponent: React.FC<WheelComponentProps> = ({
  segments,
  segColors,
  winningSegment,
  onFinished,
  onRotate,
  onRotatefinish,
  primaryColor = "black",
  primaryColoraround = "white",
  contrastColor = "white",
  buttonText = "spin",
  isOnlyOnce = true,
  size = 0,
  upDuration = 1000,
  downDuration = 100,
  fontFamily = "proxima-nova",
  width = 100,
  height = 100,
}) => {
  const [isFinished, setFinished] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  let currentSegment = "";
  let isStarted = false;
  let timerHandle: number | undefined;
  const timerDelay = segments.length;
  let angleCurrent = 0;
  let angleDelta = 0;
  let canvasContext: CanvasRenderingContext2D | null = null;
  let maxSpeed = Math.PI / (segments.length * 2);
  const upTime = segments.length * upDuration;
  const downTime = segments.length * downDuration;
  let spinStart = 0;
  let frames = 200;
  const centerX = 150;
  const centerY = 150;

  useEffect(() => {
    wheelInit();
    setTimeout(() => {
      window.scrollTo(0, 1);
    }, 0);
  }, []);

  const wheelInit = () => {
    initCanvas();
    wheelDraw();
  };

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener("click", spin, false);
    canvasContext = canvas.getContext("2d");
  };

  const spin = () => {
    isStarted = true;
    if (timerHandle === undefined) {
      spinStart = new Date().getTime();
      maxSpeed = Math.PI / (segments.length * 2);
      frames = 0;
      timerHandle = window.setInterval(onTimerTick, timerDelay);
    }
  };

  const onTimerTick = () => {
    frames++;
    draw();
    const duration = new Date().getTime() - spinStart;
    let progress = 0;
    let finished = false;

    if (duration < upTime) {
      progress = duration / upTime;
      angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2);
    } else {
      progress = duration / downTime;
      if (progress >= 1) finished = true;
      angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
    }

    angleCurrent += angleDelta;
    while (angleCurrent >= Math.PI * 2) angleCurrent -= Math.PI * 2;

    if (finished) {
      setFinished(true);
      onFinished(currentSegment);
      clearInterval(timerHandle);
      timerHandle = undefined;
      angleDelta = 0;
    }
  };

  const wheelDraw = () => {
    clear();
    drawWheel();
    drawNeedle();
  };

  const draw = () => {
    clear();
    drawWheel();
    drawNeedle();
  };

  const drawSegment = (key: number, lastAngle: number, angle: number) => {
    if (!canvasContext) return;

    const value = segments[key];
    canvasContext.save();
    canvasContext.beginPath();
    canvasContext.moveTo(centerX, centerY);
    canvasContext.arc(centerX, centerY, 150, lastAngle, angle, false);
    canvasContext.lineTo(centerX, centerY);
    canvasContext.closePath();
    canvasContext.fillStyle = segColors[key];
    canvasContext.fill();
    canvasContext.stroke();
    canvasContext.save();
    canvasContext.translate(centerX, centerY);
    canvasContext.rotate((lastAngle + angle) / 2);
    canvasContext.fillStyle = contrastColor || "white";
    canvasContext.font = "bold 1em " + fontFamily;
    canvasContext.fillText(value.substr(0, 21), 150 / 2 + 20, 0);
    canvasContext.restore();
  };

  const drawWheel = () => {
    if (!canvasContext) return;

    let lastAngle = angleCurrent;
    const len = segments.length;
    const PI2 = Math.PI * 2;
    canvasContext.lineWidth = 1;
    canvasContext.strokeStyle = primaryColor || "black";
    canvasContext.textBaseline = "middle";
    canvasContext.textAlign = "center";
    canvasContext.font = "1em " + fontFamily;

    for (let i = 1; i <= len; i++) {
      const angle = PI2 * (i / len) + angleCurrent;
      drawSegment(i - 1, lastAngle, angle);
      lastAngle = angle;
    }

    // Draw center circle
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, 40, 0, PI2, false);
    canvasContext.closePath();
    canvasContext.fillStyle = primaryColor || "black";
    canvasContext.lineWidth = 5;
    canvasContext.strokeStyle = contrastColor || "white";
    canvasContext.fill();
    canvasContext.font = "bold 1.25em " + fontFamily;
    canvasContext.fillStyle = contrastColor || "white";
    canvasContext.textAlign = "center";
    canvasContext.fillText(buttonText || "spin", centerX, centerY + 3);
    canvasContext.stroke();

    // Draw outer circle
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, 0, 0, PI2, false);
    canvasContext.closePath();
    canvasContext.lineWidth = 25;
    canvasContext.strokeStyle = primaryColoraround || "white";
    canvasContext.stroke();
  };

  const drawNeedle = () => {
    if (!canvasContext) return;

    canvasContext.lineWidth = 1;
    canvasContext.strokeStyle = contrastColor || "white";
    canvasContext.beginPath();
    canvasContext.moveTo(centerX + 10, centerY - 40);
    canvasContext.lineTo(centerX - 10, centerY - 40);
    canvasContext.lineTo(centerX, centerY - 60);
    canvasContext.closePath();
    canvasContext.fill();

    const change = angleCurrent + Math.PI / 2;
    let i =
      segments.length -
      Math.floor((change / (Math.PI * 2)) * segments.length) -
      1;
    if (i < 0) i = i + segments.length;

    canvasContext.textAlign = "center";
    canvasContext.textBaseline = "middle";
    canvasContext.fillStyle = "transparent";
    canvasContext.font = "bold 1.5em " + fontFamily;
    currentSegment = segments[i];

    isStarted &&
      canvasContext.fillText(currentSegment, centerX + 10, centerY + size + 50);
  };

  const clear = () => {
    if (canvasContext) {
      canvasContext.clearRect(0, 0, 800, 600);
    }
  };

  return (
    <div id="wheel" className="w-full mx-auto bg-primary-100">
      <canvas
        id="canvas"
        ref={canvasRef}
        height="300"
        className="bg-primary-600 mx-auto rounded-lg w-full max-w-[400px]"
        style={{
          cursor: "pointer",
          pointerEvents: isFinished && isOnlyOnce ? "none" : "auto",
        }}
      />
    </div>
  );
};

export default WheelComponent;
