import Typography from 'typography';

const typography = new Typography({
  baseFontSize: '20px',
  headerFontFamily: ['Roboto Slab', 'sans-serif'],
  bodyFontFamily: ['Roboto', 'sans-serif'],
  bodyWeight: '300',
  googleFonts: [
    {
      name: 'Roboto+Slab',
      styles: ['700'],
    },
    {
      name: 'Roboto',
      styles: ['300', '400', '400i', '500', '900'],
    },
  ],
});

export default typography;
