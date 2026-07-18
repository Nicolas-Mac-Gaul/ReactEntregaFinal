import styled from "styled-components";

export const ImagenProducto = styled.img`
    width:160px;
    height:160px;
    object-fit:contain;
    margin:8px auto;
    transition:.25s;

    &:hover{
        transform:scale(1.05);
    }
`;

export const Precio = styled.h3`
    font-size:1.7rem;
    font-weight:bold;
    color:#1976d2;
    margin:10px 0;
`;

export const SelectorCantidad = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    gap:12px;
    margin:12px 0;
`;

export const Cantidad = styled.span`
    width:35px;
    text-align:center;
    font-size:18px;
    font-weight:bold;
`;

export const BotonCantidad = styled.button`
    width:35px;
    height:35px;
    border:none;
    border-radius:8px;
    background:#222;
    color:white;
    font-size:18px;
    cursor:pointer;

    &:hover{
        background:#1976d2;
    }
`;

export const BotonCarrito = styled.button`
    width:100%;
    margin-top:12px;
    padding:10px;
    border:none;
    border-radius:10px;
    background:#28a745;
    color:white;
    font-size:16px;
    font-weight:bold;
    cursor:pointer;

    &:hover{
        background:#218838;
    }
`;