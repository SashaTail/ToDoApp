
const initialState = {
    items: [],
    isLoaded: false,
  };

  const todos = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_TODOS':
        return {
          ...state,
          items: action.payload,
          isLoaded: true,
        };
        
        case 'ADD_TODOS':
          return {
            ...state,
            items: [...state.items, action.payload]
          };

          case 'REMOVE_TODOS':
            const id=action.payload
            return {
              ...state,
              items: state.items.filter((item) => item.id !== id)
          }

      case 'EDIT_ITEM':{
        return {...state,
        items: state.items.map(item => { 
          if(item.id === action.payload.id)
          { 
            item.completed=action.payload.value
          }
          return item
        })
      }
      }
    
      case 'SET_LOADED':
        return {
          ...state,
          isLoaded: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default todos;