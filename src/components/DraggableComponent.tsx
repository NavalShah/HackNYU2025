'use client';

import React, { useState } from 'react';
import Gemini from './Gemini';

type Props = {
  children: React.ReactNode;
  componentName: string;
  defaultProps?: any;
};

export type DragData = {
  name: string;
  defaultProps: any;
};

function DraggableComponent({ children, componentName, defaultProps }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const onDragStart = (e: React.DragEvent<HTMLElement>) => {
    e.dataTransfer.setData(
      'widgetData',
      JSON.stringify({
        name: componentName,
        defaultProps: defaultProps,
      })
    );
  };

  const showPopup = () => {
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onMouseEnter={() => setIsHovered(true)}  // Set hovered state on mouse enter
      onMouseLeave={() => setIsHovered(false)} // Set hovered state on mouse leave
      style={{ position: 'relative' }} // Ensure positioning for button
    >
      {children}

      {isHovered && (
        <button
          onClick={showPopup}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            border: 'none',
            padding: '5px 10px',
            borderRadius: '5px',
          }}
        >
          Open Popup
        </button>
      )}

      {/* Popup Overlay */}
      {isPopupVisible && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark overlay
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000, // Ensure the popup is on top
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '10px',
              textAlign: 'center',
              position: 'relative',
              height: '80%',
              width: '80%',
            }}
          >
            <Gemini initialPrompt='A computer is something that computes.' />
            <button
              onClick={closePopup}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                padding: '5px 10px',
                borderRadius: '50%',
                cursor: 'pointer',
              }}
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DraggableComponent;
