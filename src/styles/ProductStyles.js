import styled from "styled-components";

export const ProductCard = styled.div`
    width:100%;
    min-height:320px;
    height:100%;

    background:#fff;
    border-radius:14px;
    padding:16px;

    display:flex;
    flex-direction:column;
    justify-content:space-between;
    align-items:center;

    text-align:center;

    box-shadow:0 4px 12px rgba(0,0,0,.12);

    position:relative;

    transition:.25s;

    &:hover{
        transform:translateY(-6px);
        box-shadow:0 10px 22px rgba(0,0,0,.18);
        z-index:5;
    }

    img{
        width:120px;
        height:120px;
        object-fit:contain;
        margin-bottom:12px;
        transition:.25s;
    }

    &:hover img{
        transform:scale(1.05);
    }

    h3{
        font-size:1rem;
        font-weight:600;
        color:#222;

        min-height:48px;

        display:flex;
        align-items:center;
        justify-content:center;

        margin:8px 0;
    }

    p{
        margin-top:auto;
        font-size:1.15rem;
        font-weight:bold;
        color:#1976d2;
    }
`;