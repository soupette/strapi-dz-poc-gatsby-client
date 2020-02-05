import styled from "styled-components"

const Flex = styled.div`
  display: flex;
  > p {
    flex-grow: 2;
    max-width: calc(100% - 300px);
    margin: 0;
    padding: 0 10px;
    text-align: initial;
  }
  margin-bottom: 20px;
`

export default Flex
