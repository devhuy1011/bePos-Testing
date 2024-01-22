import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "emerald-green": "#379237",
        "code-green": "#00a67d",
        "light-green": "#90e4ba",
        "mid-gray": "#4083a9",
        "dark-blue": "#394c8f",
        "red-warning": "#d6272d",
        "gray-disable": "#dadada",
        "pri-access": "#293ee5",
        "smoke-gray": "#fafafa",
        "silver-chalice": "#ababab",
        greyish: "#999",
        cyan: "#03b4c6",
        "dark-gray": "#252525",
        "midnight-gray": "#F2F2F2",
        "light-gray": "#4d4b4b",
        "purple-mint": "#e2e2f8",
        "mine-shaft": "#202020",
        "light-bar": "#f8f9fd",
        "red-cherry": "#99191e",
      },
      width: {
        "360": "360px",
        "440": "440px",
      },
      gridTemplateColumns: {
        content: "repeat(auto-fill,minmax(380px,1fr))",
      },
      gridAutoColumns: {
        "row-content": "minmax(max-content,120px)",
      },
      safelist: [
        "animate-[fade-in_1s_ease-in-out]",
        "animate-[fade-in-down_1s_ease-in-out]",
      ],
      typography: ({ theme }: any) => ({
        DEFAULT: {
          css: {
            "--tw-prose-bullets ": theme("colors.pink.500"),
            li: {
              p: {
                margin: 0,
              },
            },
          },
        },
      }),
    },
  },
};
export default config;
