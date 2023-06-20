import React, { useEffect, useRef } from "react";
import { Stage, Layer, Rect, Transformer } from "react-konva";

interface RectangleProps {
  shapeProps: any;
  isSelected: boolean;
  canvasWidth: number;
  canvasHeight: number;
  onSelect: (x: any) => void;
  onChange: (x: any) => void;
}

const Rectangle = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
  canvasWidth,
  canvasHeight,
}: RectangleProps) => {
  const shapeRef = useRef<any>();
  const trRef = useRef<any>();

  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Rect
        strokeScaleEnabled={false}
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragMove={(e) => {
          const stage = e.target.getStage();
          const x = Math.max(
            0,
            Math.min(stage!.width() - e.target.width(), e.target.x())
          );
          const y = Math.max(
            0,
            Math.min(stage!.height() - e.target.height(), e.target.y())
          );
          e.target.position({ x, y });
        }}
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            // ...shapeProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          rotateEnabled={false}
          ignoreStroke
          boundBoxFunc={(oldBox, newBox) => {
            const isOut =
              newBox.x < 0 ||
              newBox.y < 0 ||
              newBox.x + newBox.width > canvasWidth ||
              newBox.y + newBox.height > canvasHeight;

            if (isOut) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};

export default Rectangle;
