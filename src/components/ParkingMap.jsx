import React from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';

const ParkingMap = ({ slots, filteredSlots, selectedSlot, onSlotSelect }) => {
  const contentHeight = Math.max(...slots.map((slot) => slot.y + 60));
  const contentWidth = Math.max(...slots.map((slot) => slot.x + 60));

  return (
    <Stage width={contentWidth + 20} height={contentHeight + 50}>
      <Layer>
        {slots.map((slot) => {
          // Check Parkir
          const isActive = filteredSlots.some(
            (filteredSlot) => filteredSlot.id === slot.id
          );
          const isSelected = selectedSlot?.id === slot.id; // Apakah slot ini dipilih?

          return (
            <React.Fragment key={slot.id}>
              {/* Tempat Parkir */}
              <Rect
                x={slot.x}
                y={slot.y}
                width={60}
                height={60}
                fill={
                  slot.occupied
                    ? '#FA7070'
                    : isSelected
                    ? '#7AA2E3'
                    : isActive
                    ? '#00FF9C'
                    : 'gray' 
                }
                opacity={isActive ? 1 : 0.3} 
                cornerRadius={10} 
                onClick={() => !slot.occupied && onSlotSelect(slot)} 
                onTap={() => !slot.occupied && onSlotSelect(slot)} 
              />
              {/* Nama Tempat Parkir */}
              <Text
                x={slot.x}
                y={slot.y + 65} 
                text={slot.name}
                fontSize={14}
                fill={isSelected ? '#7AA2E3' : isActive ? 'white' : 'gray'} 
                align="center"
                width={60}
              />
            </React.Fragment>
          );
        })}
      </Layer>
    </Stage>
  );
};

export default ParkingMap;
