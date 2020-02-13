import React, {FunctionComponent, useState, useEffect} from 'react';

  
const App: /*React.FC*/ FunctionComponent = () => {
 const [name, setName] = useState<string>();
    
 useEffect(() => {
    setName('React');
    }
 );
 return (
  <h1>Hello, {name} !</h1>
 )
}
  
export default App;