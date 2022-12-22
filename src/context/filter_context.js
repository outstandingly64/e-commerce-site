import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import { useProductsContext } from './products_context'

//1 default display of all products (think clear all filters functionality)
//1 display of products that is being filtered
const initialState = {
  filtered_products: [],
  all_products: [],
  grid_view: true,
  sort: 'price-lowest',
  filters: {
    text: '',
    company: 'all',
    category: 'all',
    color: 'all',
    price: 0,
    min_price: 0,
    max_price: 0,
    shipping: false,
  },
}

const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {
  const {products} = useProductsContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(()=>{
    dispatch({type: LOAD_PRODUCTS, payload: products});
  }, [products]);

  useEffect(()=>{
    dispatch({type: FILTER_PRODUCTS});
    dispatch({type: SORT_PRODUCTS});
  },[products, state.sort, state.filters]);

  const setGridView = () => {
    dispatch({type: SET_GRIDVIEW, });
  };

  const setListView = () => {
    dispatch({type: SET_LISTVIEW, });

  };

  const updateSort = (e) => {
    const value = e.target.value;
    dispatch({type: UPDATE_SORT, payload: value});
  };

  const updateFilters = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    //category options: can't grab a button's value, but we can grab its textContent
    if(name === 'category') value = e.target.textContent;
    if(name === 'color') value = e.target.dataset.color;
    dispatch({type: UPDATE_FILTERS, payload: {name, value}});
  };
  
  const clearFilters = () => {};

  return (
    <FilterContext.Provider value={{...state, setGridView, setListView, updateSort, updateFilters, clearFilters}}>
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
