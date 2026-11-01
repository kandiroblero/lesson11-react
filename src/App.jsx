import { useReducer } from 'react';  

const initialState = { 

 loading: false, 

 error: null, 

 fact: null, 

}; 


function factReducer(state, action) { 

 switch (action.type) { 

   case 'FETCH_START': 

     return { loading: true, error: null, fact: null }; 

   case 'FETCH_SUCCESS': 

     return { loading: false, error: null, fact: action.payload }; 

   case 'FETCH_ERROR': 

     return { loading: false, error: action.payload, fact: null }; 

   default: 

     return state; 

 } 

} 
 

function App() { 

 const [state, dispatch] = useReducer(factReducer, initialState); 

 const getCatFact = () => {
  dispatch({ type: 'FETCH_START' });

  fetch('https://catfact.ninja/fact')
    .then((response) => response.json())
    .then((data) => {
      dispatch({
        type: 'FETCH_SUCCESS',
        payload: data.fact,
      });
    })
    .catch(() => {
      dispatch({
        type: 'FETCH_ERROR',
        payload: 'Something went wrong.',
      });
    });

  };


 return ( 

   <div> 

     <h1>Cat Fact Generator</h1> 

     {<button onClick={getCatFact}>
         Get Cat Fact
      </button>} 

{state.loading && <p>Loading...</p>}

{state.error && <p>{state.error}</p>}

{state.fact && <p>{state.fact}</p>}

   </div> 

 ); 

} 
export default App;