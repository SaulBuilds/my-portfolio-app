// import React, { useState, useEffect } from 'react';
// import SwipeableViews from 'react-swipeable-views';
// import { autoPlay} from 'react-swipeable-views-utils'
// import { Pagination } from '@mui/material';
// import Image from 'next/image';

// const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

// const images = [
//   {
//     label: 'Coding is life',
//     imgPath: '',
//   },
//   {
//     label: 'Image 2',
//     imgPath: 'path_to_your_image_2.jpg',
//   },
//   {
//     label: 'Image 3',
//     imgPath: 'path_to_your_image_3.jpg',
//   },
//   // Add more images as needed
// ];

// const Carousel = () => {
//   const [activeStep, setActiveStep] = useState(0);

//   const handleStepChange = (step) => {
//     setActiveStep(step);
//   };

//   return (
//     <div>
//       <AutoPlaySwipeableViews
//         axis="x"
//         index={activeStep}
//         onChangeIndex={handleStepChange}
//         enableMouseEvents
//       >
//         {images.map((step, index) => (
//           <div key={step.label}>
//             {Math.abs(activeStep - index) <= 2 ? (
//               <Image src={step.imgPath} alt={step.label} style={{ width: '100%', height: 'auto' }} />
//             ) : null}
//           </div>
//         ))}
//       </AutoPlaySwipeableViews>
//       <Pagination dots={images.length} index={activeStep} onChangeIndex={handleStepChange} />
//     </div>
//   );
// };

// export default Carousel;