import styled from "styled-components"

export const Button = styled.button`
    padding: 10px; 0;
    margin: 0;
    margin-top: 10px;
    transition: box-shadow .25s;
    color: white;
    background-color: green;
    border: none;
    font-weight: 500;

    &:hover {
        box-shadow: 3px 3px 7.5px green;
    }
`