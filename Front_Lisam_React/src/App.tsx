import React, {FunctionComponent, useState, useEffect} from 'react';

  
const App: FunctionComponent = () => {
 const [name, setName] = useState<string>();
   
 useEffect(() => {
    setName(encodeURI('http://localhost:44331/api/Client/3'));
    }
   , []);
 return (
  <h1>Hello, {name} !</h1>
 )
}
  
export default App;