// Functional Component
import React, { FC } from "react";

// MUI Elements
import { Skeleton } from "@mui/material";
import { SkeletonBox } from "./index.styles";

// Types
import { SkeletonProps } from "../../types";

const Skeletons: FC<SkeletonProps> = ({ flag, width, height, number }) => {
  const items = [];
  for (let i = 0; i < number; i++) {
    items.push(
      <SkeletonBox data-testid="skeletons">
        <Skeleton
          variant="rectangular"
          animation="wave"
          width={width}
          height={height}
        />
      </SkeletonBox>
    );
  }

  return (
    <>
      {
        {
          1: (
            <>
              {items.map((item, index) => (
                <React.Fragment key={index}>{item}</React.Fragment>
              ))}
            </>
          ),
          2: (
            <>
              <SkeletonBox data-testid="skeletons">
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width={width}
                  height={height}
                />
              </SkeletonBox>
            </>
          ),
        }[flag]
      }
    </>
  );
};

export default Skeletons;
