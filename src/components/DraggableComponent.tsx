'use client';

import React, { useState } from 'react';
import Gemini from './Gemini';
import { CIPHERS } from './Ciphers'; // Extracted CIPHERS to a separate file

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

  // Safely find the cipher paragraph
  const cipherIndex = CIPHERS.findIndex(c => c.name === componentName);
  const cipherText = cipherIndex !== -1 ? CIPHERS[cipherIndex].paragraph : "No information available.";

  const onDragStart = (e: React.DragEvent<HTMLElement>) => {
    e.dataTransfer.setData(
      'widgetData',
      JSON.stringify({
        name: componentName,
        defaultProps: defaultProps,
      })
    );
  };

  const showPopup = () => setIsPopupVisible(true);
  const closePopup = () => setIsPopupVisible(false);

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") showPopup();
      }}
      tabIndex={0} // Ensures keyboard focus
      style={{ position: 'relative', outline: 'none' }}
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
            cursor: 'pointer',
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
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            opacity: isPopupVisible ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
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
            <Gemini initialPrompt={cipherText} />
            <button
              onClick={closePopup}
              onKeyDown={(e) => {
                if (e.key === "Escape") closePopup();
              }}
              aria-label="Close Popup"
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
