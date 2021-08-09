import styled from 'styled-components';

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 50%;
  font-size: 0.6em;

  input {
    height: 30px;
  }

  input[type=submit] {
    &:hover {
      cursor: pointer;
    }
  }
`;
