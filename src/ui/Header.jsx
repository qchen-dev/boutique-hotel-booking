import styled from "styled-components";

const StyledHeader = styled.header`
  /* background-color: yellow; */
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);

  grid-column: 2;
`;

function Header() {
  return <StyledHeader>Header</StyledHeader>;
}

export default Header;
