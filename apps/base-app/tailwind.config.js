/* eslint-env node */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.vue'],
  theme: {
    colors: {
      // colors gray
      black: '#000000',
      gray: {
        darker: {
          40: '#2A2B2D',
          30: '#545659',
          20: '#7D8086',
          10: '#A7ABB2'
        },
        base: '#D1D6DF',
        lighter: {
          10: '#DADEE5',
          20: '#E3E6EC',
          30: '#EDEFF2',
          40: '#F6F7F9'
        }
      },
      white: '#FFFFFF',
      // colors primary
      primary: {
        darker: {
          30: '#1E375C',
          20: '#2D538B',
          10: '#3C6EB9'
        },
        base: '#4B8AE7',
        lighter: {
          10: '#93B9F1',
          20: '#B7D0F5',
          30: '#DBE8FA',
          40: '#EDF3FD'
        }
      },
      // colors status to be added later if necessary...
      // colors dataviz
      dataviz: {
        purple: {
          darker: {
            30: '#302955',
            20: '#473D80',
            10: '#5F52AA'
          },
          base: '#7766D5',
          lighter: {
            10: '#ADA3E6',
            20: '#C9C2EE',
            30: '#E4E0F7',
            40: '#F4F3FC'
          }
        },
        pink: {
          darker: {
            30: '#512A4F',
            20: '#7A3678',
            10: '#AB49A8'
          },
          base: '#D65ED2',
          lighter: {
            10: '#F593F2',
            20: '#FAD2F9',
            30: '#FAF0FA',
            40: '#FBF4FB'
          }
        },
        red: {
          darker: {
            30: '#661E29',
            20: '#982C3D',
            10: '#CB3B52'
          },
          base: '#FE4A66',
          lighter: {
            10: '#FE92A3',
            20: '#FFB7C2',
            30: '#FFDBE0',
            40: '#FFF5F6'
          }
        },
        orange: {
          darker: {
            30: '#643E1E',
            20: '#975D2C',
            10: '#C97C3B'
          },
          base: '#FB9B4A',
          lighter: {
            10: '#FDC392',
            20: '#FDD7B7',
            30: '#FEEBDB',
            40: '#FFF7F0'
          }
        },
        yellow: {
          darker: {
            30: '#664C18',
            20: '#987324',
            10: '#CB9930'
          },
          base: '#FEBF3C',
          lighter: {
            10: '#FED98A',
            20: '#FFE5B1',
            30: '#FFF2D8',
            40: '#FFF8EB'
          }
        },
        green: {
          darker: {
            30: '#275A44',
            20: '#3A8867',
            10: '#4EB589'
          },
          base: '#61E2AB',
          lighter: {
            10: '#A0EECD',
            20: '#C0F3DD',
            30: '#DFF9EE',
            40: '#EEFCF6'
          }
        },
        blue: {
          darker: {
            30: '#1E375C',
            20: '#2D538B',
            10: '#3C6EB9'
          },
          base: '#4B8AE7',
          lighter: {
            10: '#93B9F1',
            20: '#B7D0F5',
            30: '#B7D0F5',
            40: '#F2F6FD'
          }
        },
        gray: {
          darker: {
            30: '#000000',
            20: '#2A2B2D',
            10: '#545659'
          },
          base: '#7D8086',
          lighter: {
            10: '#A7ABB2',
            20: '#DADEE5',
            30: '#EDEFF2',
            40: '#F6F7F9'
          }
        }
      }
    },
    fontSize: {
      'body-big': ['17px', { lineHeight: '20px' }],
      'body-base': ['15px', { lineHeight: '20px' }],
      'body-button': ['15px', { lineHeight: '20px' }],
      'body-small': ['12px', { lineHeight: '16px' }]
      // heading sizes to be added later if necessary...
    },
    fontWeight: {
      bold: '600',
      'extra-bold': '700'
    },
    spacing: {
      '1px': '1px',
      0.25: '2px',
      0.5: '4px',
      0.75: '6px',
      1: '8px',
      0.83: '10px',
      1.5: '12px',
      2: '16px',
      3: '24px',
      4: '32px',
      4.5: '36px',
      6: '48px',
      7: '56px',
      8: '64px',
      9: '72px',
      10: '80px',
      11: '88px',
      12: '96px',
      15: '120px'
    },
    borderRadius: {
      4: '4px',
      8: '8px',
      16: '16px'
    },
    borderWidth: {
      1: '1px',
      2: '2px',
      3: '3px'
    },
    boxShadow: {
      30: '0px 12px 17px rgba(0, 0, 0, 0.1), 0px 5px 22px rgba(0, 0, 0, 0.08), 0px 1px 8px rgba(0, 0, 0, 0.08)',
      20: '0px 2px 4px rgba(0, 0, 0, 0.1), 0px 4px 5px rgba(0, 0, 0, 0.08), 0px 0px 10px rgba(0, 0, 0, 0.08)',
      10: '0px 0px 2px rgba(0, 0, 0, 0.1), 0px 2px 2px rgba(0, 0, 0, 0.08), 0px 1px 3px rgba(0, 0, 0, 0.08)'
    },
    extend: {
      textColor: {
        // colors text
        gray: {
          base: '#3C3D40',
          lighter: {
            10: 'rgba(0, 0, 0, 0.48)',
            20: 'rgba(0, 0, 0, 0.24)'
          }
        }
        // white to be added later if necessary...
      }
    }
  },
  plugins: []
}
