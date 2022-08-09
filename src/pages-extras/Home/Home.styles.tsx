import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > div {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;

  button {
    margin-top: 20px;
    font-size: 16px;
    padding: 8px 18px;
    background-color: #24b988;
    border: none;
    border-radius: 5px;
    color: white;
    font-weight: bold;
  }

  button:hover {
    background-color: #1e926b;
    cursor: pointer;
  }
`;
