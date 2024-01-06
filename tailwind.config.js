/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Poppins","ui-sans-serif", "system-ui", "DM Serif Text"],
      serif: ["Poppins","ui-serif", "Georgia", "DM Serif Text"],
      mono: ["Poppins","ui-monospace", "SFMono-Regular", "DM Serif Text"],
      display: ["Oswald", "DM Serif Text"],
      dm: ["Poppins","ui-serif", '"Roboto"', '"DM Serif Text"', '"Open Sans"'],
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "xcool-green": "#138695",
        "xcool-red": "#e74040",
        "xcool-red-dark": "#4d1515",
        "xcool-yellow": "#f2c94c",
        "xcool-yellow-dark": "#473b16",
        "xcool-green-dark": "#003b43",
        "xcool-new-orange-light": "#FFFBFA",
        "xcool-new-orange-button": "#FFF2ED",
        "xcool-new-orange-hover": "#FF8A5C",
        "xcool-new-blue-dark": "#2A87BB",
        "xcool-new-blue-hover": "#1e6187",
        "xcool-new-blue":"#2A87BB",
        "xcool-new-blue-button":"#E1F4FF",
        "xcool-new-gray":"#999999",
        "xcool-new-brown":"#666666",
        "xcool-new-blue-bg":"#EDF9FF"
      },
      dropShadow: {
        'xcool-orange': '0 1px 1px rgba(255, 138, 92, 0.06)',
        '4xl': [
            '0 35px 35px rgba(0, 0, 0, 0.25)',
            '0 45px 65px rgba(0, 0, 0, 0.15)'
        ]
      }
    },
  },
  plugins: [],
};
