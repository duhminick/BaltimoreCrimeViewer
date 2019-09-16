import React from 'react';
import { Navbar,
  NavbarHeading,
  NavbarGroup,
  NavbarDivider,
  Classes, 
  Alignment,
  AnchorButton} from '@blueprintjs/core';

const App = () => (
  <div>
    <Navbar className={Classes.DARK}>
      <NavbarGroup align={Alignment.LEFT}>
        <NavbarHeading>Baltimore Crime Viewer</NavbarHeading>
        <NavbarDivider />
        <AnchorButton href="#" text="Github" rightIcon="code" minimal />
      </NavbarGroup>
    </Navbar>
  </div>
)

export default App;
