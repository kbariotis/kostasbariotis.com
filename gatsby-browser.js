import FontFaceObserver from 'fontfaceobserver';

// Define phase 1 fonts
const robotoSubset = new FontFaceObserver('Roboto Subset', { weight: 300 });
const robotoSlabSubset = new FontFaceObserver('Roboto Slab Subset', {
  weight: 400,
});

// Define phase 2 fonts
const robotoNormal = new FontFaceObserver('Roboto', { weight: 400 });
const robotoSemiBold = new FontFaceObserver('Roboto', { weight: 600 });
const robotoBold = new FontFaceObserver('Roboto', { weight: 800 });
const robotoLighter = new FontFaceObserver('Roboto', { weight: 200 });

const robotoSlabNormal = new FontFaceObserver('Roboto Slab', { weight: 400 });

export const onInitialClientRender = () => {
  Promise.all([robotoSubset.load(), robotoSlabSubset.load()]).then(function () {
    document.documentElement.classList.add('subset-fonts-enabled');

    Promise.all([
      robotoNormal.load(),
      robotoSemiBold.load(),
      robotoBold.load(),
      robotoLighter.load(),
      robotoSlabNormal.load(),
    ]).then(function () {
      document.documentElement.classList.remove('subset-fonts-enabled');
      document.documentElement.classList.add('fonts-enabled');
    });
  });
};
