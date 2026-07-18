import styled from "styled-components";

export const CartContainer = styled.div`
    width:90%;
    max-width:1000px;
    margin:20px auto;
    text-align:center;
`;

export const CartItem = styled.div`
    background:white;
    padding:12px;
    margin:10px auto;
    width:100%;
    max-width:600px;
    border-radius:15px;
    box-shadow:0 4px 12px rgba(0,0,0,.15);

    display:flex;
    flex-direction:column;
    align-items:center;
    gap:5px;
`;

export const ImagenCarrito = styled.img`
    width:130px;
    height:130px;
    object-fit:contain;
`;

export const BotonCarrito = styled.button`
    padding:10px 20px;
    border:none;
    border-radius:8px;

    background:#222;
    color:white;

    cursor:pointer;
    transition:.2s;

    &:hover{
        background:#1976d2;
    }
`;

export const CuponContainer = styled.div`
    margin:20px auto;
    padding:20px;
    max-width:600px;

    background:white;
    border-radius:15px;
    box-shadow:0 4px 12px rgba(0,0,0,.15);

    display:flex;
    flex-direction:column;
    align-items:center;
    gap:15px;

    input{
        width:80%;
        padding:10px;
        border-radius:8px;
        border:1px solid #ccc;
    }
`;