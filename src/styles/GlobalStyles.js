import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

body{
    font-family: Arial, sans-serif;
    background:#f5f5f5;
}

a{
    text-decoration:none;
}

button{
    cursor:pointer;
}

`;

export default GlobalStyles;