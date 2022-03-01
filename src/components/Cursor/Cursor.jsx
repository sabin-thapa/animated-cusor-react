import React, { useEffect, useRef } from "react";
import "./cursor.css";
import Image from '../../images/ss.png'

const Cursor = () => {
  const delay = 10;

  const outline = useRef(null);

  const cursorVisible = useRef(true);
  const cursorEnlarged = useRef(false);

  const endX = useRef(window.innerWidth / 2);
  const endY = useRef(window.innerHeight / 2);
  const _x = useRef(0);
  const _y = useRef(0);

  const requestRef = useRef(null);

  useEffect(() => {
    document.addEventListener('mousedown', mouseOverEvent);
    document.addEventListener('mouseup', mouseOutEvent);
    document.addEventListener('mousemove', mouseMoveEvent);
    document.addEventListener('mouseenter', mouseEnterEvent);
    document.addEventListener('mouseleave', mouseLeaveEvent);

    animateOutline();

    return () => {
      document.removeEventListener('mousedown', mouseOverEvent);
      document.removeEventListener('mouseup', mouseOutEvent);
      document.removeEventListener('mousemove', mouseMoveEvent);
      document.removeEventListener('mouseenter', mouseEnterEvent);
      document.removeEventListener('mouseleave', mouseLeaveEvent);

      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const toggleCursorVisibility = () => {
    if (cursorVisible.current) {
      outline.current.style.opacity = 1;
    } else {
      outline.current.style.opacity = 0;
    }
  };

  const toggleCursorSize = () => {
    if (cursorEnlarged.current) {
      outline.current.style.transform = 'translate(-50%, -50%) scale(1.5)';
    } else {
      outline.current.style.transform = 'translate(-50%, -50%) scale(1)';
    }
  };

  const mouseOverEvent = () => {
    cursorEnlarged.current = true;
    toggleCursorSize();
  };

  const mouseOutEvent = () => {
    cursorEnlarged.current = false;
    toggleCursorSize();
  };

  const mouseEnterEvent = () => {
    cursorVisible.current = true;
    toggleCursorVisibility();
  };

  const mouseLeaveEvent = () => {
    cursorVisible.current = false;
    toggleCursorVisibility();
  };

  const mouseMoveEvent = e => {
    cursorVisible.current = true;
    toggleCursorVisibility();

    endX.current = e.pageX;
    endY.current = e.pageY;

  };

  const animateOutline = () => {
    _x.current += (endX.current - _x.current) / delay;
    _y.current += (endY.current - _y.current) / delay;

    outline.current.style.top = _y.current + 'px';
    outline.current.style.left = _x.current + 'px';

    requestRef.current = requestAnimationFrame(animateOutline);
  };


  return (
    <>
    <div ref={outline} className="cursor-outline"> </div>
      <div className="center-text" >
        <img className='img' src={Image} onMouseOver={mouseOverEvent} onMouseOut={mouseOutEvent} alt='screenshot'/>
        <p onMouseOver={mouseOverEvent} onMouseOut={mouseOutEvent} >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis ab, odit a ipsa modi aperiam magni repellendus quam corrupti eaque dicta eligendi rerum sit maxime, libero omnis dolore adipisci? Nihil, obcaecati et? Aperiam odit dignissimos quis, dolores pariatur voluptatum. Laborum!</p>
      </div>
    </>
  );
};

export default Cursor;
